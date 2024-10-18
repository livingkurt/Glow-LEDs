import { months } from "../../../utils/helper_functions";

export const teamFormFields = ({ team, promos, affiliates }) => {
  return {
    captain: {
      type: "autocomplete_single",
      label: "Team Captain",
      options: affiliates,
      labelProp: "artist_name",
      permissions: ["admin"],
    },
    team_name: {
      type: "text",
      label: "Team Name",
    },
    affiliates: {
      type: "autocomplete_multiple",
      label: "Team Members",
      options: affiliates,
      labelProp: "artist_name",
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
      label: "The year you your team was founded",
    },
    images: {
      type: "image_upload",
      label: "Images",

      album: `${team.team_name} Images`,
      permissions: ["admin"],
    },
    map: {
      type: "image_upload",
      label: "Map Image",

      album: `${team.team_name} Map Image`,
      permissions: ["admin"],
    },
    profile_image: {
      type: "image_upload",
      label: "Profile Image",

      album: `${team.team_name} Profile Image`,
      permissions: ["admin"],
    },

    bio: {
      type: "text_multiline",
      label: "Bio about you and your team and members, your goals, etc.",
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
