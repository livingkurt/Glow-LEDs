import { content_db } from "../contents";
const axios = require("axios");
import { parse } from "node-html-parser";
import { determine_filter } from "../../util";

export default {
  findAll_contents_s: async (query: { page: number; search: string; sort: string; limit: number }) => {
    try {
      const page: number = query.page ? query.page : 1;
      const limit: number = query.limit ? query.limit : 0;
      const search = query.search
        ? {
            p: {
              $regex: query.search,
              $options: "i"
            }
          }
        : {};
      const filter = determine_filter(query, search);
      const sort = { _id: -1 };

      const contents = await content_db.findAll_contents_db(filter, sort, limit, page);
      const count = await content_db.count_contents_db(filter);
      return {
        contents,
        totalPages: Math.ceil(count / limit),
        currentPage: page
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findDisplay_contents_s: async (query: { page: number; search: string; sort: string; limit: number }) => {
    try {
      const page: number = query.page ? query.page : 1;
      const limit: number = query.limit ? query.limit : 1;
      const sort = { _id: -1 };
      const filter = { deleted: false, active: true };
      return await content_db.findAll_contents_db(filter, sort, limit, page);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findAllEvents_contents_s: async (query: { page: number; search: string; sort: string; limit: number }) => {
    const url = "https://electronicmidwest.com/edm-event-calendar/us-festivals/";
    try {
      const { data } = await axios.get(url);
      const root = parse(data);
      const titles_html = root.querySelectorAll(".wideeventTitle");
      const dates_html = root.querySelectorAll(".wideeventDate");
      const venues_html = root.querySelectorAll(".wideeventVenue");
      const titles = titles_html.map((node: any) => node.childNodes.map((node: any) => node.childNodes[0].childNodes[0]._rawText));
      //
      const links = titles_html.map((node: any) => node.childNodes.map((node: any) => node.rawAttrs.split("'")[1]));
      //
      const dates = dates_html.map((node: any) => node.childNodes[0]._rawText);
      const cities = venues_html.map((node: any) => node.childNodes[0].childNodes[0].childNodes[0]._rawText);
      const states = venues_html.map((node: any) => node.childNodes[0].childNodes[2].childNodes[0]._rawText);
      const venues = venues_html.map((node: any) => node.childNodes[2].childNodes[0]._rawText);
      const ages = venues_html.map((node: any) => node.childNodes[3]._rawText.replace(" &middot; ", ""));
      let events: Array<any> = [];
      titles.forEach((event: any, index: number) => {
        events = [
          ...events,
          {
            title: titles[index][0].replace("&#8211; ", "").replace("&#038; ", ""),
            date: dates[index],
            venue: venues[index],
            city: cities[index],
            state: states[index],
            age: ages[index],
            link: links[index]
          }
        ];
      });
      return events;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findAllYoutube_contents_s: async (query: { page: number; search: string; sort: string; limit: number }) => {
    const url = "https://electronicmidwest.com/edm-event-calendar/us-festivals/";
    try {
      const { data } = await axios.get(url);
      const root = parse(data);
      const titles_html = root.querySelectorAll(".wideeventTitle");
      const dates_html = root.querySelectorAll(".wideeventDate");
      const venues_html = root.querySelectorAll(".wideeventVenue");
      const titles = titles_html.map((node: any) => node.childNodes.map((node: any) => node.childNodes[0].childNodes[0]._rawText));
      //
      const links = titles_html.map((node: any) => node.childNodes.map((node: any) => node.rawAttrs.split("'")[1]));
      //
      const dates = dates_html.map((node: any) => node.childNodes[0]._rawText);
      const cities = venues_html.map((node: any) => node.childNodes[0].childNodes[0].childNodes[0]._rawText);
      const states = venues_html.map((node: any) => node.childNodes[0].childNodes[2].childNodes[0]._rawText);
      const venues = venues_html.map((node: any) => node.childNodes[2].childNodes[0]._rawText);
      const ages = venues_html.map((node: any) => node.childNodes[3]._rawText.replace(" &middot; ", ""));
      let events: Array<any> = [];
      titles.forEach((event: any, index: number) => {
        events = [
          ...events,
          {
            title: titles[index][0].replace("&#8211; ", "").replace("&#038; ", ""),
            date: dates[index],
            venue: venues[index],
            city: cities[index],
            state: states[index],
            age: ages[index],
            link: links[index]
          }
        ];
      });
      return events;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_contents_s: async (params: any) => {
    try {
      return await content_db.findById_contents_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_contents_s: async (body: any) => {
    try {
      return await content_db.create_contents_db(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_contents_s: async (params: any, body: any) => {
    try {
      return await content_db.update_contents_db(params.id, body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_contents_s: async (params: any) => {
    try {
      return await content_db.remove_contents_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
};
