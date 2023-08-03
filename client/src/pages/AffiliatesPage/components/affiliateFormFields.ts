import { months, toCapitalize } from "../../../utils/helper_functions";

export const affiliateFormFields = ({
  products,
  users,
  chips,
  promos,
}: {
  products: any;
  users: any;
  chips: any;
  promos: any;
}) => {
  return {
    user: {
      type: "autocomplete_single",
      label: "Users",
      options: users,
      labelProp: "user",
      getOptionLabel: (option: any) => `${option.first_name} ${option.last_name}`,
      permissions: ["admin"],
    },
    artist_name: {
      type: "text",
      label: "Artist Name",
    },
    location: {
      type: "text",
      label: "Location",
    },
    style: {
      type: "text",
      label: "Style",
    },
    inspiration: {
      type: "text",
      label: "Inspiration",
    },
    start_year: {
      type: "text",
      label: "The year you started gloving",
    },
    bio: {
      type: "text_multiline",
      label: "Bio",
    },
    instagram_link: {
      type: "text",
      label: "Instagram Link",
    },
    tiktok_link: {
      type: "text",
      label: "TikTok Link",
    },
    youtube_link: {
      type: "text",
      label: "YouTube Link",
    },
    facebook_link: {
      type: "text",
      label: "Facebook Link",
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
    answers: {
      type: "array",
      label: "Answers",
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
      type: "array_of_objects",
      labelProp: "sponsorMonthlyCheckins",
      fields: {
        month: {
          type: "autocomplete_single",
          label: "Month",
          getOptionLabel: (option: any) => {
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
  };
};
