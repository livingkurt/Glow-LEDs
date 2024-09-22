import { toCapitalize } from "../../../utils/helper_functions";

export const tutorialFormFields = ({ affiliatesQuery, tagsQuery }) => {
  return {
    affiliate: {
      type: "autocomplete_single",
      label: "Affiliate",
      options: !affiliatesQuery?.isLoading ? affiliatesQuery?.data : [],
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
    tags: {
      type: "autocomplete_multiple",
      label: "Tags",
      options: !tagsQuery?.isLoading ? tagsQuery?.data : [],
      labelProp: "name",
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
