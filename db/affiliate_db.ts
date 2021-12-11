import Affiliate from '../models/affiliate';
import { Promo } from '../models';
import { make_private_code } from '../util';

export default {
	findAll_affiliates_db: async (filter: any, sort: any) => {
		try {
			return await Affiliate.find(filter)
				.sort(sort)
				.populate('user')
				.populate('products')
				.populate('public_code')
				.populate('private_code')
				.populate('chips');
		} catch (error) {
			console.log({ findAll_affiliates_db_error: error });
			throw new Error(error.message);
		}
	},
	findById_affiliates_db: async (pathname: string) => {
		try {
			return await Affiliate.findOne({ pathname: pathname })
				.populate('user')
				.populate('chips')
				.populate('products')
				.populate('public_code')
				.populate('private_code');
		} catch (error) {
			console.log({ findById_affiliates_db_error: error });
			throw new Error(error.message);
		}
	},
	create_affiliates_db: async (body: any, public_code: any, private_code: any) => {
		try {
			const pub_code = await Promo.create(public_code);
			const priv_code = await Promo.create(private_code);
			if (pub_code && priv_code) {
				return await Affiliate.create({
					...body,
					public_code: pub_code._id,
					private_code: priv_code._id
				});
			}
		} catch (error) {
			console.log({ create_affiliates_db_error: error });
			throw new Error(error.message);
		}
	},
	update_affiliates_db: async (params: any, body: any) => {
		try {
			const affiliate: any = await Affiliate.findOne({ pathname: params.pathname });
			if (affiliate) {
				return await Affiliate.updateOne({ pathname: params.pathname }, body);
			}
		} catch (error) {
			console.log({ update_affiliates_db_error: error });
			throw new Error(error.message);
		}
	},
	remove_affiliates_db: async (params: any) => {
		try {
			const affiliate: any = await Affiliate.findOne({ pathname: params.pathname });
			if (affiliate) {
				return await Affiliate.updateOne({ pathname: params.pathname }, { deleted: true });
			}
		} catch (error) {
			console.log({ remove_affiliates_db_error: error });
			throw new Error(error.message);
		}
	}
};
