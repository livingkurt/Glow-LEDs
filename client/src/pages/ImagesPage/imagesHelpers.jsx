import { tableColors } from "../../shared/GlowLEDsComponents/GLTableV2/glTableHelpers";

export const determine_color = image => {
  let result = "";
  if (image.paid) {
    result = tableColors.active;
  }
  if (!image.paid) {
    result = tableColors.inactive;
  }
  return result;
};
