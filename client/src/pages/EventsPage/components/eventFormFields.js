export const eventFormFields = () => {
  return {
    name: {
      type: "text",
      label: "Event Name",
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
    start_date: {
      type: "date",
      label: "Start Date",
    },
    end_date: {
      type: "date",
      label: "End Date",
    },
    location: {
      type: "text",
      label: "Location",
    },
    active: {
      type: "checkbox",
      label: "Active",
      default: true,
    },
  };
};
