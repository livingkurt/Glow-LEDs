import { determine_tracking_carrier } from "../../util";
import { order_db } from "../orders";
import { parcel_db } from "../parcels";
import { calculateTotalOunces, covertToOunces, determine_parcel } from "./shipping_helpers";

const easy_post_api = require("@easypost/api");
const EasyPost = new easy_post_api(process.env.EASY_POST);

export const buyLabel = async ({ shipment_id, shipping_rate, order }: any) => {
  console.log({ shipment_id, shipping_rate: shipping_rate.id });
  try {
    return await EasyPost.Shipment.buy(shipment_id, shipping_rate.id);
  } catch (error) {
    console.error("Error buying label:", error); // Log the error for debugging purposes
    return createLabel({ speed: "first", order });
  }
};
export const addTracking = async ({ label, order, shipping_rate, isReturnTracking = false }: any) => {
  console.log({ label, order, shipping_rate });
  try {
    const tracker = await EasyPost.Tracker.retrieve(label.tracker.id);
    console.log({ tracker });
    if (isReturnTracking) {
      order.shipping.return_shipment_tracker = label.tracker.id;
      order.return_tracking_url = tracker.public_url;
      order.return_tracking_number = label.tracking_code;
      order.shipping.return_shipping_label = label;
    } else {
      order.shipping.shipment_id = label.id;
      if (shipping_rate) {
        order.shipping.shipping_rate = shipping_rate;
      }
      order.shipping.shipment_tracker = label.tracker.id;
      order.tracking_number = label.tracking_code;
      order.tracking_url = tracker.public_url;
      order.shipping.shipping_label = label;
    }

    await order_db.update_orders_db(order._id, order);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    console.log("Error adding tracking:", error);
  }
};
export const createTracker = async ({ order }: any) => {
  try {
    const tracker = await EasyPost.Tracker.create({
      tracking_code: process.env.NODE_ENV === "production" ? order.tracking_number : "EZ1000000001",
      carrier: determine_tracking_carrier(order.tracking_number)
    });
    if (tracker.shipment_id) {
      const label = await EasyPost.Shipment.retrieve(tracker.shipment_id);
      console.log({ label });
      order.tracking_url = tracker.public_url;
      order.shipping.shipping_label = label;
    }
    order.shipping.shipment_tracker = tracker.id;
    order.tracking_url = tracker.public_url;
    await order_db.update_orders_db(order._id, order);
    return tracker;
  } catch (error) {
    console.log("Error creating tracker:", error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const createLabel = async (body: any) => {
  const { order, speed } = body;
  const { shipment } = await createShippingRates({ order, returnLabel: false });

  if (speed === "first") {
    return await EasyPost.Shipment.buy(shipment.id, shipment.lowestRate());
  } else if (speed === "priority") {
    const rate = shipment.rates.find((rate: any) => rate.service === "Priority").id;
    return await EasyPost.Shipment.buy(shipment.id, rate.id);
  } else if (speed === "express") {
    const rate = shipment.rates.find((rate: any) => rate.service === "Express").id;
    return await EasyPost.Shipment.buy(shipment.id, rate.id);
  }
};

export const refundLabel = async ({ order, is_return_tracking }: any) => {
  console.log({ order, is_return_tracking });
  const refund = await EasyPost.Refund.create({
    carrier: order.shipping.shipping_rate.carrier,
    tracking_codes: [is_return_tracking ? order.return_tracking_number : order.tracking_number]
  });
  console.log({ refund });
  if (refund) {
    if (is_return_tracking) {
      order.shipping.return_shipment_tracker = null;
      order.return_tracking_url = null;
      order.return_tracking_number = null;
      order.shipping.return_shipping_label = null;
    } else {
      order.shipping.shipment_id = null;
      order.shipping.shipping_rate = null;
      order.shipping.shipment_tracker = null;
      order.tracking_number = null;
      order.tracking_url = null;
      order.shipping.shipping_label = null;
    }
  }

  return await order_db.update_orders_db(order._id, order);
};

export const createShippingRates = async ({ order, returnLabel }: any) => {
  const parcels = await parcel_db.findAll_parcels_db({ deleted: false }, {}, "0", "1");
  const parcel = determine_parcel(order.orderItems, parcels);

  console.log({ order });

  const customerAddress = {
    verify: ["delivery"],
    name: `${order.shipping.first_name} ${order.shipping.last_name}`,
    street1: order.shipping.address_1,
    street2: order.shipping.address_2,
    city: order.shipping.city,
    state: order.shipping.state,
    zip: order.shipping.postalCode,
    country: order.shipping.country,
    phone: process.env.PHONE_NUMBER
  };

  const returnAddress = {
    street1: process.env.RETURN_ADDRESS,
    city: process.env.RETURN_CITY,
    state: process.env.RETURN_STATE,
    zip: process.env.RETURN_POSTAL_CODE,
    country: process.env.RETURN_COUNTRY,
    company: "Glow LEDs",
    phone: process.env.PHONE_NUMBER,
    email: process.env.INFO_EMAIL
  };

  const shipment = await EasyPost.Shipment.create({
    to_address: returnLabel ? returnAddress : customerAddress,
    from_address: returnLabel ? customerAddress : returnAddress,
    parcel: {
      length: parcel.length,
      width: parcel.width,
      height: parcel.height,
      weight: calculateTotalOunces(order.orderItems)
    },
    customs_info: {
      eel_pfc: "NOEEI 30.37(a)",
      customs_certify: true,
      customs_signer: order.shipping.first_name + " " + order.shipping.last_name,
      contents_type: "merchandise",
      restriction_type: "none",
      non_delivery_option: "return",
      customs_items: order.orderItems.map((item: any) => {
        return {
          description: "3D Printed Accessories",
          quantity: item.qty,
          value: item.price,
          weight: covertToOunces(item),
          origin_country: "US"
        };
      })
    },
    options: {
      commercial_invoice_letterhead: "IMAGE_1",
      commercial_invoice_signature: "IMAGE_2"
    }
  });
  console.log({ shipment });
  return { shipment, parcel };
};
