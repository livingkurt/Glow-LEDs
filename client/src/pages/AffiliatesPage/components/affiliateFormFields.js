import { months, toCapitalize } from "../../../utils/helper_functions";

export const affiliateFormFields = ({ products, users, chips, promos }) => {
  return {
    _id: {
      type: "text",
      label: "ID",
      permissions: ["admin"],
      disabled: true,
    },
    user: {
      type: "autocomplete_single",
      label: "User",
      options: users.filter(user => user.first_name && user.last_name),
      labelProp: "user",
      getOptionLabel: option => `${option.first_name} ${option.last_name}`,
      permissions: ["admin"],
    },
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
    instagram_link: {
      type: "text",
      label: "Instagram Share Link",
    },
    tiktok_link: {
      type: "text",
      label: "TikTok Share Link",
    },
    youtube_link: {
      type: "text",
      label: "YouTube Share Link",
    },
    facebook_link: {
      type: "text",
      label: "Facebook Share Link",
    },

    chips: {
      type: "autocomplete_multiple",
      label: "Microlights you currently have",
      options: chips,
      labelProp: "name",
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
    sponsorMonthlyCheckins: {
      title: "Sponsor Monthly Checkins",
      labelProp: "sponsorMonthlyCheckins",
      label: item => `${item.year} ${item.month}`,
      type: "array",
      permissions: ["admin"],
      itemSchema: {
        type: "object",
        fields: {
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
            labelProp: "year",
            required: true,
          },
          questionsConcerns: {
            type: "text",
            label: "Questions or Concerns",
            labelProp: "questionsConcerns",
            required: true,
          },
          numberOfContent: {
            type: "text",
            label: "Number of Content",
            labelProp: "numberOfContent",
          },
        },
      },
    },
  };
};
