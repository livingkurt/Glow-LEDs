import { userField } from "../../../shared/GlowLEDsComponents/GLForm/glFormHelpers";
import { sharedItemSchema } from "../../../utils/helpers/universal_helpers";

export const cartFormFields = ({ products, users, affiliates, cart, events, tickets, categorys }) => {
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
    user: userField({ users }),
    tags: {
      type: "autocomplete_multiple",
      label: "Tags",
      options: categorys,
      labelProp: "tags",
      getOptionLabel: option => `${option.pathname}`,
    },
    affiliate: {
      type: "autocomplete_single",
      label: "Affiliate",
      options: affiliates,
      labelProp: "affiliate",
      getOptionLabel: option => `${option.artist_name}`,
    },
    active: {
      type: "checkbox",
      label: "Active",
    },
    cartItems: sharedItemSchema({
      products,
      events,
      tickets,
      categorys,
      itemType: "cart",
      item: cart,
    }),
  };
};
