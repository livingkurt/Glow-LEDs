export const emailFormFields = ({ email }: any) => {
  return {
    email_type: { type: "text", label: "Email Type" },
    header_footer_color: { type: "text", label: "Header Footer Color" },
    background_color: { type: "text", label: "Background Color" },
    module_color: { type: "text", label: "Module Color" },
    button_color: { type: "text", label: "Button Color" },
    text_color: { type: "text", label: "Text Color" },
    title_color: { type: "text", label: "Title Color" },
    subject: { type: "text", label: "Subject" },
    h1: { type: "text", label: "H1" },
    images_objects: {
      type: "image_upload",
      label: "Images",
      labelProp: "images_objects",
      album: `${email?.h1} Images`,
    },
    show_image: { type: "checkbox", label: "Show Image", default: true },
    h2: { type: "text", label: "H2" },
    p: { type: "text", label: "P" },
    button: { type: "text", label: "Button" },
    link: { type: "text", label: "Link" },
    html: { type: "text", label: "HTML" },
    scheduled_at: { type: "text", label: "Scheduled At" },
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
    active: { type: "checkbox", label: "Active", default: true },
  };
};
