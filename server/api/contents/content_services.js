import { Content, content_db } from "../contents";
const axios = require("axios");
import { parse } from "node-html-parser";
import { determine_filter } from "../../util";
import { normalizeContentFilters, normalizeContentSearch } from "./content_helpers";
import { getFilteredData } from "../api_helpers";

export default {
  get_table_contents_s: async query => {
    try {
      const sort_options = ["createdAt", "active", "home_page", "banner"];
      const { filter, sort, limit, page } = getFilteredData({
        query,
        sort_options,
        normalizeFilters: normalizeContentFilters,
        normalizeSearch: normalizeContentSearch,
      });
      const contents = await content_db.findAll_contents_db(filter, sort, limit, page);
      const count = await content_db.count_contents_db(filter);
      return {
        data: contents,
        total_count: count,
        currentPage: page,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findAll_contents_s: async query => {
    try {
      const page = query.page ? query.page : "1";
      const limit = query.limit ? query.limit : "0";
      // Initialize an empty filter object
      const filter = {};

      // Apply the active status if it exists
      if (query.active !== undefined) {
        filter.active = query.active === "true" ? true : false;
      }

      // Add deleted flag as false
      filter.deleted = false;
      // let filter = query
      // filter.

      const contents = await Content.find(filter)
        .populate("home_page.image_object")
        .populate("home_page.images_object")
        .populate("home_page.images_object")
        .populate("home_page.banner_image_object")
        .populate("home_page.slideshow.image_object")
        .sort({ _id: -1 })
        .limit(3);
      const count = await content_db.count_contents_db(filter);
      if (count !== undefined) {
        return {
          contents,
          totalPages: Math.ceil(count / parseInt(limit)),
          currentPage: page,
        };
      } else {
        throw new Error("Count is undefined");
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findDisplay_contents_s: async query => {
    try {
      const page = query.page ? query.page : "1";
      const limit = query.limit ? query.limit : "1";
      const sort = { _id: -1 };
      const filter = { deleted: false, active: true };
      return await content_db.findAll_contents_db(filter, sort, limit, page);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  slideshow_contents_s: async query => {
    try {
      const slideshow = await Content.findOne({ active: true }).sort({ createdAt: -1 });
      return slideshow;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findAllEvents_contents_s: async query => {
    const url = "https://electronicmidwest.com/edm-event-calendar/us-festivals/";
    try {
      const { data } = await axios.get(url);
      const root = parse(data);
      const titles_html = root.querySelectorAll(".wideeventTitle");
      const dates_html = root.querySelectorAll(".wideeventDate");
      const venues_html = root.querySelectorAll(".wideeventVenue");
      const titles = titles_html.map(node => node.childNodes.map(node => node.childNodes[0].childNodes[0]._rawText));
      //
      const links = titles_html.map(node => node.childNodes.map(node => node.rawAttrs.split("'")[1]));
      //
      const dates = dates_html.map(node => node.childNodes[0]._rawText);
      const cities = venues_html.map(node => node.childNodes[0].childNodes[0].childNodes[0]._rawText);
      const states = venues_html.map(node => node.childNodes[0].childNodes[2].childNodes[0]._rawText);
      const venues = venues_html.map(node => node.childNodes[2].childNodes[0]._rawText);
      const ages = venues_html.map(node => node.childNodes[3]._rawText.replace(" &middot; ", ""));
      let events = [];
      titles.forEach((event, index) => {
        events = [
          ...events,
          {
            title: titles[index][0].replace("&#8211; ", "").replace("&#038; ", ""),
            date: dates[index],
            venue: venues[index],
            city: cities[index],
            state: states[index],
            age: ages[index],
            link: links[index],
          },
        ];
      });
      return events;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findAllYoutube_contents_s: async query => {
    const url = "https://electronicmidwest.com/edm-event-calendar/us-festivals/";
    try {
      const { data } = await axios.get(url);
      const root = parse(data);
      const titles_html = root.querySelectorAll(".wideeventTitle");
      const dates_html = root.querySelectorAll(".wideeventDate");
      const venues_html = root.querySelectorAll(".wideeventVenue");
      const titles = titles_html.map(node => node.childNodes.map(node => node.childNodes[0].childNodes[0]._rawText));
      //
      const links = titles_html.map(node => node.childNodes.map(node => node.rawAttrs.split("'")[1]));
      //
      const dates = dates_html.map(node => node.childNodes[0]._rawText);
      const cities = venues_html.map(node => node.childNodes[0].childNodes[0].childNodes[0]._rawText);
      const states = venues_html.map(node => node.childNodes[0].childNodes[2].childNodes[0]._rawText);
      const venues = venues_html.map(node => node.childNodes[2].childNodes[0]._rawText);
      const ages = venues_html.map(node => node.childNodes[3]._rawText.replace(" &middot; ", ""));
      let events = [];
      titles.forEach((event, index) => {
        events = [
          ...events,
          {
            title: titles[index][0].replace("&#8211; ", "").replace("&#038; ", ""),
            date: dates[index],
            venue: venues[index],
            city: cities[index],
            state: states[index],
            age: ages[index],
            link: links[index],
          },
        ];
      });
      return events;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_contents_s: async params => {
    try {
      return await content_db.findById_contents_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_contents_s: async body => {
    try {
      return await content_db.create_contents_db(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_contents_s: async (params, body) => {
    try {
      return await content_db.update_contents_db(params.id, body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_contents_s: async params => {
    try {
      return await content_db.remove_contents_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};
