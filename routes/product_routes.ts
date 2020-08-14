export {};
import express from 'express';
import Product from '../models/product';
const { isAuth, isAdmin } = require('../util');
import fs from 'fs';
import path from 'path';
import productModel from '../models/product';

const router = express.Router();

router.get('/', async (req, res) => {
	const category = req.query.category ? { category: req.query.category } : {};
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
	} else if (req.query.sortOrder === 'newest' || req.query.sortOrder === '') {
		sortOrder = { _id: -1 };
	} else if (req.query.sortOrder === 'category') {
		sortOrder = { category: -1 };
	}
	console.log({ category });
	const products = await Product.find({ deleted: false, ...category, ...searchKeyword }).sort(sortOrder);
	console.log({ products });
	res.send(products);
});

router.get('/:pathname', async (req, res) => {
	const product = await Product.findOne({ pathname: req.params.pathname });
	console.log({ product });
	console.log(req.params.pathname);
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
		product.name = req.body.name;
		product.price = req.body.price;
		product.display_image = req.body.display_image;
		product.video = req.body.video;
		product.brand = req.body.brand;
		product.category = req.body.category;
		product.countInStock = req.body.countInStock;
		product.facts = req.body.facts;
		product.included_items = req.body.included_items;
		product.description = req.body.description;
		product.hidden = req.body.hidden;
		product.sale_price = req.body.sale_price;
		product.volume = req.body.volume;
		product.pathname = req.body.pathname.split(' ').join('_').toLowerCase();
		product.deleted = req.body.deleted || false;
		const updatedProduct = await product.save();
		console.log({ product_routes_post: updatedProduct });
		if (updatedProduct) {
			return res.status(200).send({ message: 'Product Updated', data: updatedProduct });
		}
	}
	return res.status(500).send({ message: ' Error in Updating Product.' });
});

router.delete(
	'/:pathname',
	isAuth,
	isAdmin,
	async (req: { params: { pathname: any } }, res: { send: (arg0: string) => void }) => {
		const product = await Product.findById(req.params.pathname);
		const updated_product = { ...product, deleted: true };
		const message: any = { message: 'Product Deleted' };
		// const deleted_product = await updated_product.save();
		const deleted_product = await Product.updateOne({ pathname: req.params.pathname }, { deleted: true });
		if (deleted_product) {
			// await deletedProduct.remove();
			res.send(message);
		} else {
			res.send('Error in Deletion.');
		}
	}
);

router.post('/', isAuth, isAdmin, async (req, res) => {
	// const converted_pathname = req.body.pathname.toLowerCase()
	// const converted_pathname = req.body.pathname.split(' ').join('_')
	const product = new Product({
		name: req.body.name,
		price: req.body.price,
		display_image: req.body.display_image,
		video: req.body.video,
		brand: req.body.brand,
		category: req.body.category,
		countInStock: req.body.countInStock,
		facts: req.body.facts,
		included_items: req.body.included_items,
		description: req.body.description,
		rating: req.body.rating,
		numReviews: req.body.numReviews,
		hidden: req.body.hidden,
		sale_price: req.body.sale_price,
		volume: req.body.volume,
		pathname: req.body.pathname.split(' ').join('_').toLowerCase(),
		deleted: req.body.deleted || false
	});
	console.log({ product_routes_post: product });
	const newProduct = await product.save();
	if (newProduct) {
		return res.status(201).send({ message: 'New Product Created', data: newProduct });
	}
	return res.status(500).send({ message: ' Error in Creating Product.' });
});

router.post('/images', async (req: { body: {} }, res: { send: (arg0: any[]) => void }) => {
	// console.log(req.body)
	try {
		let relative_directory = path.join('.', '/client/public', Object.keys(req.body).join(''));
		let home_directory = path.join(__dirname, '..');
		let full_directory = path.join(home_directory, `/client/public`, Object.keys(req.body).join(''));
		var relative_directory_array = relative_directory.split('/');
		relative_directory_array.pop();
		relative_directory = relative_directory_array.join('/');
		var full_directory_array = full_directory.split('/');
		full_directory_array.pop();
		full_directory = full_directory_array.join('/');
		if (full_directory === './client/public') {
		} else {
			fs.readdir(full_directory, (err: any, files: any[]) => {
				if (err) {
					return console.log('Unable to scan directory: ' + err);
				}
				let image_path = '';
				let images: Array<string> = [];

				files.forEach((file) => {
					image_path = './' + relative_directory + '/' + file;
					var array = image_path.split('/');
					var lastsegment = array[array.length - 1];
					if (lastsegment === '.DS_Store') {
					} else {
						images = [ ...images, image_path.substr(15) ];
					}
				});
				res.send(images);
			});
		}
	} catch (err) {
		console.log(err);
	}
});

router.post('/:pathname/reviews', isAuth, async (req, res) => {
	const product = await Product.findById(req.params.pathname);
	if (product) {
		const review = {
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			rating: Number(req.body.rating),
			comment: req.body.comment
		};
		product.reviews.push(review);
		product.numReviews = product.reviews.length;
		product.rating =
			product.reviews.reduce((a: any, c: { rating: any }) => c.rating + a, 0) / product.reviews.length;
		const updatedProduct = await product.save();
		res.status(201).send({
			data: updatedProduct.reviews[updatedProduct.reviews.length - 1],
			message: 'Review saved successfully.'
		});
	} else {
		res.status(404).send({ message: 'Product Not Found' });
	}
});
router.delete('/:pathname/reviews/:review_id', isAuth, async (req, res) => {
	console.log(req.params);
	const product = await Product.findById(req.params.pathname);
	if (product) {
		product.reviews.splice(req.params.review_id, 1);
		product.numReviews -= 1;
		// const review = {
		// 	name: req.body.name,
		// 	rating: Number(req.body.rating),
		// 	comment: req.body.comment
		// };
		// product.reviews.push(review);
		// product.numReviews = product.reviews.length;
		// product.rating =
		// 	product.reviews.reduce((a: any, c: { rating: any }) => c.rating + a, 0) / product.reviews.length;
		if (product.numReviews === 0) {
			productModel.rating = 0;
		} else {
			product.rating =
				product.reviews.reduce((a: any, c: { rating: any }) => c.rating + a, 0) / product.reviews.length;
		}
		const updatedProduct = await product.save();
		res.status(201).send({
			data: updatedProduct.reviews[updatedProduct.reviews.length - 1],
			message: 'Review deleted successfully.'
		});
	} else {
		res.status(404).send({ message: 'Product Not Found' });
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
