import { toCapitalize } from "../../../utils/helper_functions";

export const mainFormFields = () => ({
  name: { type: "text", label: "Name" },
  free_shipping_minimum_amount: { type: "number", label: "Minimum Subtotal for Free Shipping" },
  active: { type: "checkbox", label: "Active" },
});

export const homePageFields = ({ content, products, affiliates, carts, modes }) => ({
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
            type: "image_upload_single",
            label: "Image",

            album: `${content?.name} Home Page Slideshow Content Images`,
          },
          link: { type: "text", label: "Link" },
          button_text: { type: "text", label: "Button Text" },
        },
      },
    },
    featured_products: {
      type: "autocomplete_multiple",
      label: "Featured Products",
      options: products,
      labelProp: "name",
    },
    featured_product_bundles: {
      type: "autocomplete_multiple",
      label: "Featured Product Bundles",
      options: carts?.filter(cart => cart.title),
      labelProp: "title",
    },
    featured_modes: {
      type: "autocomplete_multiple",
      label: "Featured Modes",
      options: modes,
      labelProp: "name",
    },
    hero_video: {
      type: "object",
      title: "Hero Video",
      fields: {
        video: { type: "text", label: "Video" },
        autoplay: { type: "checkbox", label: "Autoplay" },
        muted: { type: "checkbox", label: "Muted" },
        loop: { type: "checkbox", label: "Loop" },
        playsInline: { type: "checkbox", label: "Plays Inline" },
      },
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
            type: "image_upload_single",
            label: "Image",

            album: `${content?.name} Home Page Learn More Products Content Images`,
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
                type: "image_upload_single",
                label: "Image",

                album: `${content?.name} Home Page Learn Highlights Content Images`,
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
          type: "image_upload_single",
          label: "Image",

          album: `${content?.name} Home Page Discover More Content Images`,
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
          type: "image_upload_single",
          label: "Image",

          album: `${content?.name} Home Page Get More Out Of Content Images`,
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
          type: "image_upload_single",
          label: "Image",

          album: `${content?.name} Home Page Support Banner Content Images`,
        },
        button_text: { type: "text", label: "Button Text" },
        hidden: { type: "checkbox", label: "Hidden" },
        link: { type: "text", label: "Link" },
      },
    },
    sponsors: {
      type: "autocomplete_multiple",
      label: "Sponsors",
      options: affiliates,
      labelProp: "artist_name",
      getOptionLabel: option => {
        if (typeof option.artist_name === "string") {
          return toCapitalize(option.artist_name);
        }
      },
    },
  },
});

export const bannerFields = () => ({
  type: "object",
  title: "Banner",
  fields: {
    label: { type: "text", label: "Label" },
    button: { type: "text", label: "Button" },
    link: { type: "text", label: "Link" },
    hidden: { type: "checkbox", label: "Hidden" },
  },
});

export const aboutPageFields = ({ content }) => ({
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
            type: "image_upload_single",
            label: "Image",

            album: `${content?.name} About Page Content Images`,
          },
        },
      },
    },
    footer_title: { type: "text", label: "Footer Title" },
  },
});

export const productsGridPageFields = ({ content, products, tags }) => ({
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
            type: "image_upload_single",
            label: "Image",

            album: `${content?.name} Category Banner Content Images`,
          },
          background_color: { type: "color_picker", label: "Background Color" },
          tag: {
            type: "autocomplete_single",
            label: "Tag",
            labelProp: "name",
            getOptionLabel: option => {
              if (typeof option.name === "string") {
                return toCapitalize(option.name);
              }
            },
            options: tags,
          },
        },
      },
    },
  },
});

export const faqPageFields = ({ content }) => ({
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
            type: "image_upload_single",
            label: "Image",

            album: `${content?.name} FAQ Page Sections Content Images`,
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
                  type: "image_upload_single",
                  label: "Image",

                  album: `${content?.name} FAQ Page Subsections Content Images`,
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
});

export const menusFields = ({ content }) => ({
  type: "array",
  title: "Menus",
  label: item => item.name,
  itemSchema: {
    type: "object",
    fields: {
      name: { type: "text", label: "Menu Name" },
      menu_items: {
        type: "array",
        title: "Menu Items",
        label: item => item.label,
        itemSchema: {
          type: "object",
          fields: {
            label: { type: "text", label: "Label" },
            description: { type: "text", label: "Description" },
            image: {
              type: "image_upload_single",
              label: "Image",
              album: `${content?.name} Menu Images`,
            },
            link: { type: "text", label: "Link" },
          },
        },
      },
      pathname: { type: "text", label: "Menu Pathname" },
    },
  },
});

export const academyPageFields = ({ articles, tutorials, affiliates }) => ({
  type: "object",
  title: "Academy Page",
  fields: {
    title: { type: "text", label: "Title" },
    subtitle: { type: "text", label: "Subtitle" },
    featured_articles: {
      type: "autocomplete_multiple",
      label: "Featured Articles",
      options: articles,
      labelProp: "title",
      getOptionLabel: option => {
        if (typeof option.title === "string") {
          return toCapitalize(option.title);
        }
      },
    },
    featured_tutorials: {
      type: "autocomplete_multiple",
      label: "Featured Tutorials",
      options: tutorials,
      labelProp: "title",
      getOptionLabel: option => {
        if (typeof option.title === "string") {
          return toCapitalize(option.title);
        }
      },
    },
    sponsors: {
      type: "autocomplete_multiple",
      label: "Sponsors",
      options: affiliates,
      labelProp: "artist_name",
      getOptionLabel: option => {
        if (typeof option.artist_name === "string") {
          return toCapitalize(option.artist_name);
        }
      },
    },
  },
});

export const featureFlagsFields = () => ({
  type: "array",
  title: "Feature Flags",
  label: item => item.feature,
  itemSchema: {
    type: "object",
    fields: {
      feature: { type: "text", label: "Feature" },
      active: { type: "checkbox", label: "Active" },
    },
  },
});
