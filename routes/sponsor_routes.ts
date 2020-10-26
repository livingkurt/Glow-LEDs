export {};
import express from 'express';
import { Log } from '../models';
import Sponsor from '../models/sponsor';
import { log_error, log_request } from '../util';
const { isAuth, isAdmin } = require('../util');

const router = express.Router();

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

		const sponsors = await Sponsor.find({ deleted: false, ...category, ...searchKeyword }).sort(sortOrder).populate('user');
		log_request({
			method: 'GET',
			path: req.originalUrl,
			collection: 'Sponsor',
			data: sponsors,
			status: 200,
			success: true,
			ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
		});
		res.send(sponsors);
	} catch (error) {
		log_error({
			method: 'GET',
			path: req.originalUrl,
			collection: 'Sponsor',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Getting Sponsors' });
	}
});

router.get('/:id', async (req, res) => {
	try {
		const sponsor = await Sponsor.findOne({ _id: req.params.id }).populate('user');
		console.log({ sponsor });
		console.log(req.params.id);
		if (sponsor) {
			log_request({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Sponsor',
				data: [ sponsor ],
				status: 200,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			res.send(sponsor);
		} else {
			log_request({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Sponsor',
				data: [ sponsor ],
				status: 404,
				success: false,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			res.status(404).send({ message: 'Sponsor Not Found.' });
		}
	} catch (error) {
		log_error({
			method: 'GET',
			path: req.originalUrl,
			collection: 'Sponsor',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Getting Sponsor' });
	}
});

router.put('/:id', isAuth, isAdmin, async (req, res) => {
	try {
		console.log({ sponsor_routes_put: req.body });
		const sponsor_id = req.params.id;
		const sponsor: any = await Sponsor.findById(sponsor_id);
		if (sponsor) {
			const updatedSponsor = await Sponsor.updateOne({ _id: sponsor_id }, req.body);
			if (updatedSponsor) {
				log_request({
					method: 'PUT',
					path: req.originalUrl,
					collection: 'Sponsor',
					data: [ sponsor ],
					status: 200,
					success: true,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				return res.status(200).send({ message: 'Sponsor Updated', data: updatedSponsor });
			}
		} else {
			log_error({
				method: 'PUT',
				path: req.originalUrl,
				collection: 'Sponsor',
				data: [ sponsor ],
				status: 500,
				success: false,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			return res.status(500).send({ message: ' Error in Updating Sponsor.' });
		}
	} catch (error) {
		log_error({
			method: 'PUT',
			path: req.originalUrl,
			collection: 'Sponsor',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Getting Sponsor' });
	}
});

router.delete('/:id', isAuth, isAdmin, async (req: any, res: any) => {
	try {
		const message: any = { message: 'Sponsor Deleted' };
		const deleted_sponsor = await Sponsor.updateOne({ _id: req.params.id }, { deleted: true });
		if (deleted_sponsor) {
			log_request({
				method: 'DELETE',
				path: req.originalUrl,
				collection: 'Sponsor',
				data: [ deleted_sponsor ],
				status: 200,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			res.send(message);
		} else {
			log_request({
				method: 'DELETE',
				path: req.originalUrl,
				collection: 'Sponsor',
				data: [ deleted_sponsor ],
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
			collection: 'Sponsor',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Deleting Sponsor' });
	}
});

router.post('/', isAuth, isAdmin, async (req: any, res: any) => {
	try {
		const newSponsor = await Sponsor.create(req.body);
		if (newSponsor) {
			log_request({
				method: 'POST',
				path: req.originalUrl,
				collection: 'Sponsor',
				data: [ newSponsor ],
				status: 201,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			return res.status(201).send({ message: 'New Sponsor Created', data: newSponsor });
		} else {
			log_request({
				method: 'POST',
				path: req.originalUrl,
				collection: 'Sponsor',
				data: [ newSponsor ],
				status: 500,
				success: false,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			return res.status(500).send({ message: ' Error in Creating Sponsor.' });
		}
	} catch (error) {
		log_error({
			method: 'POST',
			path: req.originalUrl,
			collection: 'Sponsor',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Creating Sponsor' });
	}
});

export default router;
