const colors = [
  { name: "Paid", color: "#3e4c6d" },
  { name: "Not Paid", color: "#6f3c3c" }
];

export const determine_color = paycheck => {
  let result = "";
  if (paycheck.paid) {
    result = colors[0].color;
  }
  if (!paycheck.paid) {
    result = colors[1].color;
  }
  return result;
};
