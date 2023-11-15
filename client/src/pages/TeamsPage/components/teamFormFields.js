import { months } from "../../../utils/helper_functions";

export const teamFormFields = ({ users, promos, affiliates }) => {
  return {
    captain: {
      type: "autocomplete_single",
      label: "User",
      options: users.filter(user => user.first_name && user.last_name),
      labelProp: "user",
      getOptionLabel: option => `${option.first_name} ${option.last_name}`,
      permissions: ["admin"],
    },
    team_name: {
      type: "text",
      label: "Team Name",
    },
    affiliates: {
      type: "autocomplete_multiple",
      label: "Color Product",
      options: affiliates,
      labelProp: "name",
      permissions: ["admin"],
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
    teamMonthlyCheckins: {
      title: "Team Monthly Checkins",
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
