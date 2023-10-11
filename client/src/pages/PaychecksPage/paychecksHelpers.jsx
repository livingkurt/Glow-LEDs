import { tableColors } from "../../shared/GlowLEDsComponents/GLTableV2/glTableHelpers";

export const determineColor = paycheck => {
  let result = "";
  if (paycheck.paid) {
    result = tableColors.active;
  }
  if (!paycheck.paid) {
    result = tableColors.inactive;
  }
  return result;
};
