// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

import App from "./App";
import {
  account_created,
  affiliate,
  announcement,
  contact,
  contact_confirmation,
  feature,
  order,
  successful_password_reset,
  review,
  email_subscription,
  order_status,
  custom_contact,
  code_used,
  shipping_status,
  verify_email_password_reset,
  affiliate_onboard,
} from "./pages";
import express from "express";
import invoice from "./pages/invoice";
import { order_db, order_services } from "../api/orders";
import { content_db } from "../api/contents";
import { affiliate_db } from "../api/affiliates";
import { promo_db } from "../api/promos";
import { months } from "../utils/util";
import { user_db } from "../api/users";
import { determine_status } from "../api/emails/email_interactors";
import { email_db } from "../api/emails";
import { paycheck_db } from "../api/paychecks";
import current_stock from "./pages/current_stock";
import { product_db } from "../api/products";
import config from "../config";
import mongoose from "mongoose";
import verify from "./pages/verify";
import { domain } from "./email_template_helpers";
import paycheck from "./pages/paycheck";
import ticketEmail from "./pages/ticketEmail";
const router = express.Router();

router.get("/email_subscription", async (req, res) => {
  const contents = await content_db.findAll_contents_db({ deleted: false }, { _id: -1 }, "0", "1");
  const body = {
    email: config.CONTACT_EMAIL,
    promo_code: "xoteag",
    categories: contents && contents[0].home_page?.slideshow,
  };

  res.send(
    App({
      body: email_subscription({
        ...body,
        title: "Enjoy 10% off your next purchase!",
      }),
      unsubscribe: true,
    })
  );
});
router.get("/verify", async (req, res) => {
  const user = await user_db.findById_users_db("6379a4497212b9524b2a49b2");

  res.send(
    App({
      body: verify({
        title: "Verify your Email",
        url: `${domain()}/verify/123456`,
        user: user,
      }),

      unsubscribe: false,
    })
  );
});
router.get("/refund", async (req, res) => {
  const data = await order_db.findById_orders_db("625646bf3b0e10057d288e9b");
  // const data = await Order.findOne({ _id: "625644ee81243b01b485d360" })
  //   .populate("user")
  //   .populate("orderItems.product")
  //   .populate("orderItems.secondary_product");

  const body = {
    email: {
      show_image: true,
      active: true,
      deleted: false,
      email_type: "Order",
      h1: "Partial Refund Successful!",
      image: "",
      h2: "Your Order has been refunded for Duplicate Order on 12/10/2021",
      createdAt: "2020-11-19T16:24:12.273Z",
      updatedAt: "2021-07-06T18:52:09.037Z",
      images: [],
      p: "",
    },

    title: "Thank you for your purchase!",
    order: data,
  };
  res.send(App({ body: order(body), unsubscribe: false }));
});
router.get("/current_stock", async (req, res) => {
  const data = await product_db.current_stock_products_db();
  res.send(App({ body: current_stock(data) }));
});
router.get("/affiliate_onboard", async (req, res) => {
  const data = await user_db.findById_users_db("6527c4d2563238af50ee33aa");
  res.send(affiliate_onboard(data));
});
router.get("/code_used", async (req, res) => {
  const promo_code = "cosmo";
  const date = new Date();
  const monthNumber = date.getMonth();
  const year = date.getFullYear();
  const promo = await promo_db.findBy_promos_db({ promo_code, deleted: false });
  const affiliate = await affiliate_db.findBy_affiliates_db({ public_code: promo?._id, deleted: false });
  const stats = await order_services.affiliate_code_usage_orders_s(
    { promo_code },
    {
      month: months[monthNumber].toLowerCase(),
      year: year,
    }
  );

  res.send(
    App({
      body: code_used({
        affiliate,
        number_of_uses: stats.number_of_uses,
        earnings: affiliate?.sponsor ? stats.revenue * 0.15 : stats.revenue * 0.1,
      }),
      title: "Welcome to the Team!",
    })
  );
});
router.get("/paycheck", async (req, res) => {
  const paycheckDocument = await paycheck_db.findById_paychecks_db("656bc32d9701b7f4b9b9bd43");
  console.log({ paycheckDocument });

  res.send(App({ body: paycheck(paycheckDocument), unsubscribe: false }));
});
router.get("/order", async (req, res) => {
  const orderDocument = await order_db.findById_orders_db("64a11a605157930002f3eb94");
  const body = {
    email: {
      show_image: true,
      active: true,
      deleted: false,
      email_type: "Order",
      h1: "Thank you for your purchase!",
      image: "",
      h2: "we are starting production on your order. We will notify your as your order progresses.",
      createdAt: "2020-11-19T16:24:12.273Z",
      updatedAt: "2021-07-06T18:52:09.037Z",
      images: [],
      p: "",
    },

    title: "Thank you for your purchase!",
    order: orderDocument,
  };
  res.send(App({ body: order(body), unsubscribe: false }));
});
router.get("/ticket", async (req, res) => {
  const orderDocument = await order_db.findById_orders_db("66df079b45e19055855ce506");
  const body = {
    "email": {
      "h1": "Your Event Tickets",
      "h2": "Here are your QR codes for event entry.",
    },
    "order": {
      "shipping": {
        "first_name": "Kurt",
        "last_name": "LaVacque",
        "email": "siqymufo@pelagius.net",
        "address_1": "222 Gibson Lake Rd",
        "address_2": "",
        "city": "Crystal Falls",
        "state": "MI",
        "postalCode": "49920",
        "international": false,
        "country": "US",
      },
      "payment": {
        "refund": [],
        "refund_reason": [],
        "paymentMethod": "stripe",
        "payment": {},
        "charge": {},
      },
      "_id": "66df079b45e19055855ce506",
      "user": {
        "shipping": {},
        "_id": "6379a4497212b9524b2a49b2",
        "isAdmin": true,
        "isVerified": true,
        "is_affiliated": true,
        "is_employee": true,
        "palettes": [],
        "email_subscription": true,
        "deleted": false,
        "first_name": "Admin",
        "last_name": "test",
        "email": "admin@test.com",
        "password": "$2a$10$z99KsjpQmtQ.jzm0jsmtJu0eWHIkAMk3iNMvYbQbKAlHJBmuZjZzW",
        "createdAt": "2022-11-20T03:51:37.402Z",
        "updatedAt": "2024-08-24T15:52:07.917Z",
        "__v": 1,
        "guest": true,
        "cart": "642c3f469216481ed2708a92",
        "affiliate": "648626f7ad972f000246e9a8",
        "isWholesaler": false,
      },
      "orderItems": [{}, {}],
      "itemsPrice": 60,
      "taxPrice": 3.5999999999999996,
      "shippingPrice": 0,
      "totalPrice": 63.6,
      "status": "paid",
      "isReassured": false,
      "isRefunded": false,
      "isUpdated": true,
      "isPrintIssue": false,
      "isPaused": false,
      "isError": false,
      "isPrioritized": false,
      "guest": false,
      "parcel": null,
      "order_note": "",
      "production_note": "",
      "tip": 0,
      "promo_code": "",
      "is_error": false,
      "deleted": false,
      "messages": [],
      "payments": [],
      "refunds": [],
      "change_log": [{}],
      "createdAt": "2024-09-09T14:35:07.709Z",
      "updatedAt": "2024-09-09T17:28:22.028Z",
      "__v": 0,
      "paidAt": "2024-09-09T14:35:10.265Z",
    },
    "ticketQRCodes": [
      {
        "ticketType": "Space City Gloving Competition - Competitor Experience Pass",
        "qrCode":
          "data:image/png;base64,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",
      },
      {
        ticketType: "Space City Gloving Competition - Spectator Experience Pass",
        qrCode:
          "data:image/png;base64,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",
      },
    ],
  };

  res.send(App({ body: ticketEmail(body), unsubscribe: false }));
});
router.get("/order_status", async (req, res) => {
  const orderDocument = await order_db.findById_orders_db("659cd96631c5c5730673e47b");
  const body = {
    email: {
      show_image: true,
      active: true,
      deleted: false,
      email_type: "Order",
      h1: "Thank you for your purchase!",
      image: "",
      h2: "your shipment is on the way! Track your shipment to see the delivery status.",
      createdAt: "2020-11-19T16:24:12.273Z",
      updatedAt: "2021-07-06T18:52:09.037Z",
      images: [],
      p: "",
    },

    title: "Thank you for your purchase!",
    status: "shipped",
    order: orderDocument,
  };
  res.send(App({ body: order_status(body), unsubscribe: false }));
});
router.get("/shipping_status", async (req, res) => {
  const orderDocument = await order_db.findById_orders_db("64a11a605157930002f3eb94");
  const body = {
    email: {},
    status: "out_for_delivery",
    title: determine_status("out_for_delivery"),
    order: orderDocument,
  };
  res.send(App({ body: shipping_status(body), unsubscribe: false }));
});
router.get("/invoice", async (req, res) => {
  const orderDocument = await order_db.findById_orders_db("61ba8e67b71be7002b7ccf3f");
  const body = {
    email: {
      show_image: true,
      active: true,
      deleted: false,
      email_type: "Order",
      h1: "Thank you for your purchase!",
      image: "",
      h2: "we are starting production on your order. We will notify your as your order progresses.",
      createdAt: "2020-11-19T16:24:12.273Z",
      updatedAt: "2021-07-06T18:52:09.037Z",
      images: [],
      p: "",
    },

    title: "Thank you for your purchase!",
    order: orderDocument,
  };
  res.send(invoice(body));
});

router.get("/shipping_status", async (req, res) => {
  const body = {
    email: {},
    status: "out_for_delivery",
    title: determine_status("out_for_delivery"),
    order: {
      _id: "61b2e51ca58ea5002bbb6de1",
      payment: {
        paymentMethod: "stripe",
        charge: {
          id: "pi_3K51dBHHW1jy2HDN0NIxElzd",
          object: "payment_intent",
          amount: 5850,
          amount_capturable: 0,
          amount_received: 5850,
          application: null,
          application_fee_amount: null,
          automatic_payment_methods: null,
          canceled_at: null,
          cancellation_reason: null,
          capture_method: "automatic",
          charges: {
            object: "list",
            data: [
              {
                id: "ch_3K51dBHHW1jy2HDN0zGwM35V",
                object: "charge",
                amount: 5850,
                amount_captured: 5850,
                amount_refunded: 0,
                application: null,
                application_fee: null,
                application_fee_amount: null,
                balance_transaction: "txn_3K51dBHHW1jy2HDN02OfkkJN",
                billing_details: {
                  address: {
                    city: null,
                    country: null,
                    line1: null,
                    line2: null,
                    postal_code: "94002",
                    state: null,
                  },
                  email: null,
                  name: null,
                  phone: null,
                },
                calculated_statement_descriptor: "GLOW-LEDS",
                captured: true,
                created: 1639114013,
                currency: "usd",
                customer: null,
                description: null,
                destination: null,
                dispute: null,
                disputed: false,
                failure_code: null,
                failure_message: null,
                invoice: null,
                livemode: true,
                on_behalf_of: null,
                order: null,
                outcome: {
                  network_status: "approved_by_network",
                  reason: null,
                  risk_level: "normal",
                  seller_message: "Payment complete.",
                  type: "authorized",
                },
                paid: true,
                payment_intent: "pi_3K51dBHHW1jy2HDN0NIxElzd",
                payment_method: "pm_1K51d9HHW1jy2HDNAioTrUSE",
                payment_method_details: {
                  card: {
                    brand: "visa",
                    checks: {
                      address_line1_check: null,
                      address_postal_code_check: "pass",
                      cvc_check: "pass",
                    },
                    country: "US",
                    exp_month: 1,
                    exp_year: 2024,
                    fingerprint: "pIBF9FhjiGh0i1qN",
                    funding: "credit",
                    installments: null,
                    last4: "7823",
                    network: "visa",
                    three_d_secure: null,
                    wallet: null,
                  },
                  type: "card",
                },
                receipt_email: null,
                receipt_number: null,
                receipt_url:
                  "https://pay.stripe.com/receipts/acct_1I5NG5HHW1jy2HDN/ch_3K51dBHHW1jy2HDN0zGwM35V/rcpt_KkWgJdvPmR8ktAuNJdk3xV1HQuSTBe6",
                refunded: false,
                refunds: {
                  object: "list",
                  data: [],
                  has_more: false,
                  total_count: 0,
                  url: "/v1/charges/ch_3K51dBHHW1jy2HDN0zGwM35V/refunds",
                },
                review: null,
                shipping: null,
                source: null,
                source_transfer: null,
                statement_descriptor: null,
                statement_descriptor_suffix: null,
                status: "succeeded",
                transfer_data: null,
                transfer_group: null,
              },
            ],
            has_more: false,
            total_count: 1,
            url: "/v1/charges?payment_intent=pi_3K51dBHHW1jy2HDN0NIxElzd",
          },
          client_secret: "pi_3K51dBHHW1jy2HDN0NIxElzd_secret_5pObVIZ80Sk2JeLYbM67P1rsj",
          confirmation_method: "automatic",
          created: 1639114013,
          currency: "usd",
          customer: null,
          description: null,
          invoice: null,
          last_payment_error: null,
          livemode: true,
          next_action: null,
          on_behalf_of: null,
          payment_method: "pm_1K51d9HHW1jy2HDNAioTrUSE",
          payment_method_options: {
            card: {
              installments: null,
              network: null,
              request_three_d_secure: "automatic",
            },
          },
          payment_method_types: ["card"],
          receipt_email: null,
          review: null,
          setup_future_usage: null,
          shipping: null,
          source: null,
          statement_descriptor: null,
          statement_descriptor_suffix: null,
          status: "succeeded",
          transfer_data: null,
          transfer_group: null,
        },
      },
      guest: false,
      status: "shipped",
      isReassured: false,
      isRefunded: false,
      deleted: false,
      tracking_number: "9400136109361125191918",
      orderItems: [
        {
          reviewed: false,
          _id: "61b2e51ca58ea5002bbb6de2",
          product: "617882d6bf66b4002ba730b9",
          color_product: "610b287e45c76d002a6e5a5f",
          color_group_name: "Skin Color",
          secondary_color_group_name: "Sled Color",
          secondary_color_product: "610b33fe45c76d002a6e5da8",
          option_group_name: "Set of",
          option_product: "60efd85ee0d9c44c752a5762",
          option_product_name: "Alt Novaskinz - 2",
          secondary_product: null,
          secondary_product_name: "",
          secondary_group_name: "Style",
          name: "Alt Novaskinz w Nano Sleds",
          size: "2",
          color: "Clear",
          color_code: "#4b4b4b",
          secondary_color: "Clear",
          secondary_color_code: "#4b4b4b",
          display_image: "https://thumbs2.imgbox.com/01/81/xlAMpqaO_t.jpeg",
          secondary_image: "",
          price: 12.99,
          sale_price: 10.392,
          count_in_stock: 29,
          weight_pounds: 0,
          weight_ounces: 0.4,
          package_length: 4,
          package_width: 3,
          package_height: 0.75,
          package_volume: 9,
          pathname: "alt_novaskinz_w_nano_sleds",
          subcategory: "alt_novaskinz",
          category: "glowskinz",
          quantity: 2,
          createdAt: "2021-12-10T18:10:35.464Z",
          updatedAt: "2021-12-10T18:10:35.464Z",
        },
        {
          reviewed: false,
          _id: "61b2e51ca58ea5002bbb6de3",
          product: "61a93b4c914391295a264f8d",
          color_product: "60ee99183a3c5e002ac7989b",
          secondary_color_product: null,
          option_group_name: "Size",
          option_product: "61a99f1f8c53cb002b372c59",
          option_product_name: "Supreme Gloves - XL",
          secondary_product: null,
          secondary_product_name: "",
          secondary_group_name: "",
          name: "Supremes",
          size: "XL",
          color: "White",
          color_code: "black",
          secondary_color_code: "",
          display_image: "https://thumbs2.imgbox.com/9c/5d/vjBlyZT8_t.jpeg",
          secondary_image: "",
          price: 3.95,
          preorder: false,
          sale_price: 0,
          count_in_stock: 200,
          weight_pounds: 0,
          weight_ounces: 3.3,
          package_length: 7,
          package_width: 6,
          package_height: 0.75,
          package_volume: 31.5,
          pathname: "supremes",
          subcategory: "singles",
          category: "gloves",
          quantity: 1,
          createdAt: "2021-12-10T18:10:35.464Z",
          updatedAt: "2021-12-10T18:10:35.464Z",
        },
        {
          reviewed: false,
          _id: "61b2e51ca58ea5002bbb6de4",
          product: "61a93b4c914391295a264f8d",
          color_product: "60ee99183a3c5e002ac7989b",
          secondary_color_product: null,
          option_group_name: "Size",
          option_product: "61a99ec48c53cb002b3729b4",
          option_product_name: "Supreme Gloves - L",
          secondary_product: null,
          secondary_product_name: "",
          secondary_group_name: "",
          name: "Supremes",
          size: "L",
          color: "White",
          color_code: "black",
          secondary_color_code: "",
          display_image: "https://thumbs2.imgbox.com/9c/5d/vjBlyZT8_t.jpeg",
          secondary_image: "",
          price: 3.95,
          preorder: false,
          sale_price: 0,
          count_in_stock: 200,
          weight_pounds: 0,
          weight_ounces: 3.3,
          package_length: 7,
          package_width: 6,
          package_height: 0.75,
          package_volume: 31.5,
          pathname: "supremes",
          subcategory: "singles",
          category: "gloves",
          quantity: 1,
          createdAt: "2021-12-10T18:10:35.464Z",
          updatedAt: "2021-12-10T18:10:35.464Z",
        },
        {
          reviewed: false,
          _id: "61b2e51ca58ea5002bbb6de5",
          product: "60e158d4e615fa002a6c2de4",
          color_product: "60ee99183a3c5e002ac7989b",
          secondary_color_product: null,
          option_group_name: "Set of",
          option_product: "60eff41c983ca35495453b3d",
          option_product_name: "Bulk CR1225 Batteries - 80",
          secondary_product: null,
          secondary_product_name: "",
          name: "Bulk CR1225 Batteries",
          size: "80",
          color_code: "black",
          secondary_color_code: "",
          display_image: "https://thumbs2.imgbox.com/b2/c2/E9E1r1KW_t.jpeg",
          secondary_image: "",
          price: 9.99,
          preorder: false,
          sale_price: 0,
          count_in_stock: 29,
          weight_pounds: 0,
          weight_ounces: 3,
          package_length: 6,
          package_width: 5,
          package_height: 0.24,
          package_volume: 7.2,
          pathname: "1225_batteries",
          subcategory: "batteries",
          category: "accessories",
          quantity: 1,
          createdAt: "2021-12-10T18:10:35.464Z",
          updatedAt: "2021-12-10T18:10:35.464Z",
        },
      ],
      user: "61b043ba7abb88002bde770e",
      shipping: {
        first_name: "Alexander",
        last_name: "Holland",
        email: "misterkrocks@gmail.com",
        address_1: "2128 Lyon Ave",
        address_2: "",
        city: "Belmont",
        state: "CA",
        postalCode: "94002",
        country: "US",
        international: false,
        shipment_id: "shp_4f7dd086cfe248b284e0cdca115a4297",
        shipping_rate: {
          id: "rate_1faa456b75cb4d0b94914c2ca6c37f5c",
          object: "Rate",
          created_at: "2021-12-10T05:23:41Z",
          updated_at: "2021-12-10T05:23:41Z",
          mode: "production",
          service: "First",
          carrier: "USPS",
          rate: "4.83",
          currency: "USD",
          retail_rate: "6.15",
          retail_currency: "USD",
          list_rate: "4.83",
          list_currency: "USD",
          delivery_days: 3,
          delivery_date: null,
          delivery_date_guaranteed: false,
          est_delivery_days: 3,
          shipment_id: "shp_4f7dd086cfe248b284e0cdca115a4297",
          carrier_account_id: "ca_945306ac434f4c5baa70e5d9eb9db72c",
        },
      },
      itemsPrice: 39.483,
      taxPrice: 2.8625175,
      shippingPrice: 6.15,
      totalPrice: 58.4955175,
      order_note:
        "PLEASE MAKE MY SLEDS THE DUAL CHIP ONES WE DISCUSSED FOR THE EMAZING EVOS. :)     HIT ME UP WITH FURSTHER QUESTIONS, COMMENTS, CONCERNS. THANK YOU MUCH!",
      production_note: "",
      promo_code: "SNAPS",
      parcel: "60c25b1575b455002a999820",
      paidAt: "2021-12-10T05:26:55.084Z",
      createdAt: "2021-12-10T05:26:52.608Z",
      updatedAt: "2021-12-10T18:11:04.643Z",
      __v: 0,
      refundedAt: "2021-12-10T18:10:35.453Z",
    },
    tracker: {
      id: "trk_2c0254b7684747f2a5c6affc3a2a4b5e",
      object: "Tracker",
      mode: "test",
      tracking_code: "9400100106089169501138",
      status: "out_for_delivery",
      status_detail: "out_for_delivery",
      created_at: "2023-01-10T02:40:38Z",
      updated_at: "2023-01-10T02:42:39Z",
      signed_by: null,
      weight: null,
      est_delivery_date: "2023-01-10T02:42:39Z",
      shipment_id: "shp_91a84de6b49c43eaa62fe3e28c44adf2",
      carrier: "USPS",
      tracking_details: [
        {
          object: "TrackingDetail",
          message: "Pre-Shipment Info Sent to USPS",
          description: null,
          status: "pre_transit",
          status_detail: "status_update",
          datetime: "2022-12-10T02:42:39Z",
          source: "USPS",
          carrier_code: null,
          tracking_location: {
            object: "TrackingLocation",
            city: null,
            state: null,
            country: null,
            zip: null,
          },
        },
        {
          object: "TrackingDetail",
          message: "Shipping Label Created",
          description: null,
          status: "pre_transit",
          status_detail: "status_update",
          datetime: "2022-12-10T15:19:39Z",
          source: "USPS",
          carrier_code: null,
          tracking_location: {
            object: "TrackingLocation",
            city: "HOUSTON",
            state: "TX",
            country: null,
            zip: "77063",
          },
        },
        {
          object: "TrackingDetail",
          message: "Arrived at USPS Origin Facility",
          description: null,
          status: "in_transit",
          status_detail: "arrived_at_facility",
          datetime: "2022-12-11T01:24:39Z",
          source: "USPS",
          carrier_code: null,
          tracking_location: {
            object: "TrackingLocation",
            city: "NORTH HOUSTON",
            state: "TX",
            country: null,
            zip: "77315",
          },
        },
        {
          object: "TrackingDetail",
          message: "Arrived at USPS Facility",
          description: null,
          status: "in_transit",
          status_detail: "arrived_at_facility",
          datetime: "2022-12-12T03:00:39Z",
          source: "USPS",
          carrier_code: null,
          tracking_location: {
            object: "TrackingLocation",
            city: "COLUMBIA",
            state: "SC",
            country: null,
            zip: "29201",
          },
        },
        {
          object: "TrackingDetail",
          message: "Arrived at Post Office",
          description: null,
          status: "in_transit",
          status_detail: "arrived_at_facility",
          datetime: "2022-12-12T05:51:39Z",
          source: "USPS",
          carrier_code: null,
          tracking_location: {
            object: "TrackingLocation",
            city: "CHARLESTON",
            state: "SC",
            country: null,
            zip: "29407",
          },
        },
        {
          object: "TrackingDetail",
          message: "Sorting Complete",
          description: null,
          status: "in_transit",
          status_detail: "status_update",
          datetime: "2022-12-12T11:31:39Z",
          source: "USPS",
          carrier_code: null,
          tracking_location: {
            object: "TrackingLocation",
            city: "CHARLESTON",
            state: "SC",
            country: null,
            zip: "29407",
          },
        },
        {
          object: "TrackingDetail",
          message: "Out for Delivery",
          description: null,
          status: "out_for_delivery",
          status_detail: "out_for_delivery",
          datetime: "2022-12-12T11:41:39Z",
          source: "USPS",
          carrier_code: null,
          tracking_location: {
            object: "TrackingLocation",
            city: "CHARLESTON",
            state: "SC",
            country: null,
            zip: "29407",
          },
        },
      ],
    },
  };
  res.send(App({ body: shipping_status(body), unsubscribe: false }));
});
router.get("/review", async (req, res) => {
  const contents = await content_db.findAll_contents_db({ deleted: false }, { _id: -1 }, "0", "1");
  const body = {
    email: config.CONTACT_EMAIL,
    promo_code: "xoteag",
    categories: contents && contents[0].home_page?.slideshow,
  };

  res.send(App({ body: review(body), title: "Enjoy 10% off your next purchase!" }));
});
router.get("/affiliate", async (req, res) => {
  const body = {
    affiliate: {
      _id: "5f6a57dbf04766002a52230e",
      active: true,
      deleted: false,
      artist_name: "Cosmo",
      instagram_handle: "cosmoglover",
      facebook_name: "cosmoglover",
      percentage_off: 30,
      promo_code: "cosmo",
      createdAt: "2020-09-22T20:00:27.101Z",
      updatedAt: "2022-01-10T20:58:07.152Z",
      __v: 0,
      promoter: false,
      sponsor: true,
      user: "5f6a7891f8bfc0002ab4904b",
      picture: "https://thumbs2.imgbox.com/f7/ca/Su3FEQr9_t.jpg",
      bio: "I'm here for the flow.  Gaming, Magic the Gathering, Poi",
      inspiration: "Stunna, Flowsonn, Megasloth, Puppet",
      location: "Baytown, TX",
      years: "9",
      team: true,
      video: "k5GRzQ8683w",
      products: [
        "5f610da07279cf002a073d89",
        "5eb1eb29094a5e002a417d0a",
        "5f90e245454528002af7df4a",
        "5f90e21b454528002af7df42",
        "605008e3d2946c002a82c293",
        "5ff882654cb3b7002a667747",
        "5f90e202454528002af7df30",
        "600722965510ff002aceaeb0",
      ],
      chips: [],
      pathname: "cosmo",
      private_code: {
        _id: "5f6a5a82f04766002a522310",
        excluded_categories: [],
        excluded_products: [],
        active: true,
        deleted: false,
        promo_code: "xcpwtv",
        for_customer: false,
        percentage_off: 50,
        createdAt: "2020-09-22T20:11:46.431Z",
        updatedAt: "2021-07-02T00:41:15.084Z",
        __v: 0,
        user: "5f6a7891f8bfc0002ab4904b",
        minimum_total: null,
        admin_only: false,
        affiliate_only: true,
        used_once: false,
        free_shipping: true,
      },
      public_code: {
        _id: "5f6a57ebf04766002a52230f",
        excluded_categories: [],
        excluded_products: [],
        active: true,
        deleted: false,
        promo_code: "cosmo",
        for_customer: true,
        percentage_off: 10,
        createdAt: "2020-09-22T20:00:43.566Z",
        updatedAt: "2021-12-09T03:40:49.329Z",
        __v: 0,
        minimum_total: 0,
        admin_only: false,
        affiliate_only: false,
        used_once: true,
        end_date: "2021-01-01T00:00:00.000Z",
        start_date: "2021-01-01T00:00:00.000Z",
        included_categories: [],
        included_products: [],
        sponsor_only: false,
      },
      venmo: "@joseph-conner-12",
    },
  };

  res.send(App({ body: affiliate(body), title: "Welcome to the Team!" }));
});
router.get("/feature", async (req, res) => {
  const body = {
    feature: {
      _id: "609013742c7976002ad6f8b3",
      images: [],
      deleted: false,
      user: "60243f3bfe97542f0f15d668",
      artist_name: "lilwhip ",
      instagram_handle: "lilwhip_gloving ",
      facebook_name: "Dylan Arrazati",
      email: "arraz100@mail.chapman.edu",
      first_name: "Dylan",
      last_name: "Arrazati",
      song_id: "Song: Schedules, Artist: David Cutter Music ",
      link: "https://youtu.be/AHfQ2U5Gg4E",
      video: "QoagvTQgsJ8",
      description:
        "My name is Dylan Arrazati, but I go by lilwhip in the gloving community. I’m about to graduate with a bachelors in biochemistry and Spanish so that’s exciting. I also just hit the one year mark of my gloving journey, and I’m so excited to continue growing as a glover:) In the video I’m sharing, I’m using the frosted glowskinz for my atoms🙌🏼 I also have them for my spectras and both sets of skinz work amazing. ",
      pathname: "lilwhip _glovers_945",
      category: "glovers",
      createdAt: "2021-05-03T15:15:00.977Z",
      updatedAt: "2021-05-13T02:36:44.136Z",
      __v: 0,
      release_date: "2021-05-12T00:00:00.000Z",
    },
  };
  res.send(App({ body: feature(body), title: "Thank you for sending us your art!" }));
});
router.get("/announcement", async (req, res) => {
  const email = await email_db.findAll_emails_db({ deleted: false, active: true }, { _id: -1 }, "1", "1");

  res.send(
    App({
      body: announcement(email[0]),
      header_footer_color: email[0].header_footer_color,
      background_color: email[0].background_color,
    })
  );
});

router.get("/contact", (req, res) => {
  res.send(contact(req.body));
});
router.get("/custom_contact", (req, res) => {
  const data = {
    first_name: "Kurt",
    last_name: "LaVacque",
    email: "lavacquek@icloud.com",
    order: {
      _id: "61b2e51ca58ea5002bbb6de1",
      payment: {
        paymentMethod: "stripe",
        charge: {
          id: "pi_3K51dBHHW1jy2HDN0NIxElzd",
          object: "payment_intent",
          amount: 5850,
          amount_capturable: 0,
          amount_received: 5850,
          application: null,
          application_fee_amount: null,
          automatic_payment_methods: null,
          canceled_at: null,
          cancellation_reason: null,
          capture_method: "automatic",
          charges: {
            object: "list",
            data: [
              {
                id: "ch_3K51dBHHW1jy2HDN0zGwM35V",
                object: "charge",
                amount: 5850,
                amount_captured: 5850,
                amount_refunded: 0,
                application: null,
                application_fee: null,
                application_fee_amount: null,
                balance_transaction: "txn_3K51dBHHW1jy2HDN02OfkkJN",
                billing_details: {
                  address: {
                    city: null,
                    country: null,
                    line1: null,
                    line2: null,
                    postal_code: "94002",
                    state: null,
                  },
                  email: null,
                  name: null,
                  phone: null,
                },
                calculated_statement_descriptor: "GLOW-LEDS",
                captured: true,
                created: 1639114013,
                currency: "usd",
                customer: null,
                description: null,
                destination: null,
                dispute: null,
                disputed: false,
                failure_code: null,
                failure_message: null,
                invoice: null,
                livemode: true,
                on_behalf_of: null,
                order: null,
                outcome: {
                  network_status: "approved_by_network",
                  reason: null,
                  risk_level: "normal",
                  seller_message: "Payment complete.",
                  type: "authorized",
                },
                paid: true,
                payment_intent: "pi_3K51dBHHW1jy2HDN0NIxElzd",
                payment_method: "pm_1K51d9HHW1jy2HDNAioTrUSE",
                payment_method_details: {
                  card: {
                    brand: "visa",
                    checks: {
                      address_line1_check: null,
                      address_postal_code_check: "pass",
                      cvc_check: "pass",
                    },
                    country: "US",
                    exp_month: 1,
                    exp_year: 2024,
                    fingerprint: "pIBF9FhjiGh0i1qN",
                    funding: "credit",
                    installments: null,
                    last4: "7823",
                    network: "visa",
                    three_d_secure: null,
                    wallet: null,
                  },
                  type: "card",
                },
                receipt_email: null,
                receipt_number: null,
                receipt_url:
                  "https://pay.stripe.com/receipts/acct_1I5NG5HHW1jy2HDN/ch_3K51dBHHW1jy2HDN0zGwM35V/rcpt_KkWgJdvPmR8ktAuNJdk3xV1HQuSTBe6",
                refunded: false,
                refunds: {
                  object: "list",
                  data: [],
                  has_more: false,
                  total_count: 0,
                  url: "/v1/charges/ch_3K51dBHHW1jy2HDN0zGwM35V/refunds",
                },
                review: null,
                shipping: null,
                source: null,
                source_transfer: null,
                statement_descriptor: null,
                statement_descriptor_suffix: null,
                status: "succeeded",
                transfer_data: null,
                transfer_group: null,
              },
            ],
            has_more: false,
            total_count: 1,
            url: "/v1/charges?payment_intent=pi_3K51dBHHW1jy2HDN0NIxElzd",
          },
          client_secret: "pi_3K51dBHHW1jy2HDN0NIxElzd_secret_5pObVIZ80Sk2JeLYbM67P1rsj",
          confirmation_method: "automatic",
          created: 1639114013,
          currency: "usd",
          customer: null,
          description: null,
          invoice: null,
          last_payment_error: null,
          livemode: true,
          next_action: null,
          on_behalf_of: null,
          payment_method: "pm_1K51d9HHW1jy2HDNAioTrUSE",
          payment_method_options: {
            card: {
              installments: null,
              network: null,
              request_three_d_secure: "automatic",
            },
          },
          payment_method_types: ["card"],
          receipt_email: null,
          review: null,
          setup_future_usage: null,
          shipping: null,
          source: null,
          statement_descriptor: null,
          statement_descriptor_suffix: null,
          status: "succeeded",
          transfer_data: null,
          transfer_group: null,
        },
        refund: [
          {
            id: "re_3K51dBHHW1jy2HDN0pffHwOJ",
            object: "refund",
            amount: 5850,
            balance_transaction: "txn_3K51dBHHW1jy2HDN01VIXJXi",
            charge: "ch_3K51dBHHW1jy2HDN0zGwM35V",
            created: 1639159834,
            currency: "usd",
            payment_intent: "pi_3K51dBHHW1jy2HDN0NIxElzd",
            reason: null,
            receipt_number: null,
            source_transfer_reversal: null,
            status: "succeeded",
            transfer_reversal: null,
          },
        ],
        refund_reason: ["Duplicate Order"],
      },
      guest: false,
      status: "paid",
      isReassured: false,
      isRefunded: true,
      deleted: true,
      tracking_number: "9400136109361125191918",
      orderItems: [
        {
          reviewed: false,
          _id: "61b2e51ca58ea5002bbb6de2",
          product: "617882d6bf66b4002ba730b9",
          color_product: "610b287e45c76d002a6e5a5f",
          color_group_name: "Skin Color",
          secondary_color_group_name: "Sled Color",
          secondary_color_product: "610b33fe45c76d002a6e5da8",
          option_group_name: "Set of",
          option_product: "60efd85ee0d9c44c752a5762",
          option_product_name: "Alt Novaskinz - 2",
          secondary_product: null,
          secondary_product_name: "",
          secondary_group_name: "Style",
          name: "Alt Novaskinz w Nano Sleds",
          size: "2",
          color: "Clear",
          color_code: "#4b4b4b",
          secondary_color: "Clear",
          secondary_color_code: "#4b4b4b",
          display_image: "https://thumbs2.imgbox.com/01/81/xlAMpqaO_t.jpeg",
          secondary_image: "",
          price: 12.99,
          sale_price: 10.392,
          count_in_stock: 29,
          weight_pounds: 0,
          weight_ounces: 0.4,
          package_length: 4,
          package_width: 3,
          package_height: 0.75,
          package_volume: 9,
          pathname: "alt_novaskinz_w_nano_sleds",
          subcategory: "alt_novaskinz",
          category: "glowskinz",
          quantity: 2,
          createdAt: "2021-12-10T18:10:35.464Z",
          updatedAt: "2021-12-10T18:10:35.464Z",
        },
        {
          reviewed: false,
          _id: "61b2e51ca58ea5002bbb6de3",
          product: "61a93b4c914391295a264f8d",
          color_product: "60ee99183a3c5e002ac7989b",
          secondary_color_product: null,
          option_group_name: "Size",
          option_product: "61a99f1f8c53cb002b372c59",
          option_product_name: "Supreme Gloves - XL",
          secondary_product: null,
          secondary_product_name: "",
          secondary_group_name: "",
          name: "Supremes",
          size: "XL",
          color: "White",
          color_code: "black",
          secondary_color_code: "",
          display_image: "https://thumbs2.imgbox.com/9c/5d/vjBlyZT8_t.jpeg",
          secondary_image: "",
          price: 3.95,
          preorder: false,
          sale_price: 0,
          count_in_stock: 200,
          weight_pounds: 0,
          weight_ounces: 3.3,
          package_length: 7,
          package_width: 6,
          package_height: 0.75,
          package_volume: 31.5,
          pathname: "supremes",
          subcategory: "singles",
          category: "gloves",
          quantity: 1,
          createdAt: "2021-12-10T18:10:35.464Z",
          updatedAt: "2021-12-10T18:10:35.464Z",
        },
        {
          reviewed: false,
          _id: "61b2e51ca58ea5002bbb6de4",
          product: "61a93b4c914391295a264f8d",
          color_product: "60ee99183a3c5e002ac7989b",
          secondary_color_product: null,
          option_group_name: "Size",
          option_product: "61a99ec48c53cb002b3729b4",
          option_product_name: "Supreme Gloves - L",
          secondary_product: null,
          secondary_product_name: "",
          secondary_group_name: "",
          name: "Supremes",
          size: "L",
          color: "White",
          color_code: "black",
          secondary_color_code: "",
          display_image: "https://thumbs2.imgbox.com/9c/5d/vjBlyZT8_t.jpeg",
          secondary_image: "",
          price: 3.95,
          preorder: false,
          sale_price: 0,
          count_in_stock: 200,
          weight_pounds: 0,
          weight_ounces: 3.3,
          package_length: 7,
          package_width: 6,
          package_height: 0.75,
          package_volume: 31.5,
          pathname: "supremes",
          subcategory: "singles",
          category: "gloves",
          quantity: 1,
          createdAt: "2021-12-10T18:10:35.464Z",
          updatedAt: "2021-12-10T18:10:35.464Z",
        },
        {
          reviewed: false,
          _id: "61b2e51ca58ea5002bbb6de5",
          product: "60e158d4e615fa002a6c2de4",
          color_product: "60ee99183a3c5e002ac7989b",
          secondary_color_product: null,
          option_group_name: "Set of",
          option_product: "60eff41c983ca35495453b3d",
          option_product_name: "Bulk CR1225 Batteries - 80",
          secondary_product: null,
          secondary_product_name: "",
          name: "Bulk CR1225 Batteries",
          size: "80",
          color_code: "black",
          secondary_color_code: "",
          display_image: "https://thumbs2.imgbox.com/b2/c2/E9E1r1KW_t.jpeg",
          secondary_image: "",
          price: 9.99,
          preorder: false,
          sale_price: 0,
          count_in_stock: 29,
          weight_pounds: 0,
          weight_ounces: 3,
          package_length: 6,
          package_width: 5,
          package_height: 0.24,
          package_volume: 7.2,
          pathname: "1225_batteries",
          subcategory: "batteries",
          category: "accessories",
          quantity: 1,
          createdAt: "2021-12-10T18:10:35.464Z",
          updatedAt: "2021-12-10T18:10:35.464Z",
        },
      ],
      user: "61b043ba7abb88002bde770e",
      shipping: {
        first_name: "Alexander",
        last_name: "Holland",
        email: "misterkrocks@gmail.com",
        address_1: "2128 Lyon Ave",
        address_2: "",
        city: "Belmont",
        state: "CA",
        postalCode: "94002",
        country: "US",
        international: false,
        shipment_id: "shp_4f7dd086cfe248b284e0cdca115a4297",
        shipping_rate: {
          id: "rate_1faa456b75cb4d0b94914c2ca6c37f5c",
          object: "Rate",
          created_at: "2021-12-10T05:23:41Z",
          updated_at: "2021-12-10T05:23:41Z",
          mode: "production",
          service: "First",
          carrier: "USPS",
          rate: "4.83",
          currency: "USD",
          retail_rate: "6.15",
          retail_currency: "USD",
          list_rate: "4.83",
          list_currency: "USD",
          delivery_days: 3,
          delivery_date: null,
          delivery_date_guaranteed: false,
          est_delivery_days: 3,
          shipment_id: "shp_4f7dd086cfe248b284e0cdca115a4297",
          carrier_account_id: "ca_945306ac434f4c5baa70e5d9eb9db72c",
        },
      },
      itemsPrice: 39.483,
      taxPrice: 2.8625175,
      shippingPrice: 6.15,
      totalPrice: 58.4955175,
      order_note:
        "PLEASE MAKE MY SLEDS THE DUAL CHIP ONES WE DISCUSSED FOR THE EMAZING EVOS. :)     HIT ME UP WITH FURSTHER QUESTIONS, COMMENTS, CONCERNS. THANK YOU MUCH!",
      production_note: "",
      promo_code: "SNAPS",
      parcel: "60c25b1575b455002a999820",
      paidAt: "2021-12-10T05:26:55.084Z",
      createdAt: "2021-12-10T05:26:52.608Z",
      updatedAt: "2021-12-10T18:11:04.643Z",
      __v: 0,
      refundedAt: "2021-12-10T18:10:35.453Z",
    },
  };
  res.send(custom_contact(data));
});

router.get("/contact_confirmation", (req, res) => {
  res.send(contact_confirmation(req.body));
});

router.get("/reset_password", async (req, res) => {
  const user = await user_db.findByEmail_users_db("lavacquek@icloud.com");
  res.send(App({ body: verify_email_password_reset(user), title: "Password Reset Instructions " }));
});
router.get("/reset_password", async (req, res) => {
  const user = await user_db.findById_users_db("5f2d7c0e9005a57059801ce8");
  res.send(App({ body: successful_password_reset(user), title: "Password Reset Successful" }));
});
// router.get(
//   "/announcement",
//   async (req, res) => {
//     const contents = await content_db.findAll_contents_d, 1b(
//       { deleted: false },
//       { _id: -1 },
//       0
//     );

//     res.send(
//       App({
//         body: announcment(contents && contents[0]),
//         title: "Glow LEDs Account Created",
//       })
//     );
//   }
// );
router.get("/account_created", async (req, res) => {
  const user = await user_db.findById_users_db("5f2d7c0e9005a57059801ce8");
  const contents = await content_db.findAll_contents_db({ deleted: false }, { _id: -1 }, "0", "1");
  const body = {
    user,
    categories: contents && contents[0].home_page?.slideshow,
  };

  res.send(App({ body: account_created(body), title: "Glow LEDs Account Created" }));
});

export default router;
