import email_services from "./email_services.js";

export default {
  get_table_emails_c: async (req, res) => {
    const { query } = req;
    try {
      const emails = await email_services.get_table_emails_s(query);
      if (emails) {
        return res.status(200).send(emails);
      }
      return res.status(404).send({ message: "Contents Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  findAll_emails_c: async (req, res) => {
    const { query } = req;
    try {
      const emails = await email_services.findAll_emails_s(query);
      if (emails) {
        return res.status(200).send(emails);
      }
      return res.status(404).send({ message: "Emails Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  findById_emails_c: async (req, res) => {
    const { params } = req;
    try {
      const email = await email_services.findById_emails_s(params);
      if (email) {
        return res.status(200).send(email);
      }
      return res.status(404).send({ message: "Email Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  create_emails_c: async (req, res) => {
    const { body } = req;
    try {
      const email = await email_services.create_emails_s(body);
      if (email) {
        return res.status(201).send(email);
      }
      return res.status(500).send({ message: "Error Creating Email" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  update_emails_c: async (req, res) => {
    const { params, body } = req;
    try {
      const email = await email_services.update_emails_s(params, body);
      if (email) {
        return res.status(200).send(email);
      }
      return res.status(500).send({ message: "Error Updating Email" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  remove_emails_c: async (req, res) => {
    const { params } = req;
    try {
      const email = await email_services.remove_emails_s(params);
      if (email) {
        return res.status(204).send({ message: "Email Deleted" });
      }
      return res.status(500).send({ message: "Error Deleting Email" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  get_invoice_emails_c: async (req, res) => {
    try {
      const recipient = await email_services.get_invoice_emails_s(req.body);
      res.status(200).send({ message: "Invoice Email Sent to " + recipient });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  send_order_emails_c: async (req, res) => {
    try {
      const recipient = await email_services.send_order_emails_s(req.body);
      res.status(200).send({ message: "Order Confirmation Email Sent to " + recipient });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  send_ticket_emails_c: async (req, res) => {
    try {
      const recipient = await email_services.send_ticket_emails_s(req.body);
      res.status(200).send({ message: "Ticket Email Sent to " + recipient });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  send_refund_emails_c: async (req, res) => {
    try {
      const recipient = await email_services.send_refund_emails_s(req.body);
      res.status(200).send({ message: "Refund Email Sent to " + recipient });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  send_order_status_emails_c: async (req, res) => {
    try {
      const recipient = await email_services.send_order_status_emails_s(req.body);
      res.status(200).send({ message: "Order Status Email Sent to " + recipient });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  send_current_stock_emails_c: async (req, res) => {
    try {
      const recipient = await email_services.send_current_stock_emails_s();
      res.status(200).send({ message: "Current Stock Email Sent to " + recipient });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  send_paycheck_emails_c: async (req, res) => {
    try {
      const recipient = await email_services.send_paycheck_emails_s(req.body);
      res.status(200).send({ message: "Paycheck Email Sent to " + recipient });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  affiliate_onboard_emails_c: async (req, res) => {
    try {
      const result = await email_services.affiliate_onboard_emails_s(req.body);
      res.status(200).send({ message: result });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  send_affiliate_emails_c: async (req, res) => {
    try {
      const recipient = await email_services.send_affiliate_emails_s(req.body);
      res.status(200).send({ message: "Affiliate Email Sent to " + recipient });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  send_feature_emails_c: async (req, res) => {
    try {
      const recipient = await email_services.send_feature_emails_s(req.body);
      res.status(200).send({ message: "Featured Email Sent to " + recipient });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  send_external_contact_emails_c: async (req, res) => {
    try {
      const recipient = await email_services.send_external_contact_emails_s(req.body);
      res.status(200).send({ message: "Contact Email Sent to " + recipient });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  send_contact_emails_c: async (req, res) => {
    try {
      const recipient = await email_services.send_contact_emails_s(req.body);
      console.log({ send_contact_emails_c: recipient });
      res.status(200).send({ message: "User Contact Email Sent to " + recipient });
    } catch (error) {
      console.log({ send_contact_emails_c: error });
      res.status(500).send({ error, message: error.message });
    }
  },
  send_custom_contact_emails_c: async (req, res) => {
    try {
      const recipient = await email_services.send_custom_contact_emails_s(req.body);
      res.status(200).send({ message: "Custom Contact Email Sent to " + recipient });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  send_verify_email_password_reset_emails_c: async (req, res) => {
    try {
      const recipient = await email_services.send_verify_email_password_reset_emails_s(req.body);
      res.status(200).send({ message: "Reset Password Link Email Sent to " + recipient });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
  send_successful_password_reset_emails_c: async (req, res) => {
    try {
      const recipient = await email_services.send_successful_password_reset_emails_s(req.body);
      res.status(200).send({ message: "Reset Password Email Sent to " + recipient });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  send_review_emails_c: async (req, res) => {
    try {
      const recipient = await email_services.send_review_emails_s(req.body);
      res.status(200).send({ message: "Email Sent to " + recipient });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  send_scheduled_emails_c: async (req, res) => {
    try {
      const result = await email_services.send_scheduled_emails_s();
      res.status(200).send({ message: result });
    } catch (error) {
      res.status(500).send({ message: "Error sending scheduled emails", error: error });
    }
  },
  send_announcement_emails_c: async (req, res) => {
    try {
      const result = await email_services.send_announcement_emails_s(req.params);
      res.status(200).send({ message: result });
    } catch (error) {
      res.status(500).send({ message: "Error sending announcement emails", error: error });
    }
  },
  view_announcement_emails_c: async (req, res) => {
    try {
      const result = await email_services.view_announcement_emails_s(req.body);
      if (result) {
        res.status(200).send(result);
      }
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  send_email_subscription_emails_c: async (req, res) => {
    try {
      const recipient = await email_services.send_email_subscription_emails_s(req.body);
      res.status(200).json({ message: "Email Sent to " + recipient });
    } catch (error) {
      if (error.message === "Email already exists") {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An error occurred", error: error.message });
      }
    }
  },
  send_account_created_emails_c: async (req, res) => {
    try {
      const recipient = await email_services.send_account_created_emails_s(req.body);
      res.status(200).send({ message: "Registration Email Sent to " + recipient });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  send_verified_emails_c: async (req, res) => {
    try {
      const recipient = await email_services.send_verified_emails_s(req.body);
      res.status(200).send({ message: "Verification Email Sent to " + recipient });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  send_shipping_status_emails_c: async (req, res) => {
    try {
      const result = await email_services.send_shipping_status_emails_s(req.body);
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send("Error processing shipping status");
    }
  },
  send_code_used_emails_c: async (req, res) => {
    try {
      const recipient = await email_services.send_code_used_emails_s(req.params);
      if (recipient) {
        res.status(200).send({ message: "Code Used Email sent to " + recipient });
      }
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
};
