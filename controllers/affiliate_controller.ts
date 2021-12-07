import { affiliate_services } from '../services';

export default {
	findAll_affiliates_c: async (req: any, res: any) => {
		const { query } = req;
		try {
			const affiliates = await affiliate_services.findAll_affiliates_s(query);
			if (affiliates) {
				return res.status(200).send(affiliates);
			}
			return res.status(404).send({ message: 'Affiliates Not Found' });
		} catch (error) {
			console.log({ findAll_affiliates_c_error: error });
			res.status(500).send({ error, message: 'Error Finding Affiliates' });
		}
	},
	findById_affiliates_c: async (req: any, res: any) => {
		const { params } = req;
		try {
			const affiliate = await affiliate_services.findById_affiliates_s(params);
			if (affiliate) {
				return res.status(200).send(affiliate);
			}
			return res.status(404).send({ message: 'Affiliate Not Found' });
		} catch (error) {
			console.log({ findById_affiliates_c_error: error });
			res.status(500).send({ error, message: 'Error Finding Affiliate' });
		}
	},
	create_affiliates_c: async (req: any, res: any) => {
		const { body } = req;
		try {
			const affiliate = await affiliate_services.create_affiliates_s(body);
			if (affiliate) {
				return res.status(201).send(affiliate);
			}
			return res.status(500).send({ message: 'Error Creating Affiliate' });
		} catch (error) {
			console.log({ create_affiliates_c_error: error });
			res.status(500).send({ error, message: 'Error Creating Affiliate' });
		}
	},
	update_affiliates_c: async (req: any, res: any) => {
		const { params, body } = req;
		try {
			const affiliate = await affiliate_services.update_affiliates_s(params, body);
			if (affiliate) {
				return res.status(200).send(affiliate);
			}
			return res.status(500).send({ message: 'Error Updating Affiliate' });
		} catch (error) {
			console.log({ update_affiliates_c_error: error });
			res.status(500).send({ error, message: 'Error Updating Affiliate' });
		}
	},
	upload_rave_mob_csv_affiliates_c: async (req: any, res: any) => {
		const { params, body } = req;
		console.log({ body });
		try {
			const affiliate = await affiliate_services.upload_rave_mob_csv_affiliates_s(params, body);
			if (affiliate) {
				return res.status(200).send(affiliate);
			}
			return res.status(500).send({ message: 'Error Updating Affiliate' });
		} catch (error) {
			console.log({ update_affiliates_c_error: error });
			res.status(500).send({ error, message: 'Error Updating Affiliate' });
		}
	},
	remove_affiliates_c: async (req: any, res: any) => {
		const { params } = req;
		try {
			const affiliate = await affiliate_services.remove_affiliates_s(params);
			if (affiliate) {
				return res.status(204).send({ message: 'Affiliate Deleted' });
			}
			return res.status(500).send({ message: 'Error Deleting Affiliate' });
		} catch (error) {
			console.log({ remove_affiliates_c_error: error });
			res.status(500).send({ error, message: 'Error Deleting Affiliate' });
		}
	}
};
