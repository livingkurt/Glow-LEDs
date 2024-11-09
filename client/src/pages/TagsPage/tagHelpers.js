import { tableColors } from "../../shared/GlowLEDsComponents/GLTableV2/glTableHelpers";

export const tagFormFields = () => {
  return {
    name: {
      type: "text",
      label: "Name",
      required: true,
    },
    pathname: {
      type: "text",
      label: "Pathname",
    },
    active: {
      type: "checkbox",
      label: "Active",
    },
  };
};

export const determineTagColors = tag => {
  return tag.active ? tableColors.active : tableColors.inactive;
};
