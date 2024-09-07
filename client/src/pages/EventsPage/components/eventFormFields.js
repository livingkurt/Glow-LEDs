import { toCapitalize } from "../../../utils/helper_functions";

export const eventFormFields = ({ affiliates }) => {
  return {
    affiliate: {
      type: "autocomplete_single",
      label: "Affiliate",
      options: affiliates,
      labelProp: "artist_name",
    },
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
