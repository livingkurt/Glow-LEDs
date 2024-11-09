import { userField } from "../../../shared/GlowLEDsComponents/GLForm/glFormHelpers";

export const paletteFormFields = ({ microlights, users }) => {
  return {
    user: userField({ users }),
    microlight: {
      type: "autocomplete_single",
      label: "Microlight",
      options: microlights,
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
