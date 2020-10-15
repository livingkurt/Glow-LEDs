export {};
import express from 'express';
import Product from '../models/product';
import Log from '../models/log';
import { log_error, log_request } from '../util';
const { isAuth, isAdmin } = require('../util');

const router = express.Router();

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

router.get('/', async (req, res) => {
	try {
		const category = req.query.category ? { category: req.query.category } : {};
		const subcategory = req.query.subcategory ? { subcategory: req.query.subcategory } : {};
		const searchKeyword = req.query.searchKeyword
			? {
					name: {
						$regex: req.query.searchKeyword,
						$options: 'i'
					}
				}
			: {};
		console.log({ searchKeyword });

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

		const products = await Product.find({ deleted: false, ...category, ...subcategory, ...searchKeyword }).sort(
			sortOrder
		);
		log_request({
			method: 'GET',
			path: req.originalUrl,
			collection: 'Product',
			data: products,
			status: 200,
			success: true
		});
		res.send(products);
	} catch (error) {
		log_error({
			method: 'GET',
			path: req.originalUrl,
			collection: 'Product',
			error,
			success: false
		});
	}
});

router.get('/originalcaps', async (req, res) => {
	try {
		const products = await Product.find({ deleted: false, hidden: false, category: 'diffuser_caps' });
		log_request({
			method: 'GET',
			path: req.originalUrl,
			collection: 'Product',
			data: products,
			status: 200,
			success: true
		});
		res.send(products);
	} catch (error) {
		log_error({
			method: 'GET',
			path: req.originalUrl,
			collection: 'Product',
			error,
			success: false
		});
	}
});

router.get('/minicaps', async (req, res) => {
	try {
		const products = await Product.find({ deleted: false, hidden: false, category: 'mini_diffuser_caps' });
		log_request({
			method: 'GET',
			path: req.originalUrl,
			collection: 'Product',
			data: products,
			status: 200,
			success: true
		});
		res.send(products);
	} catch (error) {
		log_error({
			method: 'GET',
			path: req.originalUrl,
			collection: 'Product',
			error,
			success: false
		});
	}
});

// router.post('/array', async (req, res) => {
// 	console.log({ control_panel: req.body });
// 	const products = await Product.find({ _id: { $in: req.body } });
// 	// console.log(products);
// 	res.send(products);
// });

router.get('/:pathname', async (req, res) => {
	try {
		const product = await Product.findOne({ pathname: req.params.pathname });

		if (product) {
			log_request({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Product',
				data: [ product ],
				status: 200,
				success: true
			});
			res.send(product);
		} else {
			log_request({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Product',
				data: [ product ],
				status: 404,
				success: false
			});
			res.status(404).send({ message: 'Product Not Found.' });
		}
	} catch (error) {
		log_error({
			method: 'GET',
			path: req.originalUrl,
			collection: 'Product',
			error,
			success: false
		});
	}
});

router.put('/:pathname', isAuth, isAdmin, async (req, res) => {
	try {
		console.log({ product_routes_put: req.body });
		const productId = req.params.pathname;
		const product = await Product.findById(productId);
		if (product) {
			log_request({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Product',
				data: [ product ],
				status: 200,
				success: true
			});
			const updatedProduct = await Product.updateOne({ _id: productId }, req.body);
			if (updatedProduct) {
				log_request({
					method: 'PUT',
					path: req.originalUrl,
					collection: 'Product',
					data: [ updatedProduct ],
					status: 200,
					success: false
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
				success: false
			});
			return res.status(500).send({ message: ' Error in Updating Product.' });
		}
	} catch (error) {
		log_error({
			method: 'PUT',
			path: req.originalUrl,
			collection: 'Product',
			error,
			success: false
		});
	}
});

router.delete('/:id', isAuth, isAdmin, async (req: any, res: any) => {
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
				success: true
			});
			res.send(message);
		} else {
			log_request({
				method: 'DELETE',
				path: req.originalUrl,
				collection: 'Product',
				data: [ deleted_product ],
				status: 500,
				success: false
			});
			res.send('Error in Deletion.');
		}
	} catch (error) {
		log_error({
			method: 'DELETE',
			path: req.originalUrl,
			collection: 'Product',
			error,
			success: false
		});
	}
});

router.post('/', isAuth, isAdmin, async (req, res) => {
	try {
		const newProduct = await Product.create(req.body);
		if (newProduct) {
			log_request({
				method: 'POST',
				path: req.originalUrl,
				collection: 'Product',
				data: [ newProduct ],
				status: 201,
				success: true
			});
			return res.status(201).send({ message: 'New Product Created', data: newProduct });
		} else {
			log_request({
				method: 'DELETE',
				path: req.originalUrl,
				collection: 'Product',
				data: [ newProduct ],
				status: 500,
				success: false
			});
			return res.status(500).send({ message: ' Error in Creating Product.' });
		}
	} catch (error) {
		log_error({
			method: 'POST',
			path: req.originalUrl,
			collection: 'Product',
			error,
			success: false
		});
	}
});

router.post('/:pathname/reviews', isAuth, async (req, res) => {
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
				success: true
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
					success: true
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
				success: false
			});
			res.status(404).send({ message: 'Product Not Found' });
		}
	} catch (error) {
		log_error({
			method: 'POST',
			path: req.originalUrl,
			collection: 'Product',
			error,
			success: false
		});
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
//         data: [ updatedProduct ],
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
