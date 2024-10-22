const jwt = require("jsonwebtoken");
import App from "../../email_templates/App";
import config from "../../config";
import { content_db, content_services } from "../contents";
import { email_db } from "../emails";
import { sendEmail } from "../orders/order_interactors";
import { account_created, announcement } from "../../email_templates/pages";
import verify from "../../email_templates/pages/verify";
import { domain } from "../../email_templates/email_template_helpers";

export const sendRegistrationEmail = async user => {
  try {
    const token = jwt.sign({ userId: user._id }, config.VERIFY_USER_TOKEN_SECRET, { expiresIn: "1h" });

    const mailOptions = {
      from: config.DISPLAY_INFO_EMAIL,
      to: user.email,
      subject: "Verify your Email",
      html: App({
        body: verify({
          title: "Verify your Email",
          url: `${domain()}?token=${token}`,
          user: user,
        }),

        unsubscribe: false,
      }),
    };

    await sendEmail("info", mailOptions);
  } catch (error) {
    console.error("Error sending order email:", error);
    throw new Error("Failed to send order email");
  }
};

export const sendEmailVerifiedSuccess = async user => {
  try {
    const contents = await content_services.current_contents_s();
    const mailOptions = {
      from: config.DISPLAY_INFO_EMAIL,
      to: user.email,
      subject: "Glow LEDs Account Created",
      html: App({
        body: account_created({
          user: user,
          categories: contents && contents[0]?.menus[0]?.menu_items,
          title: "Glow LEDs Account Created",
        }),

        unsubscribe: false,
      }),
    };
    await sendEmail("info", mailOptions);
  } catch (error) {
    console.error("Error sending email verified success:", error);
    throw new Error("Failed to send email verified success");
  }
};

export const sendAnnouncementEmail = async userEmail => {
  const email = await email_db.findById_emails_db("671670e88f0b721deae3f8ec");
  try {
    const mailOptions = {
      to: userEmail,
      from: config.DISPLAY_INFO_EMAIL,
      subject: email.subject,
      html: App({
        body: announcement(email),
        unsubscribe: true,
        header_footer_color: email.header_footer_color,
        background_color: email.background_color,
      }),
      headers: {
        "X-Priority": "1",
        "X-MSMail-Priority": "High",
        "Importance": "high",
        "X-Bulk-Email": "true",
      },
    };

    await sendEmail("info", mailOptions);
  } catch (error) {
    console.error("Error sending announcement email:", error);
    throw new Error("Failed to send announcement email");
  }
};
