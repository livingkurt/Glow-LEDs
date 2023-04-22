import { isEmail } from "../../util";

export const normalizePaycheckFilters = (input: any) => {
  const output: any = {};
  Object.keys(input).forEach(key => {
    switch (key) {
      case "paid":
        if (!input.paid.includes(1)) {
          output["paid"] = false;
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
