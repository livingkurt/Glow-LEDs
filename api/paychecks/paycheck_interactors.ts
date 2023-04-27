export const normalizePaycheckFilters = (input: any) => {
  console.log({ input });
  const output: any = {};
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

      default:
        break;
    }
  });
  return output;
};

export const normalizePaycheckSearch = (query: any) => {
  const search = query.search
    ? {
        "$affiliate.artist_name": {
          $regex: query.search.toLowerCase(),
          $options: "i"
        }
      }
    : {};

  return search;
};
