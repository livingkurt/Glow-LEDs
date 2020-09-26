export {};
import express from 'express';
import Content from '../models/content';
const { isAuth, isAdmin } = require('../util');

const router = express.Router();
router.get('/', async (req, res) => {
	const category = req.query.category ? { category: req.query.category } : {};
	const searchKeyword = req.query.searchKeyword
		? {
				p: {
					$regex: req.query.searchKeyword,
					$options: 'i'
				}
			}
		: {};

	let sortOrder = {};
	if (req.query.sortOrder === 'glover name') {
		sortOrder = { image: 1 };
	} else if (req.query.sortOrder === 'facebook name') {
		sortOrder = { p: 1 };
	} else if (req.query.sortOrder === 'song id') {
		sortOrder = { link: 1 };
	} else if (req.query.sortOrder === 'button') {
		sortOrder = { button: 1 };
	} else if (req.query.sortOrder === 'instagram handle') {
		sortOrder = { h2: 1 };
	} else if (req.query.sortOrder === 'release_date' || req.query.sortOrder === '') {
		sortOrder = { release_date: -1 };
	} else if (req.query.sortOrder === 'newest') {
		sortOrder = { _id: -1 };
	}

	const contents = await Content.find({ deleted: false, ...category, ...searchKeyword }).sort(sortOrder);
	// console.log(contents);
	res.send(contents);
});

router.get('/:id', async (req, res) => {
	const content = await Content.findOne({ _id: req.params.id });
	console.log({ content });
	console.log(req.params.id);
	if (content) {
		res.send(content);
	} else {
		res.status(404).send({ message: 'Content Not Found.' });
	}
});

router.put('/:id', isAuth, isAdmin, async (req, res) => {
	console.log({ content_routes_put: req.body });
	const contentId = req.params.id;
	const content: any = await Content.findById(contentId);
	if (content) {
		const updatedContent = await Content.updateOne({ _id: contentId }, req.body);
		console.log({ content_routes_post: updatedContent });
		if (updatedContent) {
			return res.status(200).send({ message: 'Content Updated', data: updatedContent });
		}
	}
	return res.status(500).send({ message: ' Error in Updating Content.' });
});

router.delete('/:id', isAuth, isAdmin, async (req: { params: { id: any } }, res: { send: (arg0: string) => void }) => {
	const content = await Content.findById(req.params.id);
	const updated_content = { ...content, deleted: true };
	const message: any = { message: 'Content Deleted' };
	// const deleted_content = await updated_content.save();
	const deleted_content = await Content.updateOne({ _id: req.params.id }, { deleted: true });
	if (deleted_content) {
		// await deletedContent.remove();
		res.send(message);
	} else {
		res.send('Error in Deletion.');
	}
});

router.post('/', async (req, res) => {
	const newProduct = await Content.create(req.body);
	if (newProduct) {
		return res.status(201).send({ message: 'New Content Created', data: newProduct });
	}
	return res.status(500).send({ message: ' Error in Creating Content.' });
});

// module.exports = router;
export default router;
