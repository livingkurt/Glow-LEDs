import random from "lodash/random";
import { tagField } from "../../shared/GlowLEDsComponents/GLForm/glFormHelpers";
import { showInfo } from "../../slices/snackbarSlice";
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

export const sharedItemSchema = ({ products, events, tickets, tags, itemType, item }) => {
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
          options: products,
          labelProp: "name",
          required: true,
        },
        event: {
          type: "autocomplete_single",
          label: "Event",
          options: events,
          labelProp: "name",
        },
        ticket: {
          type: "autocomplete_single",
          label: "Ticket",
          options: tickets,
          labelProp: "title",
        },
        ticket_type: {
          type: "text",
          label: "Ticket Type",
          labelProp: "ticket_type",
        },
        itemType: {
          type: "autocomplete_single",
          label: "Item Type",
          getOptionLabel: option => {
            if (typeof option === "string") {
              return toCapitalize(option);
            }
          },
          options: ["product", "ticket", "gift_card"],
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
          type: "image_upload_single",
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

        tags: tagField({ tags }),
        pathname: {
          type: "text",
          label: "Pathname",
          labelProp: "pathname",
        },
        selectedOptions: {
          type: "option_selector",
          label: "Selected Options",
          getCurrentOptions: index => item?.orderItems?.[index]?.currentOptions || [],
          getSelectedOptions: index => item?.orderItems?.[index]?.selectedOptions || [],
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
        sale: {
          type: "object",
          title: "Sale",
          fields: {
            price: {
              type: "number",
              label: "Sale Price",
            },
            start_date: {
              type: "date",
              label: "Sale Start Date",
            },
            end_date: {
              type: "date",
              label: "Sale End Date",
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

export const setPromoCode = (dispatch, promoCode) => {
  sessionStorage.setItem("promo_code", promoCode);
  dispatch(
    showInfo({
      message: `Code ${promoCode.toUpperCase()} Added to Checkout`,
    })
  );
};

export const generateGradient = () => {
  const hue1 = random(0, 360);
  const hue2 = (hue1 + 90) % 360;
  return `linear-gradient(135deg,
      hsl(${hue1}deg 100% 40%) 0%,
      hsl(${hue2}deg 100% 40%) 100%)`;
};

export const generateGradientFromIndex = index => {
  // Base hue will increment by 30 degrees for each card
  const baseHue = (index * 60) % 360;
  const hue1 = baseHue;
  const hue2 = (baseHue + 90) % 360; // Still offset by 60 degrees for a complementary color
  return `linear-gradient(135deg,
      hsl(${hue1}deg 100% 40%) 0%,
    hsl(${hue2}deg 100% 40%) 100%)`;
};

export const determineRevenueTier = (affiliate, revenue) => {
  if (affiliate.promoter) {
    if (revenue < 100) {
      return 10;
    } else if (revenue >= 100 && revenue < 200) {
      return 20;
    } else if (revenue >= 200 && revenue < 300) {
      return 25;
    } else if (revenue >= 300 && revenue < 400) {
      return 30;
    } else if (revenue >= 400 && revenue < 500) {
      return 35;
    } else if (revenue >= 500) {
      return 40;
    }
  } else if (affiliate.sponsor) {
    if (revenue < 150) {
      return 30;
    } else if (revenue >= 150 && revenue < 300) {
      return 35;
    } else if (revenue >= 300 && revenue < 500) {
      return 40;
    } else if (revenue >= 500 && revenue < 750) {
      return 50;
    } else if (revenue >= 750) {
      return 60;
    }
  }
};
