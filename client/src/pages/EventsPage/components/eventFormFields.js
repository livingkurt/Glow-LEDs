export const eventFormFields = ({ event }) => {
  return {
    name: {
      type: "text",
      label: "Event Name",
      required: true,
    },
    fact: {
      type: "text",
      label: "Fact",
    },
    short_description: {
      type: "text_multiline",
      label: "Short Description",
    },
    start_date: {
      type: "datetime",
      label: "Start Date",
    },
    end_date: {
      type: "datetime",
      label: "End Date",
    },
    venue: {
      type: "text",
      label: "Venue",
    },
    age_group: {
      type: "text",
      label: "Age Group",
    },
    thumbnail_image: {
      type: "image_upload",
      label: "Thumbnail Image",
      labelProp: "_id",
      album: `${event.name} Images`,
    },
    background_image: {
      type: "image_upload",
      label: "Background Image",
      labelProp: "_id",
      album: `${event.name} Images`,
    },
    address: {
      type: "object",
      title: "Address",
      fields: {
        address_1: {
          type: "text",
          label: "Address Line 1",
        },
        address_2: {
          type: "text",
          label: "Address Line 2",
        },
        city: {
          type: "text",
          label: "City",
        },
        state: {
          type: "text",
          label: "State",
        },
        postalCode: {
          type: "text",
          label: "Postal Code",
        },
      },
    },
    pathname: {
      type: "text",
      label: "Pathname",
    },
    active: {
      type: "checkbox",
      label: "Active",
      default: true,
    },
  };
};
