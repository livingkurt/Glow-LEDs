import { toCapitalize } from "../../../utils/helper_functions";

export const contentFormFields = ({ content, products, categorys }) => {
  return {
    name: { type: "text", label: "Name" },
    home_page: {
      type: "object",
      title: "Home Page",
      fields: {
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
        slideshow_hidden: { type: "checkbox", label: "Slideshow Hidden" },
        featured_products: {
          type: "autocomplete_multiple",
          label: "Featured Products",
          options: products,
          labelProp: "name",
        },
        featured_products_hidden: { type: "checkbox", label: "Learn More Products Hidden" },
        hero_video: { type: "text", label: "Video" },
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
        learn_more_products_hidden: { type: "checkbox", label: "Learn More Products Hidden" },
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
            hidden: { type: "checkbox", label: "Hidden" },
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
            hidden: { type: "checkbox", label: "Hidden" },
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
            hidden: { type: "checkbox", label: "Hidden" },
            link: { type: "text", label: "Link" },
          },
        },
        product_protection_details: {
          type: "array",
          title: "Product Protection Details",
          label: item => item.title,
          itemSchema: {
            type: "object",
            fields: {
              title: { type: "text", label: "Title" },
              description: { type: "text_multiline", label: "Description" },
              hidden: { type: "checkbox", label: "Hidden" },
            },
          },
        },
        support_banner: {
          type: "object",
          title: "Support Banner",
          fields: {
            title: { type: "text", label: "Title" },
            subtitle: { type: "text_multiline", label: "Subtitle" },
            image: {
              type: "image_upload",
              label: "Image",
              labelProp: "_id",
              album: `${content?.home_page?.get_more_out_of?.title} Images`,
            },
            button_text: { type: "text", label: "Button Text" },
            hidden: { type: "checkbox", label: "Hidden" },
            link: { type: "text", label: "Link" },
          },
        },
      },
    },
    banner: {
      type: "object",
      title: "Banner",
      fields: {
        label: { type: "text", label: "Label" },
        button: { type: "text", label: "Button" },
        link: { type: "text", label: "Link" },
        hidden: { type: "checkbox", label: "Hidden" },
      },
    },
    about_page: {
      type: "object",
      title: "About Page",
      fields: {
        title: { type: "text", label: "Title" },
        subtitle: { type: "text", label: "Subtitle" },
        video: { type: "text", label: "Video" },
        sections: {
          type: "array",
          title: "Sections",
          label: item => item.title,
          itemSchema: {
            type: "object",
            fields: {
              title: { type: "text", label: "Title" },
              description: { type: "text_multiline", label: "Description" },
              image: {
                type: "image_upload",
                label: "Image",
                labelProp: "_id",
                album: `${content?.about_page?.title} Sections Images`,
              },
            },
          },
        },
        footer_title: { type: "text", label: "Footer Title" },
      },
    },
    products_grid_page: {
      type: "object",
      title: "Products Grid Page",
      fields: {
        title: { type: "text", label: "Title" },
        subtitle: { type: "text", label: "Subtitle" },
        our_picks: {
          type: "autocomplete_multiple",
          label: "Our Picks",
          options: products,
          labelProp: "name",
        },
        category_banners: {
          type: "array",
          title: "Category Banners",
          label: item => item.title,
          itemSchema: {
            type: "object",
            fields: {
              title: { type: "text", label: "Title" },
              subtitle: { type: "text", label: "Subtitle" },
              short_description: { type: "text_multiline", label: "Short Description" },
              fact: { type: "text", label: "Fact" },
              image: {
                type: "image_upload",
                label: "Image",
                labelProp: "_id",
                album: `${content?.products_grid_page?.title} Category Banner Images`,
              },
              background_color: { type: "color_picker", label: "Background Color" },
              // tag: {
              //   type: "autocomplete_single",
              //   label: "Category",
              //   options: categorys,
              //   labelProp: "name",
              // },
              tag: {
                type: "autocomplete_single",
                label: "Tag",
                labelProp: "name",
                getOptionLabel: option => {
                  if (typeof option.name === "string") {
                    return toCapitalize(option.name);
                  }
                },
                options: categorys,
              },
            },
          },
        },
      },
    },
    faq_page: {
      type: "object",
      title: "FAQ Page",
      fields: {
        title: { type: "text", label: "Title" },
        sections: {
          type: "array",
          title: "Sections",
          label: item => item.title,
          itemSchema: {
            type: "object",
            fields: {
              title: { type: "text", label: "Title" },
              subtitle: { type: "text", label: "Subtitle" },
              description: { type: "text_multiline", label: "Description" },
              video: { type: "text", label: "Video" },
              image: {
                type: "image_upload",
                label: "Image",
                labelProp: "_id",
                album: `${content?.faq_page?.title} Sections Images`,
              },
              button_text: { type: "text", label: "Button Text" },
              button_link: { type: "text", label: "Button Link" },
              subsections: {
                type: "array",
                title: "Subsections",
                label: item => item.title,
                itemSchema: {
                  type: "object",
                  fields: {
                    title: { type: "text", label: "Title" },
                    description: { type: "text_multiline", label: "Description" },
                    image: {
                      type: "image_upload",
                      label: "Image",
                      labelProp: "_id",
                      album: `${content?.faq_page?.title} Subsections Images`,
                    },
                    button_text: { type: "text", label: "Button Text" },
                    button_link: { type: "text", label: "Button Link" },
                  },
                },
              },
            },
          },
        },
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
    free_shipping_minimum_amount: { type: "number", label: "Minimum Subtotal for Free Shipping" },
    active: { type: "checkbox", label: "Active" },
  };
};
