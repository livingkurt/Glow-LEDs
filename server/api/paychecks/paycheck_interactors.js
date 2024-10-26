export const normalizePaycheckFilters = input => {
  const output = {};
  Object.keys(input).forEach(key => {
    switch (key) {
      case "paid":
        if (!input.paid.includes(1)) {
          output["paid"] = false;
        }
        break;
      case "affiliate":
        for (const affiliate of input.affiliate) {
          output["affiliate"] = affiliate;
        }
        break;
      case "employees":
        for (const employee of input.employees) {
          output["user"] = employee;
        }
        break;

      default:
        break;
    }
  });
  return output;
};

export const normalizePaycheckSearch = query => {
  let search = {};
  if (query.search) {
    const amountNumber = parseFloat(query.search);
    if (!isNaN(amountNumber)) {
      search.amount = amountNumber;
    }
  }
  return search;
};
