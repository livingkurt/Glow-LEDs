import Promo from '../models/promo';

export default {
	findAll_promos_db: async (filter: any, sort: any) => {
		try {
			return await Promo.find(filter).sort(sort).populate('sponsor').populate('user');
		} catch (error) {
			console.log({ findAll_promos_db_error: error });
			throw new Error(error.message);
		}
	},
	findById_promos_db: async (id: string) => {
		try {
			return await Promo.findOne({ _id: id }).populate('sponsor').populate('user');
		} catch (error) {
			console.log({ findById_promos_db_error: error });
			throw new Error(error.message);
		}
	},
	findByCode_promos_db: async (promo_code: string) => {
		console.log({ promo_code });
		try {
			return await Promo.findOne({ promo_code: promo_code }).populate('sponsor').populate('user');
		} catch (error) {
			console.log({ findById_promos_db_error: error });
			throw new Error(error.message);
		}
	},
	create_promos_db: async (body: any) => {
		try {
			return await Promo.create(body);
		} catch (error) {
			console.log({ create_promos_db_error: error });
			throw new Error(error.message);
		}
	},
	update_promos_db: async (id: string, body: any) => {
		try {
			const promo: any = await Promo.findOne({ _id: id });
			if (promo) {
				return await Promo.updateOne({ _id: id }, body);
			}
		} catch (error) {
			console.log({ update_promos_db_error: error });
			throw new Error(error.message);
		}
	},
	remove_promos_db: async (id: string) => {
		try {
			const promo: any = await Promo.findOne({ _id: id });
			if (promo) {
				return await Promo.updateOne({ _id: id }, { deleted: true });
			}
		} catch (error) {
			console.log({ remove_promos_db_error: error });
			throw new Error(error.message);
		}
	}
};
