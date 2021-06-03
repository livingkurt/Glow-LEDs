export {};
import express from 'express';
import Product from '../models/product';
import Log from '../models/log';
import { log_error, log_request } from '../util';
const { isAuth, isAdmin } = require('../util');

const router = express.Router();

router.get('/get_all/imperfect', async (req, res) => {
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
});

router.get('/get_all', async (req, res) => {
	try {
		const category = req.query.category ? { category: req.query.category } : {};
		const subcategory = req.query.subcategory ? { subcategory: req.query.subcategory } : {};
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
			...category,
			...subcategory,
			...searchKeyword,
			...chips
		}).sort(sortOrder);
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
});

router.get('/get_one/:pathname', async (req, res) => {
	try {
		const product = await Product.findOne({ pathname: req.params.pathname }).populate('chips').populate('products');

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
});

router.post('/create_one', isAuth, isAdmin, async (req, res) => {
	try {
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
});

router.put('/update_one/:pathname', isAuth, isAdmin, async (req, res) => {
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
});

router.delete('/delete_one/:id', isAuth, isAdmin, async (req: any, res: any) => {
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
});

router.get('/get_categories/:category/subcategory/:subcategory', async (req, res) => {
	try {
		const products = await Product.find({
			deleted: false,
			category: req.params.category
			// subcategory: req.params.subcategory
		}).sort({ _id: -1 });
		console.log({ category: req.params.category });
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
});

router.get('/get_all_products', async (req, res) => {
	try {
		const products = await Product.find({ deleted: false });
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
});

router.get('/get_shown', async (req, res) => {
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
});

router.get('/get_caps', async (req, res) => {
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
});

router.get('/get_mega_caps', async (req, res) => {
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
});

router.get('/get_essentials', async (req, res) => {
	try {
		// const occurences = req.body.occurences;
		// console.log(occurences[0]);
		const names = [
			'Wiffle Ball EXO Diffusers',
			'Frosted Dome Diffusers',
			'Coinskins',
			'Frosted Fisheye Difffusers',
			'Apolloskins',
			'50 LED / 3.5m Glow Strings',
			'Diffuser Caps + Adapters Starter Kit',
			'Seed of Life Diffuser Caps',
			'Nano V2 Glow Casings',
			'Honeycomb Diffuser Caps',
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
});

router.post('/get_best_sellers', async (req, res) => {
	try {
		const occurences = req.body.occurences;
		console.log(occurences[0]);
		const names = [
			occurences[0].name,
			occurences[1].name,
			occurences[2].name,
			occurences[3].name,
			occurences[4].name
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
});

router.get('/get_options/:pathname', async (req, res) => {
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
});
router.get('/categories', async (req, res) => {
	const products = await Product.find({ deleted: false }).sort({ category: 1 });
	const categories = products.map((product: any) => product.category);
	const no_dups_categories = categories.filter((value: any, index: any) => categories.indexOf(value) === index);
	res.send(no_dups_categories);
});

router.get('/subcategories', async (req, res) => {
	const products = await Product.find({ deleted: false }).sort({ category: 1 });
	const subcategories = products.map((product: any) => product.subcategory);
	const no_dups_subcategories = subcategories.filter(
		(value: any, index: any) => subcategories.indexOf(value) === index
	);
	res.send(no_dups_subcategories);
});

router.get('/get_images/:category', async (req, res) => {
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
});

router.put('/update_stock', async (req, res) => {
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
});
router.put('/update_product_order', async (req, res) => {
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
			const updatedProduct = await Product.updateOne({ _id: product_id }, { ...req.body.product, order: order });
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
});

router.put('/update_product_option_stock', async (req, res) => {
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
});

router.put('/update_pathname', isAuth, isAdmin, async (req, res) => {
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
});

router.post('/reviews/create_one/:pathname', isAuth, async (req, res) => {
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
});

// router.delete('/:pathname/reviews', isAuth, isAdmin, async (req: any, res: any) => {
// 	try {
// 		console.log(req.params.id);
// 		const product = await Product.findOne({ pathname: req.params.pathname });
// 		const updated_product = { ...product, deleted: true };
// 		const message: any = { message: 'Product Deleted' };

// 		// const deleted_product = await updated_product.save();
// 		const deleted_product = await Product.updateOne({ _id: req.params.id }, { deleted: true });
// 		if (deleted_product) {
//       log_request({
//         method: 'POST',
//         path: req.originalUrl,
//         collection: 'Product',
//         data: [ deleted_product ],
//         status: 201,
//         success: true
//       });
// 			// await deletedProduct.remove();
// 			res.send(message);
// 		} else {
// 			res.send('Error in Deletion.');
// 		}
// 	} catch (error) {
// 		log_error({
// 			method: 'DELETE',
// 			path: req.originalUrl,
// 			collection: 'Product',
// 			error,
// 			success: false
// 		});
// 	}
// });

// module.exports = router;
export default router;
