import { userField } from "../../../shared/GlowLEDsComponents/GLForm/glFormHelpers";

export const paletteFormFields = ({ chips, users }) => {
  return {
    user: userField({ users }),
    chip: {
      type: "autocomplete_single",
      label: "Chip",
      options: chips,
      labelProp: "name",
    },
    name: {
      type: "text",
      label: "Name",
    },

    colors: {
      type: "text",
      label: "Colors",
      disabled: true,
    },

    active: {
      type: "checkbox",
      label: "Active",
    },
  };
};
