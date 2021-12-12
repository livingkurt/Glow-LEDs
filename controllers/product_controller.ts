import { product_services } from '../services';
import { Product } from '../models';
import { categories, determine_filter, snake_case, subcategories } from '../util';

export default {
	findAll_products_c: async (req: any, res: any) => {
		const { query } = req;
		try {
			const products = await product_services.findAll_products_s(query);
			if (products) {
				return res.status(200).send(products);
			}
			return res.status(404).send({ message: 'Products Not Found' });
		} catch (error) {
			console.log({ findAll_products_c_error: error });
			res.status(500).send({ error, message: 'Error Finding Products' });
		}
	},
	findById_products_c: async (req: any, res: any) => {
		const { params } = req;
		console.log({ findById_products_c: params });
		try {
			const product = await product_services.findById_products_s(params);
			console.log({ product });
			if (product) {
				return res.status(200).send(product);
			}
			return res.status(404).send({ message: 'Product Not Found' });
		} catch (error) {
			console.log({ findById_products_c_error: error });
			res.status(500).send({ error, message: 'Error Finding Product' });
		}
	},
	create_products_c: async (req: any, res: any) => {
		const { body } = req;
		try {
			const product = await product_services.create_products_s(body);
			if (product) {
				return res.status(201).send(product);
			}
			return res.status(500).send({ message: 'Error Creating Product' });
		} catch (error) {
			console.log({ create_products_c_error: error });
			res.status(500).send({ error, message: 'Error Creating Product' });
		}
	},
	update_products_c: async (req: any, res: any) => {
		const { params, body } = req;
		try {
			const product = await product_services.update_products_s(params, body);
			if (product) {
				return res.status(200).send(product);
			}
			return res.status(500).send({ message: 'Error Updating Product' });
		} catch (error) {
			console.log({ update_products_c_error: error });
			res.status(500).send({ error, message: 'Error Updating Product' });
		}
	},
	remove_products_c: async (req: any, res: any) => {
		const { params } = req;
		try {
			const product = await product_services.remove_products_s(params);
			if (product) {
				return res.status(204).send({ message: 'Product Deleted' });
			}
			return res.status(500).send({ message: 'Error Deleting Product' });
		} catch (error) {
			console.log({ remove_products_c_error: error });
			res.status(500).send({ error, message: 'Error Deleting Product' });
		}
	},
	get_best_sellers_products_c: async (req: any, res: any) => {
		const { body } = req;
		try {
			const product = await product_services.get_best_sellers_products_s(body);
			if (product) {
				return res.status(201).send(product);
			}
			return res.status(500).send({ message: 'Error Creating Product' });
		} catch (error) {
			console.log({ create_products_c_error: error });
			res.status(500).send({ error, message: 'Error Creating Product' });
		}
	},
	get_essentials_products_c: async (req: any, res: any) => {
		const { params, body } = req;
		try {
			const product = await product_services.get_essentials_products_s(params, body);
			if (product) {
				return res.status(200).send(product);
			}
			return res.status(500).send({ message: 'Error Updating Product' });
		} catch (error) {
			console.log({ update_products_c_error: error });
			res.status(500).send({ error, message: 'Error Updating Product' });
		}
	},
	update_stock_products_c: async (req: any, res: any) => {
		const { params, body } = req;
		try {
			const product = await product_services.update_stock_products_s(params, body);
			if (product) {
				return res.status(204).send({ message: 'Product Deleted' });
			}
			return res.status(500).send({ message: 'Error Deleting Product' });
		} catch (error) {
			console.log({ remove_products_c_error: error });
			res.status(500).send({ error, message: 'Error Deleting Product' });
		}
	},
	update_product_order_products_c: async (req: any, res: any) => {
		const { params, body } = req;
		try {
			const products = await product_services.update_product_order_products_s(params, body);
			if (products) {
				return res.status(200).send(products);
			}
			return res.status(404).send({ message: 'Products Not Found' });
		} catch (error) {
			console.log({ findAll_products_c_error: error });
			res.status(500).send({ error, message: 'Error Finding Products' });
		}
	},
	save_item_group_id_products_c: async (req: any, res: any) => {
		const { params, body } = req;
		try {
			const product = await product_services.save_item_group_id_products_s(params, body);
			if (product) {
				return res.status(201).send(product);
			}
			return res.status(500).send({ message: 'Error Creating Product' });
		} catch (error) {
			console.log({ create_products_c_error: error });
			res.status(500).send({ error, message: 'Error Creating Product' });
		}
	},
	reviews_products_c: async (req: any, res: any) => {
		const { params, body } = req;
		try {
			const product = await product_services.reviews_products_s(params, body);
			if (product) {
				return res.status(204).send({ message: 'Product Deleted' });
			}
			return res.status(500).send({ message: 'Error Deleting Product' });
		} catch (error) {
			console.log({ remove_products_c_error: error });
			res.status(500).send({ error, message: 'Error Deleting Product' });
		}
	}
};
