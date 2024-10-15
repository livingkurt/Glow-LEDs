export const ticketFormFields = ({ ticket, ticketsQuery }) => {
  return {
    title: {
      type: "text",
      label: "Title",
    },
    ticket_type: {
      type: "text",
      label: "Ticket Type",
    },
    count_in_stock: {
      type: "number",
      label: "Count in Stock",
    },
    finite_stock: {
      type: "checkbox",
      label: "Finite Stock",
      default: false,
    },
    max_display_quantity: {
      type: "number",
      label: "Max Display Quantity",
    },
    max_quantity: {
      type: "number",
      label: "Max Quantity",
    },
    image: {
      type: "image_upload",
      label: "Image",
      labelProp: "_id",
      album: `${ticket.title} Images`,
    },
    pathname: {
      type: "text",
      label: "Pathname",
    },
    price: {
      type: "number",
      label: "Price",
    },
    color: {
      type: "color_picker",
      label: "Color",
    },
    fact: {
      type: "text",
      label: "Fact",
    },
    short_description: {
      type: "text_multiline",
      label: "Short Description",
    },
    backup_ticket: {
      type: "autocomplete_single",
      label: "Backup Ticket",
      options: !ticketsQuery?.isLoading ? ticketsQuery?.data : [],
      loading: ticketsQuery?.isLoading,
      labelProp: "title",
    },
    active: {
      type: "checkbox",
      label: "Active",
      default: true,
    },
  };
};
