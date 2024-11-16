import { affiliateField, userField } from "../../../shared/GlowLEDsComponents/GLForm/glFormHelpers";
import { toCapitalize } from "../../../utils/helper_functions";

export const modeFormFields = ({ mode, microlights, users, affiliates }) => {
  return {
    mode_info_title: {
      label: "Mode Info",
      type: "title",
      align: "center",
      variant: "h6",
    },
    user: userField({ users }),
    affiliate: affiliateField({ affiliates }),
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
      label: "name",
      type: "array",
      itemSchema: {
        type: "object",
        fields: {
          name: {
            label: "Name",
            type: "text",
          },
          colorCode: {
            label: "Color Code",
            type: "text",
          },
          saturation: {
            label: "Saturation",
            type: "number",
          },
          brightness: {
            label: "Brightness",
            type: "number",
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
        dash_dur: {
          label: "Dash Duration",
          type: "number",
        },
        group_size: {
          label: "Group Size",
          type: "number",
        },
        blend_speed: {
          label: "Blend Speed",
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
