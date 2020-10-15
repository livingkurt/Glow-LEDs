export {};
import express from 'express';
import { Log } from '../models';
import Promo from '../models/promo';
import { log_error, log_request } from '../util';
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
	try {
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
		log_request({
			method: 'GET',
			path: req.originalUrl,
			collection: 'Promo',
			data: promos,
			error: {}
		});
		res.send(promos);
	} catch (error) {
		log_error({
			method: 'GET',
			path: req.originalUrl,
			collection: 'Promo',
			error
		});
	}
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
	console.log({ promo_routes_put: req.body });
	const promoId = req.params.id;
	const promo: any = await Promo.findById(promoId);
	if (promo) {
		const updatedPromo = await Promo.updateOne({ _id: promoId }, req.body);
		if (updatedPromo) {
			return res.status(200).send({ message: 'Promo Updated', data: updatedPromo });
		}
	}
	return res.status(500).send({ message: ' Error in Updating Promo.' });
});

router.delete('/:id', isAuth, isAdmin, async (req: { params: { id: any } }, res: { send: (arg0: string) => void }) => {
	const promo = await Promo.findById(req.params.id);
	const updated_promo = { ...promo, deleted: true };
	const message: any = { message: 'Promo Deleted' };
	// const deleted_promo = await updated_promo.save();
	const deleted_promo = await Promo.updateOne({ _id: req.params.id }, { deleted: true });
	if (deleted_promo) {
		// await deletedPromo.remove();
		res.send(message);
	} else {
		res.send('Error in Deletion.');
	}
});

router.post('/', async (req, res) => {
	const newPromo = await Promo.create(req.body);
	if (newPromo) {
		return res.status(201).send({ message: 'New Promo Created', data: newPromo });
	}
	return res.status(500).send({ message: ' Error in Creating Promo.' });
});

// module.exports = router;
export default router;
