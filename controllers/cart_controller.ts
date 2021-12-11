import { cart_services } from '../services';

export default {
	findAll_carts_c: async (req: any, res: any) => {
		const { query } = req;
		try {
			const carts = await cart_services.findAll_carts_s(query);
			if (carts) {
				return res.status(200).send(carts);
			}
			return res.status(404).send({ message: 'Carts Not Found' });
		} catch (error) {
			console.log({ findAll_carts_c_error: error });
			res.status(500).send({ error, message: 'Error Finding Carts' });
		}
	},
	findById_carts_c: async (req: any, res: any) => {
		const { params } = req;
		try {
			const cart = await cart_services.findById_carts_s(params);
			if (cart) {
				return res.status(200).send(cart);
			}
			return res.status(404).send({ message: 'Cart Not Found' });
		} catch (error) {
			console.log({ findById_carts_c_error: error });
			res.status(500).send({ error, message: 'Error Finding Cart' });
		}
	},
	findByUser_carts_c: async (req: any, res: any) => {
		const { params } = req;
		try {
			const cart = await cart_services.findByUser_carts_s(params);
			if (cart) {
				return res.status(200).send(cart);
			}
			return res.status(200).send({});
			// return res.status(404).send({ message: 'Cart Not Found' });
		} catch (error) {
			console.log({ findById_carts_c_error: error });
			res.status(500).send({ error, message: 'Error Finding Cart' });
		}
	},
	create_carts_c: async (req: any, res: any) => {
		const { body } = req;
		try {
			const cart = await cart_services.create_carts_s(body);
			if (cart) {
				return res.status(201).send(cart);
			}
			return res.status(500).send({ message: 'Error Creating Cart' });
		} catch (error) {
			console.log({ create_carts_c_error: error });
			res.status(500).send({ error, message: 'Error Creating Cart' });
		}
	},
	update_carts_c: async (req: any, res: any) => {
		const { params, body } = req;
		try {
			const cart = await cart_services.update_carts_s(params, body);
			if (cart) {
				return res.status(200).send(cart);
			}
			return res.status(500).send({ message: 'Error Updating Cart' });
		} catch (error) {
			console.log({ update_carts_c_error: error });
			res.status(500).send({ error, message: 'Error Updating Cart' });
		}
	},
	remove_carts_c: async (req: any, res: any) => {
		const { params } = req;
		try {
			const cart = await cart_services.remove_carts_s(params);
			if (cart) {
				return res.status(204).send({ message: 'Cart Deleted' });
			}
			return res.status(500).send({ message: 'Error Deleting Cart' });
		} catch (error) {
			console.log({ remove_carts_c_error: error });
			res.status(500).send({ error, message: 'Error Deleting Cart' });
		}
	},
	remove_cartitem_carts_c: async (req: any, res: any) => {
		const { params, body } = req;
		try {
			const cart = await cart_services.remove_cartitem_carts_s(params, body);
			if (cart) {
				return res.status(204).send({ message: 'Cart Item Deleted' });
			}
			return res.status(500).send({ message: 'Error Deleting Cart Item' });
		} catch (error) {
			console.log({ remove_cartitem_carts_c_error: error });
			res.status(500).send({ error, message: 'Error Deleting Cart Item' });
		}
	}
};
