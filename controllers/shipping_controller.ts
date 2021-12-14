import { shipping_services } from '../services';

export default {
	all_shipping_shipping_c: async (req: any, res: any) => {
		try {
			const all_shipping = await shipping_services.all_shipping_shipping_s();
			if (all_shipping) {
				return res.status(200).send(all_shipping);
			}
			return res.status(404).send({ message: 'Shipping Not Found' });
		} catch (error) {
			console.log({ findAll_shipping_c_error: error });
			res.status(500).send({ error, message: 'Error Finding Shipping' });
		}
	},
	create_label_shipping_c: async (req: any, res: any) => {
		const { body } = req;
		try {
			const shipping = await shipping_services.create_label_shipping_s(body);
			if (shipping) {
				return res.status(200).send(shipping);
			}
			return res.status(404).send({ message: 'Shipping Not Found' });
		} catch (error) {
			console.log({ findById_shipping_c_error: error });
			res.status(500).send({ error, message: 'Error Finding Shipping' });
		}
	},
	buy_label_shipping_c: async (req: any, res: any) => {
		const { body } = req;
		console.log({ body });
		try {
			const shipping = await shipping_services.buy_label_shipping_s(body);
			if (shipping) {
				return res.status(200).send(shipping);
			}
			return res.status(404).send({ message: 'Shipping Not Found' });
		} catch (error) {
			console.log({ findById_shipping_c_error: error });
			res.status(500).send({ error, message: 'Error Finding Shipping' });
		}
	},
	different_shipping_rates_shipping_c: async (req: any, res: any) => {
		const { params, body } = req;
		try {
			const shipping = await shipping_services.buy_label_shipping_s(params);
			if (shipping) {
				return res.status(200).send(shipping);
			}
			return res.status(500).send({ message: 'Error Updating Shipping' });
		} catch (error) {
			console.log({ update_shipping_c_error: error });
			res.status(500).send({ error, message: 'Error Updating Shipping' });
		}
	},
	get_custom_shipping_rates_shipping_c: async (req: any, res: any) => {
		const { body } = req;
		try {
			const shipping = await shipping_services.get_custom_shipping_rates_shipping_s(body);
			if (shipping) {
				return res.status(201).send(shipping);
			}
			return res.status(500).send({ message: 'Error Creating Shipping' });
		} catch (error) {
			console.log({ create_shipping_c_error: error });
			res.status(500).send({ error, message: 'Error Creating Shipping' });
		}
	},
	create_return_label_shipping_c: async (req: any, res: any) => {
		const { body } = req;
		try {
			const shipping = await shipping_services.create_return_label_shipping_s(body);
			if (shipping) {
				return res.status(200).send(shipping);
			}
			return res.status(500).send({ message: 'Error Updating Shipping' });
		} catch (error) {
			console.log({ update_shipping_c_error: error });
			res.status(500).send({ error, message: 'Error Updating Shipping' });
		}
	},
	get_shipping_rates_shipping_c: async (req: any, res: any) => {
		const { body } = req;
		try {
			const shipping = await shipping_services.get_shipping_rates_shipping_s(body);
			if (shipping) {
				return res.status(200).send(shipping);
			}
			return res.status(500).send({ message: 'Error Updating Shipping' });
		} catch (error) {
			console.log({ update_shipping_c_error: error });
			res.status(500).send({ error, message: 'Error Updating Shipping' });
		}
	},
	tracking_number_shipping_c: async (req: any, res: any) => {
		const { body } = req;
		try {
			const shipping = await shipping_services.tracking_number_shipping_s(body);
			if (shipping) {
				return res.status(200).send(shipping);
			}
			return res.status(500).send({ message: 'Error Updating Shipping' });
		} catch (error) {
			console.log({ update_shipping_c_error: error });
			res.status(500).send({ error, message: 'Error Updating Shipping' });
		}
	},
	return_tracking_number_shipping_c: async (req: any, res: any) => {
		const { body } = req;
		try {
			const shipping = await shipping_services.return_tracking_number_shipping_s(body);
			if (shipping) {
				return res.status(204).send({ message: 'Shipping Deleted' });
			}
			return res.status(500).send({ message: 'Error Deleting Shipping' });
		} catch (error) {
			console.log({ remove_shipping_c_error: error });
			res.status(500).send({ error, message: 'Error Deleting Shipping' });
		}
	}
};
