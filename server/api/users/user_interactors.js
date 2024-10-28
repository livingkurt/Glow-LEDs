import jwt from "jsonwebtoken";
import App from "../../email_templates/App.js";
import config from "../../config.js";
import content_services from "../contents/content_services.js";
import email_db from "../emails/email_db.js";
import { sendEmail } from "../orders/order_interactors.js";
import account_created from "../../email_templates/pages/account_created.js";
import announcement from "../../email_templates/pages/announcement.js";
import verify from "../../email_templates/pages/verify.js";
import { domain } from "../../email_templates/email_template_helpers.js";
import successful_password_reset from "../../email_templates/pages/successful_password_reset.js";
import verify_email_password_reset from "../../email_templates/pages/verify_email_password_reset.js";

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
export const sendPasswordResetSuccessEmail = async user => {
  try {
    const mailOptions = {
      from: config.DISPLAY_INFO_EMAIL,
      to: user.email,
      subject: "Successfully Changed Password",
      html: App({
        body: successful_password_reset({
          first_name: user.first_name,
          title: "Successfully Changed Password",
        }),
        unsubscribe: false,
      }),
    };
    await sendEmail("info", mailOptions);
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
        body: verify_email_password_reset({
          first_name: user.first_name,
          email: user.email,
          url,
          title: "Glow LEDs Reset Password",
        }),
        unsubscribe: false,
      }),
    };

    await sendEmail("info", mailOptions);
  } catch (error) {
    console.error("Error sending password reset verification email:", error);
    throw new Error("Failed to send password reset verification email");
  }
};
