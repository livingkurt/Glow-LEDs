import { tableColors } from "../../shared/GlowLEDsComponents/GLTableV2/glTableHelpers";

export const determineContentColors = content => {
  let result = tableColors.active;

  if (!content.active) {
    result = tableColors.waiting;
  }

  return result;
};
