import email_services from "./email_services";

import App from "../../email_templates/App";
import {
  account_created,
  contact,
  contact_confirmation,
  order_status,
  order,
  review,
  affiliate,
  feature,
  announcement,
  custom_contact,
  code_used,
  shipping_status,
  verify_email_password_reset,
  successful_password_reset,
  affiliate_onboard,
} from "../../email_templates/pages/index";
import email_subscription from "../../email_templates/pages/email_subscription";
import { order_db, order_services } from "../orders";
import { content_db } from "../contents";
import { Affiliate, affiliate_db } from "../affiliates";
import { promo_db } from "../promos";
import { User, user_db } from "../users";
import { determine_status } from "../emails/email_interactors";
import { determine_code_tier, format_date, toCapitalize } from "../../utils/util";
import { sendEmail, send_multiple_emails } from "./email_helpers";
import email_db from "./email_db";
import { product_db } from "../products";
import { team_db } from "../teams";
const jwt = require("jsonwebtoken");
import config from "../../config";
import verify from "../../email_templates/pages/verify";
import { domain } from "../../email_templates/email_template_helpers";

export default {
  get_table_emails_c: async (req, res) => {
    const { query } = req;
    try {
      const emails = await email_services.get_table_emails_s(query);
      if (emails) {
        return res.status(200).send(emails);
      }
      return res.status(404).send({ message: "Contents Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  findAll_emails_c: async (req, res) => {
    const { query } = req;
    try {
      const emails = await email_services.findAll_emails_s(query);
      if (emails) {
        return res.status(200).send(emails);
      }
      return res.status(404).send({ message: "Emails Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  findById_emails_c: async (req, res) => {
    const { params } = req;
    try {
      const email = await email_services.findById_emails_s(params);

      if (email) {
        return res.status(200).send(email);
      }
      return res.status(404).send({ message: "Email Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  create_emails_c: async (req, res) => {
    const { body } = req;
    try {
      const email = await email_services.create_emails_s(body);
      if (email) {
        return res.status(201).send(email);
      }
      return res.status(500).send({ message: "Error Creating Email" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  update_emails_c: async (req, res) => {
    const { params, body } = req;
    try {
      const email = await email_services.update_emails_s(params, body);
      if (email) {
        return res.status(200).send(email);
      }
      return res.status(500).send({ message: "Error Updating Email" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  remove_emails_c: async (req, res) => {
    const { params } = req;
    try {
      const email = await email_services.remove_emails_s(params);
      if (email) {
        return res.status(204).send({ message: "Email Deleted" });
      }
      return res.status(500).send({ message: "Error Deleting Email" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },

  get_invoice_emails_c: async (req, res) => {
    const body = {
      email: {
        h1: "Thank you for your Order!",
        h2: "We are starting production on your order! We will notify your as your order progresses.",
      },
      title: "Thank you for your purchase!",
      order: req.body.order,
    };
    const mailOptions = {
      from: config.DISPLAY_INFO_EMAIL,
      to: req.body.email,
      subject: req.body.subject,
      html: App({ body: order(body), unsubscribe: false }),
    };
    sendEmail(mailOptions, res, "info", "Invoice Email Sent to " + req.body.email);
  },
  send_order_emails_c: async (req, res) => {
    const body = {
      email: {
        h1: "YOUR ORDER HAS BEEN PLACED! 🎉",
        h2: "We are starting production on your order! We will notify your as your order progresses.",
      },
      title: "Thank you for your purchase!",
      order: req.body.order,
    };
    const mailOptions = {
      from: config.DISPLAY_INFO_EMAIL,
      to: req.body.email,
      subject: req.body.subject,
      html: App({ body: order(body), unsubscribe: false }),
    };
    sendEmail(mailOptions, res, "info", "Order Email Sent to " + req.body.email);
  },
  send_refund_emails_c: async (req, res) => {
    const { order: order_data, email } = req.body;

    const body = {
      email: {
        h1: `${
          order_data.payment.refund.reduce((a, c) => a + c.amount, 0) / 100 < order_data.itemsPrice ? "Partial" : "Full"
        } Refund Successful`,
        h2: `Your Order has been refunded for ${" "}
          ${order_data.payment.refund_reason[order_data.payment.refund_reason.length - 1]} on ${format_date(
            order_data.refundedAt
          )}. You're payment will show up in your bank account between 5-10 business days. Please let us know if you have any questions about this process.`,
      },
      title: "Thank you for your purchase!",
      order: order_data,
    };
    const mailOptions = {
      from: config.DISPLAY_INFO_EMAIL,
      to: email,
      subject: "Your Glow LEDs Refund",
      html: App({ body: order(body), unsubscribe: false }),
    };
    sendEmail(mailOptions, res, "info", "Refund Email Sent to " + req.body.email);
  },
  send_order_status_emails_c: async (req, res) => {
    const body = {
      email: {
        h1: "Thank you for your Order!",
        h2: "We are starting production on your order! We will notify your as your order progresses.",
      },
      title: "Your Order has been " + toCapitalize(req.body.status),
      order: req.body.order,
      status: req.body.status,
      message_to_user: req.body.message_to_user,
    };

    const mailOptions = {
      from: config.DISPLAY_INFO_EMAIL,
      to: req.body.email,
      subject: req.body.status === "reassured" ? "Thank you for your patience" : req.body.subject,
      html: App({
        body: order_status(body),
        unsubscribe: false,
      }),
    };

    sendEmail(mailOptions, res, "info", "Order Status Email Sent to " + req.body.email);
  },
  send_current_stock_emails_c: async (req, res) => {
    const data = await product_db.current_stock_products_db();

    const mailOptions = {
      from: config.DISPLAY_INFO_EMAIL,
      to: config.INFO_EMAIL,
      subject: "Glow LEDs Current Stock",
      html: App({
        body: order_status(data),
      }),
    };

    sendEmail(mailOptions, res, "info", "Current Stock Email Sent to " + config.INFO_EMAIL);
  },
  affiliate_onboard_emails_c: async (req, res) => {
    const { userIds } = req.body;

    for (const id of userIds) {
      await user_db.update_users_db(id, { is_affiliated: true });
      const data = await user_db.findById_users_db(id);

      const mailOptions = {
        from: config.DISPLAY_INFO_EMAIL,
        to: data.email,
        subject: "Congratulations! Lets get you started!",
        html: affiliate_onboard(data),
      };

      await sendEmail(mailOptions, res, "info", "Affiliate Onboarding Email Sent to " + data.email);
    }
  },

  send_affiliate_emails_c: async (req, res) => {
    const body = {
      affiliate: req.body.affiliate,
      title: "Thank you for signing up!",
    };
    const mailOptions = {
      from: config.DISPLAY_INFO_EMAIL,
      to: req.body.email,
      subject: req.body.subject,
      html: App({ body: affiliate(body), unsubscribe: false }),
    };

    sendEmail(mailOptions, res, "info", "Affiliate Email Sent to " + req.body.email);
  },
  send_feature_emails_c: async (req, res) => {
    const body = {
      feature: req.body.feature,
      title: "Thank you for sending us your art!",
    };
    const mailOptions = {
      from: config.DISPLAY_INFO_EMAIL,
      to: req.body.email,
      subject: req.body.subject,
      html: App({
        body: feature(body),
        unsubscribe: false,
      }),
    };

    sendEmail(mailOptions, res, "info", "Featured Email Sent to " + req.body.email);
  },
  send_external_contact_emails_c: async (req, res) => {
    const mailOptions = {
      to: config.LOGIN_EMAIL,
      from: req.body.email,
      subject: `${req.body.subject} - ${req.body.name}`,
      html: req.body.message,
    };
    sendEmail(mailOptions, res, "info", "Contact Email Sent to " + req.body.first_name);
  },
  send_user_contact_emails_c: async (req, res) => {
    const { email, first_name, reason_for_contact } = req.body;
    const mailOptions = {
      to: config.DISPLAY_CONTACT_EMAIL,
      from: email,
      replyTo: email,
      subject: `New message from ${first_name} - ${reason_for_contact}`,
      html: contact(req.body),
    };
    sendEmail(mailOptions, res, "contact", "User Contact Email Sent to " + first_name);
  },
  send_admin_contact_emails_c: async (req, res) => {
    const { email, first_name } = req.body;
    console.log({ email });

    const mailOptions = {
      from: config.DISPLAY_CONTACT_EMAIL,
      to: email,
      replyTo: email,
      subject: `Thank you for Contacting Glow LEDs Support`,
      html: contact_confirmation(req.body),
    };
    sendEmail(mailOptions, res, "contact", "Admin Contact Email Sent to " + first_name);
  },
  send_custom_contact_emails_c: async (req, res) => {
    const { order, email } = req.body;
    const mailOptions = {
      from: config.DISPLAY_CONTACT_EMAIL,
      to: email,
      subject: `Thank you for ordering a custom Glow LEDs Product!`,
      html: custom_contact({ order }),
    };
    sendEmail(mailOptions, res, "contact", "Custom Contact Email Sent to " + order.shipping.first_name);
  },
  send_code_used_emails_c: async (req, res) => {
    const { promo_code } = req.params;
    const today = new Date();
    const first_of_month = new Date(today.getFullYear(), today.getMonth(), 1);
    const promo = await promo_db.findBy_promos_db({ promo_code });
    console.log({ promo });

    let mailRecipients = [];
    let mailSubject = "";
    let mailBodyData = {};

    if (promo) {
      if (promo_code === "inkybois") {
        const team = await team_db.findBy_teams_db({ promo_code });
        if (team) {
          const users = await Promise.all(
            team.affiliates.map(async affiliate_id => {
              const affiliate = await Affiliate.findOne({ _id: affiliate_id._id.toString() });
              const users = await User.find({ deleted: false, is_affiliated: true });
              return users.find(user => user?.affiliate?.toString() === affiliate._id.toString());
              // return await user_db.findByAffiliateId_users_db(affiliate._id);
            })
          );
          mailRecipients = users.map(user => user.email);
          mailSubject = `Your team's code was just used!`;
          const stats = await order_services.code_usage_orders_s(
            { promo_code },
            { start_date: first_of_month, end_date: today }
          );
          mailBodyData = {
            name: team.team_name,
            promo_code: promo_code,
            percentage_off: null,
            number_of_uses: stats.number_of_uses,
            earnings: team.sponsor ? stats.revenue * 0.15 : stats.revenue * 0.1,
          };
        }
      } else {
        // TODO - For some reason I cant find by nested record id
        // // Debug logs to understand what's happening
        // const affiliateById = await Affiliate.findById("637849aa596602002956d895");
        // console.log("Affiliate by ID:", affiliateById);

        // const affiliateByPublicCode = await Affiliate.findOne({
        //   public_code: affiliateById.public_code,
        // });
        // console.log("Affiliate by public_code as string:", affiliateByPublicCode);

        // const affiliateByPublicCodeAsObjectId = await Affiliate.findOne({
        //   public_code: new mongoose.Types.ObjectId(affiliateById.public_code),
        // }).lean();
        // console.log("Affiliate by public_code as ObjectId:", affiliateByPublicCodeAsObjectId);

        // console.log(typeof affiliateById.public_code, affiliateById.public_code instanceof mongoose.Types.ObjectId);
        // const affiliate = await Affiliate.findOne({
        //   public_code: new mongoose.Types.ObjectId(affiliateById.public_code),
        // });
        const affiliates = await Affiliate.find({ deleted: false });
        // Filter affiliates by public_code
        const affiliate = affiliates.find(affiliate => affiliate.public_code.toString() === promo._id.toString());

        // const affiliate = await Affiliate.findOne({ public_code: promo._id.toString() });
        if (affiliate) {
          const users = await User.find({ deleted: false, is_affiliated: true });
          const user = users.find(user => user?.affiliate?.toString() === affiliate._id.toString());
          // const user = await user_db.findByAffiliateId_users_db(affiliate._id.toString());
          console.log({ user });
          mailRecipients = [user.email];
          mailSubject = `Your code was just used!`;
          const stats = await order_services.code_usage_orders_s(
            { promo_code },
            { start_date: first_of_month, end_date: today, sponsor: affiliate.artist_name }
          );
          mailBodyData = {
            name: affiliate.artist_name,
            promo_code: promo_code,
            percentage_off: determine_code_tier(affiliate, stats.number_of_uses),
            number_of_uses: stats.number_of_uses,
            earnings: affiliate.sponsor ? stats.revenue * 0.15 : stats.revenue * 0.1,
          };
        }
      }

      if (mailRecipients.length > 0) {
        const mailOptions = {
          from: config.DISPLAY_INFO_EMAIL,
          to: mailRecipients,
          subject: mailSubject,
          bcc: config.INFO_EMAIL,
          html: App({
            body: code_used(mailBodyData),
            unsubscribe: false,
          }),
        };
        console.log({ mailRecipients });
        sendEmail(mailOptions, res, "info", "Code Used Email sent to " + mailRecipients.join(", "));
      }
    }
  },
  send_verify_email_password_reset_emails_c: async (req, res) => {
    const email = req.body.email;
    console.log({ email });

    const user = await user_db.findByEmail_users_db(email);

    console.log({ user });

    if (user) {
      // Generate a JWT token for reset password
      const resetToken = jwt.sign({ email }, config.RESET_PASSWORD_TOKEN_SECRET, { expiresIn: "1h" });

      // Include the token in the reset URL
      const url = `${domain()}/account/reset_password?token=${resetToken}`;

      const mailOptions = {
        from: config.DISPLAY_INFO_EMAIL,
        to: req.body.email,
        subject: "Glow LEDs Reset Password",
        html: App({
          body: verify_email_password_reset({
            ...req.body,
            url,
            title: "Glow LEDs Reset Password",
          }),
          unsubscribe: false,
        }),
      };
      sendEmail(mailOptions, res, "info", "Reset Password Link Email Sent to " + user.first_name);
    } else {
      res.status(500).send({ message: "You do not have an account with us" });
    }
  },
  // send_verify_email_password_reset_emails_c: async (req, res) => {
  //   console.log({ req_body: req.body });
  //   const mailOptions = {
  //     from: config.DISPLAY_INFO_EMAIL,
  //     to: req.body.data.email,
  //     subject: "Glow LEDs Password Reset",
  //     html: App({
  //       body: reset_password({
  //         ...req.body,
  //         title: "Glow LEDs Password Reset",
  //       }),
  //       unsubscribe: false,
  //     }),
  //   };
  //   sendEmail(mailOptions, res, "info", "Password Reset Email Sent to " + req.body.data.first_name);
  // },
  send_successful_password_reset_emails_c: async (req, res) => {
    const mailOptions = {
      from: config.DISPLAY_INFO_EMAIL,
      to: req.body.email,
      subject: "Glow LEDs Reset Password",
      html: App({
        body: successful_password_reset({
          ...req.body,
          title: "Glow LEDs Reset Password",
        }),
        unsubscribe: false,
      }),
    };
    sendEmail(mailOptions, res, "info", "Reset Password Email Sent to " + req.body.first_name);
  },
  send_review_emails_c: async (req, res) => {
    const contents = await content_db.findAll_contents_db({ deleted: false }, { _id: -1 }, "0", "1");

    const mailOptions = {
      from: config.DISPLAY_INFO_EMAIL,
      to: req.body.email,
      subject: "Enjoy 10% off your next purchase!",
      html: App({
        body: review({
          ...req.body,
          categories: contents && contents[0].home_page?.slideshow,
          title: "Enjoy 10% off your next purchase!",
        }),

        unsubscribe: false,
      }),
    };

    sendEmail(mailOptions, res, "info", "Email Sent to " + req.body.email);
  },

  send_announcement_emails_c: async (req, res) => {
    const { template, subject, test, time } = req.body;
    console.log({ template, subject, test, time });
    const subscribed_users = await user_db.findAll_users_db({ deleted: false, email_subscription: true }, {}, "0", "1");
    const email = await email_db.findById_emails_db(template._id);
    // const all_emails = subscribed_users.map((user) => user.email);

    // Set the number of emails to send per iteration
    const emailsPerIteration = 100;

    // Calculate the number of iterations required
    const iterations = Math.ceil(subscribed_users.length / emailsPerIteration);

    // Set the time to wait between iterations (in milliseconds)
    const waitTime = 10000;
    if (test) {
      // // const test_emails = ["lavacquek@icloud.com", "lavacquek@gmail.com", "destanyesalinas@gmail.com", "kachaubusiness@gmail.com"];
      const test_emails = ["lavacquek@icloud.com", "kachaubusiness@gmail.com"];
      send_multiple_emails(test_emails, time, email, template, subject, res);
    } else {
      for (let i = 0; i < iterations; i++) {
        // Get the start and end indices for the current iteration
        const startIndex = i * emailsPerIteration;
        const endIndex = startIndex + emailsPerIteration;

        // Create an array of email addresses for the current iteration
        const emailAddresses = subscribed_users.slice(startIndex, endIndex).map(user => user.email);

        send_multiple_emails(emailAddresses, time, email, template, subject, res);
        console.log(`${i + 1} Sending emails to ${emailAddresses.length} users`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
  },
  view_announcement_emails_c: async (req, res) => {
    const { template } = req.body;

    if (Object.keys(template).length > 2) {
      res.status(200).send(
        App({
          body: announcement(template),
          unsubscribe: true,
          background_color: template.background_color,
        })
      );
    }
  },
  send_email_subscription_emails_c: async (req, res) => {
    const contents = await content_db.findAll_contents_db({ deleted: false }, { _id: -1 }, "0", "1");

    const mailOptions = {
      from: config.DISPLAY_INFO_EMAIL,
      to: req.body.email,
      subject: "Enjoy 10% off your next purchase!",
      html: App({
        body: email_subscription({
          ...req.body,
          categories: contents && contents[0].home_page?.slideshow,
          title: "Enjoy 10% off your next purchase!",
        }),
        unsubscribe: true,
      }),
    };

    sendEmail(mailOptions, res, "info", "Email Sent to " + req.body.email);
  },

  send_account_created_emails_c: async (req, res) => {
    const contents = await content_db.findAll_contents_db({ deleted: false }, { _id: -1 }, "0", "1");

    const mailOptions = {
      from: config.DISPLAY_INFO_EMAIL,
      to: req.body.email,
      subject: "Glow LEDs Account Created",
      html: App({
        body: account_created({
          user: req.body,
          categories: contents && contents[0].home_page?.slideshow,
          title: "Glow LEDs Account Created",
        }),

        unsubscribe: false,
      }),
    };

    sendEmail(mailOptions, res, "info", "Registration Email Sent to " + req.body.first_name);
  },
  send_verified_emails_c: async (req, res) => {
    const { email } = req.body;
    const user = await user_db.findByEmail_users_db(email);
    const token = jwt.sign({ userId: user._id }, config.VERIFY_USER_TOKEN_SECRET, { expiresIn: "1h" });

    console.log({ user, token });
    const mailOptions = {
      from: config.DISPLAY_INFO_EMAIL,
      to: req.body.email,
      subject: "Verify your Email",
      html: App({
        body: verify({
          title: "Verify your Email",
          url: `${domain()}/pages/complete/account_created/${token}`,
          user: user,
        }),

        unsubscribe: false,
      }),
    };

    sendEmail(mailOptions, res, "info", "Verification Email Sent to " + req.body.first_name);
  },
  send_shipping_status_emails_c: async (req, res) => {
    try {
      const event = req.body;
      if (event["object"] === "Event" && event["description"] === "tracker.updated") {
        const tracker = event.result;
        const order = await order_db.findBy_orders_db({ tracking_number: tracker.tracking_code });

        const updateOrder = (isStatus, statusAt) => {
          order[isStatus] = true;
          order[statusAt] = new Date();
          order.save();
        };

        const body = {
          email: {},
          title: determine_status(tracker.status),
          order: order,
          status: tracker.status,
          tracker: tracker,
          // tracking_details: tracker.tracking_details.reverse()[0]
        };
        const mailOptions = {
          from: config.DISPLAY_INFO_EMAIL,
          to: order.shipping.email,
          subject: determine_status(tracker.status),
          html: App({
            body: shipping_status(body),
            unsubscribe: false,
          }),
        };
        if (
          tracker.status === "delivered" ||
          tracker.status === "out_for_delivery" ||
          (tracker.status === "in_transit" && order.isShipped === false)
        ) {
          sendEmail(mailOptions, res, "info", "Order Status Email Sent to " + order.shipping.email);
        }
        if (tracker.status === "delivered") {
          updateOrder("isDelivered", "deliveredAt");
        } else if (tracker.status === "out_for_delivery") {
          updateOrder("isOutForDelivery", "outForDeliveryAt");
        } else if (order.isShipped === true && tracker.status === "in_transit") {
          updateOrder("isInTransit", "inTransitAt");
        } else if (tracker.status === "in_transit") {
          updateOrder("isShipped", "shippedAt");
        }
      } else {
        res.status(200).send("Not a Tracker event, so nothing to do here for now...");
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};
