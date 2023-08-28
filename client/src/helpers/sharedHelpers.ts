import config from "../config";

export const domain = (): string => {
  if (config.NODE_ENV === "production") {
    return "https://www.glow-leds.com";
  } else {
    return "http://localhost:3000";
  }
};

export const errorMessage = (error: any) => {
  return `Error: ${error.response ? error.response.data.message : "An unexpected error occurred"}`;
};

export const debounce = (thisParams: any, func: any, wait: any, immediate: any) => {
  let timeout: any;
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
