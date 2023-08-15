import config from "../../config";
import { determine_tracking_carrier } from "../../util";
import { order_db } from "../orders";
import { parcel_db } from "../parcels";
import { calculateTotalOunces, covertToOunces, determine_parcel } from "./shipping_helpers";

const easy_post_api = require("@easypost/api");
const EasyPost = new easy_post_api(config.EASY_POST);

export const buyLabel = async ({ shipment_id, shipping_rate, order }: any) => {
  try {
    const label = await EasyPost.Shipment.buy(shipment_id, shipping_rate?.id);
    await addTracking({ order, label, shipping_rate });
    return label;
  } catch (error) {
    console.error("Error buying label:", error);
    const label = await createLabel({ order, shipping_rate });
    await addTracking({ order, label, shipping_rate: label.selected_rate });
    return label;
  }
};
export const addTracking = async ({ label, order, shipping_rate, isReturnTracking = false }: any) => {
  try {
    const tracker = await EasyPost.Tracker.retrieve(label.tracker.id);

    if (isReturnTracking) {
      order.shipping.return_shipment_tracker = label.tracker.id;
      order.return_tracking_url = tracker.public_url;
      order.return_tracking_number = label.tracking_code;
      order.shipping.return_shipping_label = label;
    } else {
      order.shipping.shipment_tracker = label.tracker.id;
      order.tracking_number = label.tracking_code;
      order.tracking_url = tracker.public_url;
      order.shipping.shipping_label = label;
      order.shipping.shipping_rate = shipping_rate;
      order.shipping.shipment_id = label.id;
    }

    await order_db.update_orders_db(order._id, order);
  } catch (error) {
    console.error("Error adding tracking:", error);
  }
};
export const clearTracking = async ({ order, isReturnTracking = false }: any) => {
  try {
    if (isReturnTracking) {
      order.shipping.return_shipment_tracker = null;
      order.return_tracking_url = null;
      order.return_tracking_number = null;
      order.shipping.return_shipping_label = null;
    } else {
      order.shipping.shipment_tracker = null;
      order.tracking_number = null;
      order.tracking_url = null;
      order.shipping.shipping_label = null;
    }

    await order_db.update_orders_db(order._id, order);
  } catch (error) {}
};

export const createTracker = async ({ order }: any) => {
  try {
    const label = await EasyPost.Shipment.retrieve(order.shipping.shipment_id);
    const tracker = await EasyPost.Tracker.create({
      tracking_code: order.tracking_number,
      carrier: order.shipping?.shipping_rate?.carrier || label.selected_rate.carrier,
    });

    order.tracking_url = tracker.public_url;
    order.shipping.shipping_label = label;
    order.shipping.shipping_rate = order.shipping?.shipping_rate || label.selected_rate;
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

export const refundLabel = async ({ order, is_return_tracking }: any) => {
  const refund = await EasyPost.Refund.create({
    carrier: order.shipping.shipping_rate.carrier,
    tracking_codes: [is_return_tracking ? order.return_tracking_number : order.tracking_number],
  });
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

export const createLabel = async ({ order, shipping_rate }: any) => {
  try {
    const { shipment }: any = await createShippingRates({ order, returnLabel: false });
    const rate = shipment.rates.find(
      (rate: any) => rate.service === shipping_rate.service && rate.carrier === shipping_rate.carrier
    );
    return await EasyPost.Shipment.buy(shipment.id, rate.id);
  } catch (error) {
    console.error("Error create label:", error);
  }
};

export const createShippingRates = async ({ order, returnLabel }: any) => {
  try {
    const parcels = await parcel_db.findAll_parcels_db({ deleted: false }, {}, "0", "1");
    const parcel = determine_parcel(order.orderItems, parcels);

    const customerAddress = {
      verify: ["delivery"],
      email: order.shipping.email,
      name: `${order.shipping.first_name} ${order.shipping.last_name}`,
      street1: order.shipping.address_1,
      street2: order.shipping.address_2,
      city: order.shipping.city,
      state: order.shipping.state,
      zip: order.shipping.postalCode,
      country: order.shipping.country,
      phone: config.PHONE_NUMBER,
    };

    const returnAddress = {
      street1: config.PRODUCTION_ADDRESS,
      email: config.INFO_EMAIL,
      city: config.PRODUCTION_CITY,
      state: config.PRODUCTION_STATE,
      zip: config.PRODUCTION_POSTAL_CODE,
      country: config.PRODUCTION_COUNTRY,
      company: "Glow LEDs",
      phone: config.PHONE_NUMBER,
    };

    const shipment = await EasyPost.Shipment.create({
      to_address: returnLabel ? returnAddress : customerAddress,
      from_address: returnLabel ? customerAddress : returnAddress,
      parcel: {
        length: parcel.length,
        width: parcel.width,
        height: parcel.height,
        weight: calculateTotalOunces(order.orderItems),
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
            origin_country: "US",
          };
        }),
      },
      options: {
        commercial_invoice_letterhead: "IMAGE_1",
        commercial_invoice_signature: "IMAGE_2",
      },
    });
    console.log({ shipment, parcel });
    return { shipment, parcel };
  } catch (error) {
    console.log("Error creating rates:", error);
  }
};

export const createCustomShippingRates = async ({ toShipping, fromShipping, parcel }: any) => {
  try {
    const shipment = await EasyPost.Shipment.create({
      to_address: {
        verify: ["delivery"],
        email: toShipping.email,
        company: toShipping.company,
        name: `${toShipping.first_name} ${toShipping.last_name}`,
        street1: toShipping.address_1,
        street2: toShipping.address_2,
        city: toShipping.city,
        state: toShipping.state,
        zip: toShipping.postalCode,
        country: toShipping.country,
        phone: toShipping.phone,
      },
      from_address: {
        email: fromShipping.email,
        company: fromShipping.company,
        name: `${fromShipping.first_name} ${fromShipping.last_name}`,
        street1: fromShipping.address_1,
        street2: fromShipping.address_2,
        city: fromShipping.city,
        state: fromShipping.state,
        zip: fromShipping.postalCode,
        country: fromShipping.country,
        phone: fromShipping.phone,
      },
      parcel: {
        length: parcel.length,
        width: parcel.width,
        height: parcel.height,
        weight: covertToOunces({ weight_pounds: parcel.weight_pounds, weight_ounces: parcel.weight_ounces }),
      },
      options: {
        commercial_invoice_letterhead: "IMAGE_1",
        commercial_invoice_signature: "IMAGE_2",
      },
    });
    console.log({ shipment, parcel });
    return { shipment, parcel };
  } catch (error) {
    console.log("Error creating rates:", error);
  }
};
