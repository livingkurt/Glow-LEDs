import Setting from '../models/setting';

export default {
	findAll_settings_db: async (filter: any, sort: any) => {
		try {
			return await Setting.find(filter).sort(sort).populate('user').populate('affiliate').populate('team');
		} catch (error) {
			console.log({ findAll_settings_db_error: error });
			throw new Error(error.message);
		}
	},
	findById_settings_db: async (id: string) => {
		try {
			return await Setting.findOne({ _id: id }).populate('user').populate('affiliate').populate('team');
		} catch (error) {
			console.log({ findById_settings_db_error: error });
			throw new Error(error.message);
		}
	},
	create_settings_db: async (body: any) => {
		try {
			return await Setting.create(body);
		} catch (error) {
			console.log({ create_settings_db_error: error });
			throw new Error(error.message);
		}
	},
	update_settings_db: async (id: string, body: any) => {
		try {
			const setting: any = await Setting.findOne({ _id: id });
			if (setting) {
				return await Setting.updateOne({ _id: id }, body);
			}
		} catch (error) {
			console.log({ update_settings_db_error: error });
			throw new Error(error.message);
		}
	},
	remove_settings_db: async (id: string) => {
		try {
			const setting: any = await Setting.findOne({ _id: id });
			if (setting) {
				return await Setting.updateOne({ _id: id }, { deleted: true });
			}
		} catch (error) {
			console.log({ remove_settings_db_error: error });
			throw new Error(error.message);
		}
	}
};
