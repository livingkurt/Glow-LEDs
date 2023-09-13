import config from "../config";

export const domain = (): string => {
  if (config.NODE_ENV === "production") {
    return "https://www.glow-leds.com";
  } else {
    return "http://localhost:3000";
  }
};

export const errorMessage = (error: any): string => {
  console.log({ error });
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

// Helper to choose between image_object and image string for a single image
export const image_or_image_object = (content: any) => {
  if (content && content.image_object) {
    return content.image_object.link;
  } else {
    return content.image;
  }
};

// Helper to choose between images_object array and images string array
export const images_or_images_object = (content: any) => {
  if (content && content.images_object && content.images_object.length > 0) {
    return content.images_object;
  } else {
    return content.images;
  }
};
