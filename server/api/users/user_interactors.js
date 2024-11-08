import jwt from "jsonwebtoken";
import App from "../../email_templates/App.js";
import config from "../../config.js";
import content_services from "../contents/content_services.js";
import email_db from "../emails/email_db.js";
import { sendEmail } from "../emails/email_interactors.js";
import AccountCreatedTemplate from "../../email_templates/pages/AccountCreatedTemplate.js";
import AnnouncementTemplate from "../../email_templates/pages/AnnouncementTemplate.js";
import VerifyTemplate from "../../email_templates/pages/VerifyTemplate.js";
import { domain } from "../../email_templates/email_template_helpers.js";
import SuccessfulPasswordResetTemplate from "../../email_templates/pages/SuccessfulPasswordResetTemplate.js";
import VerifyEmailPasswordResetTemplate from "../../email_templates/pages/VerifyEmailPasswordResetTemplate.js";

export const sendRegistrationEmail = async user => {
  try {
    const token = jwt.sign({ userId: user._id }, config.VERIFY_USER_TOKEN_SECRET, { expiresIn: "1h" });

    const mailOptions = {
      from: config.DISPLAY_INFO_EMAIL,
      to: user.email,
      subject: "Verify your Email",
      html: App({
        body: VerifyTemplate({
          title: "Verify your Email",
          url: `${domain()}?token=${token}`,
          user: user,
        }),

        unsubscribe: false,
      }),
    };

    await sendEmail(mailOptions);
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
        body: AccountCreatedTemplate({
          user: user,
          categories: contents && contents[0]?.menus[0]?.menu_items,
          title: "Glow LEDs Account Created",
        }),

        unsubscribe: false,
      }),
    };
    await sendEmail(mailOptions);
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
        body: AnnouncementTemplate(email),
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

    await sendEmail(mailOptions);
  } catch (error) {
    console.error("Error sending announcement email:", error);
    throw new Error("Failed to send announcement email");
  }
};
export const sendPasswordResetSuccessEmail = async user => {
  try {
    const mailOptions = {
      from: config.DISPLAY_INFO_EMAIL,
      to: user.email,
      subject: "Successfully Changed Password",
      html: App({
        body: SuccessfulPasswordResetTemplate({
          first_name: user.first_name,
          title: "Successfully Changed Password",
        }),
        unsubscribe: false,
      }),
    };
    await sendEmail(mailOptions);
  } catch (error) {
    console.error("Error sending password reset success email:", error);
    throw new Error("Failed to send password reset success email");
  }
};

export const sendVerifyEmailPasswordResetSuccessEmail = async (user, resetToken) => {
  try {
    const url = `${domain()}/account/reset_password?token=${resetToken}`;

    const mailOptions = {
      from: config.DISPLAY_INFO_EMAIL,
      to: user.email,
      subject: "Glow LEDs Reset Password",
      html: App({
        body: VerifyEmailPasswordResetTemplate({
          first_name: user.first_name,
          email: user.email,
          url,
          title: "Glow LEDs Reset Password",
        }),
        unsubscribe: false,
      }),
    };

    await sendEmail(mailOptions);
  } catch (error) {
    console.error("Error sending password reset verification email:", error);
    throw new Error("Failed to send password reset verification email");
  }
};
