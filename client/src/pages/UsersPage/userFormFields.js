import { toCapitalize } from "../../utils/helper_functions";

export const userFormFields = ({ affiliates, wholesalers, promos, teams }) => {
  return {
    _id: {
      type: "text",
      label: "ID",
    },
    first_name: {
      type: "text",
      label: "First Name",
      required: true,
    },
    last_name: {
      type: "text",
      label: "Last Name",
      required: true,
    },
    email: {
      type: "text",
      label: "Email",
      required: true,
    },
    stripe_connect_id: {
      type: "text",
      label: "Stripe Connect ID",
      permissions: ["admin"],
    },

    weekly_wage: {
      type: "number",
      label: "Weekly Wage",
      permissions: ["admin"],
    },
    affiliate: {
      type: "autocomplete_single",
      label: "Affiliates",
      options: affiliates,
      labelProp: "affiliate",
      getOptionLabel: option => option.artist_name,
      permissions: ["admin"],
    },
    team: {
      type: "autocomplete_single",
      label: "Teams",
      options: teams,
      labelProp: "team",
      getOptionLabel: option => option.team_name,
      permissions: ["admin"],
    },
    t_shirt_size: {
      type: "autocomplete_single",
      label: "T-Shirt Size",
      getOptionLabel: option => {
        if (typeof option === "string") {
          return toCapitalize(option);
        }
      },
      options: ["Small", "Medium", "Large", "X-Large", "XX-Large"],
    },
    glove_size: {
      type: "autocomplete_single",
      label: "Glove Size",
      getOptionLabel: option => {
        if (typeof option === "string") {
          return toCapitalize(option);
        }
      },
      options: ["Small", "Medium", "Large", "X-Large", "XX-Large"],
    },
    employee_code: {
      type: "autocomplete_single",
      label: "Employee Code",
      options: promos,
      labelProp: "promo_code",
      permissions: ["admin"],
    },
    email_subscription: {
      type: "checkbox",
      label: "Email Subscription",
    },
    guest: {
      type: "checkbox",
      label: "Guest",
      permissions: ["admin"],
    },
    wholesaler: {
      type: "autocomplete_single",
      label: "Wholesalers",
      options: wholesalers,
      labelProp: "wholesaler",
      getOptionLabel: option => option.company,
      permissions: ["admin"],
    },
    isWholesaler: {
      type: "checkbox",
      label: "Wholesaler",
      permissions: ["admin"],
    },
    isAdmin: {
      type: "checkbox",
      label: "Admin",
      permissions: ["admin"],
    },
    isVerified: {
      type: "checkbox",
      label: "Verified",
      permissions: ["admin"],
    },
    is_affiliated: {
      type: "checkbox",
      label: "Affiliated",
      permissions: ["admin"],
    },
    is_employee: {
      type: "checkbox",
      label: "Employee",
      permissions: ["admin"],
    },
    shipping: {
      type: "object",
      title: "Shipping Information",
      fields: {
        first_name: {
          type: "text",
          label: "First Name",
        },
        last_name: {
          type: "text",
          label: "Last Name",
        },
        address_1: {
          type: "text",
          label: "Address Line 1",
        },
        address_2: {
          type: "text",
          label: "Address Line 2",
        },
        city: {
          type: "text",
          label: "City",
        },
        state: {
          type: "text",
          label: "State",
        },
        postalCode: {
          type: "text",
          label: "Postal Code",
        },
        international: {
          type: "checkbox",
          label: "International",
        },
        country: {
          type: "text",
          label: "Country",
        },
      },
    },
  };
};
