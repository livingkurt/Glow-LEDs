import App from "../../email_templates/App";
import { announcement } from "../../email_templates/pages";
import config from "../../config";

const cron = require("node-cron");
const { google } = require("googleapis");
const nodemailer = require("nodemailer");

export const send_multiple_emails = async (emailAddresses, email, res) => {
  const { subject, scheduled_at } = email;
  try {
    const mailOptions = {
      to: config.INFO_EMAIL,
      from: config.DISPLAY_INFO_EMAIL,
      subject: subject,
      html: App({
        body: announcement(email),
        unsubscribe: true,
        header_footer_color: email.header_footer_color,
      }),
      bcc: emailAddresses,
    };

    const date = new Date(scheduled_at);
    console.log({ subject, scheduled_at, date });
    // if (scheduled_at.length > 0) {
    //   email.status = "scheduled";
    //   email.save();
    //   cron.schedule(
    //     `${date.getSeconds()} ${date.getMinutes()} ${date.getHours()} ${date.getDate()} ${date.getMonth() + 1} *`,
    //     () => {
    //       sendEmail(mailOptions, res, "info", "Email " + subject + " to everyone");
    //       email.status = "sent";
    //       email.save();
    //     },
    //     {
    //       scheduled: true,
    //       timezone: "America/Rainy_River",
    //     }
    //   );
    // } else {
    //   sendEmail(mailOptions, res, "info", "Email " + subject + " to everyone");
    // }
  } catch (err) {
    return "Error Sending Email";
  }
};

const createTransporter = async type => {
  try {
    const OAuth2 = google.auth.OAuth2;
    let credentials = {};
    if (type === "contact") {
      credentials = {
        user: config.CONTACT_EMAIL,
        client_id: config.GOOGLE_CONTACT_OAUTH_ID,
        client_secret: config.GOOGLE_CONTACT_OAUTH_SECRET,
        refresh_token: config.GOOGLE_CONTACT_OAUTH_REFRESH_TOKEN,
      };
    } else {
      credentials = {
        user: config.INFO_EMAIL,
        client_id: config.GOOGLE_INFO_OAUTH_ID,
        client_secret: config.GOOGLE_INFO_OAUTH_SECRET,
        refresh_token: config.GOOGLE_INFO_OAUTH_REFRESH_TOKEN,
      };
    }

    const oauth2Client = new OAuth2(
      credentials.client_id,
      credentials.client_secret,
      "https://developers.google.com/oauthplayground"
    );
    oauth2Client.setCredentials({
      refresh_token: credentials.refresh_token,
    });

    const accessToken = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
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
        refreshToken: credentials.refresh_token,
      },
    });

    return transporter;
  } catch (error) {
    return "Error Creating Transporter";
  }
};

export const sendEmail = async (emailOptions, res, type, name) => {
  const emailTransporter = await createTransporter(type);
  try {
    if (emailTransporter) {
      await emailTransporter.sendMail(emailOptions, (err, data) => {
        if (err) {
          res.status(500).send({ error: err, message: "Error Sending Email" });
        } else {
          console.log(name);
          res.status(200).send({ message: "Email Successfully Sent" });
        }
      });
    } else {
      res.status(500).send({ message: "Error Sending Email" });
    }
  } catch (error) {
    console.log({ sendEmail: error });
  }
};

export const normalizeEmailFilters = input => {
  const output = {};
  Object.keys(input).forEach(key => {
    switch (key) {
      case "category":
        for (const category of input.category) {
          output["category"] = category;
        }
        break;
      case "card":
        for (const card of input.card) {
          output["card"] = card;
        }
        break;
      case "place_of_purchase":
        for (const place_of_purchase of input.place_of_purchase) {
          output["place_of_purchase"] = place_of_purchase;
        }
        break;

      default:
        break;
    }
  });
  return output;
};

export const normalizeEmailSearch = query => {
  const search = query.search
    ? {
        email_name: {
          $regex: query.search.toLowerCase(),
          $options: "i",
        },
      }
    : {};

  return search;
};
