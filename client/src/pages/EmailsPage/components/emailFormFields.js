export const emailFormFields = ({ email }) => {
  return {
    subject: { type: "text", label: "Subject" },
    h1: { type: "text", label: "Heading" },
    h2: { type: "text_multiline", label: "Summary" },
    images: {
      type: "image_upload",
      label: "Images",
      labelProp: "images",
      album: `${email?.h1} Images`,
    },
    p: { type: "text_multiline", label: "Body" },
    button: { type: "text", label: "Button Text" },
    link: { type: "text", label: "Button Link" },
    status: {
      type: "autocomplete_single",
      label: "Status",
      getOptionLabel: option => {
        if (typeof option === "string") {
          return option;
        }
      },
      options: ["Draft", "Scheduled", "Sent"],
    },

    background_color: { type: "color_picker", label: "Background Color", defaultColor: "#7d7c7c" },
    title_color: { type: "color_picker", label: "Title Color", defaultColor: "#333333" },
    text_color: { type: "color_picker", label: "Text Color", defaultColor: "#fff" },
    module_color: { type: "color_picker", label: "Module Color", defaultColor: "#585858" },
    header_footer_color: { type: "color_picker", label: "Header Footer Color", defaultColor: "#333333" },
    button_color: { type: "color_picker", label: "Button Color", defaultColor: "#4c4f60" },
    scheduled_at: { type: "datetime", label: "Scheduled At" },
    active: { type: "checkbox", label: "Active", default: true },
  };
};
