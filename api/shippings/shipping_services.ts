import config from "../../config";
import invoice from "../../email_templates/pages/invoice";
import { order_db } from "../orders";
import { covertToOunces, parseOrderData } from "./shipping_helpers";
import {
  addTracking,
  buyLabel,
  clearTracking,
  createLabel,
  createShippingRates,
  createTracker,
  refundLabel,
} from "./shipping_interactors";

const easy_post_api = require("@easypost/api");
const EasyPost = new easy_post_api(config.EASY_POST);

export default {
  shipping_rates_shipping_s: async (body: any) => {
    try {
      return await createShippingRates({ order: body.order, returnLabel: false });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  different_shipping_rates_shipping_s: async (params: any) => {
    const { shipment_id, order_id } = params;

    const order = await order_db.findById_orders_db(order_id);
    try {
      if (shipment_id && !order.shipping.shipping_label) {
        const shipment = await EasyPost.Shipment.retrieve(shipment_id);
        return { shipment };
      } else {
        return await createShippingRates({ order, returnLabel: false });
      }
    } catch (error) {
      return await createShippingRates({ order, returnLabel: false });
    }
  },

  buy_label_shipping_s: async (params: any) => {
    const order = await order_db.findById_orders_db(params.order_id);
    const { shipping_rate, shipment_id } = order.shipping;
    try {
      const label: any = await buyLabel({ shipment_id, shipping_rate, order });
      return { invoice: invoice({ order }), label: label.postage_label.label_url };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_label_shipping_s: async (params: any) => {
    try {
      const order = await order_db.findById_orders_db(params.order_id);
      const label: any = await createLabel({ order });
      await addTracking({ order, label, shipping_rate: label.selected_rate });
      return { invoice: invoice({ order }), label: label.postage_label.label_url };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  refund_label_shipping_s: async (params: any) => {
    const { order_id, is_return_tracking } = params;
    try {
      const order = await order_db.findById_orders_db(order_id);
      const refund: any = await refundLabel({ order, is_return_tracking });
      await clearTracking({ order, isReturnTracking: is_return_tracking });
      return refund;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_tracker_shipping_s: async (params: any) => {
    try {
      const order = await order_db.findById_orders_db(params.order_id);
      const tracker: any = await createTracker({ order });
      return tracker;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_return_label_shipping_s: async (params: any) => {
    try {
      const order = await order_db.findById_orders_db(params.order_id);

      const { shipment }: any = await createShippingRates({ order, returnLabel: true });

      const label = await EasyPost.Shipment.buy(shipment.id, shipment.lowestRate());
      await addTracking({ order, label, shipping_rate: label.selected_rate, isReturnTracking: true });

      return { label: label.postage_label.label_url };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  generate_csv_label_shipping_s: async (params: any) => {
    try {
      const order = await order_db.findById_orders_db(params.order_id);
      const shipment = await EasyPost.Shipment.retrieve(order.shipping.shipment_id);
      const csvData = parseOrderData(shipment, order);

      return csvData;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_pickup_shipping_s: async (body: any) => {
    const { readyTime, latestTimeAvailable } = body;
    console.log({ readyTime, latestTimeAvailable });

    try {
      const formattedReadyTime = new Date(readyTime);
      const formattedLatestTimeAvailable = new Date(latestTimeAvailable);
      const homeAddress = await EasyPost.Address.create({
        street1: config.PRODUCTION_ADDRESS,
        city: config.PRODUCTION_CITY,
        state: config.PRODUCTION_STATE,
        zip: config.PRODUCTION_POSTAL_CODE,
        country: config.PRODUCTION_COUNTRY,
        company: "Glow LEDs",
        phone: config.PHONE_NUMBER,
        email: config.INFO_EMAIL,
      });

      const orders = await order_db.findAll_orders_db(
        {
          deleted: false,
          isPaid: true,
          isPackaged: true,
          "shipping.shipping_rate.carrier": "UPSDAP",
          isPickup: false,
          isShipped: false,
          isDelivered: false,
        },
        {},
        "0",
        "1"
      );
      console.log({ orders });
      if (orders.length === 0 || !orders) {
        throw new Error("Orders not found");
      }

      const shipmentIds = orders.map((order: any) => order.shipping.shipment_id);
      const shipments = await Promise.all(shipmentIds.map((id: any) => EasyPost.Shipment.retrieve(id)));
      if (shipments) {
        // Create a batch with the shipments
        const batch = await EasyPost.Batch.create({
          shipments: shipments,
        });

        const pickup = await EasyPost.Pickup.create({
          address: homeAddress,
          min_datetime: formattedReadyTime, // use date here
          max_datetime: formattedLatestTimeAvailable, // use date here
          reference: `${orders
            .map((order: any) => `${order.shipping.first_name} ${order.shipping.last_name}`)
            .join(", ")} Orders`,
          is_account_address: false,
          instructions: "Pick up on front porch please.",
          batch: batch,
        });
        return { pickup, orders };
      }
    } catch (error) {
      console.log({ error });
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  confirm_pickup_shipping_s: async (body: any) => {
    const { pickupId, rateId, orders } = body;

    try {
      // Retrieve the pickup
      const pickup = await EasyPost.Pickup.retrieve(pickupId);

      // Find the rate in the pickup's rates
      const rate = pickup.pickup_rates.find((rate: any) => rate.id === rateId);
      if (!rate) {
        throw new Error("Rate not found");
      }
      // Buy the pickup
      const boughtPickup = await EasyPost.Pickup.buy(pickupId, rate.carrier, rate.service);

      // Update the orders that are being added to the batch
      for (const order of orders) {
        order.isPickup = true;
        order.pickupAt = new Date(); // set the pickupAt field to the current date
        await order_db.update_orders_db(order._id, order);
      }

      // Return the bought pickup
      return boughtPickup;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },

  custom_shipping_rates_shipping_s: async (body: any) => {
    try {
      const to_shipping = body.data.to_shipping;
      const from_shipping = body.data.from_shipping;
      const package_dimensions = body.data.package_dimensions;
      const shipment = await EasyPost.Shipment.create({
        to_address: {
          name: to_shipping.company ? "" : to_shipping.first_name + " " + to_shipping.last_name,
          street1: to_shipping.address_1,
          street2: to_shipping.address_2,
          city: to_shipping.city,
          state: to_shipping.state,
          zip: to_shipping.postalCode,
          country: to_shipping.country,
          company: to_shipping.company,
          phone: to_shipping.phone,
          email: to_shipping.email,
        },
        from_address: {
          name: from_shipping.company ? "" : from_shipping.first_name + " " + from_shipping.last_name,
          street1: from_shipping.address_1,
          street2: from_shipping.address_2,
          city: from_shipping.city,
          state: from_shipping.state,
          zip: from_shipping.postalCode,
          country: from_shipping.country,
          company: from_shipping.company,
          phone: from_shipping.phone,
          email: from_shipping.email,
        },
        parcel: {
          length: package_dimensions.length,
          width: package_dimensions.width,
          height: package_dimensions.height,
          weight: covertToOunces(package_dimensions),
        },
      });

      return { shipment, parcel: package_dimensions };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};
