export const contentFormFields = ({ content, products }) => {
  return {
    name: { type: "text", label: "Name" },
    home_page: {
      type: "object",
      title: "Home Page",
      fields: {
        featured_products: {
          type: "autocomplete_multiple",
          label: "Featured Products",
          options: products,
          labelProp: "name",
        },
        learn_more_products: {
          type: "array",
          title: "Learn More Products",
          label: item => item.label,
          itemSchema: {
            type: "object",
            fields: {
              label: { type: "text", label: "Label" },
              fact: { type: "text", label: "Fact" },
              image: {
                type: "image_upload",
                label: "Image",
                labelProp: "_id",
                album: `${content?.home_page?.learn_more_products?.label} Images`,
              },
              link: { type: "text", label: "Link" },
              button_text: { type: "text", label: "Button Text" },
            },
          },
        },
        learn_highlights: {
          type: "object",
          title: "Learn Highlights",
          selectable: false,
          fields: {
            title: { type: "text", label: "Title" },
            description: { type: "text_multiline", label: "Description" },
            images_data: {
              type: "array",
              title: "Images Data",
              label: item => item.label,
              itemSchema: {
                type: "object",
                fields: {
                  image: {
                    type: "image_upload",
                    label: "Image",
                    labelProp: "_id",
                    album: `${content?.home_page?.learn_highlights?.title} Images`,
                  },
                  link: { type: "text", label: "Link" },
                  label: { type: "text", label: "Label" },
                },
              },
            },
            link: { type: "text", label: "Link" },
            button_text: { type: "text", label: "Button Text" },
            fact: { type: "text", label: "Fact" },
          },
        },
        discover_more: {
          type: "object",
          title: "Discover More",
          fields: {
            title: { type: "text", label: "Title" },
            subtitle: { type: "text", label: "Subtitle" },
            image: {
              type: "image_upload",
              label: "Image",
              labelProp: "_id",
              album: `${content?.home_page?.discover_more?.title} Images`,
            },
            button_text: { type: "text", label: "Button Text" },
            link: { type: "text", label: "Link" },
          },
        },
        get_more_out_of: {
          type: "object",
          title: "Get More Out Of",
          fields: {
            title: { type: "text", label: "Title" },
            description: { type: "text_multiline", label: "Description" },
            image: {
              type: "image_upload",
              label: "Image",
              labelProp: "_id",
              album: `${content?.home_page?.get_more_out_of?.title} Images`,
            },
            button_text: { type: "text", label: "Button Text" },
            link: { type: "text", label: "Link" },
          },
        },
        slideshow: {
          type: "array",
          title: "Slideshow",
          label: item => item.label,
          itemSchema: {
            type: "object",
            fields: {
              label: { type: "text", label: "Label" },
              fact: { type: "text", label: "Fact" },
              image: {
                type: "image_upload",
                label: "Image",
                labelProp: "_id",
                album: `${content?.home_page?.slideshow?.label} Images`,
              },
              link: { type: "text", label: "Link" },
              button_text: { type: "text", label: "Button Text" },
            },
          },
        },
        video: { type: "text", label: "Video" },
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
      label: item => item.label,
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
