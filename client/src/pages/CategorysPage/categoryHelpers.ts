export const categoryFormFields = ({ categorys }: { categorys: any }) => {
  return {
    name: {
      type: "text",
      label: "Name",
      required: true
    },
    pathname: {
      type: "text",
      label: "Pathname"
    },
    nest_level: {
      type: "number",
      label: "Nest Level"
    },
    display_order: {
      type: "number",
      label: "Display Order"
    },
    subcategorys: {
      type: "autocomplete_multiple",
      label: "Subcategories",
      options: categorys, // populate with categories
      labelProp: "name"
    },
    display: {
      type: "checkbox",
      label: "Display",
      default: true
    },
    meta_title: {
      type: "text",
      label: "Meta Title"
    },
    meta_description: {
      type: "text_multiline",
      label: "Meta Description"
    },
    meta_keywords: {
      type: "text_multiline",
      label: "Meta Keywords"
    },
    masthead: {
      type: "checkbox",
      label: "Masthead",
      default: false
    }
  };
};
