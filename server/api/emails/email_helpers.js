import App from "../../email_templates/App.js";
import announcement from "../../email_templates/pages/announcement.js";
import config from "../../config.js";
import user_db from "../users/user_db.js";
import { oauthClients } from "../../server.js";
import nodemailer from "nodemailer";

export const createTransporter = async type => {
  try {
    const { client, accessToken, user } = oauthClients[type];
    const transporter = nodemailer.createTransport({
      service: "gmail",
      pool: true,
      auth: {
        type: "OAuth2",
        user: user, // Use the stored user email
        accessToken,
        clientId: client._clientId,
        clientSecret: client._clientSecret,
        refreshToken: client.credentials.refresh_token,
      },
    });

    return transporter;
  } catch (error) {
    console.error("Error creating transporter:", error);
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

export const send_multiple_emails = async (emailAddresses, email, res, testEmails = null) => {
  const { subject } = email;
  try {
    const mailOptions = {
      to: config.INFO_EMAIL,
      from: config.DISPLAY_INFO_EMAIL,
      subject: testEmails ? "TEST " + subject : subject,
      html: App({
        body: announcement(email),
        unsubscribe: true,
        header_footer_color: email.header_footer_color,
        background_color: email.background_color,
      }),
      bcc: emailAddresses,
      headers: {
        "X-Priority": "1",
        "X-MSMail-Priority": "High",
        "Importance": "high",
        "X-Bulk-Email": "true",
      },
    };

    email.status = "Sent";
    email.save();
    sendEmail(mailOptions, res, "info", "Email " + subject + " to everyone");
  } catch (err) {
    return "Error Sending Email";
  }
};

export const sendEmailsInBatches = async (email, res, testEmails = null) => {
  const emailsPerIteration = 50;
  let subscribed_users;
  let emailAddresses;
  let iterations;

  if (testEmails) {
    emailAddresses = testEmails;
    iterations = 1; // Only one iteration needed for test emails
  } else {
    subscribed_users = await user_db.findAll_users_db({ deleted: false, email_subscription: true }, {}, "0", "1");
    iterations = Math.ceil(subscribed_users.length / emailsPerIteration);
  }

  for (let i = 0; i < iterations; i++) {
    if (!testEmails) {
      const startIndex = i * emailsPerIteration;
      const endIndex = startIndex + emailsPerIteration;
      emailAddresses = subscribed_users.slice(startIndex, endIndex).map(user => user.email);
    }

    await send_multiple_emails(emailAddresses, email, res, testEmails);
    console.log(`Batch ${i + 1}: Sent emails to ${emailAddresses.length} users`);

    if (!testEmails) {
      // If not testing, wait before sending the next batch
      await new Promise(resolve => setTimeout(resolve, 30000));
    }
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

export const toCamelCase = string => {
  const words = string.split("_");
  const camelCaseWords = words.map((word, index) => {
    if (index === 0) {
      return word.toLowerCase();
    } else {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
  });
  return camelCaseWords.join("");
};
