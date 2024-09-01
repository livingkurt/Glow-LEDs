import { tableColors } from "../../shared/GlowLEDsComponents/GLTableV2/glTableHelpers";

export const filamentFormFields = ({ categorys }) => {
  return {
    type: {
      type: "autocomplete_single",
      label: "Type",
      options: ["PETG", "TPU"],
      getOptionLabel: option => option,
    },
    color: {
      type: "text",
      label: "Color",
    },
    color_code: { type: "color_picker", label: "Color Code" },
    tags: {
      type: "autocomplete_multiple",
      label: "Tags",
      options: categorys?.filter(category => category.type === "filament_tags"),
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

  if (filament.type === "PETG") {
    result = tableColors.active;
  }
  if (filament.type === "TPU") {
    result = tableColors.alt_color_2;
  }
  return result;
};
