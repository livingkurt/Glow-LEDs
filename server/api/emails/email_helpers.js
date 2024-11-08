import App from "../../email_templates/App.js";
import AnnouncementTemplate from "../../email_templates/pages/AnnouncementTemplate.js";
import config from "../../config.js";
import { sendEmail } from "./email_interactors.js";

export const normalizeEmailFilters = input => {
  const output = {};
  Object.keys(input).forEach(key => {
    switch (key) {
      case "category":
        for (const category of input.category) {
          output["category"] = category;
        }
        break;
      case "card":
        for (const card of input.card) {
          output["card"] = card;
        }
        break;
      case "place_of_purchase":
        for (const place_of_purchase of input.place_of_purchase) {
          output["place_of_purchase"] = place_of_purchase;
        }
        break;

      default:
        break;
    }
  });
  return output;
};

export const normalizeEmailSearch = query => {
  const search = query.search
    ? {
        email_name: {
          $regex: query.search.toLowerCase(),
          $options: "i",
        },
      }
    : {};

  return search;
};

export const toCamelCase = string => {
  const words = string.split("_");
  const camelCaseWords = words.map((word, index) => {
    if (index === 0) {
      return word.toLowerCase();
    } else {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
  });
  return camelCaseWords.join("");
};
