export {};
import express from 'express';
import { Log, Promo } from '../models';
import Affiliate from '../models/affiliate';
import { log_error, log_request, make_private_code } from '../util';
const { isAuth, isAdmin } = require('../util');

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const category = req.query.category ? { category: req.query.category } : {};
		let sponsor = {};
		let promoter = {};
		// console.log(category);
		if (req.query.category === 'sponsored_glovers') {
			sponsor = { sponsor: true };
		} else if (req.query.category === 'affiliated_glovers') {
			promoter = { promoter: true };
		}
		// console.log(sponsor, promoter);
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
			sortOrder = { artist_name: 1 };
		} else if (req.query.sortOrder === 'facebook name') {
			sortOrder = { facebook_name: 1 };
		} else if (req.query.sortOrder === 'sponsor') {
			sortOrder = { sponsor: -1 };
		} else if (req.query.sortOrder === 'promoter') {
			sortOrder = { promoter: -1 };
		} else if (req.query.sortOrder === 'active') {
			sortOrder = { active: -1 };
		} else if (req.query.sortOrder === 'newest' || req.query.sortOrder === '') {
			sortOrder = { _id: -1 };
		}

		const affiliates = await Affiliate.find({
			deleted: false,
			// ...category,
			...searchKeyword,
			// sponsor: true
			// promoter: true
			...sponsor,
			...promoter
		})
			.sort(sortOrder)
			.populate('user')
			.populate('products')
			.populate('public_code')
			.populate('private_code')
			.populate('chips');
		log_request({
			method: 'GET',
			path: req.originalUrl,
			collection: 'Affiliate',
			data: affiliates,
			status: 200,
			success: true,
			ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
		});
		// console.log({ affiliates });
		res.send(affiliates);
	} catch (error) {
		console.log({ error });
		// log_error({
		// 	method: 'GET',
		// 	path: req.originalUrl,
		// 	collection: 'Affiliate',
		// 	error,
		// 	status: 500,
		// 	success: false
		// });
		res.status(500).send({ error, message: 'Error Getting Affiliates' });
	}
});

router.get('/:pathname', async (req, res) => {
	try {
		console.log({ pathname: req.params.pathname });
		console.log('hello');
		const affiliate = await Affiliate.findOne({ pathname: req.params.pathname })
			.populate('user')
			.populate('chips')
			.populate('products')
			.populate('public_code')
			.populate('private_code');
		console.log({ affiliate });
		console.log(req.params.pathname);
		if (affiliate) {
			log_request({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Affiliate',
				data: [ affiliate ],
				status: 200,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			res.send(affiliate);
		} else {
			log_request({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Affiliate',
				data: [ affiliate ],
				status: 404,
				success: false,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			res.status(404).send({ message: 'Affiliate Not Found.' });
		}
	} catch (error) {
		log_error({
			method: 'GET',
			path: req.originalUrl,
			collection: 'Affiliate',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Getting Affiliate' });
	}
});

router.put('/:pathname', isAuth, async (req, res) => {
	try {
		console.log({ affiliate_routes_put: req.body });
		const pathname = req.params.pathname;
		const affiliate: any = await Affiliate.findOne({ pathname: pathname });
		if (affiliate) {
			const updatedAffiliate = await Affiliate.updateOne({ pathname: pathname }, req.body);
			if (updatedAffiliate) {
				log_request({
					method: 'PUT',
					path: req.originalUrl,
					collection: 'Affiliate',
					data: [ affiliate ],
					status: 200,
					success: true,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				return res.status(200).send({ message: 'Affiliate Updated', data: updatedAffiliate });
			}
		} else {
			log_error({
				method: 'PUT',
				path: req.originalUrl,
				collection: 'Affiliate',
				data: [ affiliate ],
				status: 500,
				success: false,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			return res.status(500).send({ message: ' Error in Updating Affiliate.' });
		}
	} catch (error) {
		log_error({
			method: 'PUT',
			path: req.originalUrl,
			collection: 'Affiliate',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Getting Affiliate' });
	}
});

router.delete('/:pathname', isAuth, isAdmin, async (req: any, res: any) => {
	try {
		const message: any = { message: 'Affiliate Deleted' };
		const deleted_affiliate = await Affiliate.updateOne({ pathname: req.params.pathname }, { deleted: true });
		if (deleted_affiliate) {
			log_request({
				method: 'DELETE',
				path: req.originalUrl,
				collection: 'Affiliate',
				data: [ deleted_affiliate ],
				status: 200,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			res.send(message);
		} else {
			log_request({
				method: 'DELETE',
				path: req.originalUrl,
				collection: 'Affiliate',
				data: [ deleted_affiliate ],
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
			collection: 'Affiliate',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Deleting Affiliate' });
	}
});

router.post('/', isAuth, async (req: any, res: any) => {
	try {
		const public_code = await Promo.create({
			promo_code: req.body.artist_name.toLowerCase(),
			admin_only: false,
			affiliate_only: false,
			single_use: false,
			used_once: false,
			excluded_categories: [],
			excluded_products: [],
			percentage_off: 10,
			free_shipping: false,
			time_limit: false,
			start_date: '2021-01-01',
			end_date: '2021-01-01',
			active: true
		});
		console.log({ public_code });
		if (public_code) {
			const private_code = await Promo.create({
				promo_code: make_private_code(6),
				admin_only: false,
				affiliate_only: true,
				single_use: false,
				used_once: false,
				excluded_categories: [],
				excluded_products: [],
				percentage_off: 20,
				free_shipping: false,
				time_limit: false,
				start_date: '2021-01-01',
				end_date: '2021-01-01',
				active: true
			});
			console.log({ private_code });
			if (private_code) {
				const newAffiliate: any = await Affiliate.create({
					...req.body,
					public_code: public_code._id,
					private_code: private_code._id
				});
				console.log({ newAffiliate });
				if (newAffiliate) {
					log_request({
						method: 'POST',
						path: req.originalUrl,
						collection: 'Affiliate',
						data: [ newAffiliate ],
						status: 201,
						success: true,
						ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
					});
					return res.status(201).send({ message: 'New Affiliate Created', data: newAffiliate });
				} else {
					log_request({
						method: 'POST',
						path: req.originalUrl,
						collection: 'Affiliate',
						data: [ newAffiliate ],
						status: 500,
						success: false,
						ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
					});
					return res.status(500).send({ message: ' Error in Creating Affiliate.' });
				}
			}
		}
	} catch (error) {
		log_error({
			method: 'POST',
			path: req.originalUrl,
			collection: 'Affiliate',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Creating Affiliate' });
	}
});

export default router;
