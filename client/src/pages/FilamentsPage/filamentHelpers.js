import { tableColors } from "src/shared/GlowLEDsComponents/GLTableV2/glTableHelpers";

export const filamentFormFields = ({ categorys }) => {
  return {
    type: {
      type: "text",
      label: "Type",
    },
    color: {
      type: "text",
      label: "Color",
    },
    color_code: {
      type: "text",
      label: "Color Code",
    },
    category: {
      type: "autocomplete_single",
      label: "Category",
      options: categorys,
      labelProp: "name",
    },
    active: {
      type: "checkbox",
      label: "Active",
    },
  };
};

export const determineFilamentColors = filament => {
  let result = "";

  if (filament.type === "petg") {
    result = tableColors.active;
  }
  if (filament.type === "tpu") {
    result = tableColors.alt_color_2;
  }
  return result;
};
