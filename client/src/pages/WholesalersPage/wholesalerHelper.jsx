const colors = [
  { name: "Active", color: "#6f3c3c" },
  { name: "Not Active", color: "#3e4c6d" },
];

export const determineColor = paycheck => {
  let result = "";
  if (paycheck.paid) {
    result = colors[0].color;
  }
  if (!paycheck.paid) {
    result = colors[1].color;
  }
  return result;
};
