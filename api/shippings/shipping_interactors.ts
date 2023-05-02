import { order_db } from "../orders";
import { parcel_db } from "../parcels";
import { calculateTotalOunces, determine_parcel } from "./shipping_helpers";

const easy_post_api = require("@easypost/api");

export const buyLabel = async ({ shipment_id, shipping_rate, order }: any) => {
  const EasyPost = new easy_post_api(process.env.EASY_POST);
  try {
    const created_shipment = await EasyPost.Shipment.retrieve(shipment_id);
    console.log({ created_shipment, shipping_rate });
    return await created_shipment.buy(shipping_rate, 0);
  } catch (error) {
    console.error("Error buying label:", error); // Log the error for debugging purposes
    return createLabel({ speed: "first", order });
  }
};
export const addTracking = async ({ label, order }: any) => {
  const EasyPost = new easy_post_api(process.env.EASY_POST);
  try {
    const tracker = await EasyPost.Tracker.retrieve(label.tracker.id);
    console.log({ tracker });
    order.shipping.shipment_tracker = label.tracker.id;
    order.tracking_number = label.tracking_code;
    order.tracking_url = tracker.public_url;
    order.shipping.shipping_label = label;
    await order_db.update_orders_db(order._id, order);
  } catch (error) {
    // console.error("Error buying label:", error); // Log the error for debugging purposes
    // return createLabel({ speed: "first", order });
  }
};
export const addReturnTracking = async ({ label, order }: any) => {
  const EasyPost = new easy_post_api(process.env.EASY_POST);
  try {
    const tracker = await EasyPost.Tracker.retrieve(label.tracker.id);
    console.log({ tracker });
    order.shipping.return_shipment_tracker = label.tracker.id;
    order.return_tracking_url = tracker.public_url;
    order.return_tracking_number = label.tracking_code;
    order.shipping.return_shipping_label = label;
    await order_db.update_orders_db(order._id, order);
  } catch (error) {
    // console.error("Error buying label:", error); // Log the error for debugging purposes
    // return createLabel({ speed: "first", order });
  }
};

export const createLabel = async (body: any) => {
  const EasyPost = new easy_post_api(process.env.EASY_POST);
  const { order, speed } = body;
  console.log({ order, speed });

  const toAddress = new EasyPost.Address({
    name: order.shipping.first_name + " " + order.shipping.last_name,
    street1: order.shipping.address_1,
    street2: order.shipping.address_2,
    city: order.shipping.city,
    state: order.shipping.state,
    zip: order.shipping.postalCode,
    country: order.shipping.country,
    email: order.shipping.email
  });

  const fromAddress = new EasyPost.Address({
    street1: process.env.RETURN_ADDRESS,
    city: process.env.RETURN_CITY,
    state: process.env.RETURN_STATE,
    zip: process.env.RETURN_POSTAL_CODE,
    country: process.env.RETURN_COUNTRY,
    company: "Glow LEDs",
    phone: "906-284-2208",
    email: process.env.INFO_EMAIL
  });

  const weight = calculateTotalOunces(order.orderItems);
  const parcels = await parcel_db.findAll_parcels_db({ deleted: false }, {}, "0", "1");
  const parcel_size = determine_parcel(order.orderItems, parcels);
  const parcel = new EasyPost.Parcel({
    length: parcel_size.length,
    width: parcel_size.width,
    height: parcel_size.height,
    weight
  });

  let customsInfo = {};
  if (order.shipping.international) {
    const customs_items = order.orderItems.map((item: any) => {
      const customs_item = new EasyPost.CustomsItem({
        description: "3D Printed Accessories",
        quantity: item.qty,
        value: item.price,
        weight: item.weight,
        origin_country: "US"
      });
      return customs_item;
    });

    customsInfo = new EasyPost.CustomsInfo({
      eel_pfc: "NOEEI 30.37(a)",
      customs_certify: true,
      customs_signer: order.shipping.first_name + " " + order.shipping.last_name,
      contents_type: "merchandise",
      restriction_type: "none",
      non_delivery_option: "return",
      customs_items
    });
  }

  const saved_shipment = await EasyPost.Shipment.create({
    to_address: toAddress,
    from_address: fromAddress,
    parcel: parcel,
    customsInfo: order.shipping.international ? customsInfo : {},
    options: {
      commercial_invoice_letterhead: "IMAGE_1",
      commercial_invoice_signature: "IMAGE_2"
    }
  });
  const created_shipment = await EasyPost.Shipment.retrieve(saved_shipment.id);

  if (speed === "first") {
    return await created_shipment.buy(created_shipment.lowestRate(), 0);
  } else if (speed === "priority") {
    const rate = created_shipment.rates.find((rate: any) => rate.service === "Priority").id;
    return await created_shipment.buy(rate, 0);
  } else if (speed === "express") {
    const rate = created_shipment.rates.find((rate: any) => rate.service === "Express").id;
    return await created_shipment.buy(rate, 0);
  }
};
