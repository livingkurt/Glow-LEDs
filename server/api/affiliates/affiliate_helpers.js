import { make_private_code } from "../../utils/util.js";

export const monthToNum = monthName => {
  const monthNames = [
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
  return monthNames.indexOf(monthName) + 1; // +1 because JavaScript months are 0-based
};

// Function to create a public promo code
export const createPublicPromoCode = promoCodeName => {
  return {
    promo_code: promoCodeName.toLowerCase(),
    admin_only: false,
    affiliate_only: false,
    single_use: false,
    used_once: false,
    excluded_categories: [],
    excluded_products: [],
    percentage_off: 10,
    free_shipping: false,
    time_limit: false,
    start_date: "2021-01-01",
    end_date: "2021-01-01",
    active: true,
  };
};

// Function to create a private promo code
export const createPrivatePromoCode = (user, percentageOff = 10) => {
  return {
    promo_code: make_private_code(6),
    user,
    admin_only: false,
    affiliate_only: true,
    single_use: false,
    used_once: false,
    excluded_categories: [],
    excluded_products: [],
    percentage_off: percentageOff,
    free_shipping: false,
    time_limit: false,
    start_date: "2021-01-01",
    end_date: "2021-01-01",
    active: true,
  };
};

export const normalizeAffiliateSearch = query => {
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

export const determineRevenueTier = (affiliate, revenue) => {
  if (affiliate.promoter) {
    if (revenue < 100) {
      return 10;
    } else if (revenue >= 100 && revenue < 200) {
      return 20;
    } else if (revenue >= 200 && revenue < 300) {
      return 25;
    } else if (revenue >= 300 && revenue < 400) {
      return 30;
    } else if (revenue >= 400 && revenue < 500) {
      return 35;
    } else if (revenue >= 500) {
      return 40;
    }
  } else if (affiliate.sponsor) {
    if (revenue < 150) {
      return 30;
    } else if (revenue >= 150 && revenue < 300) {
      return 35;
    } else if (revenue >= 300 && revenue < 500) {
      return 40;
    } else if (revenue >= 500 && revenue < 750) {
      return 50;
    } else if (revenue >= 750) {
      return 60;
    }
  }
};
