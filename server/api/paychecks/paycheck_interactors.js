import { affiliate_db } from "../affiliates";
import { user_db } from "../users";

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
  const search = query.search
    ? {
        "$affiliate.artist_name": {
          $regex: query.search.toLowerCase(),
          $options: "i",
        },
      }
    : {};

  return search;
};

// export const normalizePaycheckSearch = async (query) => {
//   if (!query.search) {
//     return {};
//   }

//   // Find all matching affiliates
//   const affiliates = await affiliate_db.findAll_affiliates_db({ artist_name: query.search }, {}, "0", "1");

//   // Find all matching users
//   const users = await user_db.findAll_users_db(
//     {
//       $expr: {
//         $regexMatch: {
//           input: {
//             $concat: ["$first_name", " ", "$last_name"]
//           },
//           regex: query.search,
//           options: "i"
//         }
//       }
//     },
//     {},
//     "0",
//     "1"
//   );

//   // Construct the search filter

//   const affiliateIds = affiliates.map((affiliate) => affiliate._id);
//   const userIds = users.map((user) => user._id);

//   const search = {
//     $or: [{ affiliate: { $in: affiliateIds } }, { user: { $in: userIds } }]
//   };

//   return search;
// };
