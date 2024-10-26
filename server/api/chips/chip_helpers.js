// export const normalizeChipFilters = input => {
//   const output = {};
//   Object.keys(input).forEach(key => {
//     switch (key) {
//       case "category":
//         for (const category of input.category) {
//           output["category"] = category;
//         }
//         break;
//       case "card":
//         for (const card of input.card) {
//           output["card"] = card;
//         }
//         break;
//       case "place_of_purchase":
//         for (const place_of_purchase of input.place_of_purchase) {
//           output["place_of_purchase"] = place_of_purchase;
//         }
//         break;

//       default:
//         break;
//     }
//   });
//   return output;
// };

export const normalizeChipSearch = query => {
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
