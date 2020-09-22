export {};
import express from 'express';
import Sponsor from '../models/sponsor';
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

// 	// const sponsors = await Sponsor.find({ deleted: false, ...category, ...searchKeyword }).sort(sortOrder);
// 	const sponsors = await Sponsor.find({ deleted: false }).sort({ release_date: -1 });
// 	// console.log(sponsors);
// 	res.send(sponsors);
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

	const sponsors = await Sponsor.find({ deleted: false, ...category, ...searchKeyword }).sort(sortOrder);
	// console.log(sponsors);
	res.send(sponsors);
});

router.get('/:id', async (req, res) => {
	const sponsor = await Sponsor.findOne({ _id: req.params.id });
	console.log({ sponsor });
	console.log(req.params.id);
	if (sponsor) {
		res.send(sponsor);
	} else {
		res.status(404).send({ message: 'Sponsor Not Found.' });
	}
});

router.put('/:id', isAuth, isAdmin, async (req, res) => {
	console.log({ feature_routes_put: req.body });
	const featureId = req.params.id;
	const sponsor: any = await Sponsor.findById(featureId);
	if (sponsor) {
		sponsor.user = req.body.user;
		sponsor.glover_name = req.body.glover_name;
		sponsor.instagram_handle = req.body.instagram_handle;
		sponsor.facebook_name = req.body.facebook_name;
		sponsor.percentage_off = req.body.percentage_off;
		sponsor.promo_code = req.body.promo_code;
		sponsor.funds_generated = req.body.funds_generated;
		sponsor.active = req.body.active;
		sponsor.deleted = req.body.deleted || false;
		const updatedFeature = await sponsor.save();
		console.log({ feature_routes_post: updatedFeature });
		if (updatedFeature) {
			return res.status(200).send({ message: 'Sponsor Updated', data: updatedFeature });
		}
	}
	return res.status(500).send({ message: ' Error in Updating Sponsor.' });
});

router.delete('/:id', isAuth, isAdmin, async (req: { params: { id: any } }, res: { send: (arg0: string) => void }) => {
	const sponsor = await Sponsor.findById(req.params.id);
	const updated_feature = { ...sponsor, deleted: true };
	const message: any = { message: 'Sponsor Deleted' };
	// const deleted_feature = await updated_feature.save();
	const deleted_feature = await Sponsor.updateOne({ _id: req.params.id }, { deleted: true });
	if (deleted_feature) {
		// await deletedFeature.remove();
		res.send(message);
	} else {
		res.send('Error in Deletion.');
	}
});

router.post('/', async (req, res) => {
	console.log('Post');
	const newFeature = await Sponsor.create({
		user: req.body.user,
		glover_name: req.body.glover_name,
		instagram_handle: req.body.instagram_handle,
		facebook_name: req.body.facebook_name,
		percentage_off: req.body.percentage_off,
		promo_code: req.body.promo_code,
		funds_generated: req.body.funds_generated,
		active: req.body.active,
		deleted: req.body.deleted || false
	});
	// console.log({ feature_routes_post: sponsor });
	if (newFeature) {
		return res.status(201).send({ message: 'New Sponsor Created', data: newFeature });
	}
	return res.status(500).send({ message: ' Error in Creating Sponsor.' });
});

// module.exports = router;
export default router;
