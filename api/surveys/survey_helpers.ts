export const normalizeSurveyFilters = (input: any) => {
  const output: any = {};
  Object.keys(input).forEach(key => {
    switch (key) {
      case "category":
        for (const category of input.category) {
          output["category"] = category;
        }
        break;
      case "card":
        for (const card of input.card) {
          output["card"] = card;
        }
        break;
      case "place_of_purchase":
        for (const place_of_purchase of input.place_of_purchase) {
          output["place_of_purchase"] = place_of_purchase;
        }
        break;

      default:
        break;
    }
  });
  return output;
};

export const normalizeSurveySearch = (query: any) => {
  const search = query.search
    ? {
        survey_name: {
          $regex: query.search.toLowerCase(),
          $options: "i",
        },
      }
    : {};

  return search;
};
