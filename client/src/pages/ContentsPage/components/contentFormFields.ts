export const contentFormFields = ({ content }: any) => {
  return {
    home_page: {
      type: "object",
      title: "Home Page",
      fields: {
        h1: { type: "text", label: "H1" },
        // image_object: {
        //   type: "image_upload",
        //   label: "Image",
        //   // options: images,
        //   labelProp: "link",
        //   album: `${content?.home_page?.h1} Images`,
        //   getOptionLabel: (option: any) => option.link,
        // },
        images_object: {
          type: "image_upload",
          label: "Images",
          // options: images,
          labelProp: "link",
          album: `${content?.home_page?.h1} Images`,
          getOptionLabel: (option: any) => option.link,
        },
        slideshow: {
          type: "array",
          label: "Slideshow",
          itemSchema: {
            type: "object",
            fields: {
              label: { type: "text", label: "Label" },
              image_object: {
                type: "image_upload",
                label: "Image",
                // options: images,
                labelProp: "link",
                album: `${content?.home_page?.h1} Images`,
                getOptionLabel: (option: any) => option.link,
              },
              link: { type: "text", label: "Link" },
            },
          },
        },
        video: { type: "text", label: "Video" },
        banner_image: {
          type: "image_upload",
          label: "Rectangle Image",
          // options: images,
          labelProp: "link",
          album: `${content?.home_page?.h1} Images`,
          getOptionLabel: (option: any) => option.link,
        },
        show_image: { type: "checkbox", label: "Show Image", default: true },
        show_video: { type: "checkbox", label: "Show Video", default: false },
        h2: { type: "text", label: "H2" },
        p: { type: "text", label: "P" },
        button: { type: "text", label: "Button" },
        link: { type: "text", label: "Link" },
      },
    },
    banner: {
      type: "object",
      title: "Banner",
      fields: {
        label: { type: "text", label: "Label" },
        button: { type: "text", label: "Button" },
        link: { type: "text", label: "Link" },
      },
    },
    links: {
      type: "array",
      title: "Links",
      itemSchema: {
        type: "object",
        fields: {
          label: { type: "text", label: "Label" },
          link: { type: "text", label: "Link" },
          icon: { type: "text", label: "Icon" },
        },
      },
    },
    active: { type: "checkbox", label: "Active", default: true },
  };
};

// const formFields = {
//   email_type: { type: 'text', label: 'Email Type' },
//   header_footer_color: { type: 'text', label: 'Header Footer Color' },
//   background_color: { type: 'text', label: 'Background Color' },
//   module_color: { type: 'text', label: 'Module Color' },
//   button_color: { type: 'text', label: 'Button Color' },
//   text_color: { type: 'text', label: 'Text Color' },
//   title_color: { type: 'text', label: 'Title Color' },
//   subject: { type: 'text', label: 'Subject' },
//   h1: { type: 'text', label: 'H1' },
//   image: { type: 'text', label: 'Image' },
//   images: { type: 'array', title: 'Images', itemSchema: { type: 'text' } },
//   show_image: { type: 'checkbox', label: 'Show Image', default: true },
//   h2: { type: 'text', label: 'H2' },
//   p: { type: 'text', label: 'P' },
//   button: { type: 'text', label: 'Button' },
//   link: { type: 'text', label: 'Link' },
//   html: { type: 'text', label: 'HTML' },
//   scheduled_at: { type: 'text', label: 'Scheduled At' },  // Consider using a date picker
//   status: { type: 'text', label: 'Status', default: 'draft' },
//   active: { type: 'checkbox', label: 'Active', default: true },
//   deleted: { type: 'checkbox', label: 'Deleted', default: false }
// };
