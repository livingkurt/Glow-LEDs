export const promoFormFields = ({ affiliates, users, categorys, products, setState, promo }) => {
  return {
    affiliate: {
      type: "autocomplete_single",
      label: "Affiliates",
      options: affiliates,
      labelProp: "affiliate",
      getOptionLabel: option => option.artist_name,
    },
    user: {
      type: "autocomplete_single",
      label: "User",
      options: users.filter(user => user.first_name && user.last_name),
      labelProp: "user",
      getOptionLabel: option => `${option.first_name} ${option.last_name}`,
    },
    promo_code: {
      type: "text",
      label: "Promo Code",
      required: true,
    },
    admin_only: {
      type: "checkbox",
      label: "Admin Only",
      default: true,
    },
    affiliate_only: {
      type: "checkbox",
      label: "Affiliate Only",
      default: false,
    },
    sponsor_only: {
      type: "checkbox",
      label: "Sponsor Only",
      default: false,
    },
    excluded_categories: {
      type: "autocomplete_multiple",
      label: "Excluded Categories",
      options: categorys,
      labelProp: "name",
    },
    included_categories: {
      type: "autocomplete_multiple",
      label: "Included Categories",
      options: categorys,
      labelProp: "name",
    },
    included_products: {
      type: "autocomplete_multiple",
      label: "Included Products",
      options: products,
      labelProp: "name",
    },
    excluded_products: {
      type: "autocomplete_multiple",
      label: "Excluded Products",
      options: products,
      labelProp: "name",
    },
    percentage_off: {
      type: "number",
      label: "Percentage Off",
    },
    free_shipping: {
      type: "checkbox",
      label: "Free Shipping",
    },
    exclude: {
      type: "checkbox",
      label: "Exclude",
    },
    include: {
      type: "checkbox",
      label: "Include",
    },
    amount_off: {
      type: "number",
      label: "Amount Off",
    },
    single_use: {
      type: "checkbox",
      label: "Single Use",
    },
    time_limit: {
      type: "checkbox",
      label: "Time Limit",
    },
    start_date: {
      type: "date",
      label: "Start Date",
    },
    end_date: {
      type: "date",
      label: "End Date",
    },
    used_once: {
      type: "checkbox",
      label: "Used Once",
      default: false,
    },
    minimum_total: {
      type: "number",
      label: "Minimum Total",
      default: 0,
    },
    active: {
      type: "checkbox",
      label: "Active",
      default: true,
    },
  };
};
