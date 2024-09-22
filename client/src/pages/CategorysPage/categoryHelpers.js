import { tableColors } from "../../shared/GlowLEDsComponents/GLTableV2/glTableHelpers";
import { toCapitalize } from "../../utils/helper_functions";

export const categoryFormFields = ({ categorys }) => {
  return {
    name: {
      type: "text",
      label: "Name",
      required: true,
    },
    type: {
      type: "autocomplete_single",
      label: "Category Type",
      getOptionLabel: option => {
        if (typeof option === "string") {
          return toCapitalize(option);
        }
      },
      options: ["category", "subcategory", "collection"],
    },
    subcategorys: {
      type: "autocomplete_multiple",
      label: "Subcategories",
      options: categorys, // populate with categories
      labelProp: "name",
    },
    collections: {
      type: "autocomplete_multiple",
      label: "Collections",
      options: categorys, // populate with categories
      labelProp: "name",
    },
    pathname: {
      type: "text",
      label: "Pathname",
    },
  };
};

export const categoryColors = [
  { name: "Category", color: tableColors.active },
  { name: "Subcategory", color: tableColors.alt_color_2 },
  { name: "Collection", color: tableColors.alt_color_1 },
];

export const determineCategoryColors = category => {
  let result = tableColors.active;

  if (category.type === "category") {
    result = tableColors.active;
  }
  if (category.type === "subcategory") {
    result = tableColors.alt_color_2;
  }
  if (category.type === "collection") {
    result = tableColors.alt_color_1;
  }

  return result;
};
