export const salePriceFormFields = ({ tags = [] }) => ({
  discountType: {
    type: "autocomplete_single",
    label: "Discount Type",
    getOptionLabel: option => option.label,
    options: [
      { value: "percentage", label: "Percentage Off" },
      { value: "fixed", label: "Fixed Amount Off" },
    ],
  },
  discountValue: {
    type: "number",
    label: "Discount Value",
  },
  startDate: {
    type: "date",
    label: "Sale Start Date",
  },
  endDate: {
    type: "date",
    label: "Sale End Date",
  },
  applyToOptions: {
    type: "checkbox",
    label: "Apply discount to product options",
  },

  applyToAll: {
    type: "checkbox",
    label: "Apply to All Products",
  },
  exactTags: {
    type: "checkbox",
    label: "Apply to Exact Tags",
  },
  selectedTags: {
    type: "autocomplete_multiple",
    label: "Products with Tags",
    options: tags,
    labelProp: "name",
    getOptionLabel: option => option.name,
    disabled: state => state.applyToAll,
  },
});
