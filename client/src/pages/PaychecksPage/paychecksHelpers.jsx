import { tableColors } from "../../shared/GlowLEDsComponents/GLTableV2/glTableHelpers";

export const determine_color = paycheck => {
  let result = "";
  if (paycheck.paid) {
    result = tableColors.active;
  }
  if (!paycheck.paid) {
    result = tableColors.inactive;
  }
  return result;
};
