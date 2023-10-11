import { tableColors } from "../../shared/GlowLEDsComponents/GLTableV2/glTableHelpers";

export const determineColor = cart => {
  let result = "";
  if (cart.active) {
    result = tableColors.active;
  }
  if (!cart.active) {
    result = tableColors.inactive;
  }
  return result;
};
