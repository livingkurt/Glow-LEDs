export const emailFormFields = ({ email }: any) => {
  return {
    subject: { type: "text", label: "Subject" },
    h1: { type: "text", label: "Heading" },
    h2: { type: "text_multiline", label: "Summary" },
    images_object: {
      type: "image_upload",
      label: "Images",
      labelProp: "images_object",
      album: `${email?.h1} Images`,
    },
    show_image: { type: "checkbox", label: "Show Image", default: true },
    p: { type: "text_multiline", label: "Body" },
    button: { type: "text", label: "Button Text" },
    link: { type: "text", label: "Button Link" },
    status: {
      type: "autocomplete_single",
      label: "Status",
      getOptionLabel: (option: any) => {
        if (typeof option === "string") {
          return option;
        }
      },
      options: ["Draft", "Scheduled", "Sent"],
    },
    scheduled_at: { type: "text", label: "Scheduled At" },
    background_color: { type: "color_picker", label: "Background Color" },
    title_color: { type: "color_picker", label: "Title Color" },
    text_color: { type: "color_picker", label: "Text Color" },
    module_color: { type: "color_picker", label: "Module Color" },
    header_footer_color: { type: "color_picker", label: "Header Footer Color" },
    button_color: { type: "color_picker", label: "Button Color" },

    active: { type: "checkbox", label: "Active", default: true },
  };
};
