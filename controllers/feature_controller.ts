import { Feature } from '../models';

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
			} else if (req.query.sortOrder === 'song id') {
				sortOrder = { song_id: 1 };
			} else if (req.query.sortOrder === 'product') {
				sortOrder = { product: 1 };
			} else if (req.query.sortOrder === 'instagram handle') {
				sortOrder = { instagram_handle: 1 };
			} else if (req.query.sortOrder === 'release_date') {
				sortOrder = { release_date: -1 };
			} else if (req.query.sortOrder === 'newest' || req.query.sortOrder === '') {
				sortOrder = { release_date: -1 };
			}

			const features = await Feature.find({ deleted: false, ...category, ...searchKeyword }).sort(sortOrder);
			res.send(features);
		} catch (error) {
			console.log({ error });

			res.status(500).send({ error, message: 'Error Getting Features' });
		}
	},
	get_features_by_category: async (req: any, res: any) => {
		try {
			const category = req.query.category ? { category: req.query.category } : {};
			const features = await Feature.find({ deleted: false, ...category }).sort({ _id: -1 });

			res.send(features);
		} catch (error) {
			console.log({ error });

			res.status(500).send({ error, message: 'Error Getting Features' });
		}
	},
	findById: async (req: any, res: any) => {
		try {
			// console.log({ feature });
			console.log(req.params.id);
			console.log('hello');
			const feature = await Feature.findOne({ pathname: req.params.id });
			console.log({ feature });
			if (feature) {
				res.send(feature);
			} else {
				res.status(404).send({ message: 'Feature Not Found.' });
			}
		} catch (error) {
			console.log({ error });
			res.status(500).send({ error, message: 'Error Getting Feature' });
		}
	},
	create: async (req: any, res: any) => {
		try {
			const newFeature = await Feature.create(req.body);
			if (newFeature) {
				return res.status(201).send({ message: 'New Feature Created', data: newFeature });
			} else {
				return res.status(500).send({ message: ' Error in Creating Feature.' });
			}
		} catch (error) {
			console.log({ error });

			res.status(500).send({ error, message: 'Error Creating Feature' });
		}
	},
	update: async (req: any, res: any) => {
		try {
			console.log({ feature_routes_put: req.body });
			const feature_id = req.params.id;
			const feature: any = await Feature.findById(feature_id);
			if (feature) {
				const updatedFeature = await Feature.updateOne({ _id: feature_id }, req.body);
				if (updatedFeature) {
					return res.status(200).send({ message: 'Feature Updated', data: updatedFeature });
				}
			} else {
				return res.status(500).send({ message: ' Error in Updating Feature.' });
			}
		} catch (error) {
			console.log({ error });

			res.status(500).send({ error, message: 'Error Getting Feature' });
		}
	},
	remove: async (req: any, res: any) => {
		try {
			const message: any = { message: 'Feature Deleted' };
			const deleted_feature = await Feature.updateOne({ _id: req.params.id }, { deleted: true });
			if (deleted_feature) {
				res.send(message);
			} else {
				res.send('Error in Deletion.');
			}
		} catch (error) {
			console.log({ error });

			res.status(500).send({ error, message: 'Error Deleting Feature' });
		}
	}
};
