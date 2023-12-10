import { tableColors } from "../../shared/GlowLEDsComponents/GLTableV2/glTableHelpers";

export const determineExpenseColors = expense => {
  let result = tableColors.active;
  // const category = [
  //   "3D Printer Accessories",
  //   "3D Printing Supplies",
  //   "Affiliate Earnings",
  //   "Cutter Accessories",
  //   "Cutter Supplies",
  //   "Electronic Accessories",
  //   "Electronic Accessories, 3D Printer Accessories",
  //   "Electronic Accessories, Shipping, Electronic Supplies",
  //   "Electronic Supplies",
  //   "Electronic Supplies, Electronic Accessories",
  //   "Employee Paycheck",
  //   "Filament",
  //   "Filament, Electronic Supplies",
  //   "Filament, Shipping",
  //   "Filament, Tools, 3D Printing Supplies",
  //   "Food",
  //   "Legal",
  //   "Marketing",
  //   "Merch",
  //   "Outsourcing",
  //   "Product",
  //   "Rave Mob",
  //   "Restaurants",
  //   "Shipping",
  //   "Shipping, Filament",
  //   "Shipping, Tools",
  //   "Tools",
  //   "Tools, Electronic Supplies, 3D Printing Supplies",
  //   "Tools, Electronic Supplies, Electronic Accessories",
  //   "Website"
  // ];
  if (expense.category.includes("3D Printer")) {
    result = tableColors.active;
  }
  if (expense.is_subscription) {
    result = tableColors.completed;
  }
  if (expense.category.includes("Affiliate Earnings")) {
    result = tableColors.alt_color_5;
  }
  if (expense.category.includes("Electronic")) {
    result = tableColors.alt_color_3;
  }
  if (expense.category.includes("Filament")) {
    result = tableColors.alt_color_4;
  }
  if (expense.category.includes("Shipping")) {
    result = tableColors.alt_color_1;
  }
  if (expense.category.includes("Tools")) {
    result = tableColors.alt_color_2;
  }
  if (expense.category.includes("Website")) {
    result = tableColors.waiting;
  }
  if (
    expense.category.includes("Restaurants") ||
    expense.category.includes("Food") ||
    expense.category.includes("Lunch")
  ) {
    result = tableColors.paused;
  }
  return result;
};

export const determineRepeatOnOptions = frequency => {
  if (frequency === "Weekly") {
    return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  }
  if (frequency === "Monthly") {
    return Array.from({ length: 31 }, (_, i) => `${i + 1}`);
  }
  if (frequency === "Yearly") {
    return [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
  }
};
