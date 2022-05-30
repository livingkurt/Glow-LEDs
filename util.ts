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
  //   return item.name >= 'Glowstringz V2';
  // }
  // const check = orderItems.map((item: any) => item.name === 'Glowstringz V2');
  // console.log({ check: orderItems.some((item: any) => item.name === 'Glowstringz V2') });
  const check = orderItems.some((item: any) => item.name === "Glowstringz V2");
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
  "batteries",
  "decals",
  "diffuser_caps",
  "diffusers",
  "exo_diffusers",
  "glowstringz",
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

export const unformat_date = (formatted_date: string) => {
  // console.log({ formatted_date });
  const date = formatted_date.split("/");
  const day = date[1];
  const month = date[0];
  const year = date[2];
  const unformat_date = `${year}-${month}-${day}`;
  return unformat_date;
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
const included_for_option_name = [ "diffusers" ];
const determine_option_show_modifier = (item: any) => {
  return included_for_option_name.includes(item.category);
};

const qty = (item: any, show_qty: any) => {
  return show_qty && item.qty > 1 ? item.qty + "x" : "";
};
const color = (item: any) => {
  return item.color ? item.color + " " : "";
};

const size = (item: any) => {
  const option_name = item.option_group_name
    ? item.option_group_name.split(" ")[0]
    : "";
  return `${item.size && item.size !== 0
    ? ` ${first_dash(item)} ${item.size}`
    : ""} 
    ${determine_option_show_modifier(item) && option_name ? option_name : ""}`;
};

const secondary_color = (item: any) => {
  console.log({ item });
  return `${item.secondary_color && item.secondary_color_product
    ? `${second_dash(item)} ${item.secondary_color}`
    : ""}`;
};
const secondary_color_name = (item: any) => {
  const secondary_color_name = item.secondary_color_group_name
    ? item.secondary_color_group_name.split(" ")[0] + "s"
    : "";
  if (item.category === "whites") {
    return secondary_color_name;
  }
  if (item.category === "glowskinz") {
    if (!item.name.includes("Omniskinz")) {
      return secondary_color_name;
    }
  }
  if (item.category === "exo_diffusers") {
    return secondary_color_name;
  }
  if (item.category === "diffuser_caps") {
    return secondary_color_name;
  }
};
const secondary_product_name = (item: any) => {
  const secondary_color_name = item.secondary_group_name
    ? item.secondary_group_name
    : "";
  if (item.name === "Diffuser Caps + Adapters Starter Kit V4") {
    return secondary_color_name;
  }
};

const secondary_product = (item: any) => {
  return item.secondary_product &&
  item.secondary_product_name &&
  item.secondary_product_name.length > 0
    ? ` ${third_dash(item)} ${determine_secondary_product_name(
        item.secondary_product_name,
        item
      )}`
    : "";
};

const first_dash = (item: any) => {
  if (item.category === "whites") {
    return "-";
  }
  if (item.category === "glowskinz") {
    return "-";
  }
  if (item.category === "diffusers") {
    return "-";
  }
  if (item.category === "exo_diffusers") {
    return "-";
  }
  if (item.category === "diffuser_caps") {
    return "-";
  }
  if (item.category === "glowframez") {
    return "-";
  }
  if (item.category === "batteries") {
    return "-";
  }
  return "";
};

const second_dash = (item: any) => {
  if (item.name === "Refresh Pack (6 Supreme Pairs + 120 Batteries)") {
    return "-";
  }
  if (item.category === "glowskinz") {
    return "-";
  }
  if (item.category === "exo_diffusers") {
    return "-";
  }
  if (item.name === "Diffuser Caps + Adapters Starter Kit V4") {
    return "-";
  }

  return "";
};

const third_dash = (item: any) => {
  if (item.name.includes("Refresh")) {
    return "-";
  }
  if (item.name.includes("Sampler")) {
    return "-";
  }
  if (item.name.includes("Nanoskinz")) {
    return "-";
  }
  if (item.name.includes("Clip")) {
    return "-";
  }
  if (item.category === "exo_diffusers") {
    return "-";
  }

  if (item.category === "decals") {
    return "-";
  }
  if (item.name === "Diffuser Caps + Adapters Starter Kit V4") {
    return "-";
  }
  if (item.category === "glowskinz") {
    if (!item.name.includes("Omniskinz")) {
      return "-";
    }
  }

  return "";
};

export const determine_product_name = (item: any, show_qty: any) => {
  return `<div>
      ${qty(item, show_qty) ? qty(item, show_qty) : ""} ${color(item)
    ? color(item)
    : ""} ${item.name} ${size(item) ? size(item) : ""}
      ${secondary_color(item)
        ? secondary_color(item)
        : ""} ${secondary_color_name(item)
    ? secondary_color_name(item)
    : ""}${secondary_product(item)
    ? secondary_product(item)
    : ""} ${secondary_product_name(item) ? secondary_product_name(item) : ""}
    </div>`;
};

export const determine_secondary_product_name = (name: any, item: any) => {
  const { category, subcategory } = item;
  if (category === "diffuser_caps") {
    return name.split(" ")[0];
  } else if (
    category === "decals" &&
    name.split(" ")[name.split(" ").length - 4] === "Outline"
  ) {
    return name.replace(" Outline + Batman Decals", "");
  } else if (
    category === "decals" &&
    name.split(" ")[name.split(" ").length - 2] === "Batman"
  ) {
    return name.replace(" Batman Decals", "");
  } else if (subcategory === "refresh" && name.includes("Bulk")) {
    return name.split(" ")[1].trim();
  } else if (name.includes("Capez")) {
    return name.replace(" Capez", "");
  } else {
    return name.includes("-") ? name.split("-")[1].trim() : name;
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

export const determine_category = (place_of_purchase: string) => {
  if (
    place_of_purchase.includes("AMAZON") ||
    place_of_purchase.includes("Amazon") ||
    place_of_purchase.includes("AMZN")
  ) {
    return "Supplies";
  } else if (place_of_purchase.includes("PIRATE SHIP")) {
    return "Shipping";
  } else if (place_of_purchase.includes("DOLLARTREE")) {
    return "Supplies";
  } else if (place_of_purchase.includes("THE HOME DEPOT")) {
    return "Supplies";
  } else if (place_of_purchase.includes("GLOW-LEDS")) {
    return "Business";
  } else if (
    place_of_purchase.includes("THROWLIGHTS") ||
    place_of_purchase.includes("Throwlights")
  ) {
    return "Equipment";
  } else if (
    place_of_purchase.includes("GOOGLE") ||
    place_of_purchase.includes("Google")
  ) {
    return "Website";
  } else if (
    place_of_purchase.includes("PRUSA") ||
    place_of_purchase.includes("Prusa")
  ) {
    return "Equipment";
  } else if (place_of_purchase.includes("EMAZINGLIGHTS")) {
    return "Equipment";
  } else if (
    place_of_purchase.includes("HOBBY") ||
    place_of_purchase.includes("Hobby")
  ) {
    return "Equipment";
  } else if (
    place_of_purchase.includes("DIGI KEY") ||
    place_of_purchase.includes("Digi key")
  ) {
    return "Supplies";
  } else if (
    place_of_purchase.includes("EASYPOST") ||
    place_of_purchase.includes("Easypost")
  ) {
    return "Shipping";
  } else if (
    place_of_purchase.includes("PAYPAL") ||
    place_of_purchase.includes("PayPal")
  ) {
    return "Supplies";
  } else if (
    place_of_purchase.includes("HEROKU") ||
    place_of_purchase.includes("Heroku")
  ) {
    return "Website";
  } else if (
    place_of_purchase.includes("ALIBABA") ||
    place_of_purchase.includes("Alibaba")
  ) {
    return "Supplies";
  } else if (
    place_of_purchase.includes("PAK") ||
    place_of_purchase.includes("Pak")
  ) {
    return "Shipping";
  } else if (
    place_of_purchase.includes("KANDEKREATIONS") ||
    place_of_purchase.includes("Kandekreations")
  ) {
    return "Supplies";
  } else if (
    place_of_purchase.includes("FUTURISTIC") ||
    place_of_purchase.includes("Futuristic")
  ) {
    return "Supplies";
  } else if (
    place_of_purchase.includes("LEDGLOVES") ||
    place_of_purchase.includes("LEDGloves")
  ) {
    return "Supplies";
  } else if (
    place_of_purchase.includes("EMAZING") ||
    place_of_purchase.includes("Emazing")
  ) {
    return "Supplies";
  } else if (
    place_of_purchase.includes("SPEC") ||
    place_of_purchase.includes("Spec")
  ) {
    return "Entertainment";
  } else {
    return "Not Categorized";
  }
};
export const determine_place = (place_of_purchase: string) => {
  if (
    place_of_purchase.includes("AMAZON") ||
    place_of_purchase.includes("Amazon") ||
    place_of_purchase.includes("AMZN")
  ) {
    return "Amazon";
  } else if (place_of_purchase.includes("PIRATE SHIP")) {
    return "Pirate Ship";
  } else if (place_of_purchase.includes("DOLLARTREE")) {
    return "DollarTree";
  } else if (place_of_purchase.includes("THE HOME DEPOT")) {
    return "The Home Depot";
  } else if (place_of_purchase.includes("GLOW-LEDS")) {
    return "Glow LEDs";
  } else if (
    place_of_purchase.includes("THROWLIGHTS") ||
    place_of_purchase.includes("Throwlights")
  ) {
    return "Throwlights";
  } else if (
    place_of_purchase.includes("PRUSA") ||
    place_of_purchase.includes("Prusa")
  ) {
    return "Prusa";
  } else if (place_of_purchase.includes("EMAZINGLIGHTS")) {
    return "Emazinglights";
  } else if (
    place_of_purchase.includes("GOOGLE") ||
    place_of_purchase.includes("Google")
  ) {
    return "Google";
  } else if (
    place_of_purchase.includes("HOBBY") ||
    place_of_purchase.includes("Hobby")
  ) {
    return "Hobby Lobby";
  } else if (
    place_of_purchase.includes("DIGI KEY") ||
    place_of_purchase.includes("Digi key")
  ) {
    return "Digi Key";
  } else if (
    place_of_purchase.includes("EASYPOST") ||
    place_of_purchase.includes("Easypost")
  ) {
    return "EasyPost";
  } else if (
    place_of_purchase.includes("PAYPAL") ||
    place_of_purchase.includes("PayPal")
  ) {
    return "PayPal";
  } else if (
    place_of_purchase.includes("HEROKU") ||
    place_of_purchase.includes("Heroku")
  ) {
    return "Heroku";
  } else if (
    place_of_purchase.includes("ALIBABA") ||
    place_of_purchase.includes("Alibaba")
  ) {
    return "Alibaba";
  } else if (
    place_of_purchase.includes("PAK") ||
    place_of_purchase.includes("Pak")
  ) {
    return "PAK Mail";
  } else if (
    place_of_purchase.includes("KANDEKREATIONS") ||
    place_of_purchase.includes("Kandekreations")
  ) {
    return "Kandekreations";
  } else if (
    place_of_purchase.includes("FUTURISTIC") ||
    place_of_purchase.includes("Futuristic")
  ) {
    return "Futuristic";
  } else if (
    place_of_purchase.includes("LEDGLOVES") ||
    place_of_purchase.includes("LEDGloves")
  ) {
    return "LEDGloves";
  } else if (
    place_of_purchase.includes("EMAZING") ||
    place_of_purchase.includes("Emazing")
  ) {
    return "EmazingLights";
  } else if (
    place_of_purchase.includes("SPEC") ||
    place_of_purchase.includes("Spec")
  ) {
    return "Spec's";
  } else {
    return "Unknown";
  }
};
export const determine_application = (place_of_purchase: string) => {
  if (place_of_purchase.includes("PIRATE SHIP")) {
    return "Shipping";
  } else if (
    place_of_purchase.includes("AMAZON") ||
    place_of_purchase.includes("Amazon") ||
    place_of_purchase.includes("AMZN")
  ) {
    return "Products";
  } else if (place_of_purchase.includes("THE HOME DEPOT")) {
    return "Tools";
  } else if (place_of_purchase.includes("GLOW-LEDS")) {
    return "Test Purchases";
  } else if (
    place_of_purchase.includes("PRUSA") ||
    place_of_purchase.includes("Prusa")
  ) {
    return "Tools";
  } else if (place_of_purchase.includes("DOLLARTREE")) {
    return "Shipping";
  } else if (place_of_purchase.includes("EMAZINGLIGHTS")) {
    return "Tools";
  } else if (
    place_of_purchase.includes("THROWLIGHTS") ||
    place_of_purchase.includes("Throwlights")
  ) {
    return "Accessories";
  } else if (
    place_of_purchase.includes("GOOGLE") ||
    place_of_purchase.includes("Google")
  ) {
    return "Website";
  } else if (
    place_of_purchase.includes("HOBBY") ||
    place_of_purchase.includes("Hobby")
  ) {
    return "Tools";
  } else if (
    place_of_purchase.includes("DIGI KEY") ||
    place_of_purchase.includes("Digi key")
  ) {
    return "Products";
  } else if (
    place_of_purchase.includes("EASYPOST") ||
    place_of_purchase.includes("Easypost")
  ) {
    return "Shipping";
  } else if (
    place_of_purchase.includes("PAYPAL") ||
    place_of_purchase.includes("PayPal")
  ) {
    return "Products";
  } else if (
    place_of_purchase.includes("HEROKU") ||
    place_of_purchase.includes("Heroku")
  ) {
    return "Website";
  } else if (
    place_of_purchase.includes("ALIBABA") ||
    place_of_purchase.includes("Alibaba")
  ) {
    return "Products";
  } else if (
    place_of_purchase.includes("PAK") ||
    place_of_purchase.includes("Pak")
  ) {
    return "Shipping";
  } else if (
    place_of_purchase.includes("KANDEKREATIONS") ||
    place_of_purchase.includes("Kandekreations")
  ) {
    return "Tools";
  } else if (
    place_of_purchase.includes("FUTURISTIC") ||
    place_of_purchase.includes("Futuristic")
  ) {
    return "Tools";
  } else if (
    place_of_purchase.includes("LEDGLOVES") ||
    place_of_purchase.includes("LEDGloves")
  ) {
    return "Tools";
  } else if (
    place_of_purchase.includes("EMAZING") ||
    place_of_purchase.includes("Emazing")
  ) {
    return "Tools";
  } else if (
    place_of_purchase.includes("SPEC") ||
    place_of_purchase.includes("Spec")
  ) {
    return "Entertainment";
  } else {
    return "Unknown";
  }
};
