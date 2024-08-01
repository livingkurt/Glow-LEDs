import { tableColors } from "../../shared/GlowLEDsComponents/GLTableV2/glTableHelpers";

export const determineEmailColors = email => {
  let result = tableColors.waiting;

  if (email.status === "Sent") {
    result = tableColors.completed;
  }
  if (email.status === "Draft") {
    result = tableColors.active;
  }

  return result;
};

export const templates = [
  "account_created",
  "affiliate_onboard",
  "verify",
  "reset_password",
  "invoice",
  "email_subscription",
  "order",
  "order_status",
  "shipping_status",
  "review",
  "affiliate",
  "feature",
  "contact",
  "contact_confirmation",
  "custom_contact",
  "current_stock",
  "paycheck",
];
