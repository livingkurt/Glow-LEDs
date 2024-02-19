import { tableColors } from "../../shared/GlowLEDsComponents/GLTableV2/glTableHelpers";

export const determineExpenseColors = expense => {
  let result = tableColors.active;
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
