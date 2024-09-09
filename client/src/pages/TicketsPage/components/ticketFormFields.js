export const ticketFormFields = ({ eventsQuery }) => {
  return {
    event: {
      type: "autocomplete_single",
      label: "Event",
      options: !eventsQuery?.isLoading ? eventsQuery?.data : [],
      loading: eventsQuery?.isLoading,
      labelProp: "name",
      required: true,
    },
    title: {
      type: "text",
      label: "Title",
      required: true,
    },
    ticket_type: {
      type: "text",
      label: "Ticket Type",
      required: true,
    },
    pathname: {
      type: "text",
      label: "Pathname",
      required: true,
    },
    price: {
      type: "number",
      label: "Price",
      required: true,
    },
    color: {
      type: "color_picker",
      label: "Color",
      required: true,
    },
    fact: {
      type: "text",
      label: "Fact",
      required: true,
    },
    short_description: {
      type: "text_multiline",
      label: "Short Description",
      required: true,
    },
    active: {
      type: "checkbox",
      label: "Active",
      default: true,
    },
  };
};
