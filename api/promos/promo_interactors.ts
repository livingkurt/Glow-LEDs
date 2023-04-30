export const normalizePromoFilters = (input: any) => {
  console.log({ input });
  const output: any = {};
  Object.keys(input).forEach(key => {
    switch (key) {
      case "affiliate_only":
        if (!input.affiliate_only.includes(1)) {
          output["affiliate_only"] = false;
        }
        break;
      case "sponsor_only":
        if (!input.sponsor_only.includes(1)) {
          output["sponsor_only"] = false;
        }
        break;
      case "single_use":
        if (!input.single_use.includes(1)) {
          output["single_use"] = false;
        }
        break;
      case "used":
        if (!input.used.includes(1)) {
          output["used"] = false;
        }
        break;
      case "admin_only":
        if (!input.admin_only.includes(1)) {
          output["admin_only"] = false;
        }
        break;
      case "active":
        if (!input.active.includes(1)) {
          output["active"] = false;
        }
        break;

      default:
        break;
    }
  });
  return output;
};

export const normalizePromoSearch = (query: any) => {
  const search = query.search
    ? {
        promo_code: {
          $regex: query.search.toLowerCase(),
          $options: "i"
        }
      }
    : {};

  return search;
};
