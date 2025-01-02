import {
  affiliateField,
  stringAutocompleteField,
  tagField,
} from "../../../shared/GlowLEDsComponents/GLForm/glFormHelpers";

export const tutorialFormFields = ({ affiliates, tags }) => {
  return {
    affiliate: affiliateField({ affiliates }),
    title: {
      type: "text",
      label: "Title",
    },
    video: {
      type: "text",
      label: "Video",
    },
    description: {
      type: "text_multiline",
      label: "Description",
    },
    level: stringAutocompleteField({
      options: ["beginner", "intermediate", "advanced"],
      label: "Difficulty",
    }),
    tags: tagField({ tags }),
    order: {
      label: "Order",
      type: "number",
    },
    active: {
      type: "checkbox",
      label: "Active",
    },
  };
};
