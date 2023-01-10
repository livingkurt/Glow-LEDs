import { email_services, order_services } from "../services";
const nodemailer = require("nodemailer");
import App from "../email_templates/App";
import {
  account_created,
  password_reset,
  reset_password,
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
  shipping_status
} from "../email_templates/pages/index";
import email_subscription from "../email_templates/pages/email_subscription";
import { affiliate_db, content_db, email_db, order_db, promo_db, user_db } from "../db";
import { format_date, months, toCapitalize } from "../util";
import { determine_status } from "../interactors/email_interactors";
const cron = require("node-cron");
const schedule = require("node-schedule");
const { google } = require("googleapis");

const easy_post_api = require("@easypost/api");

const createTransporter = async (type: string) => {
  try {
    const OAuth2 = google.auth.OAuth2;
    let credentials: any = {};
    if (type === "contact") {
      credentials = {
        user: process.env.CONTACT_EMAIL,
        client_id: process.env.GOOGLE_CONTACT_OAUTH_ID,
        client_secret: process.env.GOOGLE_CONTACT_OAUTH_SECRET,
        refresh_token: process.env.GOOGLE_CONTACT_OAUTH_REFRESH_TOKEN
      };
    } else {
      credentials = {
        user: process.env.INFO_EMAIL,
        client_id: process.env.GOOGLE_INFO_OAUTH_ID,
        client_secret: process.env.GOOGLE_INFO_OAUTH_SECRET,
        refresh_token: process.env.GOOGLE_INFO_OAUTH_REFRESH_TOKEN
      };
    }

    const oauth2Client = new OAuth2(credentials.client_id, credentials.client_secret, "https://developers.google.com/oauthplayground");
    oauth2Client.setCredentials({
      refresh_token: credentials.refresh_token
    });

    const accessToken = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err: any, token: any) => {
        if (err) {
          reject();
        }
        resolve(token);
      });
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      pool: true,
      auth: {
        type: "OAuth2",
        user: credentials.user,
        accessToken,
        clientId: credentials.client_id,
        clientSecret: credentials.client_secret,
        refreshToken: credentials.refresh_token
      }
    });

    return transporter;
  } catch (error) {}
};

const sendEmail = async (emailOptions: any, res: any, type: string, name: string) => {
  const emailTransporter = await createTransporter(type);

  if (emailTransporter) {
    await emailTransporter.sendMail(emailOptions, (err: any, data: any) => {
      console.log({ err, data });
      if (err) {
        res.status(500).send({ error: err, message: "Error Sending Email" });
      } else {
        res.status(200).send({ message: "Email Successfully Sent" });
      }
    });
  } else {
    res.status(500).send({ message: "Error Sending Email" });
  }
};

export default {
  findAll_emails_c: async (req: any, res: any) => {
    const { query } = req;
    try {
      const emails = await email_services.findAll_emails_s(query);
      if (emails) {
        return res.status(200).send(emails);
      }
      return res.status(404).send({ message: "Emails Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Finding Emails" });
    }
  },
  findById_emails_c: async (req: any, res: any) => {
    const { params } = req;
    try {
      const email = await email_services.findById_emails_s(params);

      if (email) {
        return res.status(200).send(email);
      }
      return res.status(404).send({ message: "Email Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Finding Email" });
    }
  },
  create_emails_c: async (req: any, res: any) => {
    const { body } = req;
    try {
      const email = await email_services.create_emails_s(body);
      if (email) {
        return res.status(201).send(email);
      }
      return res.status(500).send({ message: "Error Creating Email" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Creating Email" });
    }
  },
  update_emails_c: async (req: any, res: any) => {
    const { params, body } = req;
    try {
      const email = await email_services.update_emails_s(params, body);
      if (email) {
        return res.status(200).send(email);
      }
      return res.status(500).send({ message: "Error Updating Email" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Updating Email" });
    }
  },
  remove_emails_c: async (req: any, res: any) => {
    const { params } = req;
    try {
      const email = await email_services.remove_emails_s(params);
      if (email) {
        return res.status(204).send({ message: "Email Deleted" });
      }
      return res.status(500).send({ message: "Error Deleting Email" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Deleting Email" });
    }
  },

  get_invoice_emails_c: async (req: any, res: any) => {
    const body = {
      email: {
        h1: "Thank you for your Order!",
        h2: "We are starting production on your order! We will notify your as your order progresses."
      },
      title: "Thank you for your purchase!",
      order: req.body.order
    };
    const mailOptions = {
      from: process.env.DISPLAY_INFO_EMAIL,
      to: req.body.email,
      subject: req.body.subject,
      html: App({ body: order(body), unsubscribe: false })
    };
    sendEmail(mailOptions, res, "info", "Invoice Email Sent to " + req.body.email);
  },
  send_order_emails_c: async (req: any, res: any) => {
    const body = {
      email: {
        h1: "YOUR ORDER HAS BEEN PLACED! 🎉",
        h2: "We are starting production on your order! We will notify your as your order progresses."
      },
      title: "Thank you for your purchase!",
      order: req.body.order
    };
    const mailOptions = {
      from: process.env.DISPLAY_INFO_EMAIL,
      to: req.body.email,
      subject: req.body.subject,
      html: App({ body: order(body), unsubscribe: false })
    };
    sendEmail(mailOptions, res, "info", "Order Email Sent to " + req.body.email);
  },
  send_refund_emails_c: async (req: any, res: any) => {
    const { order: order_data, email } = req.body;

    const body = {
      email: {
        h1: `${
          order_data.payment.refund.reduce((a: any, c: any) => a + c.amount, 0) / 100 < order_data.itemsPrice ? "Partial" : "Full"
        } Refund Successful`,
        h2: `Your Order has been refunded for ${" "}
          ${order_data.payment.refund_reason[order_data.payment.refund_reason.length - 1]} on ${format_date(
          order_data.refundedAt
        )}. You're payment will show up in your bank account between 5-10 business days. Please let us know if you have any questions about this process.`
      },
      title: "Thank you for your purchase!",
      order: order_data
    };
    const mailOptions = {
      from: process.env.DISPLAY_INFO_EMAIL,
      to: email,
      subject: "Your Glow LEDs Refund",
      html: App({ body: order(body), unsubscribe: false })
    };
    sendEmail(mailOptions, res, "info", "Refund Email Sent to " + req.body.email);
  },
  send_order_status_emails_c: async (req: any, res: any) => {
    const body = {
      email: {
        h1: "Thank you for your Order!",
        h2: "We are starting production on your order! We will notify your as your order progresses."
      },
      title: "Your Order has been " + toCapitalize(req.body.status),
      order: req.body.order,
      status: req.body.status,
      message_to_user: req.body.message_to_user
    };

    const mailOptions = {
      from: process.env.DISPLAY_INFO_EMAIL,
      to: req.body.email,
      subject: req.body.status === "reassured" ? "Thank you for your patience" : req.body.subject,
      html: App({
        body: order_status(body),
        unsubscribe: false
      })
    };

    sendEmail(mailOptions, res, "info", "Order Status Email Sent to " + req.body.email);
  },
  send_affiliate_emails_c: async (req: any, res: any) => {
    const body = {
      affiliate: req.body.affiliate,
      title: "Thank you for signing up!"
    };
    const mailOptions = {
      from: process.env.DISPLAY_INFO_EMAIL,
      to: req.body.email,
      subject: req.body.subject,
      html: App({ body: affiliate(body), unsubscribe: false })
    };

    sendEmail(mailOptions, res, "info", "Affiliate Email Sent to " + req.body.email);
  },
  send_feature_emails_c: async (req: any, res: any) => {
    const body = {
      feature: req.body.feature,
      title: "Thank you for sending us your art!"
    };
    const mailOptions = {
      from: process.env.DISPLAY_INFO_EMAIL,
      to: req.body.email,
      subject: req.body.subject,
      html: App({
        body: feature(body),
        unsubscribe: false
      })
    };

    sendEmail(mailOptions, res, "info", "Featured Email Sent to " + req.body.email);
  },
  send_external_contact_emails_c: async (req: any, res: any) => {
    const mailOptions = {
      to: process.env.LOGIN_EMAIL,
      from: req.body.email,
      subject: `${req.body.subject} - ${req.body.name}`,
      html: req.body.message
    };
    sendEmail(mailOptions, res, "info", "Contact Email Sent to " + req.body.first_name);
  },
  send_user_contact_emails_c: async (req: any, res: any) => {
    const mailOptions = {
      to: process.env.DISPLAY_CONTACT_EMAIL,
      from: req.body.email,
      subject: `New message from ${req.body.first_name} - ${req.body.reason_for_contact}`,
      html: contact(req.body)
    };
    sendEmail(mailOptions, res, "contact", "User Contact Email Sent to " + req.body.first_name);
  },
  send_admin_contact_emails_c: async (req: any, res: any) => {
    const mailOptions = {
      from: process.env.DISPLAY_CONTACT_EMAIL,
      to: req.body.email,
      subject: `Thank you for Contacting Glow LEDs Support`,
      html: contact_confirmation(req.body)
    };
    sendEmail(mailOptions, res, "contact", "Admin Contact Email Sent to " + req.body.first_name);
  },
  send_custom_contact_emails_c: async (req: any, res: any) => {
    const { order, email } = req.body;
    const mailOptions = {
      from: process.env.DISPLAY_CONTACT_EMAIL,
      to: email,
      subject: `Thank you for ordering a custom Glow LEDs Product!`,
      html: custom_contact({ order })
    };
    sendEmail(mailOptions, res, "contact", "Custom Contact Email Sent to " + order.shipping.first_name);
  },
  send_code_used_emails_c: async (req: any, res: any) => {
    const { promo_code } = req.params;
    const date = new Date();
    const monthNumber = date.getMonth();
    const year = date.getFullYear();
    const promo = await promo_db.findBy_promos_db({ promo_code });
    const affiliate = await affiliate_db.findBy_affiliates_db({ public_code: promo._id });
    const user = await user_db.findByAffiliateId_users_db(affiliate._id);
    const stats: any = await order_services.affiliate_code_usage_orders_s(
      { promo_code },
      {
        month: months[monthNumber].toLowerCase(),
        year: year
      }
    );
    const mailOptions = {
      from: process.env.DISPLAY_CONTACT_EMAIL,
      // to: "lavacquek@icloud.com",
      to: user.email,
      subject: `You're code was just used!`,
      html: App({
        body: code_used({
          affiliate,
          number_of_uses: stats.number_of_uses,
          earnings: affiliate.sponsor ? stats.revenue * 0.15 : stats.revenue * 0.1
        }),
        unsubscribe: false
      })
    };

    sendEmail(mailOptions, res, "info", "Code Used Email sent to " + user.email);
  },
  send_password_reset_emails_c: async (req: any, res: any) => {
    const mailOptions = {
      from: process.env.DISPLAY_INFO_EMAIL,
      to: req.body.data.email,
      subject: "Glow LEDs Password Reset",
      html: App({
        body: password_reset({
          ...req.body,
          title: "Glow LEDs Password Reset"
        }),
        unsubscribe: false
      })
    };
    sendEmail(mailOptions, res, "info", "Password Reset Email Sent to " + req.body.data.first_name);
  },
  send_review_emails_c: async (req: any, res: any) => {
    const contents = await content_db.findAll_contents_db({ deleted: false }, { _id: -1 }, 0);

    const mailOptions = {
      from: process.env.DISPLAY_INFO_EMAIL,
      to: req.body.email,
      subject: "Enjoy 10% off your next purchase!",
      html: App({
        body: review({
          ...req.body,
          categories: contents && contents[0].home_page.slideshow,
          title: "Enjoy 10% off your next purchase!"
        }),

        unsubscribe: false
      })
    };

    sendEmail(mailOptions, res, "info", "Email Sent to " + req.body.email);
  },

  send_announcement_emails_c: async (req: any, res: any) => {
    const { template, subject, test, time } = req.body;
    const users = await user_db.findAll_users_db({ deleted: false, email_subscription: true }, {});
    const email = await email_db.findById_emails_db(template._id);
    const all_emails = users
      .filter((user: any) => user.deleted === false)
      .filter((user: any) => user.email_subscription === true)
      .map((user: any) => user.email);

    const test_emails = ["lavacquek@icloud.com", "lavacquek@gmail.com", "destanyesalinas@gmail.com"];
    const emails: any = test ? test_emails : all_emails;

    const mailOptions = {
      to: process.env.INFO_EMAIL,
      from: process.env.DISPLAY_INFO_EMAIL,
      subject: subject,
      html: App({
        body: announcement(template),
        unsubscribe: true,
        header_footer_color: template.header_footer_color
      }),
      bcc: emails
    };

    const date = new Date(time);
    email.subject = subject;
    if (time.length > 0) {
      email.status = "scheduled";
      email.scheduled_at = time;
      email.save();
      cron.schedule(
        `${date.getSeconds()} ${date.getMinutes()} ${date.getHours()} ${date.getDate()} ${date.getMonth() + 1} *`,
        () => {
          sendEmail(mailOptions, res, "info", "Email " + subject + " to everyone");
          email.status = "sent";
          email.save();
        },
        {
          scheduled: true,
          timezone: "America/Rainy_River"
        }
      );
    } else {
      sendEmail(mailOptions, res, "info", "Email " + subject + " to everyone");
    }
  },
  view_announcement_emails_c: async (req: any, res: any) => {
    const { template } = req.body;

    if (Object.keys(template).length > 2) {
      res.status(200).send(
        App({
          body: announcement(template),
          unsubscribe: true,
          background_color: template.background_color
        })
      );
    }
  },
  send_email_subscription_emails_c: async (req: any, res: any) => {
    const contents = await content_db.findAll_contents_db({ deleted: false }, { _id: -1 }, 0);

    const mailOptions = {
      from: process.env.DISPLAY_INFO_EMAIL,
      to: req.body.email,
      subject: "Enjoy 10% off your next purchase!",
      html: App({
        body: email_subscription({
          ...req.body,
          categories: contents && contents[0].home_page.slideshow,
          title: "Enjoy 10% off your next purchase!"
        }),
        unsubscribe: true
      })
    };

    sendEmail(mailOptions, res, "info", "Email Sent to " + req.body.email);
  },
  send_reset_password_emails_c: async (req: any, res: any) => {
    const mailOptions = {
      from: process.env.DISPLAY_INFO_EMAIL,
      to: req.body.email,
      subject: "Glow LEDs Reset Password",
      html: App({
        body: reset_password({
          ...req.body,
          title: "Glow LEDs Reset Password"
        }),
        unsubscribe: false
      })
    };

    sendEmail(mailOptions, res, "info", "Reset Password Email Sent to " + req.body.first_name);
  },
  send_account_created_emails_c: async (req: any, res: any) => {
    const contents = await content_db.findAll_contents_db({ deleted: false }, { _id: -1 }, 0);

    const mailOptions = {
      from: process.env.DISPLAY_INFO_EMAIL,
      to: req.body.email,
      subject: "Glow LEDs Account Created",
      html: App({
        body: account_created({
          user: req.body,
          categories: contents && contents[0].home_page.slideshow,
          title: "Glow LEDs Account Created"
        }),

        unsubscribe: false
      })
    };

    sendEmail(mailOptions, res, "info", "Registration Email Sent to " + req.body.first_name);
  },
  send_verified_emails_c: async (req: any, res: any) => {
    const mailOptions = {
      from: process.env.DISPLAY_INFO_EMAIL,
      to: req.body.email,
      subject: "Glow LEDs Account Created",
      html: App({
        body: account_created({
          ...req.body,
          title: "Glow LEDs Account Created"
        }),

        unsubscribe: false
      })
    };

    sendEmail(mailOptions, res, "info", "Registration Email Sent to " + req.body.first_name);
  },
  send_shipping_status_emails_c: async (req: any, res: any) => {
    try {
      const EasyPost = new easy_post_api(process.env.EASY_POST);
      const event = req.body;

      if (event["object"] === "Event" && event["description"] === "tracker.updated") {
        const tracker = event.result;
        console.log({ event });
        const order = await order_db.findBy_orders_db({ tracking_number: tracker.tracking_code });
        console.log({ tracker, order });

        const body = {
          email: {},
          title: determine_status(tracker.status),
          order: order,
          status: tracker.status,
          tracker: tracker,
          tracking_details: tracker.tracking_details.reverse()[0]
        };
        const mailOptions = {
          from: process.env.DISPLAY_INFO_EMAIL,
          to: "lavacquek@icloud.com",
          // to: order.shipping.email,
          subject: determine_status(tracker.status),
          html: App({
            body: shipping_status(body),
            unsubscribe: false
          })
        };
        if (tracker.status === "delivered" || tracker.status === "out_for_delivery" || tracker.status === "in_transit") {
          sendEmail(mailOptions, res, "info", "Order Status Email Sent to " + order.shipping.email);
        }
      } else {
        res.status(404).send("Not a Tracker event, so nothing to do here for now...");
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
};
