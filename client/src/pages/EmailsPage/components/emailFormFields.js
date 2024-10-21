export const emailFormFields = ({ email }) => {
  return {
    subject: { type: "text", label: "Subject" },
    modules: {
      type: "array",
      title: "Modules",
      label: item => item.type,
      itemSchema: {
        fields: {
          type: {
            type: "autocomplete_single",
            label: "Module Type",
            getOptionLabel: option => {
              if (typeof option === "string") {
                return option;
              }
            },
            options: [
              "Heading",
              "Subheading",
              "Body",
              "Images",
              "Image",
              "Button",
              "HTML",
              "Divider",
              "Spacer",
              "Line Break",
              "Title Image",
            ],
          },
          content: {
            type: "object",
            fields: {
              title_image: {
                type: "image_upload",
                label: "Title Image",
                labelProp: "title_image",
                album: `${email?.subject} Title Image`,
              },
              heading: { type: "text", label: "Heading" },
              subheading: { type: "text", label: "Subheading" },
              body: { type: "text_multiline", label: "Body" },
              images: {
                type: "image_upload",
                label: "Images",
                labelProp: "images",
                album: `${email?.subject} Images`,
                forceArray: true,
              },
              image: {
                type: "image_upload",
                label: "Image",
                labelProp: "image",
                album: `${email?.subject} Images`,
              },
              buttonText: { type: "text", label: "Button Text" },
              buttonLink: { type: "text", label: "Button Link" },
              html: { type: "text", label: "HTML" },
              divider: { type: "checkbox", label: "Divider" },
              spacer: { type: "checkbox", label: "Spacer" },
              styling: { type: "text_multiline", label: "Styling" },
              line_break: {
                type: "image_upload",
                label: "Line Break",
                labelProp: "line_break",
                album: `${email?.subject} Line Break`,
              },
            },
          },
        },
      },
    },
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
    button_text_color: { type: "color_picker", label: "Button Text Color", defaultColor: "#ffffff" },
    scheduled_at: { type: "datetime", label: "Scheduled At" },
    active: { type: "checkbox", label: "Active", default: true },
  };
};
