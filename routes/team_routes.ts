export {};
import express from 'express';
import { Log } from '../models';
import Team from '../models/team';
import { log_error, log_request } from '../util';
const { isAuth, isAdmin } = require('../util');

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const category = req.query.category ? { category: req.query.category } : {};
		let sponsor = {};
		let promoter = {};
		console.log(category);
		if (req.query.category === 'sponsored_teams') {
			sponsor = { sponsor: true };
		}
		console.log(sponsor, promoter);
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

		const teams = await Team.find({
			deleted: false,
			// ...category,
			...searchKeyword,
			// sponsor: true
			// promoter: true
			...sponsor,
			...promoter
		})
			.sort(sortOrder)
			.populate('user');
		log_request({
			method: 'GET',
			path: req.originalUrl,
			collection: 'Team',
			data: teams,
			status: 200,
			success: true,
			ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
		});
		console.log({ teams });
		res.send(teams);
	} catch (error) {
		log_error({
			method: 'GET',
			path: req.originalUrl,
			collection: 'Team',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Getting Teams' });
	}
});

router.get('/:pathname', async (req, res) => {
	try {
		console.log({ pathname: req.params.pathname });
		const team = await Team.findOne({ pathname: req.params.pathname }).populate('affiliates');
		console.log({ team });
		console.log(req.params.pathname);
		if (team) {
			log_request({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Team',
				data: [ team ],
				status: 200,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			res.send(team);
		} else {
			log_request({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Team',
				data: [ team ],
				status: 404,
				success: false,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			res.status(404).send({ message: 'Team Not Found.' });
		}
	} catch (error) {
		log_error({
			method: 'GET',
			path: req.originalUrl,
			collection: 'Team',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Getting Team' });
	}
});

router.put('/:id', isAuth, isAdmin, async (req, res) => {
	try {
		console.log({ team_routes_put: req.body });
		const team_id = req.params.id;
		const team: any = await Team.findById(team_id);
		if (team) {
			const updatedTeam = await Team.updateOne({ _id: team_id }, req.body);
			if (updatedTeam) {
				log_request({
					method: 'PUT',
					path: req.originalUrl,
					collection: 'Team',
					data: [ team ],
					status: 200,
					success: true,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				return res.status(200).send({ message: 'Team Updated', data: updatedTeam });
			}
		} else {
			log_error({
				method: 'PUT',
				path: req.originalUrl,
				collection: 'Team',
				data: [ team ],
				status: 500,
				success: false,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			return res.status(500).send({ message: ' Error in Updating Team.' });
		}
	} catch (error) {
		log_error({
			method: 'PUT',
			path: req.originalUrl,
			collection: 'Team',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Getting Team' });
	}
});

router.delete('/:id', isAuth, isAdmin, async (req: any, res: any) => {
	try {
		const message: any = { message: 'Team Deleted' };
		const deleted_team = await Team.updateOne({ _id: req.params.id }, { deleted: true });
		if (deleted_team) {
			log_request({
				method: 'DELETE',
				path: req.originalUrl,
				collection: 'Team',
				data: [ deleted_team ],
				status: 200,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			res.send(message);
		} else {
			log_request({
				method: 'DELETE',
				path: req.originalUrl,
				collection: 'Team',
				data: [ deleted_team ],
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
			collection: 'Team',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Deleting Team' });
	}
});

router.post('/', isAuth, async (req: any, res: any) => {
	try {
		const newTeam = await Team.create(req.body);
		if (newTeam) {
			log_request({
				method: 'POST',
				path: req.originalUrl,
				collection: 'Team',
				data: [ newTeam ],
				status: 201,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			return res.status(201).send({ message: 'New Team Created', data: newTeam });
		} else {
			log_request({
				method: 'POST',
				path: req.originalUrl,
				collection: 'Team',
				data: [ newTeam ],
				status: 500,
				success: false,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			return res.status(500).send({ message: ' Error in Creating Team.' });
		}
	} catch (error) {
		log_error({
			method: 'POST',
			path: req.originalUrl,
			collection: 'Team',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Creating Team' });
	}
});

export default router;
