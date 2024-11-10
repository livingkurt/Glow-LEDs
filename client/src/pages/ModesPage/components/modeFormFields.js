import { toCapitalize } from "../../../utils/helper_functions";

export const modeFormFields = ({ mode, microlights }) => {
  return {
    mode_info_title: {
      label: "Mode Info",
      type: "title",
      align: "center",
      variant: "h6",
    },
    name: {
      label: "Name",
      type: "text",
      required: true,
    },
    description: {
      label: "Description",
      type: "text_multiline",
      rows: 4,
    },
    microlight: {
      type: "autocomplete_single",
      label: "Microlight",
      options: microlights,
      labelProp: "name",
    },
    colors: {
      label: "Colors",
      type: "array",
      itemSchema: {
        type: "object",
        fields: {
          hue: {
            label: "Color",
            type: "autocomplete_single",
            options: mode?.microlight?.colors,
            labelProp: "name",
          },
          saturation: {
            label: "Saturation",
            type: "autocomplete_single",
            options: Array.from({ length: mode?.microlight?.saturation_levels }, (_, i) => i),
          },
          brightness: {
            label: "Brightness",
            type: "autocomplete_single",
            options: Array.from({ length: mode?.microlight?.brightness_levels }, (_, i) => i),
          },
        },
      },
    },
    flashing_pattern: {
      label: "Flashing Pattern",
      type: "object",
      fields: {
        name: {
          label: "Name",
          type: "text",
        },
        type: {
          label: "Type",
          type: "text",
        },
        on_dur: {
          label: "On Duration",
          type: "number",
        },
        off_dur: {
          label: "Off Duration",
          type: "number",
        },
        gap_dur: {
          label: "Gap Duration",
          type: "number",
        },
      },
    },
    visibility: {
      label: "Visibility",
      type: "autocomplete_single",
      options: ["public", "private"],
      getOptionLabel: option => {
        if (typeof option === "string") {
          return toCapitalize(option);
        }
      },
      required: true,
    },
  };
};
