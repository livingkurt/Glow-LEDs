export const ticketFormFields = ({ eventsQuery, ticket }) => {
  return {
    event: {
      type: "autocomplete_single",
      label: "Event",
      options: !eventsQuery?.isLoading ? eventsQuery?.data : [],
      loading: eventsQuery?.isLoading,
      labelProp: "name",
    },
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
    image: {
      type: "image_upload",
      label: "Image",
      labelProp: "_id",
      album: `${ticket.name} Images`,
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
    active: {
      type: "checkbox",
      label: "Active",
      default: true,
    },
  };
};
