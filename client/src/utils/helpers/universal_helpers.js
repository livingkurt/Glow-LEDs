import { toCapitalize } from "../helper_functions";

export const scrollToId = target => {
  const element = document.getElementById(target);
  if (element) {
    const offset = 80; // Adjust this value based on your header height
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};

export const formatDate = date => {
  return new Date(date).toLocaleDateString(undefined, { timeZone: "UTC" });
};

export const sharedItemSchema = ({ productsQuery, eventsQuery, ticketsQuery, categorysQuery, itemType, item }) => {
  return {
    type: "array",
    title: `${toCapitalize(itemType)} Items`,
    label: "name",
    itemSchema: {
      type: "object",
      fields: {
        product: {
          type: "autocomplete_single",
          label: "Product",
          options: !productsQuery?.isLoading ? productsQuery?.data : [],
          loading: productsQuery?.isLoading,
          labelProp: "name",
          required: true,
        },
        event: {
          type: "autocomplete_single",
          label: "Event",
          options: !eventsQuery?.isLoading ? eventsQuery?.data : [],
          loading: eventsQuery?.isLoading,
          labelProp: "name",
        },
        ticket: {
          type: "autocomplete_single",
          label: "Ticket",
          options: !ticketsQuery?.isLoading ? ticketsQuery?.data : [],
          loading: ticketsQuery?.isLoading,
          labelProp: "title",
        },
        itemType: {
          type: "autocomplete_single",
          label: "Item Type",
          getOptionLabel: option => {
            if (typeof option === "string") {
              return toCapitalize(option);
            }
          },
          options: ["product", "ticket"],
        },
        name: {
          type: "text",
          label: "Name",
          labelProp: "name",
          required: true,
        },
        quantity: {
          type: "autocomplete_single",
          label: "Quantity",
          labelProp: "quantity",
          getOptionLabel: option => `${option}`,
          options: Array.from({ length: 30 }, (_, i) => i + 1),
        },
        display_image_object: {
          type: "image_upload",
          label: "Images",

          album: `${itemType} ${item.name} Images`,
          getOptionLabel: option => option.link,
        },
        price: {
          type: "number",
          label: "Price",
          labelProp: "price",
          required: true,
        },
        category: {
          type: "text",
          label: "Category",
          labelProp: "category",
          required: true,
        },
        subcategory: {
          type: "text",
          label: "Subcategory",
          labelProp: "subcategory",
        },
        product_collection: {
          type: "text",
          label: "Product Collection",
          labelProp: "product_collection",
        },

        tags: {
          type: "autocomplete_multiple",
          label: "Tags",
          options: !categorysQuery?.isLoading ? categorysQuery?.data : [],
          loading: categorysQuery?.isLoading,
          labelProp: "name",
        },
        pathname: {
          type: "text",
          label: "Pathname",
          labelProp: "pathname",
        },

        selectedOptions: {
          type: "array",
          title: "Selected Options",
          label: item => item.name,
          itemSchema: {
            type: "object",
            fields: {
              name: { type: "text", label: "Name" },
              replacePrice: { type: "checkbox", label: "Option Price Replaces Price" },
              isDefault: { type: "checkbox", label: "Default Option" },
              // product: {
              //   type: "autocomplete_single",
              //   label: "Option Product",
              //   options: productsQuery,
              //   labelProp: "name",
              //   onEditButtonClick: selectedProduct => {
              //     dispatch(saveToEditProductHistory(product));
              //     dispatch(API.detailsProduct({ pathname: selectedProduct._id }));
              //   },
              //   onCreateNewButtonClick: selectedProduct => {
              //     dispatch(saveToEditProductHistory(product));
              //     dispatch(API.saveProduct({ ...selectedProduct }));
              //   },
              //   showEditButton: true,
              // },
            },
          },
        },
        currentOptions: {
          type: "array",
          label: item => item.name,
          title: "Current Product Options",
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
                options: ["dropdown", "buttons"],
              },
              isAddOn: {
                type: "checkbox",
                label: "Is Add-On",
              },
              additionalCost: { type: "number", label: "Additional Cost" },
              values: {
                type: "array",
                title: "Option Choices",
                label: item => item.name,
                itemSchema: {
                  type: "object",
                  fields: {
                    name: { type: "text", label: "Name" },
                    replacePrice: { type: "checkbox", label: "Option Price Replaces Price" },
                    isDefault: { type: "checkbox", label: "Default Option" },
                    // product: {
                    //   type: "autocomplete_single",
                    //   label: "Option Product",
                    //   options: productsQuery,
                    //   labelProp: "name",
                    //   onEditButtonClick: selectedProduct => {
                    //     dispatch(saveToEditProductHistory(product));
                    //     dispatch(API.detailsProduct({ pathname: selectedProduct._id }));
                    //   },
                    //   onCreateNewButtonClick: selectedProduct => {
                    //     dispatch(saveToEditProductHistory(product));
                    //     dispatch(API.saveProduct({ ...selectedProduct }));
                    //   },
                    //   showEditButton: true,
                    // },
                  },
                },
              },
            },
          },
        },
        size: {
          type: "text",
          label: "Size",
          labelProp: "size",
        },

        count_in_stock: {
          type: "number",
          label: "Count in Stock",
          labelProp: "count_in_stock",
        },

        processing_time: {
          type: "multi-select",
          label: "Processing Time",
          labelProp: "processing_time",
          options: ["1 day", "2 days", "3 days", "4 days", "5 days", "6 days", "7 days"],
        },
        finite_stock: {
          type: "number",
          label: "Finite Stock",
          labelProp: "finite_stock",
        },

        wholesale_product: {
          type: "checkbox",
          label: "Wholesale Product",
          labelProp: "wholesale_product",
        },
        wholesale_price: {
          type: "number",
          label: "Wholesale Price",
          labelProp: "wholesale_price",
        },
        reviewed: {
          type: "checkbox",
          label: "Reviewed",
          default: false,
        },
        review_email_sent: {
          type: "checkbox",
          label: "Review Email Sent",
          default: false,
        },
        sale_price: {
          type: "number",
          label: "Sale Price",
          labelProp: "sale_price",
        },
        sale_start_date: {
          type: "date",
          label: "Sale Start Date",
          labelProp: "sale_start_date",
        },
        sale_end_date: {
          type: "date",
          label: "Sale End Date",
          labelProp: "sale_end_date",
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
      },
      ticketsUsed: {
        type: "array",
        title: "Tickets Used",
        label: "ticketId",
        itemSchema: {
          type: "object",
          fields: {
            ticketId: {
              type: "text",
              label: "Ticket ID",
            },
            used: {
              type: "checkbox",
              label: "Used",
            },
          },
        },
      },
    },
  };
};
