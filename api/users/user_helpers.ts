import { isEmail } from "../../util";

export const normalizeUserFilters = (input: any) => {
  const output: any = {};
  Object.keys(input).forEach(key => {
    switch (key) {
      case "affiliates":
        if (!input.affiliates.includes(1)) {
          output["is_affiliated"] = false;
        } else {
          output["is_affiliated"] = true;
        }
        break;
      case "guests":
        if (!input.guests.includes(1)) {
          output["guest"] = false;
        } else {
          output["guest"] = true;
        }
        break;
      case "admins":
        if (!input.admins.includes(1)) {
          output["isAdmin"] = false;
        } else {
          output["isAdmin"] = true;
        }
        break;
      case "wholesalers":
        if (!input.wholesalers.includes(1)) {
          output["isWholesaler"] = false;
        } else {
          output["isWholesaler"] = true;
        }
        break;
      case "employees":
        if (!input.employees.includes(1)) {
          output["is_employee"] = false;
        } else {
          output["is_employee"] = true;
        }
        break;

      default:
        break;
    }
  });
  if (input.affiliates?.includes("only_affiliates")) {
    output.is_affiliated = true;
  }
  if (input.guests?.includes("only_guests")) {
    output.guest = true;
  }
  if (input.admins?.includes("only_admins")) {
    output.isAdmin = true;
  }
  if (input.wholesalers?.includes("only_wholesalers")) {
    output.isWholesaler = true;
  }
  if (input.employees?.includes("only_employees")) {
    output.is_employee = true;
  }
  return output;
};

export const normalizeUserSearch = (query: any) => {
  let search = {};
  if (query.search && query.search.match(/^[0-9a-fA-F]{24}$/)) {
    search = query.search ? { _id: query.search } : {};
  } else if (query.search && isEmail(query.search)) {
    search = query.search
      ? {
          $expr: {
            $regexMatch: {
              input: "$email",
              regex: query.search,
              options: "i"
            }
          }
        }
      : {};
  } else {
    search = query.search
      ? {
          $expr: {
            $regexMatch: {
              input: {
                $concat: ["$first_name", " ", "$last_name"]
              },
              regex: query.search,
              options: "i"
            }
          }
        }
      : {};
  }
  return search;
};
