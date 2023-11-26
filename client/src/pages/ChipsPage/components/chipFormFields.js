export const chipFormFields = ({ chip, categorys }) => {
  return {
    name: {
      type: "text",
      label: "Name",
    },
    company: {
      type: "text",
      label: "Company",
    },
    category: {
      type: "text",
      label: "category",
    },
    categorys: {
      type: "autocomplete_single",
      label: "Categorys",
      options: categorys,
      labelProp: "name",
    },
    programmable: {
      type: "checkbox",
      label: "Programmable",
    },
    number_of_modes: {
      type: "text",
      label: "Number of Modes",
    },
    characteristics: {
      type: "text",
      label: "Characteristics",
    },
    colors_per_mode: {
      type: "text",
      label: "Colors Per Mode",
    },
    colors: {
      type: "array",
      title: "Available Colors",
      label: "name",
      itemSchema: {
        type: "object",
        fields: {
          name: {
            type: "text",
            label: "Name",
          },
          color: {
            type: "text",
            label: "Color",
          },
        },
      },
    },
    pathname: {
      type: "text",
      label: "Pathname",
    },
    image: {
      type: "text",
      label: "Image",
    },
    image_object: {
      type: "image_upload",
      label: "Image",
      labelProp: "link",
      album: `${chip.name} Images`,
      getOptionLabel: option => option.link,
    },
    dimensions: {
      type: "object",
      title: "Dimensions",
      label: "dimensions",
      fields: {
        legnth: {
          type: "text",
          label: "Length",
        },
        width: {
          type: "text",
          label: "Width",
        },
        height: {
          type: "text",
          label: "Height",
        },
      },
    },
  };
};
