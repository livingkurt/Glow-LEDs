import { content_db } from '../db';
const axios = require('axios');
import { parse } from 'node-html-parser';
import { determine_filter } from '../util';

export default {
	findAll_contents_s: async (query: any) => {
		try {
			const limit = query.limit ? { limit: query.limit } : {};
			const search = query.search
				? {
						p: {
							$regex: query.search,
							$options: 'i'
						}
					}
				: {};
			const filter = determine_filter(query, search);
			const sort = { _id: -1 };

			return await content_db.findAll_contents_db(filter, sort, limit);
		} catch (error) {
			console.log({ findAll_contents_s_error: error });
			throw new Error(error.message);
		}
	},
	findDisplay_contents_s: async (query: any) => {
		try {
			const sort = { _id: -1 };
			const limit = 1;
			const filter = { deleted: false, active: true };
			return await content_db.findAll_contents_db(filter, sort, limit);
		} catch (error) {
			console.log({ findAll_contents_s_error: error });
			throw new Error(error.message);
		}
	},
	findAllEvents_contents_s: async (query: any) => {
		const url = 'https://electronicmidwest.com/edm-event-calendar/us-festivals/';
		try {
			const { data } = await axios.get(url);
			const root = parse(data);
			const titles_html = root.querySelectorAll('.wideeventTitle');
			const dates_html = root.querySelectorAll('.wideeventDate');
			const venues_html = root.querySelectorAll('.wideeventVenue');
			const titles = titles_html.map((node: any) =>
				node.childNodes.map((node: any) => node.childNodes[0].childNodes[0]._rawText)
			);
			const dates = dates_html.map((node: any) => node.childNodes[0]._rawText);
			const cities = venues_html.map((node: any) => node.childNodes[0].childNodes[0].childNodes[0]._rawText);
			const states = venues_html.map((node: any) => node.childNodes[0].childNodes[2].childNodes[0]._rawText);
			const venues = venues_html.map((node: any) => node.childNodes[2].childNodes[0]._rawText);
			const ages = venues_html.map((node: any) => node.childNodes[3]._rawText.replace(' &middot; ', ''));
			let events: Array<any> = [];
			titles.forEach((event: any, index: number) => {
				events = [
					...events,
					{
						title: titles[index][0].replace('&#8211; ', '').replace('&#038; ', ''),
						date: dates[index],
						venue: venues[index],
						city: cities[index],
						state: states[index],
						age: ages[index]
					}
				];
			});
			return events;
		} catch (error) {
			console.log({ error });
			throw new Error(error.message);
		}
	},
	findById_contents_s: async (params: any) => {
		try {
			return await content_db.findById_contents_db(params.id);
		} catch (error) {
			console.log({ findById_contents_s_error: error });
			throw new Error(error.message);
		}
	},
	create_contents_s: async (body: any) => {
		try {
			return await content_db.create_contents_db(body);
		} catch (error) {
			console.log({ create_contents_s_error: error });
			throw new Error(error.message);
		}
	},
	update_contents_s: async (params: any, body: any) => {
		try {
			return await content_db.update_contents_db(params.id, body);
		} catch (error) {
			console.log({ update_contents_s_error: error });
			throw new Error(error.message);
		}
	},
	remove_contents_s: async (params: any) => {
		try {
			return await content_db.remove_contents_db(params.id);
		} catch (error) {
			console.log({ remove_contents_s_error: error });
			throw new Error(error.message);
		}
	}
};
