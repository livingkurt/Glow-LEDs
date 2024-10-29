import { validateEmailBeforeSending } from "./email_management.js";

// Middleware to validate emails before sending
export const validateEmails = async (req, res, next) => {
  try {
    const emails = Array.isArray(req.body.to) ? req.body.to : [req.body.to];

    const validationResults = await Promise.all(
      emails.map(async email => {
        const result = await validateEmailBeforeSending(email);
        return {
          email,
          ...result,
        };
      })
    );

    const invalidEmails = validationResults.filter(result => !result.isValid);

    if (invalidEmails.length > 0) {
      return res.status(400).json({
        error: "Invalid email recipients",
        details: invalidEmails,
      });
    }

    next();
  } catch (error) {
    console.error("Error validating emails:", error);
    res.status(500).json({ error: "Error validating emails" });
  }
};

// Email validation utilities
export const emailValidationRules = {
  validateEmailFormat: email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  validateEmailDomain: async email => {
    try {
      const domain = email.split("@")[1];
      const hasMxRecord = await new Promise(resolve => {
        require("dns").resolveMx(domain, (err, addresses) => {
          resolve(!err && addresses && addresses.length > 0);
        });
      });
      return hasMxRecord;
    } catch (error) {
      console.error("Error validating email domain:", error);
      return false;
    }
  },
};
