import App from "../email_templates/App";
import { announcement } from "../email_templates/pages";

const cron = require("node-cron");
const { google } = require("googleapis");
const nodemailer = require("nodemailer");

export const send_multiple_emails = async (emailAddresses: any, time: any, email: any, template: any, subject: string, res: any) => {
  try {
    const mailOptions = {
      to: process.env.INFO_EMAIL,
      from: process.env.DISPLAY_INFO_EMAIL,
      subject: subject,
      html: App({
        body: announcement(template),
        unsubscribe: true,
        header_footer_color: template.header_footer_color
      }),
      bcc: emailAddresses
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
  } catch (err) {
    return "Error Sending Email";
  }
};

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
  } catch (error) {
    return "Error Creating Transporter";
  }
};

export const sendEmail = async (emailOptions: any, res: any, type: string, name: string) => {
  const emailTransporter = await createTransporter(type);

  if (emailTransporter) {
    await emailTransporter.sendMail(emailOptions, (err: any, data: any) => {
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
