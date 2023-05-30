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
export const addTracking = async ({ label, order, isReturnTracking = false }: any) => {
  try {
    const tracker = await EasyPost.Tracker.retrieve(label.tracker.id);
    console.log({ tracker, label });

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
    }

    await order_db.update_orders_db(order._id, order);
  } catch (error) {
    console.log({ addTracking: error });
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
    const tracker = await EasyPost.Tracker.create({
      tracking_code: order.tracking_number,
      carrier: order.shipping.shipping_rate.carrier
    });

    if (order.shipping.shipping_rate.shipment_id) {
      const label = await EasyPost.Shipment.retrieve("shp_af853123c4184800a55b5293c8f76b6a");
      console.log({ label, id: order.shipping.shipping_rate.shipment_id });
      // Assume shipmentDate is the creation date of the shipment with shipment_id
      const shipmentDate = new Date(label.updated_at);

      // console.log({ shipmentDate });

      // Format shipmentDate to YYYY-MM-DD
      const formattedDate = shipmentDate.toISOString().split("T")[0];

      // console.log({ formattedDate });

      // Retrieve shipments created on the same day as shipment_id
      const { shipments } = await EasyPost.Shipment.all({
        start_datetime: `${formattedDate}T00:00:00Z`,
        end_datetime: `${formattedDate}T23:59:59Z`,
        purchased: true,
        page_size: 100 // Adjust this value as needed
      });
      // console.log({ shipments });

      // Find the correct shipment based on shipment_id
      const shipment = shipments.find((shipment: any) => shipment.id === order.shipping.shipping_rate.shipment_id);
      console.log({ shipment });

      if (shipment) {
        order.tracking_url = tracker.public_url;
        order.shipping.shipping_label = shipment.postage_label;
      }
    }

    order.shipping.shipment_tracker = tracker.id;
    order.tracking_url = tracker.public_url;
    // await order_db.update_orders_db(order._id, order);
    return tracker;
  } catch (error) {
    console.log("Error creating tracker:", error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

// export const createTracker = async ({ order }: any) => {
//   try {
//     const tracker = await EasyPost.Tracker.create({
//       tracking_code: order.tracking_number,
//       carrier: order.shipping.shipping_rate.carrier
//     });
//     if (order.shipping.shipping_rate.shipment_id) {
//       const label = await EasyPost.Shipment.retrieve(order.shipping.shipping_rate.shipment_id);

//       order.tracking_url = tracker.public_url;
//       order.shipping.shipping_label = label;
//     }
//     order.shipping.shipment_tracker = tracker.id;
//     order.tracking_url = tracker.public_url;
//     // await order_db.update_orders_db(order._id, order);
//     return tracker;
//   } catch (error) {
//     console.log("Error creating tracker:", error);
//     if (error instanceof Error) {
//       throw new Error(error.message);
//     }
//   }
// };
// export const createTracker = async ({ order }: any) => {
//   try {
//     const tracker = await EasyPost.Tracker.create({
//       tracking_code: order.tracking_number,
//       carrier: order.shipping.shipping_rate.carrier
//     });
//     if (order.shipping.shipping_rate.shipment_id) {
//       const shipment = await EasyPost.Shipment.retrieve(order.shipping.shipping_rate.shipment_id);
//       const { shipments } = await EasyPost.Shipment.all({
//         page_size: 20,
//         purchased: true,
//         start_datetime: new Date(shipment.created_at).setDate(new Date(shipment.created_at).getDate() - 1),
//         end_datetime: new Date(shipment.created_at).setDate(new Date(shipment.created_at).getDate() + 1)
//       });
//       console.log({ shipments });
//       // Find the shipment in the shipments array that matches the shipment.id
//       const label = shipments.find((shipment: any) => shipment.id === order.shipping.shipping_rate.shipment_id);
//       console.log({ label, postage_label: label });
//       order.tracking_url = tracker.public_url;
//       order.shipping.shipping_label = label;
//     }
//     order.shipping.shipment_tracker = tracker.id;
//     order.tracking_url = tracker.public_url;
//     // await order_db.update_orders_db(order._id, order);
//     return tracker;
//   } catch (error) {
//     console.log("Error creating tracker:", error);
//     if (error instanceof Error) {
//       throw new Error(error.message);
//     }
//   }
// };

export const refundLabel = async ({ order, is_return_tracking }: any) => {
  const refund = await EasyPost.Refund.create({
    carrier: order.shipping.shipping_rate.carrier,
    tracking_codes: [is_return_tracking ? order.return_tracking_number : order.tracking_number]
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
    const rate = shipment.rates.find((rate: any) => rate.service === shipping_rate.service && rate.carrier === shipping_rate.carrier);
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
      phone: config.PHONE_NUMBER
    };

    const returnAddress = {
      street1: config.PRODUCTION_ADDRESS,
      email: config.INFO_EMAIL,
      city: config.PRODUCTION_CITY,
      state: config.PRODUCTION_STATE,
      zip: config.PRODUCTION_POSTAL_CODE,
      country: config.PRODUCTION_COUNTRY,
      company: "Glow LEDs",
      phone: config.PHONE_NUMBER
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
    return { shipment, parcel };
  } catch (error) {
    console.log("Error creating rates:", error);
  }
};
