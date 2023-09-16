import axios from "axios";
import { create_query } from "./helper_functions";

const email_routes = {
  send_email_subscription: (email, promo_code) => {
    return axios.post("/api/emails/email_subscription", { email, promo_code });
  },
  send_order_email: (order: object, subject, email) => {
    return axios.post("/api/emails/order", { order, subject, email });
  },
  send_refund_email: (order: object, subject, email) => {
    return axios.post("/api/emails/refund", { order, subject, email });
  },
  send_order_status_email: (order: object, subject, email, status, message_to_user) => {
    return axios.post("/api/emails/order_status", {
      order,
      subject,
      email,
      status,
      message_to_user,
    });
  },
  send_affiliate_email: (affiliate: object, subject, email) => {
    return axios.post("/api/emails/affiliate", { affiliate, subject, email });
  },
  send_code_used_emails_a: (promo_code) => {
    return axios.post("/api/emails/code_used/" + promo_code);
  },
  send_feature_email: (feature: object, subject, email) => {
    return axios.post("/api/emails/feature", { feature, subject, email });
  },
  send_contact: (email, promo_code) => {
    return axios.post("/api/emails/contact", { email, promo_code });
  },
  send_custom_contact_email: (order, email) => {
    return axios.post("/api/emails/custom_contact", { order, email });
  },
  send_contact_confirmation: (email, promo_code) => {
    return axios.post("/api/emails/contact_confirmation", {
      email,
      promo_code,
    });
  },
  send_verify_email_password_reset: (email, promo_code) => {
    return axios.post("/api/emails/reset_password", { email, promo_code });
  },
  send_successful_password_reset: (email, promo_code) => {
    return axios.post("/api/emails/reset_password", { email, promo_code });
  },
  send_verified: (email, promo_code) => {
    return axios.post("/api/emails/account_created", { email, promo_code });
  },
  send_announcement_email: (template, subject, test, time) => {
    return axios.post("/api/emails/announcement", {
      template,
      subject,
      test,
      time,
    });
  },
  view_announcement_email: (template) => {
    return axios.post("/api/emails/view_announcement", { template });
  },
  send_email: (template, subject, email) => {
    return axios.post("/api/emails/send_email", { template, subject, email });
  },

  save_html: (template, email, access_token) => {
    email = { ...email, html: template };
    return axios.put("/api/emails/" + email._id, email, {
      headers: {
        Authorization: "Bearer " + access_token,
      },
    });
  },
  // not_verified_email: (current_user) => {
  //
  // 	return axios.post('/api/emails/notverified', current_user);
  // },
  print_invoice: (order) => {
    //
    return axios.post("/api/emails/invoice", order);
  },
  get_email: (email_id) => {
    return axios.get("/api/emails/" + email_id);
  },
  get_last_active_email: () => {
    return axios.get("/api/emails/?" + create_query({ active: true, sort: "newest", limit: 1 }));
  },
  get_content: (content_id) => {
    return axios.get("/api/contents/" + content_id);
  },
};

export default email_routes;
