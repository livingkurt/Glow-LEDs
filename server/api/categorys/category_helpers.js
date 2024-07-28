export const normalizeCategorySearch = query => {
  const search = query.search
    ? {
        name: {
          $regex: query.search.toLowerCase(),
          $options: "i",
        },
      }
    : {};

  return search;
};
