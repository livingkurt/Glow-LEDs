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
