import { tableColors } from "../../shared/GlowLEDsComponents/GLTableV2/glTableHelpers";

export const determineEmailColors = content => {
  let result = tableColors.active;

  if (!content.active) {
    result = tableColors.waiting;
  }

  return result;
};

export const templates = [
  "account_created",
  "affiliate_onboard",
  "verify",
  "reset_password",
  "reset_password",
  "email_subscription",
  "order",
  "review",
  "affiliate",
  "feature",
  "contact",
  "contact_confirmation",
  "custom_contact",
];
