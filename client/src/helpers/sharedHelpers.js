import config from "../config";

export const domain = () => {
  if (config.REACT_APP_ENVIRONMENT === "production") {
    return "https://www.glow-leds.com";
  } else if (config.REACT_APP_ENVIRONMENT === "staging") {
    return "https://glow-leds-dev.herokuapp.com";
  } else {
    return "http://localhost:3000";
  }
};

export const errorMessage = error => {
  console.log({ error });
  return `Error: ${error?.response ? error.response.data.message : "An unexpected error occurred"}`;
};

export const debounce = (thisParams, func, wait, immediate) => {
  let timeout;
  return function () {
    const context = thisParams,
      args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

export const getItemsTotal = items => {
  return items.reduce((acc, item) => acc + item.quantity * item.price, 0);
};
export const getCartQuantity = items => {
  return items.reduce((acc, item) => acc + item.quantity, 0);
};

export const determineProductLink = item => {
  let link = `/products/${item.pathname}`;

  const params = [];
  if (!item?.selectedOptions || !item?.currentOptions) return link;
  item.selectedOptions.forEach(option => {
    if (option.name) {
      params.push(`${encodeURIComponent(option.name)}=${encodeURIComponent(option.value)}`);
    }
  });

  if (params.length > 0) {
    link += `?${params.join("&")}`;
  }

  return link;
};

export const determineProductName = (item, show_quantity) => {
  let name = item.name;

  if (show_quantity && item.quantity > 1) {
    name = `${item.quantity}x ${name}`;
  }
  if (!item?.selectedOptions || !item?.currentOptions) return name;
  item?.selectedOptions?.forEach(option => {
    if (option.name) {
      name += ` - ${option.value}`;
    }
  });

  return name;
};

export const determineProductNameString = item => {
  let name = item.name;
  if (!item?.selectedOptions || !item?.currentOptions) return name;
  item?.selectedOptions?.forEach(option => {
    if (option.name) {
      name += ` - ${option.name}`;
    }
  });
  return name;
};
