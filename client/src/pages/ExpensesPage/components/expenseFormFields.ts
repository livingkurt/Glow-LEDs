import { set_expense } from "../../../slices/expenseSlice";
import { toCapitalize } from "../../../utils/helper_functions";

export const expenseFormFields = ({ expense, dispatch }: { expense: any; dispatch: any }) => {
  return {
    expense_name: {
      type: "text",
      label: "Expense"
    },
    date_of_purchase: {
      type: "date",
      label: "Date of Purchase"
    },
    amount: {
      type: "number",
      label: "Amount"
    },
    application: {
      type: "text",
      label: "Application"
    },
    url: {
      type: "text",
      label: "URL"
    },
    documents: {
      type: "image_upload",
      label: "Documents",
      labelProp: "link",
      album: `${expense.expense_name} Documents`,
      getOptionLabel: (option: any) => option.link,
      onUpload: (value: any, key: any) => dispatch(set_expense({ documents: [...expense.documents, ...value] }))
    },
    place_of_purchase: {
      type: "autocomplete_single",
      label: "Place of Purchase",
      getOptionLabel: (option: any) => {
        if (typeof option === "string") {
          return toCapitalize(option);
        }
      },
      options: [
        "EasyPost",
        "FedEx",
        "Heroku",
        "Venmo",
        "Alibaba",
        "Amazon",
        "Backblaze",
        "Beaky's Chicken",
        "Bill Hulsey",
        "Bocanegras",
        "Canva",
        "EasyPost",
        "Fiverr",
        "Fuel Wise",
        "Google",
        "Paypal",
        "Pirateship",
        "Prinful",
        "Rice Bowl of India",
        "SocialChamp",
        "Stripe",
        "The Home Depot",
        "TopTea",
        "Venmo",
        "Vinyl Disorder"
      ]
    },
    card: {
      type: "autocomplete_single",
      label: "Card",
      getOptionLabel: (option: any) => {
        if (typeof option === "string") {
          return toCapitalize(option);
        }
      },
      options: [
        "Amazon Business 1004",
        "Charles Schwab 2628",
        "Charles Schwab 9432",
        "Venmo balance",
        "Amazon 4654",
        "Amazon 9204",
        "Amazon Business 0584",
        "Amazon Business 1004",
        "Amazon Business 1005",
        "Charles Schwab 2628",
        "Charles Schwab 7633",
        "Charles Schwab 9432",
        "Chase 2365",
        "Covantage 0933",
        "Covantage 7060",
        "Destanye 1991",
        "Fidelity 7484",
        "Joint Amex 1006",
        "Joint Amex 1014",
        "Joint Amex 2004",
        "Joint Amex 2012",
        "Mastercard 2713",
        "Mastercard 7404",
        "Stripe",
        "Venmo Balance"
      ]
    },
    category: {
      type: "autocomplete_single",
      label: "Category",
      getOptionLabel: (option: any) => {
        if (typeof option === "string") {
          return toCapitalize(option);
        }
      },
      options: [
        "3D Printer Accessories",
        "3D Printing Supplies",
        "Affiliate Earnings",
        "Cutter Accessories",
        "Cutter Supplies",
        "Electronic Accessories",
        "Electronic Supplies",
        "Electronics Supplies",
        "Employee Paycheck",
        "Filament",
        "Food",
        "Legal",
        "Marketing",
        "Merch",
        "Outsourcing",
        "Product",
        "Rave Mob",
        "Restaurants",
        "Shipping",
        "Shipping, Filament",
        "Shipping, Tools",
        "Supplies",
        "Tools",
        "Website"
      ]
    }
  };
};
