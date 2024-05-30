export const parcelFormFields = () => {
  return {
    type: {
      type: "select",
      label: "Type",
      options: ["bubble_mailer", "box", "envelope"],
      getOptionLabel: option => option,
    },
    length: {
      type: "number",
      label: "Length",
    },
    width: {
      type: "number",
      label: "Width",
    },
    height: {
      type: "number",
      label: "Height",
    },
    volume: {
      type: "number",
      label: "Volume",
      disabled: true,
      getValue: values => values.length * values.width * values.height,
    },
    quantity_state: {
      type: "number",
      label: "Count In Stock",
    },
  };
};
