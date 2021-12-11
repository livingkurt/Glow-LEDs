import Chip from '../models/chip';
import { Promo } from '../models';
import { make_private_code } from '../util';

export default {
	findAll_chips_db: async (filter: any, sort: any) => {
		try {
			return await Chip.find(filter).sort(sort);
		} catch (error) {
			console.log({ findAll_chips_db_error: error });
			throw new Error(error.message);
		}
	},
	findById_chips_db: async (id: string) => {
		try {
			return await Chip.findOne({ _id: id });
		} catch (error) {
			console.log({ findById_chips_db_error: error });
			throw new Error(error.message);
		}
	},
	findByName_chips_db: async (name: string) => {
		try {
			return await Chip.findOne({ name: name });
		} catch (error) {
			console.log({ findById_chips_db_error: error });
			throw new Error(error.message);
		}
	},
	create_chips_db: async (body: any) => {
		try {
			return await Chip.create(body);
		} catch (error) {
			console.log({ create_chips_db_error: error });
			throw new Error(error.message);
		}
	},
	update_chips_db: async (id: string, body: any) => {
		try {
			const chip: any = await Chip.findOne({ _id: id });
			if (chip) {
				return await Chip.updateOne({ _id: id }, body);
			}
		} catch (error) {
			console.log({ update_chips_db_error: error });
			throw new Error(error.message);
		}
	},
	remove_chips_db: async (id: string) => {
		try {
			const chip: any = await Chip.findOne({ _id: id });
			if (chip) {
				return await Chip.updateOne({ _id: id }, { deleted: true });
			}
		} catch (error) {
			console.log({ remove_chips_db_error: error });
			throw new Error(error.message);
		}
	}
};
