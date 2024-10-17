import config from "../../config";
import invoice from "../../email_templates/pages/invoice";
import { Order, order_db } from "../orders";
import { covertToOunces, parseOrderData } from "./shipping_helpers";
import {
  addTracking,
  buyLabel,
  clearTracking,
  createCustomShippingRates,
  createLabel,
  createShippingRates,
  createTracker,
  refundLabel,
} from "./shipping_interactors";

const easy_post_api = require("@easypost/api");
const EasyPost = new easy_post_api(config.EASY_POST);

export default {
  shipping_rates_shipping_s: async body => {
    try {
      const { order, splitOrder } = body;

      if (splitOrder) {
        const preOrderItems = order.orderItems.filter(item => item.isPreOrder);
        const nonPreOrderItems = order.orderItems.filter(item => !item.isPreOrder);

        const preOrderRates = await createShippingRates({
          order: { ...order, orderItems: preOrderItems },
          returnLabel: false,
        });

        const nonPreOrderRates = await createShippingRates({
          order: { ...order, orderItems: nonPreOrderItems },
          returnLabel: false,
        });

        return {
          preOrderRates,
          nonPreOrderRates,
        };
      } else {
        return await createShippingRates({ order, returnLabel: false });
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  different_shipping_rates_shipping_s: async params => {
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

  buy_label_shipping_s: async params => {
    try {
      const order = await order_db.findById_orders_db(params.order_id);
      console.log({ buy_label_shipping_s: order });
      const { shipping_rate, shipment_id } = order.shipping;
      const label = await buyLabel({ shipment_id, shipping_rate });
      console.log({ label });
      await addTracking({ order, label, shipping_rate });
      return { invoice: invoice({ order }), label: label.postage_label.label_url };
    } catch (error) {
      console.log({ error, errors: error.errors });
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_label_shipping_s: async params => {
    try {
      const order = await order_db.findById_orders_db(params.order_id);
      const { shipping_rate } = order.shipping;
      const label = await createLabel({ order, shipping_rate });
      await addTracking({ order, label, shipping_rate: label.selected_rate });
      return { invoice: invoice({ order }), label: label.postage_label.label_url };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  refund_label_shipping_s: async params => {
    const { order_id, is_return_tracking } = params;
    try {
      const order = await order_db.findById_orders_db(order_id);
      const refund = await refundLabel({ order, is_return_tracking });
      await clearTracking({ order, isReturnTracking: is_return_tracking });
      return refund;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  shipments_shipping_s: async () => {
    try {
      const shipments = await EasyPost.Shipment.all({
        page_size: 50,
      });
      return shipments;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_tracker_shipping_s: async params => {
    try {
      const order = await order_db.findById_orders_db(params.order_id);
      const tracker = await createTracker({ order });
      return tracker;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_return_label_shipping_s: async (params, query) => {
    try {
      const order = await order_db.findById_orders_db(params.order_id);

      const { shipment } = await createShippingRates({
        order,
        returnLabel: true,
        returnToHeadquarters: query.return_to_headquarters,
      });

      const label = await EasyPost.Shipment.buy(shipment.id, shipment.lowestRate());
      await addTracking({ order, label, shipping_rate: label.selected_rate, isReturnTracking: true });

      return { label: label.postage_label.label_url };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  generate_csv_label_shipping_s: async params => {
    try {
      const order = await order_db.findById_orders_db(params.order_id);
      const shipment = await EasyPost.Shipment.retrieve(order?.shipping?.shipment_id);
      const csvData = parseOrderData(shipment, order);

      return csvData;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_pickup_shipping_s: async body => {
    const { readyTime, latestTimeAvailable, orderIds } = body;

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
      const orders = await Order.find({ _id: { $in: orderIds } });

      const shipmentIds = orders.map(order => order.shipping.shipment_id);
      const shipments = await Promise.all(shipmentIds.map(id => EasyPost.Shipment.retrieve(id)));
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
            .map(order => `${order.shipping.first_name} ${order.shipping.last_name}`)
            .join(", ")} Orders`,
          is_account_address: false,
          instructions: "Pick up on front porch please.",
          batch: batch,
        });
        return { pickup, orders };
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  confirm_pickup_shipping_s: async body => {
    const { pickupId, rateId, orders } = body;

    try {
      // Retrieve the pickup
      const pickup = await EasyPost.Pickup.retrieve(pickupId);

      // Find the rate in the pickup's rates
      const rate = pickup.pickup_rates.find(rate => rate.id === rateId);
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

  custom_shipping_rates_shipping_s: async body => {
    const { toShipping, fromShipping, parcel } = body;
    try {
      return await createCustomShippingRates({ toShipping, fromShipping, parcel });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },

  create_custom_label_shipping_s: async body => {
    const { selectedRateId, shipmentId } = body;
    try {
      return await EasyPost.Shipment.buy(shipmentId, selectedRateId);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};
