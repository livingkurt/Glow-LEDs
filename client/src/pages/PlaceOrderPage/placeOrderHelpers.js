import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import isBetween from "dayjs/plugin/isBetween.js"; // Add this import
dayjs.extend(isBetween);

dayjs.extend(utc);

export const determine_service = rate => {
  if (rate.est_delivery_days) {
    return `Est: ${rate.est_delivery_days} ${rate.est_delivery_days === 1 ? "Day" : "Days"}`;
  } else if (rate.service === "INTERNATIONAL_ECONOMY") {
    return "Est: 2-5 Days";
  } else if (rate.service === "FirstClassPackageInternationalService") {
    return "Est: 4+ Weeks";
  } else if (rate.service === "FEDEX_INTERNATIONAL_PRIORITY") {
    return "Est: 1-3 Days";
  } else if (rate.service === "FEDEX_EXPRESS_SAVER") {
    return "Est: 3 Days";
  } else if (rate.service === "FirstMailInternational") {
    return "Est: 1-4 Weeks";
  } else if (rate.service === "PriorityMailInternational") {
    return "Est: 6-10 Days";
  } else if (rate.service === "ExpressMailInternational") {
    return "Est: 3-5 Days";
  } else if (rate.service === "Express") {
    return "Est: 3 Days";
  }
};

export const toTitleCaseSnakeCase = str => {
  return str
    .split("_")
    .map(word => {
      return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
    })
    .join(" ");
};

export const isRequired = (value, fieldName) => (value === "" ? `${fieldName} is Required` : null);

export const validateSection = (sectionFields, sectionState, validationResult) => {
  Object.keys(sectionFields).forEach(fieldName => {
    const field = sectionFields[fieldName];
    if (field.validate) {
      const value = sectionState[fieldName];
      const errorMessage = field.validate(value);
      if (errorMessage) {
        validationResult.isValid = false;
        validationResult.errorMessages[fieldName] = errorMessage;
      }
    }
  });
};

export const mapServiceName = service => {
  const serviceMap = {
    "PriorityMailInternational": "Priority",
    "ExpressMailInternational": "Express",
    "FirstClassPackageInternationalService": "First Class",
    "Express": "Express",
    "Expedited": "Expedited",
    "UPSSaver": "UPS Saver",
    "FEDEX_INTERNATIONAL_PRIORITY": "Priority",
    "INTERNATIONAL_ECONOMY": "Economy",
  };
  return serviceMap[service] || service;
};
export const mapCarrierName = carrier => {
  const carrierMap = {
    "UPSDAP": "UPS",
    "USPS": "USPS",
    "FedEx": "FedEx",
  };
  return carrierMap[carrier] || carrier;
};

export const serviceNames = ["USPS: Standard", "UPS: Ground", "UPS: Priority"];

export const isFreeShipping = ({ shipping, items_price, rate, sortedRates, freeShippingMinimum }) => {
  return !shipping.international && items_price > freeShippingMinimum && rate.rate === sortedRates[0].rate
    ? true
    : false;
};

export const displayRate = ({ current_shipping_speed, shipping }) => {
  return current_shipping_speed.freeShipping
    ? "Free"
    : `$${parseFloat(
        shipping.international
          ? current_shipping_speed.rate.rate
          : current_shipping_speed.rate.list_rate || current_shipping_speed.rate.rate
      ).toFixed(2)}`;
};

export const normalizeDomesticRates = rates => {
  if (!rates || !Array.isArray(rates)) {
    return [];
  }
  const USPSRates = rates.filter(rate => rate.carrier === "USPS");
  const UPSRates = rates.filter(rate => rate.carrier === "UPSDAP");

  const sortRates = rateArray => {
    return rateArray.sort((a, b) => {
      if (a.list_rate && b.list_rate) {
        return parseFloat(a.list_rate) - parseFloat(b.list_rate);
      } else if (a.list_rate) {
        return -1;
      } else if (b.list_rate) {
        return 1;
      } else {
        return parseFloat(a.rate) - parseFloat(b.rate);
      }
    });
  };

  const sortedUSPSRates = sortRates(USPSRates);
  const sortedUPSRates = sortRates(UPSRates);

  const selectedRates = [...sortedUSPSRates.slice(0, 1), sortedUPSRates[0], sortedUPSRates[2]];
  return selectedRates;
};

export const normalizeInternationalRates = rates => {
  return [...rates].sort((a, b) => parseFloat(a.rate) - parseFloat(b.rate));
};

export const getShippingInfo = (
  shipping,
  current_shipping_speed,
  shipping_rates,
  serviceNames,
  mapCarrierName,
  mapServiceName,
  normalizeDomesticRates
) => {
  if (shipping) {
    if (shipping.international) {
      return `${mapCarrierName(current_shipping_speed.rate.carrier)}: ${mapServiceName(
        current_shipping_speed.rate.service
      )}`;
    } else {
      const index = normalizeDomesticRates(shipping_rates.rates).findIndex(
        rate => rate.carrier === current_shipping_speed.rate.carrier
      );
      return serviceNames[index];
    }
  }
  return "";
};

export const processingTime = ({ cartItems }) =>
  cartItems.some(item => item.processing_time) && Math.max(...cartItems.map(item => item.processing_time[1]));

export const isFasterShipping = ({ shipping, rate, index }) =>
  (!shipping.international && serviceNames[index] !== "USPS: Standard") ||
  (shipping.international && mapServiceName(rate.service) !== "First Class");

export const applyPercentageOff = (state, eligibleTotal, validPromo, tax_rate) => {
  const discount = eligibleTotal * (validPromo.percentage_off / 100);
  state.itemsPrice -= discount;
  state.taxPrice = tax_rate * state.itemsPrice;
  state.activePromoCodeIndicator = `${validPromo.promo_code.toUpperCase()} ${validPromo.percentage_off}% Off`;
};

export const applyAmountOff = (state, eligibleTotal, validPromo, tax_rate) => {
  const discount = Math.min(validPromo.amount_off, eligibleTotal);
  state.itemsPrice -= discount;
  state.taxPrice = tax_rate * state.itemsPrice;
  state.activePromoCodeIndicator = `${validPromo.promo_code.toUpperCase()} $${discount} Off`;
};

export const applyFreeShipping = (state, validPromo) => {
  // Store previous prices before setting to zero
  state.previousShippingPrice = state.shippingPrice;
  state.previousPreOrderShippingPrice = state.preOrderShippingPrice;
  state.previousNonPreOrderShippingPrice = state.nonPreOrderShippingPrice;

  state.shippingPrice = 0;
  state.preOrderShippingPrice = 0;
  state.nonPreOrderShippingPrice = 0;
  state.free_shipping_message = "Free";
  state.activePromoCodeIndicator = `${validPromo.promo_code.toUpperCase()} Free Shipping`;
};
export const applyGiftCard = (state, eligibleTotal, validGiftCard) => {
  // Calculate total order cost including shipping
  const totalOrderCost = eligibleTotal + state.shippingPrice;
  const amountRemaining = validGiftCard.totalOrderCost || validGiftCard.currentBalance;

  // Determine how much of the gift card to use
  const discount = Math.min(amountRemaining, totalOrderCost);

  // Store previous shipping prices before setting to zero
  state.previousShippingPrice = state.shippingPrice;
  state.previousPreOrderShippingPrice = state.preOrderShippingPrice;
  state.previousNonPreOrderShippingPrice = state.nonPreOrderShippingPrice;

  // If gift card covers entire order (items + shipping)
  if (discount >= totalOrderCost) {
    state.itemsPrice = 0;
    state.shippingPrice = 0;
    state.preOrderShippingPrice = 0;
    state.nonPreOrderShippingPrice = 0;
    state.taxPrice = 0;
    state.free_shipping_message = "Free";
  } else {
    // Apply discount to items first
    state.itemsPrice = Math.max(0, state.itemsPrice - discount);
    state.taxPrice = state.taxRate * state.itemsPrice;
  }

  // Calculate final total
  const finalTotal = state.itemsPrice + state.shippingPrice + state.taxPrice + (state.tip || 0);
  state.totalPrice = finalTotal;

  // Set the active indicator
  state.activePromoCodeIndicator = `Gift Card: $${discount.toFixed(2)} Applied`;

  // Return the amount used and new remaining balance

  return {
    amountUsed: discount,
    totalOrderCost: Math.max(0, amountRemaining - discount),
  };
};
// Calculate the new total price based on included or excluded products and categories
export const calculateNewItemsPrice = ({ cartItems, validPromo, isWholesaler }) => {
  const today = dayjs().utc();
  let totalEligibleForDiscount = 0;

  cartItems?.forEach(item => {
    // Skip gift cards
    if (item.itemType === "gift_card") {
      return;
    }

    const itemPrice = isWholesaler ? item.wholesale_price || item.price : item.price;
    const salePrice =
      item.sale?.start_date &&
      item.sale?.end_date &&
      today.isBetween(dayjs(item.sale.start_date).utc(), dayjs(item.sale.end_date).utc()) &&
      item.sale?.price !== 0
        ? item.sale?.price
        : itemPrice;
    const finalPrice = salePrice * item.quantity;

    const isIncluded =
      validPromo.included_products.includes(item.product) || validPromo.included_categories.includes(item.category);
    const isExcluded =
      validPromo.excluded_products.includes(item.product) || validPromo.excluded_categories.includes(item.category);

    if ((isIncluded || (!isIncluded && !isExcluded)) && !isExcluded) {
      totalEligibleForDiscount += finalPrice;
    }
  });

  return totalEligibleForDiscount;
};
export const constructOutOfStockMessage = outOfStockItems => {
  // Construct a message listing out-of-stock items, including option details if present
  const itemsList = outOfStockItems
    .map(item => {
      return `${item.name}${item.option ? ` (${item.option})` : ""}`;
    })
    .join(", ");
  return `The following items are out of stock: ${itemsList}. Select Yes to remove them and continue or No to exit checkout to update your cart.`;
};

export const isOrderComplete = ({ orderIds, orderCompleted }) => {
  if (orderIds.length > 0) {
    return true;
  }
  if (orderCompleted) {
    return true;
  }
  return false;
};

export const getHasPreOrderItems = cartItems => cartItems.some(item => item.isPreOrder);
export const getHasNonPreOrderItems = cartItems => cartItems.some(item => !item.isPreOrder);
export const getPreOrderReleaseDate = cartItems => cartItems.find(item => item.isPreOrder)?.preOrderReleaseDate;

// New helper function to check if any items in the cart have active sales
export const hasActiveSaleItems = cartItems => {
  const today = new Date();
  return cartItems.some(
    item =>
      item.sale &&
      today >= new Date(item.sale.start_date) &&
      today <= new Date(item.sale.end_date) &&
      item.sale.price !== 0
  );
};
