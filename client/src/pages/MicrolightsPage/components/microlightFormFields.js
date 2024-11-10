import { tagField } from "../../../shared/GlowLEDsComponents/GLForm/glFormHelpers";
import { toCapitalize } from "../../../utils/helper_functions";

export const microlightFormFields = ({ microlight, tags }) => {
  return {
    microlight_info_title: {
      label: "Microlight Info",
      type: "title",
      align: "center",
      variant: "h6",
    },
    name: {
      type: "text",
      label: "Name",
      required: true,
    },
    images: {
      type: "image_upload_multiple",
      label: "Images",
      album: `${microlight.name} Images`,
      getOptionLabel: option => option.link,
    },
    company: {
      type: "text",
      label: "Company",
      required: true,
    },
    category: {
      type: "text",
      label: "Category",
      required: true,
    },

    programmable: {
      type: "checkbox",
      label: "Programmable",
      default: false,
    },
    power: {
      type: "autocomplete_single",
      label: "Power Type",
      options: ["rechargeable", "non-rechargeable"],
      getOptionLabel: option => {
        if (typeof option === "string") {
          return toCapitalize(option);
        }
      },
    },
    battery_life: {
      type: "number",
      label: "Battery Life (hours)",
    },
    number_of_modes: {
      type: "number",
      label: "Number of Modes",
    },
    number_of_leds: {
      type: "number",
      label: "Number of LEDs",
    },

    colors_per_mode: {
      type: "number",
      label: "Colors Per Mode",
    },
    colors: {
      type: "array",
      title: "Available Colors",
      label: item => item.name,
      itemSchema: {
        type: "object",
        fields: {
          name: {
            type: "text",
            label: "Name",
          },
          colorCode: {
            type: "color_picker",
            label: "Color Code",
          },
        },
      },
    },

    saturation_control: {
      type: "checkbox",
      label: "Saturation Control",
      default: false,
    },
    saturation_levels: {
      type: "number",
      label: "Saturation Levels",
    },
    brightness_control: {
      type: "checkbox",
      label: "Brightness Control",
      default: false,
    },
    brightness_levels: {
      type: "number",
      label: "Brightness Levels",
    },
    flashing_patterns: {
      type: "array",
      title: "Flashing Patterns",
      label: item => item.name,
      itemSchema: {
        type: "object",
        fields: {
          name: {
            type: "text",
            label: "Name",
          },
          type: {
            type: "text",
            label: "Type",
          },
        },
      },
    },
    pathname: {
      type: "text",
      label: "Pathname",
    },

    tags: tagField({ tags }),
    dimensions: {
      type: "object",
      title: "Dimensions",
      fields: {
        length: {
          type: "number",
          label: "Length",
        },
        width: {
          type: "number",
          label: "Width",
        },
        height: {
          type: "number",
          label: "Height",
        },
      },
    },
    chip_to_chip: {
      type: "checkbox",
      label: "Chip to Chip",
      default: false,
    },
    motion_reactive: {
      type: "checkbox",
      label: "Motion Reactive",
      default: false,
    },

    global_brightness_control: {
      type: "checkbox",
      label: "Global Brightness Control",
      default: false,
    },
    computer_programmable: {
      type: "checkbox",
      label: "Computer Programmable",
      default: false,
    },

    characteristics: {
      type: "text_multiline",
      label: "Characteristics",
    },
  };
};
