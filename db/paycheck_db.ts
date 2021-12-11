import Paycheck from '../models/paycheck';

export default {
	findAll_paychecks_db: async (filter: any, sort: any) => {
		try {
			return await Paycheck.find(filter).sort(sort).populate('user').populate('affiliate');
		} catch (error) {
			console.log({ findAll_paychecks_db_error: error });
			throw new Error(error.message);
		}
	},
	findById_paychecks_db: async (id: string) => {
		try {
			return await Paycheck.findOne({ _id: id }).populate('user').populate('affiliate');
		} catch (error) {
			console.log({ findById_paychecks_db_error: error });
			throw new Error(error.message);
		}
	},
	findMy_paychecks_db: async (affiliate_id: string) => {
		try {
			return await Paycheck.find({ deleted: false, affiliate: affiliate_id })
				.sort({ _id: -1 })
				.populate('affiliate');
		} catch (error) {
			console.log({ findById_paychecks_db_error: error });
			throw new Error(error.message);
		}
	},
	create_paychecks_db: async (body: any) => {
		try {
			return await Paycheck.create(body);
		} catch (error) {
			console.log({ create_paychecks_db_error: error });
			throw new Error(error.message);
		}
	},
	update_paychecks_db: async (id: string, body: any) => {
		try {
			const paycheck: any = await Paycheck.findOne({ _id: id });
			if (paycheck) {
				return await Paycheck.updateOne({ _id: id }, body);
			}
		} catch (error) {
			console.log({ update_paychecks_db_error: error });
			throw new Error(error.message);
		}
	},
	remove_paychecks_db: async (id: string) => {
		try {
			const paycheck: any = await Paycheck.findOne({ _id: id });
			if (paycheck) {
				return await Paycheck.updateOne({ _id: id }, { deleted: true });
			}
		} catch (error) {
			console.log({ remove_paychecks_db_error: error });
			throw new Error(error.message);
		}
	}
};
