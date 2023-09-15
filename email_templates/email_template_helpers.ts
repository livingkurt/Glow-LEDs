import config from "../config";

export const domain = (): string => {
  if (config.ENVIRONMENT === "production") {
    return "https://www.glow-leds.com";
  } else if (config.ENVIRONMENT === "staging") {
    return "https://glow-leds-dev.herokuapp.com";
  } else {
    return "http://localhost:3000";
  }
};
