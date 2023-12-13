import { set_expense } from "../../../slices/expenseSlice";
import { toCapitalize } from "../../../utils/helper_functions";
import { determineRepeatOnOptions } from "../expensesPageHelpers";

export const expenseFormFields = ({ expense, dispatch, expenses, filters }) => {
  return {
    expense_name: {
      type: "text",
      label: "Expense",
    },
    amount: {
      type: "number",
      label: "Amount",
    },
    date_of_purchase: {
      type: "date",
      label: "Date of Purchase",
    },

    place_of_purchase: {
      type: "autocomplete_single",
      label: "Place of Purchase",
      getOptionLabel: option => {
        if (typeof option === "string") {
          return toCapitalize(option);
        }
      },
      options: filters?.availableFilters?.place_of_purchase,
    },
    card: {
      type: "autocomplete_single",
      label: "Card",
      getOptionLabel: option => {
        if (typeof option === "string") {
          return toCapitalize(option);
        }
      },
      options: filters?.availableFilters?.card,
    },
    category: {
      type: "autocomplete_single",
      label: "Category",
      getOptionLabel: option => {
        if (typeof option === "string") {
          return toCapitalize(option);
        }
      },
      options: filters?.availableFilters?.category,
    },
    parent_subscription: {
      type: "autocomplete_single",
      label: "Parent Subscription",
      options: expenses.filter(expense => expense.is_subscription),
      labelProp: "expense_name",
      getOptionLabel: option => option.expense_name,
    },
    is_subscription: {
      type: "checkbox",
      label: "Is Subscription",
    },

    subscription: {
      type: "object",
      title: "Subscription",
      fields: {
        amount: { type: "text", label: "Amount" },
        frequency: {
          type: "autocomplete_single",
          label: "Frequency",
          getOptionLabel: option => {
            if (typeof option === "string") {
              return toCapitalize(option);
            }
          },
          options: ["Weekly", "Monthly", "Yearly"],
        },
        repeats_on: {
          type: "autocomplete_single",
          label: "Repeats On",
          getOptionLabel: option => {
            if (typeof option === "string") {
              return toCapitalize(option);
            }
          },
          // Days of the month
          options: determineRepeatOnOptions(expense?.subscription?.frequency),
        },
        // repeats_on: { type: "date", label: "Repeats On" },
        valid_to: { type: "date", label: "Valid To" },
      },
    },
    documents: {
      type: "image_upload",
      label: "Documents",
      labelProp: "link",
      album: `${expense.expense_name} Documents`,
      getOptionLabel: option => option.link,
      onUpload: (value, key) => dispatch(set_expense({ documents: [...expense.documents, ...value] })),
    },
  };
};
