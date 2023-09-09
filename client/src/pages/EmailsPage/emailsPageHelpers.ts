import { tableColors } from "../../shared/GlowLEDsComponents/GLTableV2/glTableHelpers";

export const determineEmailColors = (content: any) => {
  let result = tableColors.active;

  if (!content.active) {
    result = tableColors.waiting;
  }

  return result;
};

export const templates = [
  "account_created",
  "reset_password",
  "password_reset",
  "email_subscription",
  "order",
  "review",
  "affiliate",
  "feature",
  "contact",
  "contact_confirmation",
  "custom_contact",
  "account_created",
];
