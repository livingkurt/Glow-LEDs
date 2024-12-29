import { determine_filter, format_date, toCapitalize, make_private_code } from "../../utils/util.js";
import user_db from "../users/user_db.js";
import email_db from "./email_db.js";
import config from "../../config.js";
import { getFilteredData } from "../api_helpers.js";
import { normalizeEmailFilters, normalizeEmailSearch } from "./email_helpers.js";
import App from "../../email_templates/App.js";
import OrderTemplate from "../../email_templates/pages/OrderTemplate.js";
import TicketTemplate from "../../email_templates/pages/TicketTemplate.js";
import {
  generateTicketQRCodes,
  sendEmail,
  determine_status,
  shouldSendEmail,
  updateOrder,
} from "./email_interactors.js";
import order_db from "../orders/order_db.js";
import OrderStatusTemplate from "../../email_templates/pages/OrderStatusTemplate.js";
import product_db from "../products/product_db.js";
import CurrentStockTemplate from "../../email_templates/pages/CurrentStockTemplate.js";
import PaycheckTemplate from "../../email_templates/pages/PaycheckTemplate.js";
import AffiliateOnboardingTemplate from "../../email_templates/pages/AffiliateOnboardingTemplate.js";
import AffiliateTemplate from "../../email_templates/pages/AffiliateTemplate.js";
import FeatureTemplate from "../../email_templates/pages/FeatureTemplate.js";
import ContactTemplate from "../../email_templates/pages/ContactTemplate.js";
import ContactConfirmationTemplate from "../../email_templates/pages/ContactConfirmationTemplate.js";
import CustomContactTemplate from "../../email_templates/pages/CustomContactTemplate.js";
import jwt from "jsonwebtoken";
import { domain } from "../../email_templates/email_template_helpers.js";
import VerifyEmailPasswordResetTemplate from "../../email_templates/pages/VerifyEmailPasswordResetTemplate.js";
import SuccessfulPasswordResetTemplate from "../../email_templates/pages/SuccessfulPasswordResetTemplate.js";
import content_db from "../contents/content_db.js";
import ReviewTemplate from "../../email_templates/pages/ReviewTemplate.js";
import Email from "./email.js";
import AnnouncementTemplate from "../../email_templates/pages/AnnouncementTemplate.js";
import promo_db from "../promos/promo_db.js";
import EmailSubscriptionTemplate from "../../email_templates/pages/EmailSubscriptionTemplate.js";
import AccountCreatedTemplate from "../../email_templates/pages/AccountCreatedTemplate.js";
import VerifyTemplate from "../../email_templates/pages/VerifyTemplate.js";
import ShippingStatusTemplate from "../../email_templates/pages/ShippingStatusTemplate.js";
import team_db from "../teams/team_db.js";
import Affiliate from "../affiliates/affiliate.js";
import User from "../users/user.js";
import order_services from "../orders/order_services.js";
import CodeUsedTemplate from "../../email_templates/pages/CodeUsedTemplate.js";
import ReturnLabelTemplate from "../../email_templates/pages/ReturnLabelTemplate.js";
import { determineRevenueTier } from "../affiliates/affiliate_helpers.js";

export default {
  get_table_emails_s: async query => {
    try {
      const sort_options = ["createdAt", "active", "h1", "h2"];
      const { filter, sort, limit, page } = getFilteredData({
        query,
        sort_options,
        normalizeFilters: normalizeEmailFilters,
        normalizeSearch: normalizeEmailSearch,
      });
      const emails = await email_db.findAll_emails_db(filter, sort, limit, page);
      const count = await email_db.count_emails_db(filter);
      return {
        data: emails,
        total_count: count,
        currentPage: page,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findAll_emails_s: async query => {
    try {
      const page = query.page ? query.page : "1";
      const limit = query.limit ? query.limit : "0";
      const search = query.search
        ? {
            email_type: {
              $regex: query.search,
              $options: "i",
            },
          }
        : {};
      const filter = determine_filter(query, search);
      const sort_query = query.sort && query.sort.toLowerCase();
      let sort = { _id: -1 };
      if (sort_query === "email type") {
        sort = { email_type: 1 };
      } else if (sort_query === "newest") {
        sort = { _id: -1 };
      }

      const emails = await email_db.findAll_emails_db(filter, sort, limit, page);
      const count = await email_db.count_emails_db(filter);
      if (count !== undefined) {
        return {
          emails,
          totalPages: Math.ceil(count / parseInt(limit, 10)),
          currentPage: page,
        };
      } else {
        throw new Error("Count is undefined");
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_emails_s: async params => {
    try {
      return await email_db.findById_emails_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_emails_s: async body => {
    try {
      return await email_db.create_emails_db(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_emails_s: async (params, body) => {
    try {
      return await email_db.update_emails_db(params.id, body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_emails_s: async params => {
    try {
      return await email_db.remove_emails_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  get_invoice_emails_s: async body => {
    const emailBody = {
      email: {
        h1: "Thank you for your Order!",
        h2: "We are starting production on your order! We will notify your as your order progresses.",
      },
      title: "Thank you for your purchase!",
      order: body.order,
    };
    const mailOptions = {
      from: config.DISPLAY_INFO_EMAIL,
      to: body.email,
      subject: body.subject,
      html: App({ body: OrderTemplate(emailBody), unsubscribe: false }),
    };
    await sendEmail(mailOptions);
    return body.email;
  },
  send_order_emails_s: async body => {
    const { order, email, subject } = body;
    const orderData = await order_db.findById_orders_db(order._id);
    const bodyConfirmation = {
      email: {
        h1: "YOUR ORDER HAS BEEN PLACED! 🎉",
        h2: "We are starting production on your order! We will notify your as your order progresses.",
      },
      title: "Thank you for your purchase!",
      order: orderData,
    };
    const mailOptions = {
      from: config.DISPLAY_INFO_EMAIL,
      to: email,
      subject,
      html: App({ body: OrderTemplate(bodyConfirmation), unsubscribe: false }),
    };
    await sendEmail(mailOptions);
    return email;
  },
  send_ticket_emails_s: async ({ order, email }) => {
    const orderData = await order_db.findById_orders_db(order._id);
    const ticketQRCodes = await generateTicketQRCodes(orderData);
    const bodyTickets = {
      email: {
        h1: "YOUR EVENT TICKETS",
        h2: "Here are your QR codes for event entry.",
      },
      title: "Your Event Tickets",
      order: orderData,
      ticketQRCodes,
    };
    const mailOptions = {
      from: config.DISPLAY_INFO_EMAIL,
      to: email,
      subject: "Your Event Tickets",
      html: App({ body: TicketTemplate(bodyTickets), unsubscribe: false }),
    };
    if (order.orderItems.every(item => item.itemType === "ticket")) {
      await order_db.update_orders_db(order._id, { status: "delivered", deliveredAt: new Date() });
    }
    await sendEmail(mailOptions);
    return email;
  },
  send_refund_emails_s: async ({ order, email }) => {
    const body = {
      email: {
        h1: `${
          order.payment.refund.reduce((a, c) => a + c.amount, 0) / 100 < order.itemsPrice ? "Partial" : "Full"
        } Refund Successful`,
        h2: `Your Order has been refunded for ${" "}
          ${order.payment.refund_reason[order.payment.refund_reason.length - 1]} on ${format_date(
            order.refundedAt
          )}. You're payment will show up in your bank account between 5-10 business days. Please let us know if you have any questions about this process.`,
      },
      title: "Thank you for your purchase!",
      order,
    };
    const mailOptions = {
      from: config.DISPLAY_INFO_EMAIL,
      to: email,
      subject: "Your Glow LEDs Refund",
      html: App({ body: OrderTemplate(body), unsubscribe: false }),
    };
    await sendEmail(mailOptions);
    return email;
  },
  send_order_status_emails_s: async ({ order, status, email, message_to_user, subject }) => {
    const body = {
      email: {
        h1: "Thank you for your Order!",
        h2: "We are starting production on your order! We will notify your as your order progresses.",
      },
      title: `Your Order has been ${toCapitalize(status)}`,
      order,
      status,
      message_to_user,
    };
    const mailOptions = {
      from: config.DISPLAY_INFO_EMAIL,
      to: email,
      subject: status === "reassured" ? "Thank you for your patience" : subject,
      html: App({
        body: OrderStatusTemplate(body),
        unsubscribe: false,
      }),
    };
    await sendEmail(mailOptions);
    return email;
  },
  send_current_stock_emails_s: async () => {
    const data = await product_db.current_stock_products_db();
    const mailOptions = {
      from: config.DISPLAY_INFO_EMAIL,
      to: config.INFO_EMAIL,
      subject: "Glow LEDs Current Stock",
      html: App({
        body: CurrentStockTemplate(data),
      }),
    };
    await sendEmail(mailOptions);
    return config.INFO_EMAIL;
  },
  send_paycheck_emails_s: async ({ email, subject, ...rest }) => {
    const mailOptions = {
      from: config.DISPLAY_INFO_EMAIL,
      to: email,
      subject,
      html: App({
        body: PaycheckTemplate(rest),
      }),
    };
    await sendEmail(mailOptions);
    return email;
  },
  affiliate_onboard_emails_s: async ({ userIds }) => {
    for (const id of userIds) {
      await user_db.update_users_db(id, { is_affiliated: true });
      const data = await user_db.findById_users_db(id);
      const mailOptions = {
        from: config.DISPLAY_INFO_EMAIL,
        to: data.email,
        subject: "Congratulations! Lets get you started!",
        html: AffiliateOnboardingTemplate(data),
      };
      await sendEmail(mailOptions);
    }
    return "Affiliate onboarding emails sent successfully";
  },
  send_affiliate_emails_s: async ({ affiliate, email, subject }) => {
    const body = {
      affiliate,
      title: "Thank you for signing up!",
    };
    const mailOptions = {
      from: config.DISPLAY_INFO_EMAIL,
      to: email,
      subject,
      html: App({ body: AffiliateTemplate(body), unsubscribe: false }),
    };
    await sendEmail(mailOptions);
    return email;
  },
  send_feature_emails_s: async ({ feature, email, subject }) => {
    const body = {
      feature,
      title: "Thank you for sending us your art!",
    };
    const mailOptions = {
      from: config.DISPLAY_INFO_EMAIL,
      to: email,
      subject,
      html: App({
        body: FeatureTemplate(body),
        unsubscribe: false,
      }),
    };
    await sendEmail(mailOptions);
    return email;
  },
  send_external_contact_emails_s: async ({ email, subject, name, message }) => {
    const mailOptions = {
      to: config.LOGIN_EMAIL,
      from: email,
      subject: `${subject} - ${name}`,
      html: message,
    };
    await sendEmail(mailOptions);
    return name;
  },
  send_contact_emails_s: async ({ email, first_name, reason_for_contact, ...rest }) => {
    const adminMailOptions = {
      to: config.DISPLAY_CONTACT_EMAIL,
      from: config.DISPLAY_INFO_EMAIL,
      replyTo: email,
      subject: `New message from ${first_name} - ${reason_for_contact}`,
      html: ContactTemplate({ email, first_name, reason_for_contact, ...rest }),
    };
    await sendEmail(adminMailOptions);

    const userMailOptions = {
      to: email,
      from: config.DISPLAY_INFO_EMAIL,
      replyTo: config.DISPLAY_CONTACT_EMAIL,
      subject: "Thank you for Contacting Glow LEDs Support",
      html: ContactConfirmationTemplate({ email, first_name, ...rest }),
    };
    await sendEmail(userMailOptions);
    return first_name;
  },

  send_custom_contact_emails_s: async ({ order, email }) => {
    const mailOptions = {
      from: config.DISPLAY_INFO_EMAIL,
      to: email,
      subject: "Thank you for ordering a custom Glow LEDs Product!",
      html: CustomContactTemplate({ order }),
    };
    await sendEmail(mailOptions);
    return order.shipping.first_name;
  },
  send_verify_email_password_reset_emails_s: async ({ email, ...rest }) => {
    const user = await user_db.findByEmail_users_db(email);
    if (!user) {
      throw new Error("You do not have an account with us");
    }
    const resetToken = jwt.sign({ email }, config.RESET_PASSWORD_TOKEN_SECRET, { expiresIn: "1h" });
    const url = `${domain()}/account/reset_password?reset_token=${resetToken}`;
    const mailOptions = {
      from: config.DISPLAY_INFO_EMAIL,
      to: email,
      subject: "Glow LEDs Reset Password",
      html: App({
        body: VerifyEmailPasswordResetTemplate({
          ...rest,
          email,
          url,
          title: "Glow LEDs Reset Password",
        }),
        unsubscribe: false,
      }),
    };
    await sendEmail(mailOptions);
    return user.first_name;
  },
  send_successful_password_reset_emails_s: async ({ email, first_name, ...rest }) => {
    const mailOptions = {
      from: config.DISPLAY_INFO_EMAIL,
      to: email,
      subject: "Glow LEDs Reset Password",
      html: App({
        body: SuccessfulPasswordResetTemplate({
          email,
          first_name,
          ...rest,
          title: "Glow LEDs Reset Password",
        }),
        unsubscribe: false,
      }),
    };
    await sendEmail(mailOptions);
    return first_name;
  },
  send_review_emails_s: async ({ email, ...rest }) => {
    const contents = await content_db.findAll_contents_db({ deleted: false }, { _id: -1 }, "0", "1");
    const mailOptions = {
      from: config.DISPLAY_INFO_EMAIL,
      to: email,
      subject: "Enjoy 10% off your next purchase!",
      html: App({
        body: ReviewTemplate({
          ...rest,
          email,
          categories: contents && contents[0].home_page?.slideshow,
          title: "Enjoy 10% off your next purchase!",
        }),
        unsubscribe: false,
      }),
    };
    await sendEmail(mailOptions);
    return email;
  },
  send_scheduled_emails_s: async () => {
    const currentUTCTime = new Date();

    const emailsToSend = await Email.find({
      status: "Scheduled",
      scheduled_at: { $lte: currentUTCTime }, // Compare against UTC time
      active: true,
      deleted: false,
    });
    const subscribed_users = await user_db.findAll_users_db({ deleted: false, email_subscription: true }, {}, "0", "1");
    const emailAddresses = subscribed_users.map(user => user.email);

    for (const email of emailsToSend) {
      // Split emails into batches of 1000 (leaving some buffer below the 1500 limit)
      const batchSize = 1000;
      const emailBatches = [];
      for (let i = 0; i < emailAddresses.length; i += batchSize) {
        emailBatches.push(emailAddresses.slice(i, i + batchSize));
      }

      // Send emails in batches
      let totalSent = 0;
      for (const batch of emailBatches) {
        const mailOptions = {
          bcc: batch,
          from: config.DISPLAY_INFO_EMAIL,
          replyTo: null,
          headers: {
            "X-Auto-Response-Suppress": "All",
            "Precedence": "bulk",
            "Auto-Submitted": "auto-generated",
          },
          subject: email.subject,
          html: App({
            body: AnnouncementTemplate(email),
            unsubscribe: true,
            header_footer_color: email.header_footer_color,
            background_color: email.background_color,
          }),
        };

        await sendEmail(mailOptions);
        totalSent += batch.length;
        console.log(
          `Batch of ${batch.length} emails sent successfully. Total sent so far: ${totalSent} out of ${emailAddresses.length}`
        );

        // Optional: Add a small delay between batches to prevent rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      console.log(`All announcement emails sent successfully to ${emailAddresses.length} recipients`);
      email.status = "Sent";
      await email.save();
    }
    return "Scheduled emails processed successfully";
  },
  send_announcement_emails_s: async ({ id, test }) => {
    const email = await email_db.findById_emails_db(id);
    const emailAddresses =
      test === "true"
        ? ["lavacquek@icloud.com", "destanyesalinas@gmail.com", "kevcablay@gmail.com", "codychau122@gmail.com"]
        : (await user_db.findAll_users_db({ deleted: false, email_subscription: true }, {}, "0", "1")).map(
            user => user.email
          );

    // Split emails into batches of 1000 (leaving some buffer below the 1500 limit)
    const batchSize = 1000;
    const emailBatches = [];
    for (let i = 0; i < emailAddresses.length; i += batchSize) {
      emailBatches.push(emailAddresses.slice(i, i + batchSize));
    }

    // Send emails in batches
    let totalSent = 0;
    for (const batch of emailBatches) {
      const mailOptions = {
        bcc: batch,
        from: config.DISPLAY_INFO_EMAIL,
        replyTo: null,
        headers: {
          "X-Auto-Response-Suppress": "All",
          "Precedence": "bulk",
          "Auto-Submitted": "auto-generated",
        },
        subject: test === "true" ? `TEST ${email.subject}` : email.subject,
        html: App({
          body: AnnouncementTemplate(email),
          unsubscribe: true,
          header_footer_color: email.header_footer_color,
          background_color: email.background_color,
        }),
      };

      await sendEmail(mailOptions);
      totalSent += batch.length;
      console.log(
        `Batch of ${batch.length} emails sent successfully. Total sent so far: ${totalSent} out of ${emailAddresses.length}`
      );

      // Optional: Add a small delay between batches to prevent rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log(`All announcement emails sent successfully to ${emailAddresses.length} recipients`);
    email.status = "Sent";
    await email.save();
    return "Announcement emails sent successfully";
  },
  view_announcement_emails_s: async ({ template }) => {
    if (Object.keys(template).length > 2) {
      return App({
        body: AnnouncementTemplate(template),
        unsubscribe: true,
        background_color: template.background_color,
        header_footer_color: template.header_footer_color,
      });
    }
  },
  send_email_subscription_emails_s: async ({ email }) => {
    const user = await user_db.findByEmail_users_db(email);
    if (user) {
      throw new Error("Email already exists");
    }

    await user_db.create_users_db({
      email,
      _id: null,
      first_name: "",
      last_name: "",
      affiliate: null,
      is_affiliated: false,
      isVerified: true,
      isAdmin: false,
      email_subscription: true,
      shipping: {},
    });

    const contents = await content_db.findAll_contents_db({ deleted: false }, { _id: -1 }, "0", "1");
    const code = make_private_code(5);
    await promo_db.create_promos_db({
      promo_code: code,
      admin_only: false,
      sponsor_only: false,
      single_use: true,
      used_once: false,
      excluded_categories: [],
      included_products: [],
      percentage_off: 10,
      amount_off: 0,
      free_shipping: false,
      active: true,
    });

    const mailOptions = {
      from: config.DISPLAY_INFO_EMAIL,
      to: email,
      subject: "Enjoy 10% off your next purchase!",
      html: App({
        body: EmailSubscriptionTemplate({
          email,
          categories: contents && contents[0]?.menus[0]?.menu_items,
          title: "Enjoy 10% off your next purchase!",
          promo_code: code,
        }),
        unsubscribe: true,
      }),
    };

    await sendEmail(mailOptions);
    return email;
  },
  send_account_created_emails_s: async ({ email, first_name, ...rest }) => {
    const contents = await content_db.findAll_contents_db({ deleted: false }, { _id: -1 }, "10", "2");
    const mailOptions = {
      from: config.DISPLAY_INFO_EMAIL,
      to: email,
      subject: "Glow LEDs Account Created",
      html: App({
        body: AccountCreatedTemplate({
          user: { email, first_name, ...rest },
          categories: contents && contents[0]?.menus[0]?.menu_items,
          title: "Glow LEDs Account Created",
        }),
        unsubscribe: false,
      }),
    };
    await sendEmail(mailOptions);
    return first_name;
  },
  send_verified_emails_s: async ({ email, first_name }) => {
    const user = await user_db.findByEmail_users_db(email);
    const token = jwt.sign({ userId: user._id }, config.VERIFY_USER_TOKEN_SECRET, { expiresIn: "1h" });
    const mailOptions = {
      from: config.DISPLAY_INFO_EMAIL,
      to: email,
      subject: "Verify your Email",
      html: App({
        body: VerifyTemplate({
          title: "Verify your Email",
          url: `${domain()}?token=${token}`,
          user,
        }),
        unsubscribe: false,
      }),
    };
    await sendEmail(mailOptions);
    return first_name;
  },
  send_shipping_status_emails_s: async event => {
    if (event.object === "Event" && event.description === "tracker.updated") {
      const tracker = event.result;
      const order = await order_db.findBy_orders_db({ tracking_number: tracker.tracking_code, deleted: false });

      if (shouldSendEmail(tracker.status, order.status)) {
        const body = {
          email: {},
          title: determine_status(tracker.status),
          order,
          status: tracker.status,
          tracker,
        };
        const mailOptions = {
          from: config.DISPLAY_INFO_EMAIL,
          to: order.shipping.email,
          subject: determine_status(tracker.status),
          html: App({
            body: ShippingStatusTemplate(body),
            unsubscribe: false,
          }),
        };
        await sendEmail(mailOptions);
      }

      if (tracker.status === "delivered") {
        await updateOrder("delivered", order);
      } else if (tracker.status === "out_for_delivery") {
        await updateOrder("out_for_delivery", order);
      } else if (tracker.status === "in_transit") {
        if (order.status === "packaged") {
          await updateOrder("in_transit", order);
        }
      }
      return "Tracker event processed successfully";
    }
    return "Not a Tracker event, so nothing to do here for now...";
  },
  send_code_used_emails_s: async ({ promo_code }) => {
    const today = new Date();
    const first_of_month = new Date(today.getFullYear(), today.getMonth(), 1);
    const promo = await promo_db.findBy_promos_db({ promo_code, deleted: false });

    if (!promo) {
      return;
    }

    let mailRecipients = [];
    let mailSubject = "";
    let mailBodyData = {};

    if (promo_code === "inkybois") {
      const team = await team_db.findBy_teams_db({ promo_code, deleted: false });
      if (team) {
        const users = await Promise.all(
          team.affiliates.map(async affiliate_id => {
            const affiliate = await Affiliate.findOne({ _id: affiliate_id._id.toString(), deleted: false });
            const users = await User.find({ deleted: false, is_affiliated: true });
            return users.find(user => user?.affiliate?.toString() === affiliate._id.toString());
          })
        );
        mailRecipients = users.map(user => user.email);
        mailSubject = "Your team's code was just used!";
        const stats = await order_services.code_usage_orders_s(
          { promo_code },
          { start_date: first_of_month, end_date: today }
        );
        mailBodyData = {
          name: team.team_name,
          promo_code,
          percentage_off: null,
          number_of_uses: stats.number_of_uses,
          earnings: team.sponsor ? stats.revenue * 0.15 : stats.revenue * 0.1,
        };
      }
    } else {
      const affiliates = await Affiliate.find({ deleted: false });
      const affiliate = affiliates.find(affiliate => affiliate.public_code.toString() === promo._id.toString());

      if (affiliate) {
        const users = await User.find({ deleted: false, is_affiliated: true });
        const user = users.find(user => user?.affiliate?.toString() === affiliate._id.toString());
        mailRecipients = [user.email];
        mailSubject = "Your code was just used!";
        const stats = await order_services.code_usage_orders_s(
          { promo_code },
          { start_date: first_of_month, end_date: today, sponsor: affiliate.artist_name }
        );
        mailBodyData = {
          name: affiliate.artist_name,
          promo_code,
          percentage_off: determineRevenueTier(affiliate, stats.revenue),
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
        html: App({
          body: CodeUsedTemplate(mailBodyData),
          unsubscribe: false,
        }),
      };
      await sendEmail(mailOptions);
      return mailRecipients.join(", ");
    }
  },
  send_return_label_emails_s: async ({ order, exchangeItems, returnItems }) => {
    const mailOptions = {
      from: config.DISPLAY_INFO_EMAIL,
      to: order.shipping.email,
      subject: "Your Return Shipping Label",
      html: App({
        body: ReturnLabelTemplate({
          order,
        }),
        unsubscribe: false,
      }),
    };
    await sendEmail(mailOptions);
    return order.shipping.email;
  },
};
