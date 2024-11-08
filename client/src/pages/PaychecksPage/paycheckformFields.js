import { userField } from "../../shared/GlowLEDsComponents/GLForm/glFormHelpers";

export const paycheckFormFields = ({ users, promos, teams, affiliates }) => {
  return {
    user: userField({ users, permissions: ["admin"] }),
    affiliate: {
      type: "autocomplete_single",
      label: "Affiliate",
      options: affiliates,
      labelProp: "artist_name",
    },
    description: {
      type: "text",
      label: "Description",
    },

    team: {
      type: "autocomplete_single",
      label: "Team",
      options: teams,
      labelProp: "team_name",
    },
    promo_code: {
      type: "autocomplete_single",
      label: "Promo Code",
      options: promos,
      labelProp: "promo_code",
    },
    amount: {
      type: "number",
      label: "Amount",
    },
    uses: {
      type: "number",
      label: "Code Uses",
    },
    stripe_connect_id: {
      type: "text",
      label: "Stripe Connect ID",
    },
    paid: {
      type: "checkbox",
      label: "Paid",
    },
    paid_at: {
      type: "date",
      label: "Paid At",
    },
  };
};
