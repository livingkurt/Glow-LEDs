import { affiliateField, tagField } from "../../../shared/GlowLEDsComponents/GLForm/glFormHelpers";
import { toCapitalize } from "../../../utils/helper_functions";

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
    level: {
      type: "autocomplete_single",
      label: "Difficulty",
      getOptionLabel: option => {
        if (typeof option === "string") {
          return toCapitalize(option);
        }
      },
      options: ["beginner", "intermediate", "advanced"],
    },
    tags: tagField({ tags }),
    order: {
      type: "text",
      label: "Order",
    },
    active: {
      type: "checkbox",
      label: "Active",
    },
  };
};
