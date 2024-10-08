import { sharedItemSchema } from "../../../utils/helpers/universal_helpers";

export const cartFormFields = ({ productsQuery, userQuery, cart, eventsQuery, ticketsQuery, categorysQuery }) => {
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
    user: {
      type: "autocomplete_single",
      label: "Users",
      options: !userQuery.isLoading ? userQuery?.data?.filter(user => user.first_name && user.last_name) : [],
      labelProp: "user",
      getOptionLabel: option => `${option.first_name} ${option.last_name}`,
    },
    active: {
      type: "checkbox",
      label: "Active",
    },

    cartItems: sharedItemSchema({
      productsQuery,
      eventsQuery,
      ticketsQuery,
      categorysQuery,
      itemType: "cart",
      item: cart,
    }),
  };
};
