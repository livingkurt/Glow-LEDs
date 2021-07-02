import { User, Expense, Product, Feature, Order, Email, Affiliate, Content, Paycheck, Parcel, Chip } from '../models';
import { Log, Promo } from '../models';
import { log_error, log_request, make_private_code, isAuth, isAdmin } from '../util';
// const { isAuth, isAdmin } = require('../util');

// Defining methods for the booksController
export default {
	find_all_users: async (req: any, res: any) => {
		try {
			console.log({ users: req.body });
			const { method, collection, search_parameter_field, search_parameter, action, property, value } = req.body;
			let parameter: any = {};
			if (search_parameter_field && search_parameter) {
				parameter = { [search_parameter_field]: search_parameter };
			}
			if (method === 'updateMany') {
				const users = await User.updateMany(parameter, {
					[action]: { [property]: value }
				});
				console.log({ users });
				res.send(users);
			} else {
				const users = await User.find(parameter);
				console.log({ users_get: users });
				res.send(users);
			}
		} catch (error) {
			console.log({ error });
		}
	},
	find_all_expenses: async (req: any, res: any) => {
		try {
			console.log({ expenses: req.body });
			const { method, collection, search_parameter_field, search_parameter, action, property, value } = req.body;
			let parameter: any = {};
			if (search_parameter_field && search_parameter) {
				parameter = { [search_parameter_field]: search_parameter };
			}
			if (method === 'updateMany') {
				const expenses = await Expense.updateMany(parameter, {
					[action]: { [property]: value }
				});
				console.log({ expenses });
				res.send(expenses);
			} else {
				const expenses = await Expense.find(parameter);
				console.log({ expenses_get: expenses });
				res.send(expenses);
			}
		} catch (error) {
			console.log({ error });
		}
	},
	find_all_products: async (req: any, res: any) => {
		try {
			console.log({ products: req.body });
			const { method, collection, search_parameter_field, search_parameter, action, property, value } = req.body;
			let parameter: any = {};
			if (search_parameter_field && search_parameter) {
				parameter = { [search_parameter_field]: search_parameter };
			}
			if (method === 'updateMany') {
				const products = await Product.updateMany(parameter, {
					[action]: { [property]: value }
				});
				console.log({ products });
				res.send(products);
			} else {
				const products = await Product.find(parameter);
				console.log({ products_get: products });
				res.send(products);
			}
		} catch (error) {
			console.log({ error });
		}
	},
	find_all_features: async (req: any, res: any) => {
		try {
			console.log({ features: req.body });
			const { method, collection, search_parameter_field, search_parameter, action, property, value } = req.body;
			let parameter: any = {};
			if (search_parameter_field && search_parameter) {
				parameter = { [search_parameter_field]: search_parameter };
			}
			if (method === 'updateMany') {
				const features = await Feature.updateMany(parameter, {
					[action]: { [property]: value }
				});
				console.log({ features });
				res.send(features);
			} else {
				const features = await Feature.find(parameter);
				console.log({ features_get: features });
				res.send(features);
			}
		} catch (error) {
			console.log({ error });
		}
	},
	find_all_orders: async (req: any, res: any) => {
		try {
			console.log({ orders: req.body });
			const { method, collection, search_parameter_field, search_parameter, action, property, value } = req.body;
			let parameter: any = {};
			if (search_parameter_field && search_parameter) {
				parameter = { [search_parameter_field]: search_parameter };
			}
			if (method === 'updateMany') {
				const orders = await Order.updateMany(parameter, {
					[action]: { [property]: value }
				});
				console.log({ orders });
				res.send(orders);
			} else {
				const orders = await Order.find(parameter);
				console.log({ orders_get: orders });
				res.send(orders);
			}
		} catch (error) {
			console.log({ error });
		}
	},
	find_all_emails: async (req: any, res: any) => {
		try {
			console.log({ emails: req.body });
			const { method, collection, search_parameter_field, search_parameter, action, property, value } = req.body;
			let parameter: any = {};
			if (search_parameter_field && search_parameter) {
				parameter = { [search_parameter_field]: search_parameter };
			}
			if (method === 'updateMany') {
				const emails = await Email.updateMany(parameter, {
					[action]: { [property]: value }
				});
				console.log({ emails });
				res.send(emails);
			} else {
				const emails = await Email.find(parameter);
				console.log({ emails_get: emails });
				res.send(emails);
			}
		} catch (error) {
			console.log({ error });
		}
	},
	find_all_affiliates: async (req: any, res: any) => {
		try {
			console.log({ affiliates: req.body });
			const { method, collection, search_parameter_field, search_parameter, action, property, value } = req.body;
			let parameter: any = {};
			if (search_parameter_field && search_parameter) {
				parameter = { [search_parameter_field]: search_parameter };
			}
			if (method === 'updateMany') {
				const affiliates = await Affiliate.updateMany(parameter, {
					[action]: { [property]: value }
				});
				console.log({ affiliates });
				res.send(affiliates);
			} else {
				const affiliates = await Affiliate.find(parameter);
				console.log({ affiliates_get: affiliates });
				res.send(affiliates);
			}
		} catch (error) {
			console.log({ error });
		}
	},
	find_all_contents: async (req: any, res: any) => {
		try {
			console.log({ contents: req.body });
			const { method, collection, search_parameter_field, search_parameter, action, property, value } = req.body;
			let parameter: any = {};
			if (search_parameter_field && search_parameter) {
				parameter = { [search_parameter_field]: search_parameter };
			}
			if (method === 'updateMany') {
				const contents = await Content.updateMany(parameter, {
					[action]: { [property]: value }
				});
				console.log({ contents });
				res.send(contents);
			} else {
				const contents = await Content.find(parameter);
				console.log({ contents_get: contents });
				res.send(contents);
			}
		} catch (error) {
			console.log({ error });
		}
	},
	find_all_paychecks: async (req: any, res: any) => {
		try {
			console.log({ paychecks: req.body });
			const { method, collection, search_parameter_field, search_parameter, action, property, value } = req.body;
			let parameter: any = {};
			if (search_parameter_field && search_parameter) {
				parameter = { [search_parameter_field]: search_parameter };
			}
			if (method === 'updateMany') {
				const paychecks = await Paycheck.updateMany(parameter, {
					[action]: { [property]: value }
				});
				console.log({ paychecks });
				res.send(paychecks);
			} else {
				const paychecks = await Paycheck.find(parameter);
				console.log({ paychecks_get: paychecks });
				res.send(paychecks);
			}
		} catch (error) {
			console.log({ error });
		}
	},
	find_all_parcels: async (req: any, res: any) => {
		try {
			console.log({ parcels: req.body });
			const { method, collection, search_parameter_field, search_parameter, action, property, value } = req.body;
			let parameter: any = {};
			if (search_parameter_field && search_parameter) {
				parameter = { [search_parameter_field]: search_parameter };
			}
			if (method === 'updateMany') {
				const parcels = await Parcel.updateMany(parameter, {
					[action]: { [property]: value }
				});
				console.log({ parcels });
				res.send(parcels);
			} else {
				const parcels = await Parcel.find(parameter);
				console.log({ parcels_get: parcels });
				res.send(parcels);
			}
		} catch (error) {
			console.log({ error });
		}
	},
	find_all_chips: async (req: any, res: any) => {
		try {
			console.log({ chips: req.body });
			const { method, collection, search_parameter_field, search_parameter, action, property, value } = req.body;
			let parameter: any = {};
			if (search_parameter_field && search_parameter) {
				parameter = { [search_parameter_field]: search_parameter };
			}
			if (method === 'updateMany') {
				const chips = await Chip.updateMany(parameter, {
					[action]: { [property]: value }
				});
				console.log({ chips });
				res.send(chips);
			} else {
				const chips = await Chip.find(parameter);
				console.log({ chips_get: chips });
				res.send(chips);
			}
		} catch (error) {
			console.log({ error });
		}
	},
	update_product_sale_price: async (req: any, res: any) => {
		// const orders = await Order.find({ 'orderItems.name': 'Diffuser Caps + Adapters Starter Kit' });
		const products = await Product.find({});
		console.log({ discount_percentage: req.body.discount_percentage });

		products.filter((product: any) => !product.hidden).forEach(async (product: any) => {
			const main_discount = product.price * req.body.discount_percentage;
			const sale_start_date = req.body.sale_start_date;
			const sale_end_date = req.body.sale_end_date;
			console.log({ main_discount });
			console.log({ sale_start_date });
			console.log({ sale_end_date });
			product.sale_price = product.price - main_discount;
			product.sale_start_date = sale_start_date;
			product.sale_end_date = sale_end_date;
			console.log({ product_options: product.product_options });
			if (product.product_options) {
				console.log('Hello');

				product.product_options.forEach(async (option: any) => {
					const option_discount = option.price * req.body.discount_percentage;
					return (option.sale_price = option.price - option_discount);
				});
			}
			const result = await product.save();
			// console.log({ result });
		});
		// console.log({ products });
		res.send(products);
	},
	update_clear_sale: async (req: any, res: any) => {
		// const orders = await Order.find({ 'orderItems.name': 'Diffuser Caps + Adapters Starter Kit' });
		console.log();
		try {
			const products = await Product.find({});
			console.log({ discount_percentage: req.body.discount_percentage });

			products.filter((product: any) => !product.hidden).forEach(async (product: any) => {
				try {
					const cleared_sale_price = 0;
					const sale_start_date = req.body.sale_start_date;
					const sale_end_date = req.body.sale_end_date;
					product.sale_price = cleared_sale_price;
					product.sale_start_date = sale_start_date;
					product.sale_end_date = sale_end_date;
					console.log({ product_options: product.product_options });
					if (product.product_options) {
						console.log('Hello');
						product.product_options.forEach((option: any) => (option.sale_price = cleared_sale_price));
					}
					const result = await product.save();
				} catch (error) {
					console.log({ inside: error });
				}

				// console.log({ result });
			});
			// console.log({ products });
			res.send(products);
		} catch (error) {
			console.log({ outside: error });
		}
	}
};
