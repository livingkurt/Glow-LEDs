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
    ticket_type: {
      type: "text",
      label: "Ticket Type",
      required: true,
    },
    price: {
      type: "number",
      label: "Price",
      required: true,
    },
    fact: {
      type: "text",
      label: "Fact",
      required: true,
    },
    short_description: {
      type: "text",
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
