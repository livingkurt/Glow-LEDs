import { toCapitalize } from "../../../utils/helper_functions";

export const giftCardFormFields = () => {
  return {
    initialBalance: {
      type: "number",
      label: "Initial Balance",
      required: true,
      min: 0,
      step: "0.01",
    },
    source: {
      type: "autocomplete_single",
      label: "Source",
      getOptionLabel: option => {
        if (typeof option === "string") {
          return toCapitalize(option);
        }
      },
      options: ["purchase", "sponsor benefit", "promotion", "compensation"],
    },
    expirationDate: {
      type: "date",
      label: "Expiration Date",
    },
    code: {
      type: "text",
      label: "Code",
    },
    currentBalance: {
      type: "number",
      label: "Current Balance",
      required: true,
    },
    transactions: {
      type: "array",
      label: item => `$${item.amount}`,
      title: "Transactions",
      itemSchema: {
        type: "object",
        fields: {
          orderId: {
            type: "text",
            label: "Order ID",
          },
          amount: {
            type: "number",
            label: "Amount",
            required: true,
            min: 0,
            step: "0.01",
          },
          date: {
            type: "date",
            label: "Date",
          },
        },
      },
    },
    isActive: {
      type: "checkbox",
      label: "Active",
    },
  };
};
