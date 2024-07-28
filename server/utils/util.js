import jwt from "jsonwebtoken";
import config from "../config";
import { Request } from "express";
import multer, { Multer } from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import Token from "../api/tokens/token";

export const onlyUnique = (value, index, self) => {
  return self.indexOf(value) === index;
};

export const getItemsTotal = items => {
  return items.reduce((acc, item) => acc + item.quantity * item.price, 0);
};

export const isEmail = email => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(String(email).toLowerCase());
};

export const toCapitalize = string => {
  return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1);
};

export const make_private_code = length => {
  const result = [];
  const characters = "abcdefghijklmnopqrstuvwxyz";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
  }
  return result.join("");
};

// const tryCatch = async () => {
// 	try {
// 		const data = await Promise;
// 		return [ data, null ];
// 	} catch (error) {
//
// 		console.error(error);
// 		return [ null, error ];
// 	}
// };

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "tmp/");
  },
  filename: function (req, file, cb) {
    const fileExtension = path.extname(file.originalname);
    const fileName = uuidv4() + fileExtension;
    cb(null, fileName);
  },
});

// Set up multer middleware for handling file uploads
export const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 10 }, // 10 MB file size limit
  fileFilter: function (req, file, cb) {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    if (mimeType && extName) {
      return cb(null, true);
    }
    //  else {
    //   cb("Error: Images only!");
    // }
  },
});

export const deepEqual = (object1, object2) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if ((areObjects && !deepEqual(val1, val2)) || (!areObjects && val1 !== val2)) {
      return false;
    }
  }
  return true;
};
function isObject(object) {
  return object != null && typeof object === "object";
}

export const prnt = info => {};

export const snake_case = str => {
  const snake_case = str;
  if (snake_case && snake_case.length > 0) {
    snake_case.replace(/\W+/g, " ").toLowerCase().split(" ").join("_");

    if (snake_case.substr(-1) === ")") {
      return str.replace(/\W+/g, " ").toLowerCase().split(" ").join("_").slice(0, -1);
    } else {
      return str.replace(/\W+/g, " ").toLowerCase().split(" ").join("_");
    }
  }
};

export const determine_promoter_code_tier = code_usage => {
  if (code_usage === 0 || code_usage === 1) {
    return 10;
  } else if (code_usage >= 2 && code_usage <= 5) {
    return 20;
  } else if (code_usage >= 6 && code_usage <= 9) {
    return 25;
  } else if (code_usage >= 10 && code_usage <= 13) {
    return 30;
  } else if (code_usage >= 14 && code_usage <= 17) {
    return 35;
  } else if (code_usage >= 18 && code_usage <= 21) {
    return 40;
  } else if (code_usage >= 22) {
    return 50;
  }
};
export const determine_sponsor_code_tier = code_usage => {
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
  "gloves",
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

export const determine_filter = (query, search) => {
  const filter = {};

  Object.entries(query).forEach(item => {
    if (item[0] === "search" || item[0] === "limit" || item[0] === "page" || item[0] === "sort") {
      return {};
    } else {
      if (item[0] === "sale" && item[1] === "true") {
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
          filter["chips"] = { $in: [item[1]] };
        } else {
          filter[item[0]] = item[1];
        }
      } else {
        return {};
      }
    }
  });

  return { deleted: false, ...filter, ...search };
};

export const determine_sort = (query, type) => {
  let sort = { _id: -1 };
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

// export const month_dates = (year) => {
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
export const month_dates = (month, year) => {
  const month_date = {
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

export const removeDuplicates = (originalArray, prop) => {
  const newArray = [];
  const lookupObject = {};

  for (const i in originalArray) {
    lookupObject[originalArray[i][prop]] = originalArray[i];
  }

  for (const i in lookupObject) {
    newArray.push(lookupObject[i]);
  }
  return newArray;
};

// export const format_date = (unformatted_date) => {
//   const month = unformatted_date?.slice(5, 7);
//   const day = unformatted_date?.slice(8, 10);
//   const year = unformatted_date?.slice(0, 4);
//   const formatted_date = `${month}/${day}/${year}`;
//   return formatted_date;
// };

export const format_date = isoDateString => {
  const date = new Date(isoDateString);
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are zero indexed, so +1
  const day = ("0" + date.getDate()).slice(-2);
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

export const humanDate = date => {
  return new Date(date).toLocaleDateString();
};

export const unformat_date = formatted_date => {
  //
  const date = formatted_date.split("/");
  const day = date[1];
  const month = date[0];
  const year = date[2];
  const unformat_date = `${year}-${month}-${day}`;
  return unformat_date;
};
export const determin_card_logo = card_type => {
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

export const determin_card_logo_images = card_type => {
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
export const determin_card_logo_images_white = card_type => {
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
const determine_preorder = product => {
  if (product.preorder) {
    return true;
  } else {
    return false;
  }
};

export const email_sale_price_switch = (item, color, wholesaler) => {
  if (wholesaler && item.wholesale_price) {
    return `<label>WSP: $${item.wholesale_price ? item.wholesale_price?.toFixed(2) : item.wholesale_price}</label>`;
  } else if (item.sale_price !== 0) {
    return `<label>
				${determine_preorder(item) ? "Preorder " : ""}
				<del style='color: #a03131;'>
					<label style='${`color: ${color};`}'>$${item.price && (item.price * item.quantity).toFixed(2)}</label>
				</del>${" "}
				${"-->"} $${item.sale_price && (item.sale_price * item.quantity).toFixed(2)}
			</label>`;
  } else if (item.quantity === 0) {
    return `<label>
				${determine_preorder(item) ? "Preorder " : ""}
				<del style='color: #a03131;'>
					<label style='${`color: ${color}; margin-left: 7px;`}'>
						${item.price && (item.price * item.quantity).toFixed(2)}
					</label>
				</del>${" "}
				${"-->"} <label style='${`color: ${color}; margin-left: 7px;`}'>Sold Out</label>
			</label>`;
  } else {
    return `<label>
				${determine_preorder(item) ? "Preorder " : ""} $${item.price && (item.price * item.quantity).toFixed(2)}
			</label>`;
  }
};
const included_for_option_name = ["diffusers"];
const determine_option_show_modifier = item => {
  return included_for_option_name.includes(item.category);
};

const quantity = (item, show_quantity) => {
  return show_quantity && item.quantity > 1 ? item.quantity + "x" : "";
};
const color = item => {
  return item.color ? item.color + " " : "";
};

const size = item => {
  const option_name = item.option_group_name ? item.option_group_name.split(" ")[0] : "";
  return `${item.size && item.size !== 0 ? ` ${first_dash(item)} ${item.size}` : ""}
    ${determine_option_show_modifier(item) && option_name ? option_name : ""}`;
};

const secondary_color = item => {
  return `${
    item.secondary_color && item.secondary_color_product ? `${second_dash(item)} ${item.secondary_color}` : ""
  }`;
};
const secondary_color_name = item => {
  const secondary_color_name = item.secondary_color_group_name
    ? item.secondary_color_group_name.split(" ")[0] + "s"
    : "";
  if (item.category === "gloves") {
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
const secondary_product_name = item => {
  const secondary_color_name = item.secondary_group_name ? item.secondary_group_name : "";
  if (item.name === "Diffuser Caps + Adapters Starter Kit V4") {
    return secondary_color_name;
  }
};

const secondary_product = item => {
  return item.secondary_product && item.secondary_product_name && item.secondary_product_name.length > 0
    ? ` ${third_dash(item)} ${determine_secondary_product_name(item.secondary_product_name, item)}`
    : "";
};

const first_dash = item => {
  if (item.category === "gloves") {
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

const second_dash = item => {
  if (item.name.includes("Refresh")) {
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

const third_dash = item => {
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

export const determine_product_name = (item, show_quantity) => {
  return `<div>
      ${quantity(item, show_quantity) ? quantity(item, show_quantity) : ""} ${color(item) ? color(item) : ""} ${item.name} ${
        size(item) ? size(item) : ""
      }
      ${secondary_color(item) ? secondary_color(item) : ""} ${
        secondary_color_name(item) ? secondary_color_name(item) : ""
      }${secondary_product(item) ? secondary_product(item) : ""} ${
        secondary_product_name(item) ? secondary_product_name(item) : ""
      }
    </div>`;
};

export const determine_secondary_product_name = (name, item) => {
  const { category, subcategory } = item;
  if (category === "diffuser_caps") {
    return name.split(" ")[0];
  } else if (category === "decals" && name.split(" ")[name.split(" ").length - 4] === "Outline") {
    return name.replace(" Outline + Batman Decals", "");
  } else if (category === "decals" && name.split(" ")[name.split(" ").length - 2] === "Batman") {
    return name.replace(" Batman Decals", "");
  } else if (subcategory === "refresh" && name.includes("Bulk")) {
    return name.split(" ")[1].trim();
  } else if (name.includes("Capez")) {
    return name.replace(" Capez", "");
  } else {
    return name.includes("-") ? name.split("-")[1].trim() : name;
  }
};

export const order_status_steps = (order, status) => {
  status = status?.toLowerCase();
  return `<div
			style='display: flex;justify-content: space-between;max-width: 58rem;width: 100%;margin: 1rem auto;'
		>
			<div
				style='${"width:100%; display:flex; justify-content: center;"} ${
          order
            ? "border-top: .3rem white solid; color: white;flex: 1 1;padding-top: 1rem; text-align: center; "
            : "	border-top: .3rem #c0c0c0 solid;color: white;flex: 1 1;padding-top: 1rem;text-align: center;"
        }'
			>
				<div style='font-size: 16px;'>Placed</div>
			</div>

			<div
				style='${"width:100%; display:flex; justify-content: center;"} ${
          status === "crafting" || status === "crafted" || status === "packaged" || status === "shipped"
            ? "border-top: .3rem white solid; color: white;flex: 1 1;padding-top: 1rem; text-align: center; "
            : "	border-top: .3rem #c0c0c0 solid;color: white;flex: 1 1;padding-top: 1rem;text-align: center;"
        }'
			>
				<div style='font-size: 16px;'>Crafted</div>
			</div>
			<div
				style='${"width:100%; display:flex; justify-content: center;"} ${
          status === "packaged" || status === "shipped"
            ? "border-top: .3rem white solid; color: white;flex: 1 1;padding-top: 1rem; text-align: center; "
            : "	border-top: .3rem #c0c0c0 solid;color: white;flex: 1 1;padding-top: 1rem;text-align: center;"
        }'
			>
				<div style='font-size: 16px;'>Packaged</div>
			</div>
			<div
				style='${"width:100%; display:flex; justify-content: center;"} ${
          status === "shipped"
            ? "border-top: .3rem white solid; color: white;flex: 1 1;padding-top: 1rem; text-align: center; "
            : "	border-top: .3rem #c0c0c0 solid;color: white;flex: 1 1;padding-top: 1rem;text-align: center;"
        }'
			>
				<div style='font-size: 16px;'>Shipped</div>
			</div>
		</div>`;
};

export const shipping_status_steps = (order, status) => {
  status = status?.toLowerCase();
  return `<div
			style='display: flex;justify-content: space-between;max-width: 58rem;width: 100%;margin: 1rem auto;'
		>
			<div
				style='${"width:100%; display:flex; justify-content: center;"} ${
          status === "pre_transit" || status === "in_transit" || status === "out_for_delivery" || status === "delivered"
            ? "border-top: .3rem white solid; color: white;flex: 1 1;padding-top: 1rem; text-align: center; "
            : "	border-top: .3rem #c0c0c0 solid;color: white;flex: 1 1;padding-top: 1rem;text-align: center;"
        }'
			>
				<div style='font-size: 16px;'>Label Created</div>
			</div>

			<div
				style='${"width:100%; display:flex; justify-content: center;"} ${
          status === "in_transit" || status === "out_for_delivery" || status === "delivered"
            ? "border-top: .3rem white solid; color: white;flex: 1 1;padding-top: 1rem; text-align: center; "
            : "	border-top: .3rem #c0c0c0 solid;color: white;flex: 1 1;padding-top: 1rem;text-align: center;"
        }'
			>
				<div style='font-size: 16px;'>Shipped</div>
			</div>
			<div
				style='${"width:100%; display:flex; justify-content: center;"} ${
          status === "out_for_delivery" || status === "delivered"
            ? "border-top: .3rem white solid; color: white;flex: 1 1;padding-top: 1rem; text-align: center; "
            : "	border-top: .3rem #c0c0c0 solid;color: white;flex: 1 1;padding-top: 1rem;text-align: center;"
        }'
			>
				<div style='font-size: 16px;'>Out For Delivery</div>
			</div>
			<div
				style='${"width:100%; display:flex; justify-content: center;"} ${
          status === "delivered"
            ? "border-top: .3rem white solid; color: white;flex: 1 1;padding-top: 1rem; text-align: center; "
            : "	border-top: .3rem #c0c0c0 solid;color: white;flex: 1 1;padding-top: 1rem;text-align: center;"
        }'
			>
				<div style='font-size: 16px;'>Delivered</div>
			</div>
		</div>`;
};

export const determine_tracking_carrier = tracking_number => {
  if (tracking_number.startsWith("1Z")) {
    return "UPS";
  } else if (tracking_number.startsWith("9")) {
    return "FEDEX";
  } else if (tracking_number.startsWith("927")) {
    return "DHL";
  } else if (tracking_number.length === 22) {
    return "USPS";
  } else if (tracking_number.startsWith("LX")) {
    return "UPS";
  } else if (tracking_number.startsWith("C")) {
    return "FEDEX";
  } else if (tracking_number.startsWith("S")) {
    return "DHL";
  } else if (tracking_number.startsWith("CJ")) {
    return "USPS";
  } else {
    return "USPS";
  }
};

export const determine_tracking_link = tracking_number => {
  if (tracking_number.startsWith("1Z")) {
    return `https://www.ups.com/track?tracknum=${tracking_number}`;
  } else if (tracking_number.startsWith("9")) {
    return `https://www.fedex.com/apps/fedextrack/?tracknumbers=${tracking_number}`;
  } else if (tracking_number.startsWith("927")) {
    return `https://www.dhl.com/en/express/tracking.html?tracking_number=${tracking_number}`;
  } else if (tracking_number.length === 22) {
    return `https://tools.usps.com/go/TrackConfirmAction?tLabels=${tracking_number}`;
  } else if (tracking_number.startsWith("LX")) {
    return `https://www.ups.com/track?loc=en_us&tracknum=${tracking_number}`;
  } else if (tracking_number.startsWith("C")) {
    return `https://www.fedex.com/apps/fedextrack/?tracknumbers=${tracking_number}`;
  } else if (tracking_number.startsWith("S")) {
    return `https://www.dhl.com/en/express/tracking.html?tracking_number=${tracking_number}`;
  } else if (tracking_number.startsWith("CJ")) {
    return `https://tools.usps.com/go/TrackConfirmAction?tLabels=${tracking_number}`;
  } else {
    return `https://tools.usps.com/go/TrackConfirmAction?tLabels=${tracking_number}`;
  }
};

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const determine_code_tier = (affiliate, code_usage) => {
  if (affiliate.promoter) {
    if (code_usage === 0 || code_usage === 1) {
      return 10;
    } else if (code_usage >= 2 && code_usage <= 5) {
      return 20;
    } else if (code_usage >= 6 && code_usage <= 9) {
      return 25;
    } else if (code_usage >= 10 && code_usage <= 13) {
      return 30;
    } else if (code_usage >= 14 && code_usage <= 17) {
      return 35;
    } else if (code_usage >= 18 && code_usage <= 21) {
      return 40;
    } else if (code_usage >= 22) {
      return 50;
    }
  } else if (affiliate.sponsor) {
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
  }
};
