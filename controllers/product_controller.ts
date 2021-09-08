import { Product } from '../models';
import { log_error, log_request } from '../util';
// const { isAuth, isAdmin } = require('../util');

// Defining methods for the booksController
export default {
	findAll: async (req: any, res: any) => {
		try {
			const category = req.query.category ? { category: req.query.category } : {};
			const subcategory = req.query.subcategory ? { subcategory: req.query.subcategory } : {};
			const collection = req.query.collection ? { product_collection: req.query.collection } : {};
			// console.log({ category, collection });
			const chips = req.query.chip ? { chips: { $in: [ req.query.chip, '60203602dcf28a002a1a62ed' ] } } : {};
			const searchKeyword = req.query.searchKeyword
				? {
						name: {
							$regex: req.query.searchKeyword,
							$options: 'i'
						}
					}
				: {};

			let sortOrder = {};
			if (req.query.sortOrder === 'lowest') {
				sortOrder = { price: 1 };
			} else if (req.query.sortOrder === 'highest') {
				sortOrder = { price: -1 };
			} else if (req.query.sortOrder === 'newest') {
				sortOrder = { _id: -1 };
			} else if (req.query.sortOrder === 'hidden') {
				sortOrder = { hidden: -1 };
			} else if (req.query.sortOrder === 'category' || req.query.sortOrder === '') {
				sortOrder = { order: 1, _id: -1 };
			}

			const products = await Product.find({
				deleted: false,
				// option: false,
				...category,
				...subcategory,
				...collection,
				...searchKeyword,
				...chips
			})
				.sort(sortOrder)
				.populate('color_products')
				.populate('secondary_color_products')
				.populate('secondary_products')
				.populate('option_products')
				.populate('categorys')
				.populate('subcategorys');
			// console.log({ products });
			log_request({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Product',
				data: products,
				status: 200,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			res.send(products);
		} catch (error) {
			console.log({ error });
			log_error({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Product',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Getting Products' });
		}
	},
	get_all_options: async (req: any, res: any) => {
		try {
			const category = req.query.category ? { category: req.query.category } : {};
			const subcategory = req.query.subcategory ? { subcategory: req.query.subcategory } : {};
			const collection = req.query.collection ? { product_collection: req.query.collection } : {};
			// console.log({ category, collection });
			const chips = req.query.chip ? { chips: { $in: [ req.query.chip, '60203602dcf28a002a1a62ed' ] } } : {};
			const searchKeyword = req.query.searchKeyword
				? {
						name: {
							$regex: req.query.searchKeyword,
							$options: 'i'
						}
					}
				: {};

			let sortOrder = {};
			if (req.query.sortOrder === 'lowest') {
				sortOrder = { price: 1 };
			} else if (req.query.sortOrder === 'highest') {
				sortOrder = { price: -1 };
			} else if (req.query.sortOrder === 'newest') {
				sortOrder = { _id: -1 };
			} else if (req.query.sortOrder === 'hidden') {
				sortOrder = { hidden: -1 };
			} else if (req.query.sortOrder === 'category' || req.query.sortOrder === '') {
				sortOrder = { order: 1, _id: -1 };
			}

			const products = await Product.find({
				deleted: false,
				option: true,
				...category,
				...subcategory,
				...collection,
				...searchKeyword,
				...chips
			})
				.sort(sortOrder)
				.populate('color_products')
				.populate('secondary_color_products')
				.populate('secondary_products')
				.populate('option_products')
				.populate('categorys')
				.populate('subcategorys');
			// console.log({ products });
			log_request({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Product',
				data: products,
				status: 200,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			res.send(products);
		} catch (error) {
			console.log({ error });
			log_error({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Product',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Getting Products' });
		}
	},
	get_all_diffuser_caps: async (req: any, res: any) => {
		try {
			const category = req.query.category ? { category: req.query.category } : {};
			const subcategory = req.query.subcategory ? { subcategory: req.query.subcategory } : {};
			const collection = req.query.collection ? { product_collection: req.query.collection } : {};
			// console.log({ category, collection });
			const chips = req.query.chip ? { chips: { $in: [ req.query.chip, '60203602dcf28a002a1a62ed' ] } } : {};
			const searchKeyword = req.query.searchKeyword
				? {
						name: {
							$regex: req.query.searchKeyword,
							$options: 'i'
						}
					}
				: {};

			let sortOrder = {};
			if (req.query.sortOrder === 'lowest') {
				sortOrder = { price: 1 };
			} else if (req.query.sortOrder === 'highest') {
				sortOrder = { price: -1 };
			} else if (req.query.sortOrder === 'newest') {
				sortOrder = { _id: -1 };
			} else if (req.query.sortOrder === 'hidden') {
				sortOrder = { hidden: -1 };
			} else if (req.query.sortOrder === 'category' || req.query.sortOrder === '') {
				sortOrder = { order: 1, _id: -1 };
			}

			const products = await Product.find({
				deleted: false,
				category: 'diffuser_caps',
				...category,
				...subcategory,
				...collection,
				...searchKeyword,
				...chips
			})
				.sort(sortOrder)
				.populate('color_products')
				.populate('secondary_color_products')
				.populate('secondary_products')
				.populate('option_products')
				.populate('categorys')
				.populate('subcategorys');
			// console.log({ products });
			log_request({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Product',
				data: products,
				status: 200,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			res.send(products);
		} catch (error) {
			console.log({ error });
			log_error({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Product',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Getting Products' });
		}
	},
	findById: async (req: any, res: any) => {
		try {
			const product = await Product.findOne({ pathname: req.params.pathname })
				.populate('chips')
				.populate('products')
				.populate('color_products')
				.populate('secondary_color_products')
				.populate('secondary_products')
				.populate('option_products')
				.populate('categorys')
				.populate('subcategorys');

			if (product) {
				log_request({
					method: 'GET',
					path: req.originalUrl,
					collection: 'Product',
					data: [ product ],
					status: 200,
					success: true,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				res.send(product);
			} else {
				log_request({
					method: 'GET',
					path: req.originalUrl,
					collection: 'Product',
					data: [ product ],
					status: 404,
					success: false,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				res.status(404).send({ message: 'Product Not Found.' });
			}
		} catch (error) {
			console.log({ error });
			log_error({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Product',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Getting Product' });
		}
	},
	create: async (req: any, res: any) => {
		try {
			console.log({ body: req.body });
			const newProduct = await Product.create(req.body);
			if (newProduct) {
				log_request({
					method: 'POST',
					path: req.originalUrl,
					collection: 'Product',
					data: [ newProduct ],
					status: 201,
					success: true,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				return res.status(201).send({ message: 'New Product Created', data: newProduct });
			} else {
				log_request({
					method: 'DELETE',
					path: req.originalUrl,
					collection: 'Product',
					data: [ newProduct ],
					status: 500,
					success: false,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				return res.status(500).send({ message: ' Error in Creating Product.' });
			}
		} catch (error) {
			console.log({ error });
			log_error({
				method: 'POST',
				path: req.originalUrl,
				collection: 'Product',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Creating Product' });
		}
	},
	create_product_option: async (req: any, res: any) => {
		try {
			console.log({ body: req.body });
			const newProduct = await Product.create(req.body);
			if (newProduct) {
				log_request({
					method: 'POST',
					path: req.originalUrl,
					collection: 'Product',
					data: [ newProduct ],
					status: 201,
					success: true,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				return res.status(201).send({ message: 'New Product Created', data: newProduct });
			} else {
				log_request({
					method: 'DELETE',
					path: req.originalUrl,
					collection: 'Product',
					data: [ newProduct ],
					status: 500,
					success: false,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				return res.status(500).send({ message: ' Error in Creating Product.' });
			}
		} catch (error) {
			console.log({ error });
			log_error({
				method: 'POST',
				path: req.originalUrl,
				collection: 'Product',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Creating Product' });
		}
	},

	update: async (req: any, res: any) => {
		try {
			console.log({ product_routes_put: req.body });
			console.log({ product_options: req.body.product_options });
			const productId = req.params.pathname;
			console.log({ productId });
			const product = await Product.findById(productId);
			console.log({ product });
			if (product) {
				log_request({
					method: 'GET',
					path: req.originalUrl,
					collection: 'Product',
					data: [ product ],
					status: 200,
					success: true,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				const updatedProduct = await Product.updateOne({ _id: productId }, req.body);
				console.log({ updatedProduct });
				if (updatedProduct) {
					log_request({
						method: 'PUT',
						path: req.originalUrl,
						collection: 'Product',
						data: [ updatedProduct ],
						status: 200,
						success: false,
						ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
					});
					return res.status(200).send({ message: 'Product Updated', data: updatedProduct });
				}
			} else {
				log_request({
					method: 'DELETE',
					path: req.originalUrl,
					collection: 'Product',
					data: [ product ],
					status: 500,
					success: false,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				console.log('Error in Updating Product.');
				return res.status(500).send({ message: ' Error in Updating Product.' });
			}
		} catch (error) {
			console.log({ error });
			log_error({
				method: 'PUT',
				path: req.originalUrl,
				collection: 'Product',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Updating Product' });
		}
	},
	remove: async (req: any, res: any) => {
		try {
			const message: any = { message: 'Product Deleted' };
			const deleted_product = await Product.updateOne({ _id: req.params.id }, { deleted: true });
			if (deleted_product) {
				log_request({
					method: 'DELETE',
					path: req.originalUrl,
					collection: 'Product',
					data: [ deleted_product ],
					status: 200,
					success: true,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				res.send(message);
			} else {
				log_request({
					method: 'DELETE',
					path: req.originalUrl,
					collection: 'Product',
					data: [ deleted_product ],
					status: 500,
					success: false,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				res.send('Error in Deletion.');
			}
		} catch (error) {
			console.log({ error });
			log_error({
				method: 'DELETE',
				path: req.originalUrl,
				collection: 'Product',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Deleting Product' });
		}
	},
	get_all_imperfect: async (req: any, res: any) => {
		try {
			console.log('Imperfect');
			const products = await Product.find({ deleted: false, subcategory: 'imperfect' }).sort({ order: -1 });
			console.log({ products });
			if (products) {
				log_request({
					method: 'GET',
					path: req.originalUrl,
					collection: 'Product',
					data: [ products ],
					status: 200,
					success: true,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				res.send(products);
			} else {
				log_request({
					method: 'GET',
					path: req.originalUrl,
					collection: 'Product',
					data: [ products ],
					status: 404,
					success: false,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				res.status(404).send({ message: 'Product Not Found.' });
			}
		} catch (error) {
			console.log({ error });
			log_error({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Product',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Getting Product' });
		}
	},
	get_products_by_category: async (req: any, res: any) => {
		try {
			const category = req.query.category ? { category: req.query.category } : {};
			const subcategory = req.query.subcategory ? { subcategory: req.query.subcategory } : {};
			console.log({ category, subcategory });
			// const products = await Product.find({
			// 	deleted: false,
			// 	...category,
			// 	...subcategory
			// }).sort({ _id: -1 });

			const products = await Product.find({
				deleted: false,
				hidden: false,
				option: false,
				...category,
				...subcategory
			})
				.sort({ order: 1 })
				.populate('color_products')
				.populate('secondary_color_products')
				.populate('secondary_products')
				.populate('option_products')
				.populate('categorys')
				.populate('subcategorys');
			console.log({ products });
			log_request({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Product',
				data: products,
				status: 200,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			res.send(products);
		} catch (error) {
			console.log({ error });
			log_error({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Product',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Getting Products' });
		}
	},
	get_all_products: async (req: any, res: any) => {
		try {
			const products = await Product.find({ deleted: false, hidden: false });
			log_request({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Product',
				data: products,
				status: 200,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			res.send(products);
		} catch (error) {
			console.log({ error });
			log_error({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Product',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Getting Products' });
		}
	},
	get_shown: async (req: any, res: any) => {
		try {
			const products = await Product.find({ deleted: false, hidden: false });
			log_request({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Product',
				data: products,
				status: 200,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			res.send(products);
		} catch (error) {
			console.log({ error });
			log_error({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Product',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Getting Products' });
		}
	},
	get_caps: async (req: any, res: any) => {
		try {
			const products = await Product.find({ deleted: false, hidden: false, category: 'diffuser_caps' });
			log_request({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Product',
				data: products,
				status: 200,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			res.send(products);
		} catch (error) {
			console.log({ error });
			log_error({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Product',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Getting Original Caps' });
		}
	},
	get_mega_caps: async (req: any, res: any) => {
		try {
			const products = await Product.find({ deleted: false, hidden: false, category: 'mega_diffuser_caps' });
			log_request({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Product',
				data: products,
				status: 200,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			res.send(products);
		} catch (error) {
			console.log({ error });
			log_error({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Product',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Getting Mega Caps' });
		}
	},
	get_essentials: async (req: any, res: any) => {
		try {
			// const occurences = req.body.occurences;
			// console.log(occurences[0]);
			const names = [
				'Bulk CR1620 Batteries',
				'Bulk CR1225 Batteries',
				'Glow Strings V2 50 LED / 3.5m',
				'Wiffle Ball EXO Diffusers',
				'Dome Diffusers',
				'Coinskins V2',
				'Visor Diffusers',
				'Hybridskins',
				'Diffuser Caps + Adapters Starter Kit',
				'Space Cadet Diffuser Caps',
				'Apollo Glow Casings',
				'1225 Coin Battery Dispenser',
				'1620 Coin Battery Dispenser',
				'Coin Battery Storage'
			];
			console.log({ names });
			const products = await Product.find({ name: { $in: names } });
			console.log({ products });
			if (products) {
				log_request({
					method: 'GET',
					path: req.originalUrl,
					collection: 'Product',
					data: [ products ],
					status: 200,
					success: true,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				res.send(products);
			} else {
				log_request({
					method: 'GET',
					path: req.originalUrl,
					collection: 'Product',
					data: [ products ],
					status: 404,
					success: false,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				res.status(404).send({ message: 'Product Not Found.' });
			}
		} catch (error) {
			console.log({ error });
			log_error({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Product',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Getting Product' });
		}
	},
	get_best_sellers: async (req: any, res: any) => {
		try {
			const occurences = req.body.occurences;

			const names = [
				occurences[0].name === 'Frosted Dome Diffusers' ? 'Dome Diffusers' : occurences[0].name,
				occurences[1].name === 'Frosted Dome Diffusers' ? 'Dome Diffusers' : occurences[1].name,
				occurences[2].name === 'Frosted Dome Diffusers' ? 'Dome Diffusers' : occurences[2].name,
				occurences[3].name === 'Frosted Dome Diffusers' ? 'Dome Diffusers' : occurences[3].name,
				occurences[4].name === 'Frosted Dome Diffusers' ? 'Dome Diffusers' : occurences[4].name
			];
			console.log({ names });
			const products = await Product.find({ name: { $in: names } });
			console.log({ products });
			if (products) {
				log_request({
					method: 'GET',
					path: req.originalUrl,
					collection: 'Product',
					data: [ products ],
					status: 200,
					success: true,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				res.send(products);
			} else {
				log_request({
					method: 'GET',
					path: req.originalUrl,
					collection: 'Product',
					data: [ products ],
					status: 404,
					success: false,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				res.status(404).send({ message: 'Product Not Found.' });
			}
		} catch (error) {
			console.log({ error });
			log_error({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Product',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Getting Product' });
		}
	},
	get_options: async (req: any, res: any) => {
		try {
			const product = await Product.findOne({ pathname: req.params.pathname }).populate('chips');

			if (product) {
				log_request({
					method: 'GET',
					path: req.originalUrl,
					collection: 'Product',
					data: [ product ],
					status: 200,
					success: true,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				res.send(product);
			} else {
				log_request({
					method: 'GET',
					path: req.originalUrl,
					collection: 'Product',
					data: [ product ],
					status: 404,
					success: false,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				res.status(404).send({ message: 'Product Not Found.' });
			}
		} catch (error) {
			console.log({ error });
			log_error({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Product',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Getting Product' });
		}
	},
	get_all_categories: async (req: any, res: any) => {
		const products = await Product.find({ deleted: false }).sort({ category: 1 });
		const categories = products.map((product: any) => product.category);
		const no_dups_categories = categories.filter((value: any, index: any) => categories.indexOf(value) === index);
		console.log({ no_dups_categories });
		res.send(no_dups_categories);
	},
	get_all_subcategories: async (req: any, res: any) => {
		const products = await Product.find({ deleted: false }).sort({ category: 1 });
		const subcategories = products.map((product: any) => product.subcategory);
		const no_dups_subcategories = subcategories.filter(
			(value: any, index: any) => subcategories.indexOf(value) === index
		);
		res.send(no_dups_subcategories);
	},
	get_images: async (req: any, res: any) => {
		// try {
		console.log(req.params.category);
		// const product = await Product.findOne({category: req.params.category});
		const product = await Product.findOne({ category: 'diffuser_caps' }, {}, { sort: { createdAt: -1 } }, function(
			err: any,
			product: any
		) {
			console.log(product);
			console.log(product.images[0]);
			res.json(product.images[0]);
		});
	},
	update_stock: async (req: any, res: any) => {
		try {
			console.log({ product_id: req.body.product_id });
			console.log({ count_in_stock: req.body.count_in_stock });
			const productId = req.body.product_id;
			console.log({ productId });
			const product = await Product.findById(productId);
			console.log({ product });
			if (product) {
				log_request({
					method: 'GET',
					path: req.originalUrl,
					collection: 'Product',
					data: [ product ],
					status: 200,
					success: true,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				const updatedProduct = await Product.updateOne(
					{ _id: productId },
					{ ...req.body, countInStock: req.body.count_in_stock }
				);
				console.log({ updatedProduct });
				if (updatedProduct) {
					log_request({
						method: 'PUT',
						path: req.originalUrl,
						collection: 'Product',
						data: [ updatedProduct ],
						status: 200,
						success: false,
						ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
					});
					return res.status(200).send({ message: 'Product Updated', data: updatedProduct });
				}
			} else {
				log_request({
					method: 'DELETE',
					path: req.originalUrl,
					collection: 'Product',
					data: [ product ],
					status: 500,
					success: false,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				console.log('Error in Updating Product.');
				return res.status(500).send({ message: ' Error in Updating Product.' });
			}
		} catch (error) {
			console.log({ error });
			log_error({
				method: 'PUT',
				path: req.originalUrl,
				collection: 'Product',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Updating Product' });
		}
	},
	save_item_group_id: async (req: any, res: any) => {
		try {
			const option = req.body.option;
			const item_group = req.body.item_group;
			// console.log({ option, item_group });
			const product = await Product.findById(option._id);
			console.log({ option: option._id, price: item_group.price });
			if (product && option._id && item_group.price) {
				log_request({
					method: 'GET',
					path: req.originalUrl,
					collection: 'Product',
					data: [ product ],
					status: 200,
					success: true,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				const updatedProduct = await Product.updateOne(
					{ _id: option._id },
					{ ...req.body, price: item_group.price }
				);
				// console.log({ updatedProduct });
				if (updatedProduct) {
					log_request({
						method: 'PUT',
						path: req.originalUrl,
						collection: 'Product',
						data: [ updatedProduct ],
						status: 200,
						success: false,
						ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
					});
					return res.status(200).send({ message: 'Product Updated', data: updatedProduct });
				}
			} else {
				log_request({
					method: 'DELETE',
					path: req.originalUrl,
					collection: 'Product',
					data: [ product ],
					status: 500,
					success: false,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				console.log('Error in Updating Product.');
				return res.status(500).send({ message: ' Error in Updating Product.' });
			}
		} catch (error) {
			console.log({ error });
			log_error({
				method: 'PUT',
				path: req.originalUrl,
				collection: 'Product',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Updating Product' });
		}
	},
	update_product_order: async (req: any, res: any) => {
		try {
			const product_id = req.body.product._id;
			const order = req.body.order;
			console.log({ product_id });
			const product = await Product.findById(product_id);
			console.log({ product });
			if (product) {
				log_request({
					method: 'GET',
					path: req.originalUrl,
					collection: 'Product',
					data: [ product ],
					status: 200,
					success: true,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				const updatedProduct = await Product.updateOne(
					{ _id: product_id },
					{ ...req.body.product, order: order }
				);
				console.log({ updatedProduct });
				if (updatedProduct) {
					log_request({
						method: 'PUT',
						path: req.originalUrl,
						collection: 'Product',
						data: [ updatedProduct ],
						status: 200,
						success: false,
						ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
					});
					return res.status(200).send({ message: 'Product Updated', data: updatedProduct });
				}
			} else {
				log_request({
					method: 'DELETE',
					path: req.originalUrl,
					collection: 'Product',
					data: [ product ],
					status: 500,
					success: false,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				console.log('Error in Updating Product.');
				return res.status(500).send({ message: ' Error in Updating Product.' });
			}
		} catch (error) {
			console.log({ error });
			log_error({
				method: 'PUT',
				path: req.originalUrl,
				collection: 'Product',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Updating Product' });
		}
	},
	update_product_option_stock: async (req: any, res: any) => {
		try {
			// console.log({ product_id: req.body.product_id });
			// console.log({ count_in_stock: req.body.count_in_stock });
			// console.log({ product_option: req.body.product_option });
			console.log('update_product_option_stock');
			const product_id = req.body.product_id;
			const product_option = req.body.product_option;
			const count_in_stock = req.body.count_in_stock;
			// console.log({ product_id });
			const product = await Product.findById(product_id);
			// console.log({ product });
			if (product) {
				log_request({
					method: 'GET',
					path: req.originalUrl,
					collection: 'Product',
					data: [ product ],
					status: 200,
					success: true,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				console.log({ product });
				// const option = product.product_options.find((option: any) => option.name === product_option.name);
				// console.log({ option });
				const index = product.product_options.findIndex((option: any) => option.name === product_option.name);
				console.log({ index });
				let product_options = [ ...product.product_options ];
				product_options[index] = {
					...product_option,
					count_in_stock: count_in_stock
				};
				console.log({ product_options });
				const updatedProduct = await Product.updateOne({ _id: product_id }, { ...req.body, product_options });
				console.log({ updatedProduct });
				if (updatedProduct) {
					log_request({
						method: 'PUT',
						path: req.originalUrl,
						collection: 'Product',
						data: [ updatedProduct ],
						status: 200,
						success: false,
						ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
					});
					return res.status(200).send({ message: 'Product Updated', data: updatedProduct });
				}
			} else {
				log_request({
					method: 'DELETE',
					path: req.originalUrl,
					collection: 'Product',
					data: [ product ],
					status: 500,
					success: false,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				console.log('Error in Updating Product.');
				return res.status(500).send({ message: ' Error in Updating Product.' });
			}
		} catch (error) {
			console.log({ error });
			log_error({
				method: 'PUT',
				path: req.originalUrl,
				collection: 'Product',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Updating Product' });
		}
	},
	update_pathname: async (req: any, res: any) => {
		try {
			console.log({ product_routes_put: req.body });

			const product_id = req.body.product_id;
			const pathname = req.body.pathname;
			const body = req.body.product;
			console.log({ product_id });
			const product = await Product.findById(product_id);
			console.log({ product });
			if (product) {
				log_request({
					method: 'GET',
					path: req.originalUrl,
					collection: 'Product',
					data: [ product ],
					status: 200,
					success: true,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				const updatedProduct = await Product.updateOne({ _id: product_id }, { ...body, pathname: pathname });
				console.log({ updatedProduct });
				if (updatedProduct) {
					log_request({
						method: 'PUT',
						path: req.originalUrl,
						collection: 'Product',
						data: [ updatedProduct ],
						status: 200,
						success: false,
						ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
					});
					return res.status(200).send({ message: 'Product Updated', data: updatedProduct });
				}
			} else {
				log_request({
					method: 'DELETE',
					path: req.originalUrl,
					collection: 'Product',
					data: [ product ],
					status: 500,
					success: false,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				console.log('Error in Updating Product.');
				return res.status(500).send({ message: ' Error in Updating Product.' });
			}
		} catch (error) {
			console.log({ error });
			log_error({
				method: 'PUT',
				path: req.originalUrl,
				collection: 'Product',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Updating Product' });
		}
	},
	reviews: async (req: any, res: any) => {
		try {
			console.log(req.body);
			console.log({ pathname: req.params.pathname });
			const product = await Product.findOne({ pathname: req.params.pathname });
			if (product) {
				log_request({
					method: 'GET',
					path: req.originalUrl,
					collection: 'Product',
					data: [ product ],
					status: 200,
					success: true,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				product.reviews = [
					...product.reviews,
					{
						user: req.body.userInfo._id,
						first_name: req.body.userInfo.first_name,
						last_name: req.body.userInfo.last_name,
						rating: Number(req.body.review.rating),
						comment: req.body.review.comment
					}
				];
				console.log({ reviews: product.reviews });
				product.numReviews = product.reviews.length;
				product.rating =
					product.reviews.reduce((a: any, c: { rating: any }) => c.rating + a, 0) / product.reviews.length;
				console.log({ product });
				const updatedProduct = await product.save();
				if (updatedProduct) {
					log_request({
						method: 'POST',
						path: req.originalUrl,
						collection: 'Product',
						data: [ updatedProduct ],
						status: 201,
						success: true,
						ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
					});
					res.status(201).send({
						data: updatedProduct.reviews[updatedProduct.reviews.length - 1],
						message: 'Review saved successfully.'
					});
				}
			} else {
				log_request({
					method: 'GET',
					path: req.originalUrl,
					collection: 'Product',
					data: [ product ],
					status: 404,
					success: false,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				res.status(404).send({ message: 'Product Not Found' });
			}
		} catch (error) {
			console.log({ error });
			log_error({
				method: 'POST',
				path: req.originalUrl,
				collection: 'Product',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Creating Product Review' });
		}
	}
};
