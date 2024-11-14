import { affiliateField, tagField, userField } from "../../../shared/GlowLEDsComponents/GLForm/glFormHelpers";
import { sharedItemSchema } from "../../../utils/helpers/universal_helpers";

export const cartFormFields = ({ products, users, affiliates, cart, events, tickets, tags }) => {
  return {
    title: {
      type: "text",
      label: "Title",
    },
    subtitle: {
      type: "text",
      label: "Subtitle",
    },
    short_description: {
      type: "text",
      label: "Short Description",
    },
    pathname: {
      type: "text",
      label: "Pathname",
    },
    images: {
      type: "image_upload_multiple",
      label: "Images",
      album: `${cart.title} Images`,
    },
    video: {
      type: "text",
      label: "Video",
    },
    user: userField({ users }),
    tags: tagField({ tags }),
    affiliate: affiliateField({ affiliates }),
    active: {
      type: "checkbox",
      label: "Active",
    },
    cartItems: sharedItemSchema({
      products,
      events,
      tickets,
      tags,
      itemType: "cart",
      item: cart,
    }),
  };
};
