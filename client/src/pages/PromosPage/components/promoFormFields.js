export const promoFormFields = ({ affiliatesQuery, usersQuery, categorysQuery, productsQuery }) => {
  return {
    affiliate: {
      type: "autocomplete_single",
      label: "Affiliates",
      options: !affiliatesQuery?.isLoading ? affiliatesQuery?.data : [],
      loading: affiliatesQuery?.isLoading,
      labelProp: "affiliate",
      getOptionLabel: option => option.artist_name,
    },
    user: {
      type: "autocomplete_single",
      label: "User",
      options: !usersQuery?.isLoading ? usersQuery?.data?.filter(user => user.first_name && user.last_name) : [],
      loading: usersQuery?.isLoading,
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
    included_tags: {
      type: "autocomplete_multiple",
      label: "Included Tags",
      options: !categorysQuery?.isLoading ? categorysQuery?.data : [],
      loading: categorysQuery?.isLoading,
      labelProp: "name",
    },
    excluded_tags: {
      type: "autocomplete_multiple",
      label: "Excluded Tags",
      options: !categorysQuery?.isLoading ? categorysQuery?.data : [],
      loading: categorysQuery?.isLoading,
      labelProp: "name",
    },
    excluded_categories: {
      type: "autocomplete_multiple",
      label: "Excluded Categories",
      options: !categorysQuery?.isLoading ? categorysQuery?.data : [],
      loading: categorysQuery?.isLoading,
      labelProp: "name",
    },
    included_categories: {
      type: "autocomplete_multiple",
      label: "Included Categories",
      options: !categorysQuery?.isLoading ? categorysQuery?.data : [],
      loading: categorysQuery?.isLoading,
      labelProp: "name",
    },
    included_products: {
      type: "autocomplete_multiple",
      label: "Included Products",
      options: !productsQuery?.isLoading ? productsQuery?.data : [],
      loading: productsQuery?.isLoading,
      labelProp: "name",
    },
    excluded_products: {
      type: "autocomplete_multiple",
      label: "Excluded Products",
      options: !productsQuery?.isLoading ? productsQuery?.data : [],
      loading: productsQuery?.isLoading,
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
