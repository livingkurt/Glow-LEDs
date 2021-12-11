import { setting_services } from '../services';

export default {
	findAll_settings_c: async (req: any, res: any) => {
		const { query } = req;
		try {
			const settings = await setting_services.findAll_settings_s(query);
			if (settings) {
				return res.status(200).send(settings);
			}
			return res.status(404).send({ message: 'Settings Not Found' });
		} catch (error) {
			console.log({ findAll_settings_c_error: error });
			res.status(500).send({ error, message: 'Error Finding Settings' });
		}
	},
	findById_settings_c: async (req: any, res: any) => {
		const { params } = req;
		try {
			const setting = await setting_services.findById_settings_s(params);
			console.log({ setting });
			if (setting) {
				return res.status(200).send(setting);
			}
			return res.status(404).send({ message: 'Setting Not Found' });
		} catch (error) {
			console.log({ findById_settings_c_error: error });
			res.status(500).send({ error, message: 'Error Finding Setting' });
		}
	},
	create_settings_c: async (req: any, res: any) => {
		const { body } = req;
		try {
			const setting = await setting_services.create_settings_s(body);
			if (setting) {
				return res.status(201).send(setting);
			}
			return res.status(500).send({ message: 'Error Creating Setting' });
		} catch (error) {
			console.log({ create_settings_c_error: error });
			res.status(500).send({ error, message: 'Error Creating Setting' });
		}
	},
	update_settings_c: async (req: any, res: any) => {
		const { params, body } = req;
		try {
			const setting = await setting_services.update_settings_s(params, body);
			if (setting) {
				return res.status(200).send(setting);
			}
			return res.status(500).send({ message: 'Error Updating Setting' });
		} catch (error) {
			console.log({ update_settings_c_error: error });
			res.status(500).send({ error, message: 'Error Updating Setting' });
		}
	},
	remove_settings_c: async (req: any, res: any) => {
		const { params } = req;
		try {
			const setting = await setting_services.remove_settings_s(params);
			if (setting) {
				return res.status(204).send({ message: 'Setting Deleted' });
			}
			return res.status(500).send({ message: 'Error Deleting Setting' });
		} catch (error) {
			console.log({ remove_settings_c_error: error });
			res.status(500).send({ error, message: 'Error Deleting Setting' });
		}
	}
};
