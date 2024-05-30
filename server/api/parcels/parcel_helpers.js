export const normalizeParcelSearch = query => {
  const search = query.search
    ? {
        type: {
          $regex: query.search.toLowerCase(),
          $options: "i",
        },
      }
    : {};

  return search;
};
