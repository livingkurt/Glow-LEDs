import { tableColors } from "../../shared/GlowLEDsComponents/GLTableV2/glTableHelpers";

export const determineTagColors = tag => {
  return tag.active ? tableColors.active : tableColors.inactive;
};
