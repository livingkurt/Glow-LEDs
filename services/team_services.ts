import { team_db } from '../db';
import { determine_filter } from '../util';

export default {
	findAll_teams_s: async (query: any) => {
		try {
			const promoter = query.category === 'rave_mob' ? { rave_mob: true } : {};
			const search = query.search
				? {
						team_name: {
							$regex: query.search,
							$options: 'i'
						}
					}
				: {};
			const filter = determine_filter(query, search);
			const sort_query = query.sort && query.sort.toLowerCase();
			let sort: any = { _id: -1 };
			if (sort_query === 'glover name') {
				sort = { artist_name: 1 };
			} else if (sort_query === 'facebook name') {
				sort = { facebook_name: 1 };
			} else if (sort_query === 'sponsor') {
				sort = { sponsor: -1 };
			} else if (sort_query === 'promoter') {
				sort = { promoter: -1 };
			} else if (sort_query === 'active') {
				sort = { active: -1 };
			} else if (sort_query === 'newest') {
				sort = { _id: -1 };
			}
			return await team_db.findAll_teams_db(filter, sort);
		} catch (error) {
			console.log({ findAll_teams_s_error: error });
			throw new Error(error.message);
		}
	},
	findByPathname_teams_s: async (params: any) => {
		try {
			return await team_db.findByPathname_teams_db(params.pathname);
		} catch (error) {
			console.log({ findById_teams_s_error: error });
			throw new Error(error.message);
		}
	},
	findByAffiliate_teams_s: async (params: any) => {
		try {
			return await team_db.findByAffiliate_teams_db(params.id);
		} catch (error) {
			console.log({ findById_teams_s_error: error });
			throw new Error(error.message);
		}
	},
	create_teams_s: async (body: any) => {
		try {
			return await team_db.create_teams_db(body);
		} catch (error) {
			console.log({ create_teams_s_error: error });
			throw new Error(error.message);
		}
	},
	update_teams_s: async (params: any, body: any) => {
		try {
			return await team_db.update_teams_db(params.pathname, body);
		} catch (error) {
			console.log({ update_teams_s_error: error });
			throw new Error(error.message);
		}
	},
	remove_teams_s: async (params: any) => {
		try {
			return await team_db.remove_teams_db(params.pathname);
		} catch (error) {
			console.log({ remove_teams_s_error: error });
			throw new Error(error.message);
		}
	}
};
