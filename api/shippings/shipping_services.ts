import invoice from "../../email_templates/pages/invoice";
import { order_db } from "../orders";
import { covertToOunces } from "./shipping_helpers";
import { addTracking, buyLabel, createLabel, createShippingRates, createTracker } from "./shipping_interactors";

const easy_post_api = require("@easypost/api");
const EasyPost = new easy_post_api(process.env.EASY_POST);

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
    console.log({ shipment_id, order_id });
    try {
      if (shipment_id) {
        const shipment = await EasyPost.Shipment.retrieve(shipment_id);
        return { shipment };
      } else {
        const order = await order_db.findById_orders_db(order_id);
        return await createShippingRates({ order: order, returnLabel: false });
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  buy_label_shipping_s: async (params: any) => {
    const order = await order_db.findById_orders_db(params.order_id);
    const { shipping_rate, shipment_id } = order.shipping;
    try {
      const label: any = await buyLabel({ shipment_id, shipping_rate, order });
      await addTracking({ order, label, shipping_rate });
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
      const label: any = await createLabel({ order, speed: params.speed });
      await addTracking({ order, label });
      return { invoice: invoice({ order }), label: label.postage_label.label_url };
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
      await addTracking({ order, label, isReturnTracking: true });

      return { label: label.postage_label.label_url };
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
