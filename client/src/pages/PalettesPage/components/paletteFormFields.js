export const paletteFormFields = ({ chips, users }) => {
  return {
    user: {
      type: "autocomplete_single",
      label: "User",
      options: users.filter(user => user.first_name && user.last_name),
      labelProp: "user",
      getOptionLabel: option => `${option.first_name} ${option.last_name}`,
    },
    chip: {
      type: "autocomplete_single",
      label: "Chip",
      options: chips,
      labelProp: "name",
    },
    name: {
      type: "text",
      label: "Name",
    },

    colors: {
      type: "text",
      label: "Colors",
      disabled: true,
    },

    active: {
      type: "checkbox",
      label: "Active",
    },
  };
};
