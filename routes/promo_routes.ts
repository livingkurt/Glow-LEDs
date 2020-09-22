export {};
import express from 'express';
import Promo from '../models/promo';
const { isAuth, isAdmin } = require('../util');

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
// 	} else if (req.query.sortOrder === 'category' || req.query.sortOrder === '') {
// 		sortOrder = { category: -1, createdAt: -1 };
// 	}

// 	// const promos = await Promo.find({ deleted: false, ...category, ...searchKeyword }).sort(sortOrder);
// 	const promos = await Promo.find({ deleted: false }).sort({ release_date: -1 });
// 	// console.log(promos);
// 	res.send(promos);
// });
router.get('/', async (req, res) => {
	const category = req.query.category ? { category: req.query.category } : {};
	const searchKeyword = req.query.searchKeyword
		? {
				facebook_name: {
					$regex: req.query.searchKeyword,
					$options: 'i'
				}
			}
		: {};

	let sortOrder = {};
	if (req.query.sortOrder === 'glover name') {
		sortOrder = { glover_name: 1 };
	} else if (req.query.sortOrder === 'facebook name') {
		sortOrder = { facebook_name: 1 };
	} else if (req.query.sortOrder === 'song id') {
		sortOrder = { song_id: 1 };
	} else if (req.query.sortOrder === 'product') {
		sortOrder = { product: 1 };
	} else if (req.query.sortOrder === 'instagram handle') {
		sortOrder = { instagram_handle: 1 };
	} else if (req.query.sortOrder === 'release_date' || req.query.sortOrder === '') {
		sortOrder = { release_date: -1 };
	} else if (req.query.sortOrder === 'newest') {
		sortOrder = { _id: -1 };
	}

	const promos = await Promo.find({ deleted: false, ...category, ...searchKeyword }).sort(sortOrder);
	// console.log(promos);
	res.send(promos);
});

router.get('/:id', async (req, res) => {
	const promo = await Promo.findOne({ _id: req.params.id });
	console.log({ promo });
	console.log(req.params.id);
	if (promo) {
		res.send(promo);
	} else {
		res.status(404).send({ message: 'Promo Not Found.' });
	}
});

router.put('/:id', isAuth, isAdmin, async (req, res) => {
	console.log({ feature_routes_put: req.body });
	const featureId = req.params.id;
	const promo: any = await Promo.findById(featureId);
	if (promo) {
		promo.sponsor = req.body.sponsor;
		promo.promo_code = req.body.promo_code;
		promo.for_customer = req.body.for_customer;
		promo.excluded_categories = req.body.excluded_categories;
		promo.excluded_products = req.body.excluded_products;
		promo.percentage_off = req.body.percentage_off;
		promo.number_of_uses = req.body.number_of_uses;
		promo.funds_generated = req.body.funds_generated;
		promo.number_of_orders = req.body.number_of_orders;
		promo.active = req.body.active;
		promo.deleted = req.body.deleted || false;
		const updatedFeature = await promo.save();
		console.log({ feature_routes_post: updatedFeature });
		if (updatedFeature) {
			return res.status(200).send({ message: 'Promo Updated', data: updatedFeature });
		}
	}
	return res.status(500).send({ message: ' Error in Updating Promo.' });
});

router.delete('/:id', isAuth, isAdmin, async (req: { params: { id: any } }, res: { send: (arg0: string) => void }) => {
	const promo = await Promo.findById(req.params.id);
	const updated_feature = { ...promo, deleted: true };
	const message: any = { message: 'Promo Deleted' };
	// const deleted_feature = await updated_feature.save();
	const deleted_feature = await Promo.updateOne({ _id: req.params.id }, { deleted: true });
	if (deleted_feature) {
		// await deletedFeature.remove();
		res.send(message);
	} else {
		res.send('Error in Deletion.');
	}
});

router.post('/', async (req, res) => {
	console.log('Post');
	const newFeature = await Promo.create({
		sponsor: req.body.sponsor,
		promo_code: req.body.promo_code,
		for_customer: req.body.for_customer,
		excluded_categories: req.body.excluded_categories,
		excluded_products: req.body.excluded_products,
		percentage_off: req.body.percentage_off,
		number_of_uses: req.body.number_of_uses,
		funds_generated: req.body.funds_generated,
		number_of_orders: req.body.number_of_orders,
		active: req.body.active,
		deleted: req.body.deleted || false
	});
	// console.log({ feature_routes_post: promo });
	if (newFeature) {
		return res.status(201).send({ message: 'New Promo Created', data: newFeature });
	}
	return res.status(500).send({ message: ' Error in Creating Promo.' });
});

// module.exports = router;
export default router;
