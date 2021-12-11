import Team from '../models/team';
import { Promo } from '../models';
import { make_private_code } from '../util';
import { createFalse } from 'typescript';

export default {
	findAll_teams_db: async (filter: any, sort: any) => {
		try {
			console.log({ filter });
			return await Team.find(filter)
				.populate('affiliates')
				.populate('public_code')
				.populate('private_code')
				.sort(sort);
		} catch (error) {
			console.log({ findAll_teams_db_error: error });
			throw new Error(error.message);
		}
	},
	findByPathname_teams_db: async (pathname: string) => {
		try {
			return await Team.findOne({ pathname })
				.populate('affiliates')
				.populate('public_code')
				.populate('private_code');
		} catch (error) {
			console.log({ findByPathname_teams_db_error: error });
			throw new Error(error.message);
		}
	},
	findByAffiliate_teams_db: async (affiliate_id: string) => {
		try {
			return await Team.find({ affiliates: { $in: [ affiliate_id ] } })
				.populate('affiliates')
				.populate('public_code')
				.populate('private_code');
		} catch (error) {
			console.log({ findByAffiliate_teams_db_error: error });
			throw new Error(error.message);
		}
	},
	create_teams_db: async (body: any) => {
		try {
			return await Team.create(body);
		} catch (error) {
			console.log({ create_teams_db_error: error });
			throw new Error(error.message);
		}
	},
	update_teams_db: async (id: string, body: any) => {
		try {
			const team: any = await Team.findOne({ _id: id });
			if (team) {
				return await Team.updateOne({ _id: id }, body);
			}
		} catch (error) {
			console.log({ update_teams_db_error: error });
			throw new Error(error.message);
		}
	},
	remove_teams_db: async (id: string) => {
		try {
			const team: any = await Team.findOne({ _id: id });
			if (team) {
				return await Team.updateOne({ _id: id }, { deleted: true });
			}
		} catch (error) {
			console.log({ remove_teams_db_error: error });
			throw new Error(error.message);
		}
	}
};
