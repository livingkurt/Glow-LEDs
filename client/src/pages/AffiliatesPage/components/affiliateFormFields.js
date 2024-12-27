import { modeField, userField } from "../../../shared/GlowLEDsComponents/GLForm/glFormHelpers";
import { months } from "../../../utils/helper_functions";

export const affiliateFormFields = ({ products, users, microlights, promos, carts, modes }) => {
  return {
    _id: {
      type: "text",
      label: "ID",
      permissions: ["admin"],
      disabled: true,
    },
    user: userField({ users, permissions: ["admin"] }),
    modes: modeField({ modes, permissions: ["admin"] }),
    artist_name: {
      type: "text",
      label: "Glover Name",
    },
    promo_code_name: {
      type: "text",
      label: "Public Promo Code Name, it can be your glover name or something else",
      modes: ["create"],
      upperCase: true,
      noSpace: true,
      restrictCharacters: e => {
        if (e.key === " ") {
          e.preventDefault();
          return false;
        }
        return e;
      },
    },
    location: {
      type: "text",
      label: "City, State",
    },
    style: {
      type: "text multiline",
      label: "Describe your gloving style",
    },
    inspiration: {
      type: "text",
      label: "What are your Gloving Inspirations",
    },
    start_year: {
      type: "text",
      label: "The year you started gloving",
    },
    bio: {
      type: "text_multiline",
      label: "Bio about you and your gloving career so far, your goals, etc.",
    },
    social_media: {
      type: "array",
      title: "Social Media",
      label: "platform",
      itemSchema: {
        type: "object",
        fields: {
          platform: {
            type: "text",
            label: "Platform",
          },
          link: {
            type: "text",
            label: "Link",
          },
        },
      },
    },

    microlights: {
      type: "autocomplete_multiple",
      label: "Microlights you currently have",
      options: microlights,
      labelProp: "name",
    },

    product_bundles: {
      type: "autocomplete_multiple",
      label: "Product Bundles",
      options: carts?.filter(cart => cart.title),
      labelProp: "title",
    },

    products: {
      type: "autocomplete_multiple",
      label: "Glow LEDs Gear you currently have",
      options: products,
      labelProp: "name",
    },
    public_code: {
      type: "autocomplete_single",
      label: "Public Code",
      options: promos,
      labelProp: "promo_code",
      permissions: ["admin"],
    },
    private_code: {
      type: "autocomplete_single",
      label: "Private Code",
      options: promos,
      labelProp: "promo_code",
      permissions: ["admin"],
    },

    percentage_off: {
      type: "number",
      label: "Percentage Off",
      permissions: ["admin"],
    },
    picture: {
      type: "text",
      label: "Picture",
      permissions: ["admin"],
    },
    video: {
      type: "text",
      label: "Video",
      permissions: ["admin"],
    },
    videos: {
      type: "array",
      label: "Videos",
      permissions: ["admin"],
      labelProp: "title",
      itemSchema: {
        type: "object",
        fields: {
          title: {
            type: "text",
            label: "Title",
          },
          video: {
            type: "text",
            label: "Video",
          },
        },
      },
    },

    link: {
      type: "text",
      label: "Link",
      permissions: ["admin"],
    },
    pathname: {
      type: "text",
      label: "Pathname",
      permissions: ["admin"],
    },
    promoter: {
      type: "checkbox",
      label: "Promoter",
      permissions: ["admin"],
    },
    rave_mob: {
      type: "checkbox",
      label: "Rave Mob",
      permissions: ["admin"],
    },
    team: {
      type: "checkbox",
      label: "Team",
      permissions: ["admin"],
    },
    teamCaptain: {
      type: "checkbox",
      label: "Team Captain",
      permissions: ["admin"],
    },
    sponsorTeamCaptain: {
      type: "checkbox",
      label: "Sponsor Team Captain",
      permissions: ["admin"],
    },
    sponsor: {
      type: "checkbox",
      label: "Sponsor",
      permissions: ["admin"],
    },
    active: {
      type: "checkbox",
      label: "Active",
      permissions: ["admin"],
    },
    sponsorTasks: {
      title: "Sponsor Tasks",
      labelProp: "sponsorTasks",
      label: item => `${item.taskName} - ${item.month} ${item.year}`,
      type: "array",
      permissions: ["admin"],
      itemSchema: {
        type: "object",
        fields: {
          taskName: {
            type: "text",
            label: "Task Name",
            required: true,
          },
          points: {
            type: "number",
            label: "Points",
            required: true,
          },
          completedAt: {
            type: "date",
            label: "Completed At",
          },
          month: {
            type: "autocomplete_single",
            label: "Month",
            getOptionLabel: option => {
              if (typeof option === "string") {
                return option;
              }
            },
            options: months,
          },
          year: {
            type: "number",
            label: "Year",
          },
          jiraLink: {
            type: "text",
            label: "Jira Link",
          },
          driveLink: {
            type: "text",
            label: "Drive Link",
          },
          isFullLightshow: {
            type: "checkbox",
            label: "Full Lightshow",
          },
          verified: {
            type: "checkbox",
            label: "Verified",
          },
          verifiedBy: userField({ users, permissions: ["admin"] }),
        },
      },
    },
  };
};
