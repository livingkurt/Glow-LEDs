import { determine_total } from "../../utils/helper_functions";

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

export const isFreeShipping = ({ shipping, items_price, rate, sortedRates }) => {
  return !shipping.international && items_price > 50 && rate.rate === sortedRates[0].rate ? true : false;
};

export const displayRate = ({ current_shipping_speed, shipping }) =>
  current_shipping_speed.freeShipping
    ? "Free"
    : `$${parseFloat(
        shipping.international ? current_shipping_speed.rate.rate : current_shipping_speed.rate.retail_rate
      ).toFixed(2)}`;

export const normalizeDomesticRates = rates => {
  const USPSRates = rates.filter(rate => rate.carrier === "USPS");
  const UPSRates = rates.filter(rate => rate.carrier === "UPSDAP");
  const sortedUSPSRates = USPSRates.sort((a, b) => parseFloat(a.rate) - parseFloat(b.rate));
  const sortedUPSRates = UPSRates.sort((a, b) => parseFloat(a.rate) - parseFloat(b.rate));
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

export const applyPercentageOff = (state, items_price, validPromo, tax_rate) => {
  const newItemsPrice = items_price - items_price * (validPromo.percentage_off / 100);
  state.itemsPrice = newItemsPrice;
  state.taxPrice = tax_rate * newItemsPrice;
  state.activePromoCodeIndicator = `${validPromo.promo_code.toUpperCase()} ${validPromo.percentage_off}% Off`;
};

export const applyAmountOff = (state, items_price, validPromo, tax_rate) => {
  const newItemsPrice = validPromo.amount_off > items_price ? 0 : items_price - validPromo.amount_off;
  state.itemsPrice = newItemsPrice;
  state.taxPrice = tax_rate * newItemsPrice;
  state.activePromoCodeIndicator = `${validPromo.promo_code.toUpperCase()} $${validPromo.amount_off} Off`;
};

export const applyFreeShipping = (state, validPromo) => {
  state.shippingPrice = 0;
  state.free_shipping_message = "Free";
  state.activePromoCodeIndicator = `${validPromo.promo_code.toUpperCase()} Free Shipping`;
};

// Check if a product is included or excluded
export const isProductValidForPromo = (productId, validPromo) => {
  if (validPromo.include) {
    return validPromo.included_products.includes(productId);
  }
  if (validPromo.exclude) {
    return !validPromo.excluded_products.includes(productId);
  }
  return true;
};

// Check if a category is included or excluded
export const isCategoryValidForPromo = (categoryId, validPromo) => {
  if (validPromo.include) {
    return validPromo.included_categories.includes(categoryId);
  }
  if (validPromo.exclude) {
    return !validPromo.excluded_categories.includes(categoryId);
  }
  return true;
};

// Calculate the new total price based on included or excluded products and categories
export const calculateNewItemsPrice = ({ cartItems, validPromo, isWholesaler }) => {
  const today = new Date();
  let total = 0;
  cartItems.forEach(item => {
    if (
      isProductValidForPromo(item.product, validPromo) &&
      isCategoryValidForPromo(item.product.category, validPromo)
    ) {
      if (isWholesaler) {
        total += (item.wholesale_price || item.price) * item.qty;
      } else if (
        today >= new Date(item.sale_start_date) &&
        today <= new Date(item.sale_end_date) &&
        item.sale_price !== 0
      ) {
        total += item.sale_price * item.qty;
      } else {
        total += item.price * item.qty;
      }
    }
  });
  return total;
};
