import { feature_services } from '../services';

export default {
	findAll_features_c: async (req: any, res: any) => {
		const { query } = req;
		try {
			const features = await feature_services.findAll_features_s(query);
			if (features) {
				return res.status(200).send(features);
			}
			return res.status(404).send({ message: 'Features Not Found' });
		} catch (error) {
			console.log({ findAll_features_c_error: error });
			res.status(500).send({ error, message: 'Error Finding Features' });
		}
	},
	findByPathname_features_c: async (req: any, res: any) => {
		const { params } = req;
		console.log({ params });
		try {
			const feature = await feature_services.findByPathname_features_s(params);
			console.log({ feature });
			if (feature) {
				return res.status(200).send(feature);
			}
			return res.status(404).send({ message: 'Feature Not Found' });
		} catch (error) {
			console.log({ findById_features_c_error: error });
			res.status(500).send({ error, message: 'Error Finding Feature' });
		}
	},

	create_features_c: async (req: any, res: any) => {
		const { body } = req;
		try {
			const feature = await feature_services.create_features_s(body);
			if (feature) {
				return res.status(201).send(feature);
			}
			return res.status(500).send({ message: 'Error Creating Feature' });
		} catch (error) {
			console.log({ create_features_c_error: error });
			res.status(500).send({ error, message: 'Error Creating Feature' });
		}
	},
	update_features_c: async (req: any, res: any) => {
		const { params, body } = req;
		try {
			const feature = await feature_services.update_features_s(params, body);
			if (feature) {
				return res.status(200).send(feature);
			}
			return res.status(500).send({ message: 'Error Updating Feature' });
		} catch (error) {
			console.log({ update_features_c_error: error });
			res.status(500).send({ error, message: 'Error Updating Feature' });
		}
	},
	remove_features_c: async (req: any, res: any) => {
		const { params } = req;
		try {
			const feature = await feature_services.remove_features_s(params);
			if (feature) {
				return res.status(204).send({ message: 'Feature Deleted' });
			}
			return res.status(500).send({ message: 'Error Deleting Feature' });
		} catch (error) {
			console.log({ remove_features_c_error: error });
			res.status(500).send({ error, message: 'Error Deleting Feature' });
		}
	}
};
