import config from "../config";

export const domain = (): string => {
  if (config.NODE_ENV === "production") {
    return "https://www.glow-leds.com";
  } else {
    return "http://localhost:3000";
  }
};
