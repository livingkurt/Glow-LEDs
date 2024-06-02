import axios from "axios";
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
  return `Error: ${error.response ? error.response.data.message : "An unexpected error occurred"}`;
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

// Helper to choose between image_object and image string for a single image
export const image_or_image_object = content => {
  if (content && content.image_object) {
    return content.image_object.link;
  } else {
    return content.image;
  }
};

// Helper to choose between images_object array and images string array
export const images_or_images_object = content => {
  if (content && content.images_object && content.images_object.length > 0) {
    return content.images_object;
  } else {
    return content.images;
  }
};

export const getItemsTotal = items => {
  return items.reduce((acc, item) => acc + item.quantity * item.price, 0);
};
export const getCartQuantity = items => {
  return items.reduce((acc, item) => acc + item.quantity, 0);
};

export const determineProductLink = item => {
  let link = `/collections/all/products/${item.pathname}`;

  const params = [];

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

  item.selectedOptions.forEach(option => {
    if (option.name) {
      name += ` - ${option.value}`;
    }
  });

  return name;
};

export const determineProductNameString = item => {
  let name = item.name;
  item.selectedOptions.forEach(option => {
    if (option.name) {
      name += ` - ${option.name}`;
    }
  });
  return name;
};
