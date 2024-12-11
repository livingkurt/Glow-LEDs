import { tagField, userField } from "../../../shared/GlowLEDsComponents/GLForm/glFormHelpers";

export const articleFormFields = ({ users, tags, article }) => {
  return {
    author: userField({ users }),
    title: { type: "text", label: "Title" },
    short_description: { type: "text", label: "Short Description" },
    image: {
      type: "image_upload_single",
      label: "Thumbnail",
      album: `${article.title} Images`,
    },
    content: { type: "text_multiline", label: "Content" },
    images: {
      type: "image_upload_multiple",
      label: "Images",
      album: `${article.title} Images`,
    },
    order: {
      label: "Order",
      type: "number",
    },

    tags: tagField({ tags }),
    pathname: { type: "text", label: "Pathname" },
    active: {
      type: "checkbox",
      label: "Active",
    },
  };
};
