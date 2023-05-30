import config from "../../config";
import invoice from "../../email_templates/pages/invoice";
import { order_db } from "../orders";
import { covertToOunces, parseOrderData } from "./shipping_helpers";
import { addTracking, buyLabel, clearTracking, createLabel, createShippingRates, createTracker, refundLabel } from "./shipping_interactors";

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
  create_pickup_shipping_s: async (params: any) => {
    const { date } = params;
    console.log({ date });
    try {
      // const homeAddress = {
      //   street1: config.PRODUCTION_ADDRESS,
      //   city: config.PRODUCTION_CITY,
      //   state: config.PRODUCTION_STATE,
      //   zip: config.PRODUCTION_POSTAL_CODE,
      //   country: config.PRODUCTION_COUNTRY,
      //   company: "Glow LEDs",
      //   phone: config.PHONE_NUMBER,
      //   email: config.INFO_EMAIL
      // };

      const homeAddress = await EasyPost.Address.create({
        street1: config.PRODUCTION_ADDRESS,
        city: config.PRODUCTION_CITY,
        state: config.PRODUCTION_STATE,
        zip: config.PRODUCTION_POSTAL_CODE,
        country: config.PRODUCTION_COUNTRY,
        company: "Glow LEDs",
        phone: config.PHONE_NUMBER,
        email: config.INFO_EMAIL
      });

      const orders = await order_db.findAll_orders_db(
        {},
        // { isPaid: true, isPackaged: true, isShipped: false, isDelivered: false },
        {},
        "0",
        "1"
      );
      // console.log({ orders });
      const fedexOrders = orders.filter(
        (order: any) => order.shipping && order.shipping.shipping_label && order.shipping.shipping_label.selected_rate.carrier === "FedEx"
      );

      const shipmentIds = fedexOrders.map((order: any) => order.shipping.shipment_id);
      // for (let i = 0; i < shipmentIds.length; i++) {
      //   try {
      //     const shipment = await EasyPost.Shipment.retrieve(shipmentIds[i]);
      //     console.log({ shipment });
      //     console.log(`Successfully retrieved shipment ${shipmentIds[i]}`);
      //   } catch (error) {
      //     console.log(`Failed to retrieve shipment ${shipmentIds[i]}`);
      //     throw error;
      //   }
      // }
      console.log({ shipmentIds });
      const shipments = await Promise.all(shipmentIds.map((id: any) => EasyPost.Shipment.retrieve(id)));
      console.log({ shipments });

      const formattedDate = new Date(date);
      const pickup = await EasyPost.Pickup.create({
        address: homeAddress,
        min_datetime: formattedDate, // use date here
        max_datetime: formattedDate, // use date here
        reference: "my-first-pickup",
        is_account_address: false,
        instructions: "Special pickup instructions",
        shipment: shipments
      });

      console.log({ pickup });
      return pickup;
    } catch (error) {
      console.log({ error });
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
          email: to_shipping.email
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
          email: from_shipping.email
        },
        parcel: {
          length: package_dimensions.length,
          width: package_dimensions.width,
          height: package_dimensions.height,
          weight: covertToOunces(package_dimensions)
        }
      });

      return { shipment, parcel: package_dimensions };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
};
