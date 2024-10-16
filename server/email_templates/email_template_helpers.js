import config from "../config";

export const domain = () => {
  if (config.ENVIRONMENT === "production") {
    return "https://www.glow-leds.com";
  } else if (config.ENVIRONMENT === "staging") {
    return "https://glow-leds-dev.herokuapp.com";
  }
  return "http://localhost:3000";
};

export const isColorLight = color => {
  const hex = color.replace("#", "");
  const c_r = parseInt(hex.substr(0, 2), 16);
  const c_g = parseInt(hex.substr(2, 2), 16);
  const c_b = parseInt(hex.substr(4, 2), 16);
  const brightness = (c_r * 299 + c_g * 587 + c_b * 114) / 1000;
  return brightness > 155;
};
