export const normalizeFilamentFilters = input => {
  const output = {};
  Object.keys(input).forEach(key => {
    switch (key) {
      case "type":
        for (const type of input.type) {
          output["type"] = type;
        }
        break;
      case "tags":
        for (const tags of input.tags) {
          output["tags"] = tags;
        }
        break;
      default:
        break;
    }
  });
  return output;
};

export const normalizeFilamentSearch = query => {
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
