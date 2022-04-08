export {};
import jwt from "jsonwebtoken";
const config = require("./config");
import { Request } from "express";
import { Token } from "./models";

import { getTracking } from "ts-tracking-number";
export interface IGetUserAuthInfoRequest extends Request {
  user: any; // or any other type
}

export const getAccessToken = (user: any) => {
  return jwt.sign(
    {
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: user.password,
      isAdmin: user.isAdmin,
      isVerified: user.isVerified,
      affiliate: user.affiliate,
      email_subscription: user.email_subscription,
      shipping: user.shipping,
      is_affiliated: user.is_affiliated,
    },
    config.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m", // 1 year in seconds
    }
  );
};
export const getRefreshToken = (user: any) => {
  try {
    const refreshToken = jwt.sign(
      {
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        password: user.password,
        isAdmin: user.isAdmin,
        isVerified: user.isVerified,
        affiliate: user.affiliate,
        email_subscription: user.email_subscription,
        shipping: user.shipping,
        is_affiliated: user.is_affiliated,
      },
      config.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "200d", // 1 year in seconds
      }
    );
    // const token = await Token.create({ token: refreshToken });
    // console.log({ token });
    // if (token) {
    return refreshToken;
    // }
  } catch (error) {
    console.error(error);
    return;
  }
};

// //middleware function to check if the incoming request in authenticated:
// export const checkAuth = (req: any, res: any, next: any) => {
// 	// get the token stored in the custom header called 'x-auth-token'
// 	const token = req.get('x-auth-token');
// 	//send error message if no token is found:
// 	if (!token) {
// 		return res.status(401).json({ error: 'Access denied, token missing!' });
// 	} else {
// 		try {
// 			//if the incoming request has a valid token, we extract the payload from the token and attach it to the request object.
// 			const payload: any = jwt.verify(token, config.ACCESS_TOKEN_SECRET);
// 			req.user = payload.user;
// 			next();
// 		} catch (error) {
// 			// token can be expired or invalid. Send appropriate errors in each case:
// 			if (error.name === 'TokenExpiredError') {
// 				return res.status(401).json({ error: 'Session timed out,please login again' });
// 			} else if (error.name === 'JsonWebTokenError') {
// 				return res.status(401).json({ error: 'Invalid token,please login again!' });
// 			} else {
// 				//catch other unprecedented errors
// 				console.error(error);
// 				return res.status(400).json({ error });
// 			}
// 		}
// 	}
// };

export const toCapitalize = (string: string) => {
  return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1);
};

export const isAuth = (req: any, res: any, next: () => void) => {
  const token = req.headers.authorization;
  // console.log({ isAuth: token });

  if (token) {
    const onlyToken = token.slice(7, token.length);
    jwt.verify(
      onlyToken,
      config.ACCESS_TOKEN_SECRET,
      (err: any, decode: any) => {
        if (err) {
          return res.status(401).send({ msg: "Invalid Token" });
        }
        req.user = decode;
        next();
        return;
      }
    );
  } else {
    return res.status(401).send({ msg: "Token is not supplied." });
  }
};

export const isAdmin = (req: any, res: any, next: () => any) => {
  // console.log(req.user);
  // console.log({ isAdmin: req.user });
  if (req.user && req.user.isAdmin) {
    return next();
  }
  return res.status(401).send({ msg: "Admin Token is not valid." });
};

export const make_private_code = (length: any) => {
  const result = [];
  const characters = "abcdefghijklmnopqrstuvwxyz";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result.push(
      characters.charAt(Math.floor(Math.random() * charactersLength))
    );
  }
  return result.join("");
};

// const tryCatch = async () => {
// 	try {
// 		const data = await Promise;
// 		return [ data, null ];
// 	} catch (error) {
// console.log({ error });
// 		console.error(error);
// 		return [ null, error ];
// 	}
// };

export const determine_parcel = (orderItems: any, parcels: any) => {
  const dimmensions = orderItems.map((item: any) => {
    // console.log({ item });
    if (item.product_option && item.product_option.length === 0) {
      return {
        length: item.product_option.package_length,
        width: item.product_option.package_width,
        height: item.product_option.package_height,
        volume: item.product_option.package_volume,
        qty: parseInt(item.product_option.qty),
      };
    } else {
      return {
        length: item.package_length,
        width: item.package_width,
        height: item.package_height,
        volume: item.package_volume,
        qty: parseInt(item.qty),
      };
    }
  });
  console.log({ dimmensions });
  const total_length = dimmensions.reduce(
    (a: any, c: { length: any; qty: any }) => a + c.length * c.qty,
    0
  );
  const total_width = dimmensions.reduce(
    (a: any, c: { width: any; qty: any }) => a + c.width * c.qty,
    0
  );
  const total_height = dimmensions.reduce(
    (a: any, c: { height: any; qty: any }) => a + c.height * c.qty,
    0
  );
  console.log({ total_length });
  console.log({ total_width });
  console.log({ total_height });
  // const total_length = orderItems.reduce(
  // 	(a: any, c: { package_length: any; qty: any }) => a + c.package_length * c.qty,
  // 	0
  // );
  // const total_width = orderItems.reduce(
  // 	(a: any, c: { package_width: any; qty: any }) => a + c.package_width * c.qty,
  // 	0
  // );
  // const total_height = orderItems.reduce(
  // 	(a: any, c: { package_height: any; qty: any }) => a + c.package_height * c.qty,
  // 	0
  // );
  const total_volume = Math.cbrt(total_length * total_width * total_height);
  const lengths = dimmensions.map((item: any) => item.length);
  const widths = dimmensions.map((item: any) => item.width);
  const heights = dimmensions.map((item: any) => item.height);
  // console.log({ lengths });
  // console.log({ widths });
  // console.log({ heights });
  const max_length: any = Math.max(...lengths);
  const max_width: any = Math.max(...widths);
  const max_height: any = Math.max(...heights);
  // const len_num = parseInt(max_length);
  // console.log({ max_length });
  // console.log({ max_width });
  // console.log({ max_height });
  // console.log({ parcels });
  let fit_parcels = [];

  // const check_name = (item) =>  {
  //   return item.name >= 'Glow Stringz V2 50 LED / 3.5m';
  // }
  // const check = orderItems.map((item: any) => item.name === 'Glow Stringz V2 50 LED / 3.5m');
  // console.log({ check: orderItems.some((item: any) => item.name === 'Glow Stringz V2 50 LED / 3.5m') });
  const check = orderItems.some(
    (item: any) => item.name === "Glow Stringz V2 50 LED / 3.5m"
  );
  if (parcels.length <= 3) {
    if (check) {
      fit_parcels = parcels.filter((parcel: any) => {
        if (
          parcel.length > max_length &&
          parcel.width > max_width &&
          parcel.height > total_height
        ) {
          return parcel;
        }
      });
    } else {
      fit_parcels = parcels
        .filter((parcel: any) => parcel.type !== "box")
        .filter((parcel: any) => {
          if (
            parcel.length > max_length &&
            parcel.width > max_width &&
            parcel.height > total_height
          ) {
            return parcel;
          }
        });
    }
  } else if (parcels.length > 3) {
    if (check) {
      fit_parcels = parcels.filter((parcel: any) => {
        if (
          parcel.length > max_length &&
          parcel.width > max_width &&
          parcel.height > max_height + total_height * 0.5
        ) {
          return parcel;
        }
      });
    } else {
      fit_parcels = parcels
        .filter((parcel: any) => parcel.type !== "box")
        .filter((parcel: any) => {
          if (
            parcel.length > max_length &&
            parcel.width > max_width &&
            parcel.height > max_height + total_height * 0.5
          ) {
            return parcel;
          }
        });
    }
  }

  let parcel = { length: 0, width: 0, height: 0 };
  if (fit_parcels.length === 0) {
    const sorted_fit_parcels = parcels
      .filter((parcel: any) => parcel.type !== "box")
      .sort((a: any, b: any) => (a.volume > b.volume ? -1 : 1));
    parcel = sorted_fit_parcels[0];
    console.log({ parcel });
    return parcel;
  }
  const sorted_fit_parcels = fit_parcels.sort(
    (a: any, b: any) => (a.volume > b.volume ? 1 : -1)
  );
  parcel = sorted_fit_parcels[0];
  console.log({ parcel });

  return parcel;
};

// const combinations = (a: any, m: any) => {
// 	const gc = (a: any) => {
// 		const fn = (n: any, src: any, got: any, all: any) => {
// 			if (n == 0) {
// 				if (got.length > 0) {
// 					all[all.length] = got;
// 				}
// 				return;
// 			}
// 			for (let j = 0; j < src.length; j++) {
// 				fn(n - 1, src.slice(j + 1), got.concat([ src[j] ]), all);
// 			}
// 			return;
// 		};
// 		const all: any = [];
// 		for (let i = 0; i < a.length; i++) {
// 			fn(i, a, [], all);
// 		}
// 		all.push(a);
// 		return all;
// 	};
// 	const c = gc(a);
// 	return c.filter((e: any) => {
// 		let n = e.length;
// 		let sum = 0;
// 		while (n--) sum += parseFloat(e[n]) || 0;
// 		return sum <= m;
// 	}, m);
// };
// // const a = [ 1, 3, 6, 10, -1 ];
// // combinations(a, 9);

export const deepEqual = (object1: any, object2: any) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    console.log("Not Same amount of Keys");
    return false;
  }
  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (
      (areObjects && !deepEqual(val1, val2)) ||
      (!areObjects && val1 !== val2)
    ) {
      return false;
    }
  }
  return true;
};
function isObject(object: any) {
  return object != null && typeof object === "object";
}

export const prnt = (info: any) => {
  console.log(info);
};

export const snake_case = (str: any) => {
  const snake_case = str;
  if (snake_case && snake_case.length > 0) {
    snake_case.replace(/\W+/g, " ").toLowerCase().split(" ").join("_");
    console.log({ snake_case: snake_case.substr(-1) });
    if (snake_case.substr(-1) === ")") {
      return str
        .replace(/\W+/g, " ")
        .toLowerCase()
        .split(" ")
        .join("_")
        .slice(0, -1);
    } else {
      return str.replace(/\W+/g, " ").toLowerCase().split(" ").join("_");
    }
  }
};

export const determine_promoter_code_tier = (code_usage: number) => {
  if (code_usage === 0 || code_usage === 1) {
    return 20;
  } else if (code_usage >= 2 && code_usage <= 5) {
    return 25;
  } else if (code_usage >= 6 && code_usage <= 9) {
    return 30;
  } else if (code_usage >= 10 && code_usage <= 13) {
    return 35;
  } else if (code_usage >= 14 && code_usage <= 17) {
    return 40;
  } else if (code_usage >= 18 && code_usage <= 21) {
    return 45;
  } else if (code_usage >= 22) {
    return 60;
  }
};
export const determine_sponsor_code_tier = (code_usage: number) => {
  if (code_usage === 0 || code_usage === 1) {
    return 30;
  } else if (code_usage >= 2 && code_usage <= 5) {
    return 35;
  } else if (code_usage >= 6 && code_usage <= 9) {
    return 40;
  } else if (code_usage >= 10 && code_usage <= 14) {
    return 50;
  } else if (code_usage >= 15) {
    return 60;
  } else if (code_usage >= 20) {
    return 75;
  }
};

export const categories = [
  "whites",
  "accessories",
  "decals",
  "diffuser_caps",
  "diffusers",
  "exo_diffusers",
  "glow_stringz",
  "glowskinz",
];
export const subcategories = [
  "singles",
  "refresh",
  "battery_storage",
  "batteries",
  "stickers",
  "clips",
  "casings",
  "universal",
  "clozd",
  "opyn",
  "batman",
  "outline",
  "patterns",
  "abstract",
  "shapes",
  "diffuser_adapters",
  "geometric",
  "starter_kit",
  "sacred_geometry",
  "imperfect",
  "domes",
  "closed_hole",
  "fisheye",
  "open_hole",
  "polygons",
  "cylinders",
  "polyhedrons",
  "gift_card",
  "nova",
  "classics",
  "novaskinz",
  "alt_novaskinz",
  "symbols",
  "emoji",
  "custom",
  "colors",
  "sizes",
  "secondary_colors",
];

export const dates_in_year = [
  { month: 1, number_of_days: 31 },
  { month: 2, number_of_days: 28 },
  { month: 3, number_of_days: 31 },
  { month: 4, number_of_days: 30 },
  { month: 5, number_of_days: 31 },
  { month: 6, number_of_days: 30 },
  { month: 7, number_of_days: 31 },
  { month: 8, number_of_days: 31 },
  { month: 9, number_of_days: 30 },
  { month: 10, number_of_days: 31 },
  { month: 11, number_of_days: 30 },
  { month: 12, number_of_days: 31 },
];

export const determine_filter = (query: any, search: any) => {
  const filter: any = {};

  Object.entries(query).forEach(item => {
    if (
      item[0] === "search" ||
      item[0] === "limit" ||
      item[0] === "page" ||
      item[0] === "sort"
    ) {
      return {};
    } else {
      if (item[0] === "sale" && item[1] === "true") {
        console.log("sale");
        filter.$or = [
          {
            sale_price: {
              $gt: 0,
            },
          },
          {
            previous_price: {
              $gt: 0,
            },
          },
        ];
      } else if (item[1]) {
        if (item[0] === "chip") {
          filter["chips"] = { $in: [ item[1] ] };
        } else {
          filter[item[0]] = item[1];
        }
      } else {
        return {};
      }
    }
  });
  console.log({ determine_filter: filter });
  return { deleted: false, ...filter, ...search };
};

export const determine_sort = (query: any, type: string) => {
  let sort: any = { _id: -1 };
  const sort_query = query && query.toLowerCase();

  if (type === "product") {
    if (sort_query === "lowest") {
      sort = { price: 1 };
    } else if (sort_query === "highest") {
      sort = { price: -1 };
    } else if (sort_query === "category") {
      sort = { category: -1 };
    } else if (sort_query === "hidden") {
      sort = { hidden: -1 };
    } else if (sort_query === "newest") {
      sort = { order: 1, _id: -1 };
    }
  }

  if (sort_query === "newest") {
    sort = { _id: -1 };
  } else if (sort_query === "oldest") {
    sort = { _id: 1 };
  }
  return sort;
};

// export const month_dates = (year: number) => {
// 	return [
// 		{ month: 'january', number_of_days: 31, start_date: year + '-01-01', end_date: year + '-01-31' },
// 		{ month: 'february', number_of_days: 28, start_date: year + '-02-01', end_date: year + '-02-28' },
// 		{ month: 'march', number_of_days: 31, start_date: year + '-03-01', end_date: year + '-03-31' },
// 		{ month: 'april', number_of_days: 30, start_date: year + '-04-01', end_date: year + '-04-30' },
// 		{ month: 'may', number_of_days: 31, start_date: year + '-05-01', end_date: year + '-05-31' },
// 		{ month: 'june', number_of_days: 30, start_date: year + '-06-01', end_date: year + '-06-30' },
// 		{ month: 'july', number_of_days: 31, start_date: year + '-07-01', end_date: year + '-07-31' },
// 		{ month: 'august', number_of_days: 31, start_date: year + '-08-01', end_date: year + '-08-31' },
// 		{ month: 'september', number_of_days: 30, start_date: year + '-09-01', end_date: year + '-09-30' },
// 		{ month: 'october', number_of_days: 31, start_date: year + '-10-01', end_date: year + '-10-31' },
// 		{ month: 'november', number_of_days: 30, start_date: year + '-11-01', end_date: year + '-11-30' },
// 		{ month: 'december', number_of_days: 31, start_date: year + '-12-01', end_date: year + '-12-31' }
// 	];
// };
export const month_dates = (month: string, year: string) => {
  const month_date: any = {
    january: {
      month: "january",
      number_of_days: 31,
      start_date: year + "-01-01",
      end_date: year + "-02-01",
    },
    february: {
      month: "february",
      number_of_days: 28,
      start_date: year + "-02-01",
      end_date: year + "-03-01",
    },
    march: {
      month: "march",
      number_of_days: 31,
      start_date: year + "-03-01",
      end_date: year + "-04-01",
    },
    april: {
      month: "april",
      number_of_days: 30,
      start_date: year + "-04-01",
      end_date: year + "-05-01",
    },
    may: {
      month: "may",
      number_of_days: 31,
      start_date: year + "-05-01",
      end_date: year + "-06-01",
    },
    june: {
      month: "june",
      number_of_days: 30,
      start_date: year + "-06-01",
      end_date: year + "-07-01",
    },
    july: {
      month: "july",
      number_of_days: 31,
      start_date: year + "-07-01",
      end_date: year + "-08-01",
    },
    august: {
      month: "august",
      number_of_days: 31,
      start_date: year + "-08-01",
      end_date: year + "-09-01",
    },
    september: {
      month: "september",
      number_of_days: 30,
      start_date: year + "-09-01",
      end_date: year + "-10-01",
    },
    october: {
      month: "october",
      number_of_days: 31,
      start_date: year + "-10-01",
      end_date: year + "-11-01",
    },
    november: {
      month: "november",
      number_of_days: 30,
      start_date: year + "-11-01",
      end_date: year + "-12-01",
    },
    december: {
      month: "december",
      number_of_days: 31,
      start_date: year + "-12-01",
      end_date: parseInt(year) + 1 + "-01-01",
    },
  };
  return month_date[month];
};

export const removeDuplicates = (originalArray: any, prop: any) => {
  const newArray = [];
  const lookupObject: any = {};

  for (const i in originalArray) {
    lookupObject[originalArray[i][prop]] = originalArray[i];
  }

  for (const i in lookupObject) {
    newArray.push(lookupObject[i]);
  }
  return newArray;
};

export const format_date = (unformatted_date: any) => {
  const month = unformatted_date.slice(5, 7);
  const day = unformatted_date.slice(8, 10);
  const year = unformatted_date.slice(0, 4);
  const formatted_date = `${month}/${day}/${year}`;
  return formatted_date;
};

export const determin_card_logo = (card_type: string) => {
  switch (card_type) {
    case "American Express":
      return `<i class="fab fa-cc-amex" />`;
    case "Visa":
      return `<i class="fab fa-cc-visa" />`;
    case "Mastercard":
      return `<i class="fab fa-cc-mastercard" />`;
    case "Discover":
      return `<i class="fab fa-cc-discover" />`;
  }
};

export const determin_card_logo_images = (card_type: any) => {
  switch (card_type) {
    case "amex":
      return "https://thumbs2.imgbox.com/c9/a5/0AsOySyq_b.png";
    case "visa":
      return "https://images2.imgbox.com/73/a0/efpzYR25_o.png";
    case "mastercard":
      return "https://images2.imgbox.com/63/92/Z3KHgTl4_o.png";
    case "discover":
      return "https://images2.imgbox.com/96/cd/hXyv0MRB_o.png";
    default:
      return;
  }
};
export const determin_card_logo_images_white = (card_type: any) => {
  switch (card_type) {
    case "amex":
      return "https://images2.imgbox.com/ea/c8/r82jUQW8_o.png";
    case "visa":
      return "https://images2.imgbox.com/18/a3/wHEnyn5x_o.png";
    case "mastercard":
      return "https://images2.imgbox.com/84/a2/oPcysx6p_o.png";
    case "discover":
      return "https://images2.imgbox.com/f3/4b/R1EL09Rw_o.png";
    default:
      return;
  }
};
const determine_preorder = (product: any) => {
  if (product.preorder) {
    return true;
  } else {
    return false;
  }
};

export const email_sale_price_switch = (item: any, color: any) => {
  if (item.sale_price !== 0) {
    return `<label>
				${determine_preorder(item) ? "Preorder " : ""}
				<del style='color: #a03131;'>
					<label style='${`color: ${color};`}'>$${item.price &&
      (item.price * item.qty).toFixed(2)}</label>
				</del>${" "}
				${"-->"} $${item.sale_price && (item.sale_price * item.qty).toFixed(2)}
			</label>`;
  } else if (item.quantity === 0) {
    return `<label>
				${determine_preorder(item) ? "Preorder " : ""}
				<del style='color: #a03131;'>
					<label style='${`color: ${color}; margin-left: 7px;`}'>
						${item.price && (item.price * item.qty).toFixed(2)}
					</label>
				</del>${" "}
				${"-->"} <label style='${`color: ${color}; margin-left: 7px;`}'>Sold Out</label>
			</label>`;
  } else {
    return `<label>
				${determine_preorder(item) ? "Preorder " : ""} $${item.price &&
      (item.price * item.qty).toFixed(2)}
			</label>`;
  }
};

const determine_secondary_product_name = (
  name: any,
  category: any,
  subcategory: any
) => {
  // console.log({ name: name.split('-')[0], category, subcategory });
  if (name) {
    if (category === "diffuser_caps") {
      return name.slice(0, -17);
    }
    if (name.split("-")[0].trim() === "CLOZD Nanoskinz") {
      return name.split("-")[1].trim();
    }

    if (subcategory === "whites" && name.includes("Bulk")) {
      return name.split(" ")[1].trim();
    }
    if (subcategory === "refresh" && name.includes("Bulk")) {
      return name.split(" ")[1].trim();
    }
    if (name.split("-")[0].trim() === "Supreme Gloves") {
      return name.split("-")[1].trim();
    }
    if (name.split("-")[0].trim() === "OPYN Nanoskinz") {
      return name.split("-")[1].trim();
    }
    if (name.split("-")[0].trim() === "CLOZD Alt Novaskinz w Nano Sleds") {
      return name.split("-")[1].trim();
    }
    if (name.split("-")[0].trim() === "CLOZD Novaskinz") {
      return name.split("-")[1].trim();
    }
    if (name.split("-")[0].trim() === "Supreme Sizing Sampler Pack") {
      return name.split("-")[1].trim();
    }
    if (name.split("-")[0].trim().includes("EXO Diffusers")) {
      return name.split("-")[1].trim();
    }
    if (category === "decals") {
      if (name.split(" ")[1] === "V2") {
        return name.split(" ")[0] + " V2";
      } else {
        return name.split(" ")[0];
      }
    } else {
      // if (category === 'accessories' && subcategory === 'clips') {
      // 	return name.split(' ')[3] + ' ' + name.split(' ')[4];
      // }
      return name;
    }
  }
};

export const determine_product_name = (item: any, show_qty: any, date: any) => {
  const date_1 = new Date("2021-07-16");
  const date_1_s = date_1.toISOString();
  const date_2 = date;
  if (date_1_s <= date_2 || !date) {
    if (item.product_collection === "alt_novaskinz") {
      if (item.name === "CLOZD Alt Novaskinz w Nano Sleds") {
        return `<div>
						${show_qty && item.qty > 1 ? item.qty + "x" : ""}  ${item.name}
						${item.size !== 0 ? " - " + item.size : ""} ${item.color
          ? "(" + item.color + " Skin"
          : ""}
						${item.color ? " & " : ""}
						${item.secondary_color ? item.secondary_color + " Sled)" : ""}${" "}
						${item.secondary_product_name && item.secondary_product_name.length > 0
              ? ` - $${determine_secondary_product_name(
                  item.secondary_product_name,
                  item.category,
                  ""
                )}`
              : ""}${" "}
					</div>`;
      } else {
        return `<div>
						${show_qty && item.qty > 1
              ? item.qty + "x"
              : ""}  ${item.name} ${item.size !== 0
          ? " - " + item.size
          : ""}{' '}
						${item.color ? "(" + item.color + " Skin" : ""}
						${item.color ? " & " : ""}
						${item.secondary_color ? item.secondary_color + " Sled)" : ""}{' '}
					</div>`;
      }
    } else if (item.subcategory === "novaskinz") {
      if (item.name === "CLOZD Novaskinz") {
        return `<div>
						${show_qty && item.qty > 1 ? item.qty + "x" : ""}  ${item.name}
						${item.size !== 0 ? " - " + item.size : ""} ${item.color
          ? "(" + item.color + " Skin"
          : ""}
						${item.color ? " & " : ""}
						${item.secondary_color ? item.secondary_color + " Sled)" : ""}${" "}
						${item.secondary_product_name && item.secondary_product_name.length > 0
              ? ` - $${determine_secondary_product_name(
                  item.secondary_product_name,
                  item.category,
                  ""
                )}`
              : ""}{' '}
					</div>`;
      }
    } else if (item.name === "CLOZD Nanoskinz") {
      return `<div>
					${show_qty && item.qty > 1 ? item.qty + "x" : ""}  ${item.color
        ? item.color + " "
        : ""} ${item.name}
					${item.secondary_product_name && item.secondary_product_name.length > 0
            ? ` - $${determine_secondary_product_name(
                item.secondary_product_name,
                item.category,
                ""
              )}`
            : ""}${" "}
					${item.size !== 0 ? " - " + item.size : ""}
				</div>`;
    } else if (item.name === "OPYN Nanoskinz") {
      return `<div>
					${show_qty && item.qty > 1 ? item.qty + "x" : ""}  ${item.color
        ? item.color + " "
        : ""} ${item.name}
					${item.secondary_product_name && item.secondary_product_name.length > 0
            ? ` - ${determine_secondary_product_name(
                item.secondary_product_name,
                item.category,
                ""
              )}`
            : ""}${" "}
					${item.size !== 0 ? " - " + item.size : ""}
				</div>`;
    } else if (item.category === "glowskinz") {
      return `<div>
					${show_qty && item.qty > 1 ? item.qty + "x" : ""}  ${item.color
        ? item.color + " "
        : ""} ${item.name}${" "}
					${item.size !== 0 ? " - " + item.size : ""} ${item.secondary_color
        ? item.secondary_color + " Cape"
        : ""}${" "}
				</div>`;
    } else if (item.category === "whites") {
      if (item.subcategory === "singles") {
        return `<div>
						${show_qty && item.qty > 1 ? item.qty + "x" : ""} ${item.color
          ? item.color + " "
          : ""} ${item.name}${" "}
						${item.size !== "0" ? " - " + item.size : ""}${" "}
					</div>`;
      }
      if (item.subcategory === "refresh") {
        return `<div>
						${show_qty && item.qty > 1 ? item.qty + "x" : ""} ${item.color
          ? item.color + " "
          : ""} ${item.name}${" "}
						${item.size !== "0"
              ? " - " + item.size
              : ""} - ${item.secondary_product_name.split(" ")[1].trim()}
					</div>`;
      }
      if (item.subcategory === "sampler") {
        console.log({ secondary_product_name: item.secondary_product_name });
        return `<div>
				${show_qty && item.qty > 1 ? item.qty + "x" : ""} ${item.name} -${" "}
				 ${determine_secondary_product_name(
           item.secondary_product_name,
           item.category,
           ""
         )}
			</div>`;
      }
    } else if (item.category === "accessories") {
      if (item.subcategory === "batteries") {
        return `<div>
						${show_qty && item.qty > 1 ? item.qty + "x" : ""} ${item.color
          ? item.color + " "
          : ""} ${item.name}${" "}
						${item.size !== "0" ? " - " + item.size : ""}${" "}
					</div>`;
      }

      if (item.subcategory === "chips") {
        return `<div>
						${show_qty && item.qty > 1 ? item.qty + "x" : ""}  ${item.color
          ? item.color + " "
          : ""} ${item.name}${" "}
						${item.size !== "0" ? " - " + item.size : ""}${" "}
					</div>`;
      } else if (item.subcategory === "clips") {
        return `<div>
						${show_qty && item.qty > 1 ? item.qty + "x" : ""}  ${item.color
          ? item.color + " "
          : ""} ${item.name}${" "}
						${item.secondary_product_name !== "0"
              ? " - " + item.secondary_product_name.split("-")[1]
              : ""}${" "}
					</div>`;
      } else {
        return `<div>
						${show_qty && item.qty > 1 ? item.qty + "x" : ""}  ${item.color &&
        !item.secondary_color
          ? item.color
          : ""}${" "}
						${item.name} ${item.secondary_color ? " -" : ""}${" "}
						${item.secondary_color ? "(" + item.color + " Cap/Slide" : ""}
						${item.secondary_color ? " & " : ""}
						${item.secondary_color ? item.secondary_color + " Body)" : ""}${" "}
					</div>`;
      }
    } else if (item.category === "exo_diffusers") {
      return `<div>
					${show_qty && item.qty > 1
            ? item.qty + "x"
            : ""}  ${item.name} (${item.color
        ? item.color + " Skeleton Color"
        : ""}
					${item.color ? " & " : ""}
					${item.secondary_color
            ? item.secondary_color + " Plug Color) "
            : ""} ${item.secondary_product_name &&
      item.secondary_product_name.length > 0
        ? ` - ${determine_secondary_product_name(
            item.secondary_product_name,
            item.category,
            ""
          )}`
        : ""}${" "}
				</div>`;
    } else if (item.name === "Diffuser Caps + Adapters Starter Kit V4") {
      return `<div>
					${show_qty && item.qty > 1 ? item.qty + "x" : ""}  {item.name}
					${item.secondary_product_name && item.secondary_product_name.length > 0
            ? ` w ${item.color} ${item.secondary_product_name.split(
                " "
              )[0]} Caps & ${item.secondary_color} Adapters`
            : ""}
				</div>`;
    } else if (
      item.category === "diffusers" ||
      item.category === "frosted_diffusers"
    ) {
      return `<div>
					${show_qty && item.qty > 1 ? item.qty + "x" : ""}  ${item.color
        ? item.color + " "
        : ""} ${item.name}
				</div>`;
    } else if (item.category === "diffuser_caps") {
      return `<div>
					${show_qty && item.qty > 1 ? item.qty + "x" : ""}  ${item.color
        ? item.color + " "
        : ""} ${item.name}${" "}
					${item.size !== 0 ? " - " + item.size : ""}${" "}
				</div>`;
    } else if (
      item.name === "Outline + Batman Decals" ||
      item.name === "Batman Decals"
    ) {
      return `<div>
					${show_qty && item.qty > 1 ? item.qty + "x" : ""}  ${item.name}
					${item.secondary_product_name && item.secondary_product_name.length > 0
            ? ` - ${determine_secondary_product_name(
                item.secondary_product_name,
                item.category,
                ""
              )}`
            : ""}
				</div>`;
    } else if (item.category === "decals") {
      return `<div>
				${show_qty && item.qty > 1 ? item.qty + "x" : ""}  ${item.name}
				</div>`;
    } else {
      return `<div>
					${show_qty && item.qty > 1 ? item.qty + "x" : ""}  ${item.name}
				</div>`;
    }
  } else if (date_1 > date_2) {
    return `<div>
				${show_qty && item.qty > 1 ? item.qty + "x" : ""} ${" "}
				${item.name !== "Diffuser Caps + Adapters Starter Kit" &&
          item.category !== "diffusers" &&
          item.color &&
          item.color}${" "}
				${item.name}
				${item.product_option &&
          item.product_option.name &&
          ` - ${item.product_option.name}`}
				${(item.secondary_product || item.diffuser_cap) &&
          ` w (${item.name === "Diffuser Caps + Adapters Starter Kit" &&
            item.color} ${(item.secondary_product && item.product.name) ||
            (item.diffuser_cap && item.diffuser_cap.name)})`}{' '}
			</div>`;
  }
};

export const order_status_steps = (order: any, status: string) => {
  status = status.toLowerCase();
  return `<div
			style='display: flex;justify-content: space-between;max-width: 58rem;width: 100%;margin: 1rem auto;'
		>
			<div
				style='${"width:100%; display:flex; justify-content: center;"} ${order
    ? "border-top: .3rem white solid; color: white;flex: 1 1;padding-top: 1rem; text-align: center; "
    : "	border-top: .3rem #c0c0c0 solid;color: white;flex: 1 1;padding-top: 1rem;text-align: center;"}'
			>
				<div style='font-size: 16px;'>Placed</div>
			</div>
			
			<div
				style='${"width:100%; display:flex; justify-content: center;"} ${status ===
    "manufactured" ||
  status === "packaged" ||
  status === "shipped"
    ? "border-top: .3rem white solid; color: white;flex: 1 1;padding-top: 1rem; text-align: center; "
    : "	border-top: .3rem #c0c0c0 solid;color: white;flex: 1 1;padding-top: 1rem;text-align: center;"}'
			>
				<div style='font-size: 16px;'>Crafted</div>
			</div>
			<div
				style='${"width:100%; display:flex; justify-content: center;"} ${status ===
    "packaged" || status === "shipped"
    ? "border-top: .3rem white solid; color: white;flex: 1 1;padding-top: 1rem; text-align: center; "
    : "	border-top: .3rem #c0c0c0 solid;color: white;flex: 1 1;padding-top: 1rem;text-align: center;"}'
			>
				<div style='font-size: 16px;'>Packaged</div>
			</div>
			<div
				style='${"width:100%; display:flex; justify-content: center;"} ${status ===
  "shipped"
    ? "border-top: .3rem white solid; color: white;flex: 1 1;padding-top: 1rem; text-align: center; "
    : "	border-top: .3rem #c0c0c0 solid;color: white;flex: 1 1;padding-top: 1rem;text-align: center;"}'
			>
				<div style='font-size: 16px;'>Shipped</div>
			</div>		
		</div>`;
};

export const determine_tracking_number = (tracking_number: string) => {
  if (tracking_number) {
    const tracking: any = getTracking(tracking_number);
    if (tracking.name.includes("USPS")) {
      return (
        "https://tools.usps.com/go/TrackConfirmAction_input?qtc_tLabels1=" +
        tracking_number
      );
    }
    if (tracking.name.includes("UPS")) {
      return (
        "https://wwwapps.ups.com/WebTracking/processInputRequest?AgreeToTermsAndConditions=yes&loc=en_US&tracknum=" +
        tracking_number +
        "&requester=ST/trackdetails"
      );
    }
    if (tracking.name.includes("FedEx")) {
      return (
        "https://www.fedex.com/fedextrack/?trknbr=" +
        tracking_number +
        "&trkqual=2459474000~" +
        tracking_number +
        "~FX"
      );
    }
  }
};
