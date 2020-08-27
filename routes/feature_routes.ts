export {};
import express from 'express';
import Feature from '../models/feature';
const { isAuth, isAdmin } = require('../util');

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
	} else if (req.query.sortOrder === 'newest') {
		sortOrder = { _id: -1 };
	} else if (req.query.sortOrder === 'category' || req.query.sortOrder === '') {
		sortOrder = { category: -1, createdAt: -1 };
	}

	// const features = await Feature.find({ deleted: false, ...category, ...searchKeyword }).sort(sortOrder);
	const features = await Feature.find({ deleted: false }).sort({ date_of_purchase: -1 });
	// console.log(features);
	res.send(features);
});

router.get('/:id', async (req, res) => {
	const feature = await Feature.findOne({ _id: req.params.id });
	console.log({ feature });
	console.log(req.params.id);
	if (feature) {
		res.send(feature);
	} else {
		res.status(404).send({ message: 'Feature Not Found.' });
	}
});

router.put('/:id', isAuth, isAdmin, async (req, res) => {
	console.log({ feature_routes_put: req.body });
	const featureId = req.params.id;
	const feature: any = await Feature.findById(featureId);
	if (feature) {
		feature.user = req.body.user;
		feature.glover_name = req.body.glover_name;
		feature.instagram_handle = req.body.instagram_handle;
		feature.facebook_name = req.body.facebook_name;
		feature.product = req.body.product;
		feature.song_id = req.body.song_id;
		feature.quote = req.body.quote;
		feature.video = req.body.video;
		feature.picture = req.body.picture;
		feature.deleted = req.body.deleted || false;
		const updatedFeature = await feature.save();
		console.log({ feature_routes_post: updatedFeature });
		if (updatedFeature) {
			return res.status(200).send({ message: 'Feature Updated', data: updatedFeature });
		}
	}
	return res.status(500).send({ message: ' Error in Updating Feature.' });
});

router.delete('/:id', isAuth, isAdmin, async (req: { params: { id: any } }, res: { send: (arg0: string) => void }) => {
	const feature = await Feature.findById(req.params.id);
	const updated_feature = { ...feature, deleted: true };
	const message: any = { message: 'Feature Deleted' };
	// const deleted_feature = await updated_feature.save();
	const deleted_feature = await Feature.updateOne({ _id: req.params.id }, { deleted: true });
	if (deleted_feature) {
		// await deletedFeature.remove();
		res.send(message);
	} else {
		res.send('Error in Deletion.');
	}
});

router.post('/', async (req, res) => {
	// const converted_id = req.body.id.toLowerCase()
	console.log('Post');
	// ISODate('2020-08-21T00:13:08.879Z');
	// const converted_id = req.body.id.split(' ').join('_')
	// const feature = new Feature({
	// 	feature_name: req.body.feature_name,
	// 	application: req.body.application,
	// 	url: req.body.url,
	// 	place_of_purchase: req.body.place_of_purchase,
	// 	date_of_purchase: new Date(req.body.date_of_purchase),
	// 	category: req.body.category,
	// 	card: req.body.card,
	// 	amount: req.body.amount,
	// 	deleted: req.body.deleted || false
	// });
	// console.log({ feature_routes_post: feature });
	// const newFeature = await feature.save();
	const newFeature = await Feature.create({
		user: req.body.user,
		glover_name: req.body.glover_name,
		instagram_handle: req.body.instagram_handle,
		facebook_name: req.body.facebook_name,
		product: req.body.product,
		song_id: req.body.song_id,
		quote: req.body.quote,
		video: req.body.video,
		picture: req.body.picture,
		deleted: req.body.deleted || false
	});
	// console.log({ feature_routes_post: feature });
	if (newFeature) {
		return res.status(201).send({ message: 'New Feature Created', data: newFeature });
	}
	return res.status(500).send({ message: ' Error in Creating Feature.' });
});

// module.exports = router;
export default router;
