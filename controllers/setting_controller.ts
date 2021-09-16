import { Setting } from '../models';

export default {
	findAll: async (req: any, res: any) => {
		try {
			const category = req.query.category ? { category: req.query.category } : {};
			const searchKeyword = req.query.searchKeyword
				? {
						facebook_name: {
							$regex: req.query.searchKeyword,
							$options: 'i'
						}
					}
				: {};

			let sortOrder = {};
			if (req.query.sortOrder === 'glover name') {
				sortOrder = { artist_name: 1 };
			} else if (req.query.sortOrder === 'facebook name') {
				sortOrder = { facebook_name: 1 };
			} else if (req.query.sortOrder === 'newest' || req.query.sortOrder === '') {
				sortOrder = { _id: -1 };
			}

			const settings = await Setting.find({ deleted: false, ...category, ...searchKeyword })
				.sort(sortOrder)
				.populate('user')
				.populate('affiliate')
				.populate('team');

			res.send(settings);
		} catch (error) {
			console.log({ error });

			res.status(500).send({ error, message: 'Error Getting Settings' });
		}
	},
	get_my_settings: async (req: any, res: any) => {
		console.log('get_my_settings');
		console.log({ affiliate: req.user.affiliate });
		try {
			const settings = await Setting.find({ deleted: false, affiliate: req.user.affiliate._id })
				.sort({ _id: -1 })
				.populate('affiliate');
			console.log({ settings });

			res.send(settings);
		} catch (error) {
			console.log({ error });

			res.status(500).send({ error, message: 'Error Getting Your Settings' });
		}
	},
	findById: async (req: any, res: any) => {
		try {
			const setting = await Setting.findOne({ _id: req.params.id }).populate('user').populate('affiliate');
			console.log({ setting });
			console.log(req.params.id);
			if (setting) {
				res.send(setting);
			} else {
				res.status(404).send({ message: 'Setting Not Found.' });
			}
		} catch (error) {
			console.log({ error });

			res.status(500).send({ error, message: 'Error Getting Setting' });
		}
	},
	create: async (req: any, res: any) => {
		try {
			console.log({ setting: req.body });
			const newSetting = await Setting.create(req.body);
			if (newSetting) {
				return res.status(201).send({ message: 'New Setting Created', data: newSetting });
			} else {
				return res.status(500).send({ message: ' Error in Creating Setting.' });
			}
		} catch (error) {
			console.log({ error });

			res.status(500).send({ error, message: 'Error Creating Setting' });
		}
	},
	update: async (req: any, res: any) => {
		try {
			console.log({ setting_routes_put: req.body });
			const setting_id = req.params.id;
			const setting: any = await Setting.findById(setting_id);
			if (setting) {
				const updatedSetting = await Setting.updateOne({ _id: setting_id }, req.body);
				if (updatedSetting) {
					return res.status(200).send({ message: 'Setting Updated', data: updatedSetting });
				}
			} else {
				return res.status(500).send({ message: ' Error in Updating Setting.' });
			}
		} catch (error) {
			console.log({ error });

			res.status(500).send({ error, message: 'Error Getting Setting' });
		}
	},
	remove: async (req: any, res: any) => {
		try {
			const message: any = { message: 'Setting Deleted' };
			const deleted_setting = await Setting.updateOne({ _id: req.params.id }, { deleted: true });
			// const deleted_setting = await Setting.deleteOne({ _id: req.params.id });
			if (deleted_setting) {
				res.send(message);
			} else {
				res.send('Error in Deletion.');
			}
		} catch (error) {
			console.log({ error });

			res.status(500).send({ error, message: 'Error Deleting Setting' });
		}
	}
};
