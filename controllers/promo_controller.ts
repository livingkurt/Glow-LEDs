import { promo_services } from '../services';

export default {
	findAll_promos_c: async (req: any, res: any) => {
		const { query } = req;
		try {
			const promos = await promo_services.findAll_promos_s(query);
			if (promos) {
				return res.status(200).send(promos);
			}
			return res.status(404).send({ message: 'Promos Not Found' });
		} catch (error) {
			console.log({ findAll_promos_c_error: error });
			res.status(500).send({ error, message: 'Error Finding Promos' });
		}
	},
	findById_promos_c: async (req: any, res: any) => {
		const { params } = req;
		try {
			const promo = await promo_services.findById_promos_s(params);
			if (promo) {
				return res.status(200).send(promo);
			}
			return res.status(404).send({ message: 'Promo Not Found' });
		} catch (error) {
			console.log({ findById_promos_c_error: error });
			res.status(500).send({ error, message: 'Error Finding Promo' });
		}
	},
	findByCode_promos_c: async (req: any, res: any) => {
		const { params } = req;
		try {
			const promo = await promo_services.findByCode_promos_s(params);
			if (promo) {
				return res.status(200).send(promo);
			}
			return res.status(404).send({ message: 'Promo Not Found' });
		} catch (error) {
			console.log({ findById_promos_c_error: error });
			res.status(500).send({ error, message: 'Error Finding Promo' });
		}
	},
	create_promos_c: async (req: any, res: any) => {
		const { body } = req;
		try {
			const promo = await promo_services.create_promos_s(body);
			if (promo) {
				return res.status(201).send(promo);
			}
			return res.status(500).send({ message: 'Error Creating Promo' });
		} catch (error) {
			console.log({ create_promos_c_error: error });
			res.status(500).send({ error, message: 'Error Creating Promo' });
		}
	},
	create_one_time_use_code_promos_c: async (req: any, res: any) => {
		const { body } = req;
		try {
			const promo = await promo_services.create_one_time_use_code_promos_s(body);
			if (promo) {
				return res.status(201).send(promo);
			}
			return res.status(500).send({ message: 'Error Creating Promo' });
		} catch (error) {
			console.log({ create_promos_c_error: error });
			res.status(500).send({ error, message: 'Error Creating Promo' });
		}
	},
	update_promos_c: async (req: any, res: any) => {
		const { params, body } = req;
		try {
			const promo = await promo_services.update_promos_s(params, body);
			if (promo) {
				return res.status(200).send(promo);
			}
			return res.status(500).send({ message: 'Error Updating Promo' });
		} catch (error) {
			console.log({ update_promos_c_error: error });
			res.status(500).send({ error, message: 'Error Updating Promo' });
		}
	},
	update_code_used_promos_c: async (req: any, res: any) => {
		const { params, body } = req;
		try {
			const promo = await promo_services.update_code_used_promos_s(params, body);
			if (promo) {
				return res.status(200).send(promo);
			}
			return res.status(500).send({ message: 'Error Updating Promo' });
		} catch (error) {
			console.log({ update_promos_c_error: error });
			res.status(500).send({ error, message: 'Error Updating Promo' });
		}
	},
	update_affiliate_codes_promos_c: async (req: any, res: any) => {
		const { params, query } = req;
		try {
			const promo = await promo_services.update_affiliate_codes_promos_s(params, query);
			if (promo) {
				return res.status(200).send(promo);
			}
			return res.status(500).send({ message: 'Error Updating Promo' });
		} catch (error) {
			console.log({ update_promos_c_error: error });
			res.status(500).send({ error, message: 'Error Updating Promo' });
		}
	},

	remove_promos_c: async (req: any, res: any) => {
		const { params } = req;
		try {
			const promo = await promo_services.remove_promos_s(params);
			if (promo) {
				return res.status(204).send({ message: 'Promo Deleted' });
			}
			return res.status(500).send({ message: 'Error Deleting Promo' });
		} catch (error) {
			console.log({ remove_promos_c_error: error });
			res.status(500).send({ error, message: 'Error Deleting Promo' });
		}
	}
};
