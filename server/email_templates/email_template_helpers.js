import config from "../config.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import isBetween from "dayjs/plugin/isBetween.js";
// Add this import
dayjs.extend(isBetween);

dayjs.extend(utc);

export const domain = () => {
  if (config.ENVIRONMENT === "production") {
    return "https://www.glow-leds.com";
  } else if (config.ENVIRONMENT === "staging") {
    return "https://glow-leds-dev.herokuapp.com";
  } else {
    return "http://localhost:5173";
  }
};

export const isColorLight = color => {
  const hex = color.replace("#", "");
  const c_r = parseInt(hex.substr(0, 2), 16);
  const c_g = parseInt(hex.substr(2, 2), 16);
  const c_b = parseInt(hex.substr(4, 2), 16);
  const brightness = (c_r * 299 + c_g * 587 + c_b * 114) / 1000;
  return brightness > 155;
};

// Add these helper functions at the top of the file:
export const getItemsTotal = orderItems => {
  return orderItems.reduce((total, item) => {
    const originalPrice = item.previous_price || item.price;
    return total + originalPrice * item.quantity;
  }, 0);
};

export const getSaleTotal = orderItems => {
  return orderItems.reduce((total, item) => {
    const today = dayjs().utc();
    const isOnSale =
      item.sale?.price &&
      item.sale?.start_date &&
      item.sale?.end_date &&
      today.isBetween(dayjs(item.sale.start_date).utc(), dayjs(item.sale.end_date).utc());

    const price = isOnSale ? item.sale.price : item.price;
    return total + price * item.quantity;
  }, 0);
};

export const hasActiveSale = orderItems => {
  const originalTotal = getItemsTotal(orderItems);
  const saleTotal = getSaleTotal(orderItems);
  return saleTotal < originalTotal;
};
