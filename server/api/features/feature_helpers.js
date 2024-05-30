export const normalizeFeatureSearch = query => {
  const search = query.search
    ? {
        artist_name: {
          $regex: query.search.toLowerCase(),
          $options: "i",
        },
      }
    : {};

  return search;
};
