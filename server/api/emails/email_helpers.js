import App from "../../email_templates/App";
import { announcement } from "../../email_templates/pages";
import config from "../../config";
import { user_db } from "../users";
import { oauthClients } from "../../server";

const { google } = require("googleapis");
const nodemailer = require("nodemailer");

const createTransporter = async type => {
  try {
    const { client, accessToken, user } = oauthClients[type];
    console.log({ client, accessToken, user });
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
  console.log({ emailTransporter });
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

export const send_multiple_emails = async (emailAddresses, email, res) => {
  const { subject } = email;
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

    email.status = "Sent";
    email.save();
    sendEmail(mailOptions, res, "info", "Email " + subject + " to everyone");
  } catch (err) {
    return "Error Sending Email";
  }
};

export const sendEmailsInBatches = async (email, res, testEmails = null) => {
  const emailsPerIteration = 100;
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

    await send_multiple_emails(emailAddresses, email, res);
    console.log(`Batch ${i + 1}: Sent emails to ${emailAddresses.length} users`);

    if (!testEmails) {
      // If not testing, wait before sending the next batch
      await new Promise(resolve => setTimeout(resolve, 10000));
    }
  }
};

// const createTransporter = async type => {
//   try {
//     const OAuth2 = google.auth.OAuth2;
//     let credentials = {};
//     if (type === "contact") {
//       credentials = {
//         user: config.CONTACT_EMAIL,
//         client_id: config.GOOGLE_CONTACT_OAUTH_ID,
//         client_secret: config.GOOGLE_CONTACT_OAUTH_SECRET,
//         refresh_token: config.GOOGLE_CONTACT_OAUTH_REFRESH_TOKEN,
//       };
//     } else {
//       credentials = {
//         user: config.INFO_EMAIL,
//         client_id: config.GOOGLE_INFO_OAUTH_ID,
//         client_secret: config.GOOGLE_INFO_OAUTH_SECRET,
//         refresh_token: config.GOOGLE_INFO_OAUTH_REFRESH_TOKEN,
//       };
//     }

//     const oauth2Client = new OAuth2(
//       credentials.client_id,
//       credentials.client_secret,
//       "https://developers.google.com/oauthplayground"
//     );
//     oauth2Client.setCredentials({
//       refresh_token: credentials.refresh_token,
//     });
//     // console.log({ oauth2Client, credentials });

//     const accessToken = await new Promise((resolve, reject) => {
//       oauth2Client.getAccessToken((err, token) => {
//         if (err) {
//           console.log({ err });
//           reject();
//         }
//         resolve(token);
//       });
//     });

//     console.log({ accessToken });

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       pool: true,
//       auth: {
//         type: "OAuth2",
//         user: credentials.user,
//         accessToken,
//         clientId: credentials.client_id,
//         clientSecret: credentials.client_secret,
//         refreshToken: credentials.refresh_token,
//       },
//     });

//     return transporter;
//   } catch (error) {
//     return "Error Creating Transporter";
//   }
// };

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
