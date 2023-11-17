import { make_private_code } from "../../utils/util";

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
    user: user,
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
