export {};
import express from 'express';
import Product from '../models/product';
const { isAuth, isAdmin } = require('../util');
import fs from 'fs';
import path from 'path';
import productModel from '../models/product';

const router = express.Router();

// router.get('/', async (req, res) => {
// 	const category = req.query.category ? { category: req.query.category } : {};
// 	const searchKeyword = req.query.searchKeyword
// 		? {
// 				name: {
// 					$regex: req.query.searchKeyword,
// 					$options: 'i'
// 				}
// 			}
// 		: {};

// 	let sortOrder = {};
// 	if (req.query.sortOrder === 'lowest') {
// 		sortOrder = { price: 1 };
// 	} else if (req.query.sortOrder === 'highest') {
// 		sortOrder = { price: -1 };
// 	} else if (req.query.sortOrder === 'newest') {
// 		sortOrder = { _id: -1 };
// 	} else if (req.query.sortOrder === 'hidden') {
// 		sortOrder = { hidden: -1 };
// 	} else if (req.query.sortOrder === 'category' || req.query.sortOrder === '') {
// 		sortOrder = { order: 1, _id: -1 };
// 	}

// 	const products = await Product.find({ deleted: false, ...category, ...searchKeyword }).sort(sortOrder);
// 	// console.log(products);
// 	res.send(products);
// });

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
	const categorizing = subcategory === {} ? subcategory : category;
	// console.log({ categorizing });
	// console.log({ query: req.query });
	// console.log({ subcategory });
	// console.log({ category, subcategory, searchKeyword });

	const products = await Product.find({ deleted: false, ...category, ...subcategory, ...searchKeyword }).sort(
		sortOrder
	);
	// console.log({ products });
	res.send(products);
});

router.get('/originalcaps', async (req, res) => {
	const products = await Product.find({ deleted: false, hidden: false, category: 'diffuser_caps' });
	// console.log(products);
	res.send(products);
});

router.get('/minicaps', async (req, res) => {
	const products = await Product.find({ deleted: false, hidden: false, category: 'mini_diffuser_caps' });
	// console.log(products);
	res.send(products);
});

router.post('/array', async (req, res) => {
	console.log({ control_panel: req.body });
	const products = await Product.find({ _id: { $in: req.body } });
	// console.log(products);
	res.send(products);
});

router.get('/:pathname', async (req, res) => {
	const product = await Product.findOne({ pathname: req.params.pathname });
	if (product) {
		res.send(product);
	} else {
		res.status(404).send({ message: 'Product Not Found.' });
	}
});

router.put('/:pathname', isAuth, isAdmin, async (req, res) => {
	console.log({ product_routes_put: req.body });
	const productId = req.params.pathname;
	const product = await Product.findById(productId);
	if (product) {
		const updatedProduct = await Product.updateOne({ _id: productId }, req.body);
		console.log({ product_routes_post: updatedProduct });
		if (updatedProduct) {
			return res.status(200).send({ message: 'Product Updated', data: updatedProduct });
		}
	}
	return res.status(500).send({ message: ' Error in Updating Product.' });
});

router.delete('/:id', isAuth, isAdmin, async (req: { params: { id: any } }, res: { send: (arg0: string) => void }) => {
	console.log(req.params.id);
	const product = await Product.findById(req.params.id);
	const updated_product = { ...product, deleted: true };
	const message: any = { message: 'Product Deleted' };

	// const deleted_product = await updated_product.save();
	const deleted_product = await Product.updateOne({ _id: req.params.id }, { deleted: true });
	if (deleted_product) {
		// await deletedProduct.remove();
		res.send(message);
	} else {
		res.send('Error in Deletion.');
	}
});

router.post('/', isAuth, isAdmin, async (req, res) => {
	const newProduct = await Product.create(req.body);
	if (newProduct) {
		return res.status(201).send({ message: 'New Product Created', data: newProduct });
	}
	return res.status(500).send({ message: ' Error in Creating Product.' });
});

router.post('/:pathname/reviews', isAuth, async (req, res) => {
	try {
		console.log(req.body);
		console.log({ pathname: req.params.pathname });
		const product = await Product.findOne({ pathname: req.params.pathname });
		if (product) {
			// const review = {
			// 	user: req.body.userInfo._id,
			// 	first_name: req.body.userInfo.first_name,
			// 	last_name: req.body.userInfo.last_name,
			// 	rating: Number(req.body.review.rating),
			// 	comment: req.body.review.comment
			// };
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
			// console.log({ product });
			// console.log({ review });
			console.log({ reviews: product.reviews });
			// product.reviews = product.reviews ? product.reviews : [];
			// product.reviews.push(review);
			product.numReviews = product.reviews.length;
			product.rating =
				product.reviews.reduce((a: any, c: { rating: any }) => c.rating + a, 0) / product.reviews.length;
			console.log({ product });
			const updatedProduct = await product.save();
			// const updatedProduct = await Product.updateOne({ pathname: req.params.pathname }, req.body);
			res.status(201).send({
				data: updatedProduct.reviews[updatedProduct.reviews.length - 1],
				message: 'Review saved successfully.'
			});
		} else {
			res.status(404).send({ message: 'Product Not Found' });
		}
	} catch (error) {
		console.log(error);
	}
});

router.delete('/:pathname/reviews', isAuth, isAdmin, async (req: any, res: any) => {
	console.log(req.params.id);
	const product = await Product.findOne({ pathname: req.params.pathname });
	const updated_product = { ...product, deleted: true };
	const message: any = { message: 'Product Deleted' };

	// const deleted_product = await updated_product.save();
	const deleted_product = await Product.updateOne({ _id: req.params.id }, { deleted: true });
	if (deleted_product) {
		// await deletedProduct.remove();
		res.send(message);
	} else {
		res.send('Error in Deletion.');
	}
});

router.put('/all', isAuth, async (req: any, res: { send: (arg0: any) => void }) => {
	// const product = await Product.updateMany({ $set: { volume: 5 } });
	const product = await Product.updateMany({
		$set: { volume: 5 }
	});
	res.send(product);
});

// module.exports = router;
export default router;
