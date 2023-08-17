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
