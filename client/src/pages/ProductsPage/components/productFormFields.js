import { toCapitalize } from "../../../utils/helper_functions";
import * as API from "../../../api";
import { saveToEditProductHistory } from "../productsPageSlice";

export const productFormFields = ({
  products,
  users,
  categorysQuery,
  product,
  chips,
  filaments,
  dispatch,
  productsQuery,
}) => {
  return {
    product_info_title: {
      label: "Product Info",
      type: "title",
      align: "center",
      variant: "h6",
    },
    _id: {
      type: "text",
      label: "ID",
      permissions: ["admin"],
      disabled: true,
    },
    name: {
      type: "text",
      label: "Name",
      required: true,
    },
    fact: {
      type: "text_multiline",
      label: "Fact",
    },
    max_display_quantity: {
      type: "number",
      label: "Max Display Quantity",
      labelProp: "max_display_quantity",
    },
    max_quantity: {
      type: "number",
      label: "Max Quantity",
      labelProp: "max_quantity",
    },
    short_description: {
      type: "text_multiline",
      label: "Short Description",
    },
    count_in_stock: {
      type: "number",
      label: "Count in Stock",
      default: 30,
      required: true,
    },
    set_of: {
      type: "number",
      label: "How many comes for quantity of 1?",
      default: 30,
      required: true,
    },
    finite_stock: {
      type: "checkbox",
      label: "Finite Stock",
      default: false,
    },
    options: {
      type: "array",
      label: item => item.name,
      title: "Product Options",
      itemSchema: {
        type: "object",
        fields: {
          name: {
            type: "text",
            label: "Option Name",
            labelProp: "name",
          },
          optionType: {
            type: "autocomplete_single",
            label: "Option Type",
            getOptionLabel: option => {
              if (typeof option === "string") {
                return toCapitalize(option);
              }
            },
            options: ["colors", "dropdown", "buttons"],
          },
          isAddOn: {
            type: "checkbox",
            label: "Is Add-On",
          },
          details: {
            type: "text_multiline",
            label: "Details",
          },
          image: {
            type: "image_upload",
            label: "Image",
            labelProp: "_id",
            album: `${product.name} Images`,
          },
          replacePrice: { type: "checkbox", label: "Option Price Replaces Price" },
          active: {
            type: "checkbox",
            label: "Active",
          },
          values: {
            type: "array",
            title: "Option Choices",
            label: item => item.name,
            itemSchema: {
              type: "object",
              fields: {
                name: { type: "text", label: "Name" },
                colorCode: { type: "color_picker", label: "Color Code" },
                filament: {
                  type: "autocomplete_single",
                  label: "Filament",
                  options: filaments,
                  getOptionLabel: option => (option ? `${option.color} ${option.type}` : ""),
                  labelProp: "name",
                },
                isDefault: { type: "checkbox", label: "Default Option" },
                additionalCost: { type: "number", label: "Additional Cost" },
                image: {
                  type: "image_upload",
                  label: "Image",
                  labelProp: "_id",
                  album: `${product.name} Images`,
                },
                product: {
                  type: "autocomplete_single",
                  label: "Option Product",
                  options: products,
                  labelProp: "name",
                  onEditButtonClick: selectedProduct => {
                    dispatch(saveToEditProductHistory(product));
                    dispatch(API.detailsProduct({ pathname: selectedProduct._id }));
                  },
                  onCreateNewButtonClick: selectedProduct => {
                    dispatch(saveToEditProductHistory(product));
                    dispatch(API.saveProduct({ ...selectedProduct }));
                  },
                  showEditButton: true,
                },
                active: {
                  type: "checkbox",
                  label: "Active",
                },
              },
            },
          },
        },
      },
    },
    prices_title: {
      label: "Prices",
      type: "title",
      align: "center",
      variant: "h6",
    },
    price: {
      type: "number",
      label: "Price",
    },
    isPreOrder: {
      type: "checkbox",
      label: "Is Pre-Order",
    },
    preOrderReleaseDate: {
      type: "date",
      label: "Pre-Order Release Date",
    },
    preOrderQuantity: {
      type: "number",
      label: "Pre-Order Quantity",
    },
    isPasswordProtected: {
      type: "checkbox",
      label: "Is Password Protected",
    },
    passwordProtection: {
      type: "object",
      title: "Password Protection",
      fields: {
        password: {
          type: "text",
          label: "Password",
        },
        expirationDate: {
          type: "date",
          label: "Expiration Date",
        },
      },
    },
    wholesale_price: {
      type: "number",
      label: "Wholesale Price",
    },
    wholesale_product: {
      type: "checkbox",
      label: "Wholesale Product",
    },
    previous_price: {
      type: "number",
      label: "Previous Price",
    },
    tags: {
      type: "autocomplete_multiple",
      label: "Tags",
      options: !categorysQuery?.isLoading ? categorysQuery?.data : [],
      loading: categorysQuery?.isLoading,
      labelProp: "name",
    },
    hidden: {
      type: "checkbox",
      label: "Hidden",
      labelProp: "hidden",
      defaultValue: false,
    },
    pathname: {
      type: "text",
      label: "Pathname",
      labelProp: "pathname",
    },
    images: {
      type: "image_upload",
      label: "Images",
      labelProp: "link",
      album: `${product.name} Images`,
      getOptionLabel: option => option.link,
    },
    hero_video: {
      type: "object",
      title: "Hero Video",
      fields: {
        title: {
          type: "text",
          label: "Title",
        },
        description: {
          type: "text_multiline",
          label: "Description",
        },
        video: {
          type: "text",
          label: "Video",
        },
        hidden: {
          type: "checkbox",
          label: "Hidden",
          default: false,
        },
      },
    },
    hero_image: {
      type: "image_upload",
      label: "Hero Image",
      labelProp: "link",
      album: `${product.name} Images`,
      getOptionLabel: option => option.link,
    },
    icon_specs: {
      type: "array",
      label: item => item.description,
      title: "Icon Specs",
      itemSchema: {
        type: "object",
        fields: {
          icon: {
            type: "text",
            label: "Icon",
          },
          description: {
            type: "text",
            label: "Description",
          },
        },
      },
    },
    icon_specs_hidden: {
      type: "checkbox",
      label: "Hide Icon Specs",
      default: false,
    },
    title_image: {
      type: "image_upload",
      label: "Title Image",
      labelProp: "link",
      album: `${product.name} Images`,
      getOptionLabel: option => option.link,
    },
    themed_logo: {
      type: "image_upload",
      label: "Themed Logo",
      labelProp: "link",
      album: `${product.name} Images`,
      getOptionLabel: option => option.link,
    },
    line_break: {
      type: "image_upload",
      label: "Line Break",
      labelProp: "link",
      album: `${product.name} Images`,
      getOptionLabel: option => option.link,
    },
    pattern_tile: {
      type: "image_upload",
      label: "Pattern Tile",
      labelProp: "link",
      album: `${product.name} Images`,
      getOptionLabel: option => option.link,
    },
    corner_image: {
      type: "image_upload",
      label: "Corner Image",
      labelProp: "link",
      album: `${product.name} Images`,
      getOptionLabel: option => option.link,
    },
    primary_color: {
      type: "color_picker",
      label: "Primary Color",
    },
    secondary_color: {
      type: "color_picker",
      label: "Secondary Color",
    },
    header_text_color: {
      type: "color_picker",
      label: "Header Text Color",
    },
    text_color: {
      type: "color_picker",
      label: "Text Color",
    },
    background_color: {
      type: "color_picker",
      label: "Background Color",
    },
    subtitle_text: {
      type: "text",
      label: "Subtitle Text",
    },

    navigation: {
      type: "object",
      title: "Navigation",
      fields: {
        navigation_buttons: {
          type: "array",
          label: item => item.label,
          title: "Navigation Buttons",
          itemSchema: {
            type: "object",
            fields: {
              label: {
                type: "text",
                label: "Label",
              },
              target: {
                type: "text",
                label: "Target",
              },
              hidden: {
                type: "checkbox",
                label: "Hidden",
                default: false,
              },
            },
          },
        },
        hidden: {
          type: "checkbox",
          label: "Hide Navigation",
          default: false,
        },
      },
    },
    navigation_buttons_hidden: {
      type: "checkbox",
      label: "Hide Navigation Buttons",
      default: false,
    },

    features: {
      type: "object",
      title: "Features",
      fields: {
        image_grid_1: {
          type: "array",
          label: item => item.title,
          title: "Image Grid 1",
          itemSchema: {
            type: "object",
            fields: {
              title: {
                type: "text",
                label: "Title",
              },
              description: {
                type: "text_multiline",
                label: "Description",
              },
              image: {
                type: "image_upload",
                label: "Image",
                labelProp: "link",
                album: `${product.name} Images`,
                getOptionLabel: option => option.link,
              },
              text_image: {
                type: "image_upload",
                label: "Text Image",
                labelProp: "link",
                album: `${product.name} Images`,
                getOptionLabel: option => option.link,
              },
              button_text: {
                type: "text",
                label: "Button Text",
              },
              link: {
                type: "text",
                label: "Link",
              },
            },
          },
        },
        image_grid_1_hidden: {
          type: "checkbox",
          label: "Hide Image Grid 1",
          default: false,
        },
        hero_image_1: {
          type: "image_upload",
          label: "Hero Image 1",
          labelProp: "link",
          album: `${product.name} Images`,
          getOptionLabel: option => option.link,
        },
        hero_fact_1: {
          type: "object",
          title: "Hero Fact 1",
          fields: {
            title: {
              type: "text",
              label: "Title",
            },
            subtitle: {
              type: "text",
              label: "Subtitle",
            },
            description: {
              type: "text_multiline",
              label: "Description",
            },
            hidden: {
              type: "checkbox",
              label: "Hidden",
              default: false,
            },
          },
        },
        image_grid_2: {
          type: "array",
          label: item => item.title,
          title: "Image Grid 2",
          itemSchema: {
            type: "object",
            fields: {
              title: {
                type: "text",
                label: "Title",
              },
              description: {
                type: "text_multiline",
                label: "Description",
              },
              image: {
                type: "image_upload",
                label: "Image",
                labelProp: "link",
                album: `${product.name} Images`,
                getOptionLabel: option => option.link,
              },
              text_image: {
                type: "image_upload",
                label: "Text Image",
                labelProp: "link",
                album: `${product.name} Images`,
                getOptionLabel: option => option.link,
              },
              button_text: {
                type: "text",
                label: "Button Text",
              },
              link: {
                type: "text",
                label: "Link",
              },
            },
          },
        },
        image_grid_2_hidden: {
          type: "checkbox",
          label: "Hide Image Grid 2",
          default: false,
        },
        hero_image_2: {
          type: "image_upload",
          label: "Hero Image 2",
          labelProp: "link",
          album: `${product.name} Images`,
          getOptionLabel: option => option.link,
        },
        hero_fact_2: {
          type: "object",
          title: "Hero Fact 2",
          fields: {
            title: {
              type: "text",
              label: "Title",
            },
            subtitle: {
              type: "text",
              label: "Subtitle",
            },
            description: {
              type: "text_multiline",
              label: "Description",
            },
            hidden: {
              type: "checkbox",
              label: "Hidden",
              default: false,
            },
          },
        },
        lifestyle_images: {
          type: "image_upload",
          label: "Lifestyle Images",
          labelProp: "link",
          album: `${product.name} Images`,
          getOptionLabel: option => option.link,
        },
        lifestyle_images_hidden: {
          type: "checkbox",
          label: "Hide Lifestyle Images",
          default: false,
        },
        hero_image_3: {
          type: "image_upload",
          label: "Hero Image 3",
          labelProp: "link",
          album: `${product.name} Images`,
          getOptionLabel: option => option.link,
        },
        hero_fact_3: {
          type: "object",
          title: "Hero Fact 3",
          fields: {
            title: {
              type: "text",
              label: "Title",
            },
            subtitle: {
              type: "text",
              label: "Subtitle",
            },
            description: {
              type: "text_multiline",
              label: "Description",
            },
            hidden: {
              type: "checkbox",
              label: "Hidden",
              default: false,
            },
          },
        },
      },
    },
    not_sure: {
      type: "object",
      title: "Not Sure",
      fields: {
        title: {
          type: "text",
          label: "Title",
        },
        button_text: {
          type: "text",
          label: "Button Text",
        },
        link: {
          type: "text",
          label: "Link",
        },
        hidden: {
          type: "checkbox",
          label: "Hidden",
          default: false,
        },
      },
    },
    tech_specs: {
      type: "object",
      title: "Tech Specs",
      fields: {
        title: {
          type: "text",
          label: "Title",
        },
        navigation: {
          type: "array",
          label: item => item.title,
          title: "Navigation",
          itemSchema: {
            type: "object",
            fields: {
              title: {
                type: "text",
                label: "Title",
              },
              values: {
                type: "array",
                label: item => item.title,
                title: "Values",
                itemSchema: {
                  type: "object",
                  fields: {
                    title: {
                      type: "text",
                      label: "Title",
                    },
                    description: {
                      type: "text_multiline",
                      label: "Description",
                    },
                  },
                },
              },
            },
          },
        },
        hidden: {
          type: "checkbox",
          label: "Hidden",
          default: false,
        },
      },
    },
    in_the_box: {
      type: "object",
      title: "In the Box",
      fields: {
        title: {
          type: "text",
          label: "Title",
        },
        items: {
          type: "array",
          label: item => item.description,
          title: "Items",
          itemSchema: {
            type: "object",
            fields: {
              image: {
                type: "image_upload",
                label: "Image",
                labelProp: "link",
                album: `${product.name} Images`,
                getOptionLabel: option => option.link,
              },
              description: {
                type: "text",
                label: "Description",
              },
            },
          },
        },
        hidden: {
          type: "checkbox",
          label: "Hidden",
          default: false,
        },
      },
    },
    elevate_your_experience: {
      type: "object",
      title: "Elevate Your Experience",
      fields: {
        title: {
          type: "text",
          label: "Title",
        },
        description: {
          type: "text_multiline",
          label: "Description",
        },
        products: {
          type: "autocomplete_multiple",
          label: "Products",
          options: !productsQuery?.isLoading ? productsQuery?.data : [],
          loading: productsQuery?.isLoading,
          labelProp: "name",
        },
        hidden: {
          type: "checkbox",
          label: "Hidden",
          default: false,
        },
      },
    },
    product_support: {
      type: "object",
      title: "Product Support",
      fields: {
        quick_guide: {
          type: "text",
          label: "Quick Guide",
        },
        manual: {
          type: "text",
          label: "Manual",
        },
        support_link: {
          type: "text",
          label: "Support Link",
        },
        tutorial_video: {
          type: "text",
          label: "Tutorial Video",
        },
        hidden: {
          type: "checkbox",
          label: "Hidden",
          default: false,
        },
      },
    },
    category: {
      type: "text",
      label: "Category",
      required: true,
    },
    subcategory: {
      type: "text",
      label: "Subcategory",
    },
    product_collection: {
      type: "text",
      label: "Product Collection",
    },
    contributors: {
      type: "autocomplete_multiple",
      label: "Contributors",
      labelProp: "first_name",
      options: users.filter(user => user.first_name && user.last_name),
      getOptionLabel: option => `${option.first_name} ${option.last_name}`,
    },

    chips: {
      type: "autocomplete_multiple",
      label: "Chips",
      options: chips,
      labelProp: "name",
    },
    color: {
      type: "object",
      title: "Color",
      fields: {
        name: {
          type: "text",
          label: "Name",
        },
        code: {
          type: "text",
          label: "Code",
        },
        is_filament_color: {
          type: "checkbox",
          label: "Is Filament Color",
        },
        filament: {
          type: "autocomplete_single",
          label: "Filament",
          options: filaments,
          getOptionLabel: option => (option ? `${option.color} ${option.type}` : ""),
          labelProp: "name",
        },
      },
    },
    size: {
      type: "text",
      label: "Size",
    },
    seo: {
      type: "object",
      title: "SEO",
      fields: {
        meta_title: {
          type: "text",
          label: "Meta Title",
        },
        meta_description: {
          type: "text_multiline",
          label: "Meta Description",
        },
        meta_keywords: {
          type: "text_multiline",
          label: "Meta Keywords",
        },
      },
    },
    dimensions: {
      type: "object",
      title: "Dimensions",
      fields: {
        package_length: {
          type: "number",
          label: "Package Length",
          labelProp: "package_length",
        },
        package_width: {
          type: "number",
          label: "Package Width",
          labelProp: "package_width",
        },
        package_height: {
          type: "number",
          label: "Package Height",
          labelProp: "package_height",
        },
        package_volume: {
          type: "number",
          label: "Package Volume",
          labelProp: "package_volume",
        },
        product_length: {
          type: "number",
          label: "Product Length",
          labelProp: "length",
        },
        product_width: {
          type: "number",
          label: "Product Width",
          labelProp: "width",
        },
        product_height: {
          type: "number",
          label: "Product Height",
          labelProp: "height",
        },
        weight_pounds: {
          type: "number",
          label: "Weight (lbs)",
          labelProp: "weight_pounds",
        },
        weight_ounces: {
          type: "number",
          label: "Weight (oz)",
          labelProp: "weight_ounces",
        },
      },
    },
    meta_data: {
      type: "object",
      title: "Meta Data",
      fields: {
        processing_time: {
          type: "multi-select",
          label: "Processing Time",
          options: ["1 day", "2 days", "3 days", "4 days", "5 days", "6 days", "7 days"],
        },
        material_cost: {
          type: "number",
          label: "Material Cost",
        },
        filament_used: {
          type: "number",
          label: "Filament Used",
        },
        printing_time: {
          type: "number",
          label: "Printing Time",
        },
        assembly_time: {
          type: "number",
          label: "Assembly Time",
        },
      },
    },
    order: {
      type: "number",
      label: "Order",
    },

    sale: {
      type: "object",
      title: "Sale Info",
      fields: {
        sale_price: {
          type: "number",
          label: "Sale Price",
          labelProp: "sale_price",
          defaultValue: 0,
        },
        start_date: {
          type: "date",
          label: "Sale Start Date",
          labelProp: "sale_start_date",
        },
        end_date: {
          type: "date",
          label: "Sale End Date",
          labelProp: "sale_end_date",
        },
      },
    },
    isVariation: {
      type: "checkbox",
      label: "Is Variation",
      default: false,
    },
    parents: {
      type: "autocomplete_multiple",
      label: "Parent Product",
      options: products,
      labelProp: "name",
      default: null,
    },
  };
};
