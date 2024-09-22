import { sharedItemSchema } from "../../../utils/helpers/universal_helpers";

export const cartFormFields = ({ productsQuery, users, cart, eventsQuery, ticketsQuery, categorysQuery }) => {
  return {
    user: {
      type: "autocomplete_single",
      label: "Users",
      options: users.filter(user => user.first_name && user.last_name),
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
