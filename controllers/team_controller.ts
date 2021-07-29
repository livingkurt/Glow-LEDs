import { Team } from '../models';
import { log_error, log_request, make_private_code, isAuth, isAdmin } from '../util';
// const { isAuth, isAdmin } = require('../util');

// Defining methods for the booksController
export default {
	findAll: async (req: any, res: any) => {
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
				...category,
				...searchKeyword
			})
				.sort(sortOrder)
				.populate('affiliates')
				.populate('public_code')
				.populate('private_code');
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
			console.log({ error });
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
	},
	findById: async (req: any, res: any) => {
		try {
			console.log({ pathname: req.params.pathname });
			const team = await Team.findOne({ pathname: req.params.pathname })
				.populate('affiliates')
				.populate('public_code')
				.populate('private_code');
			console.log({ team });
			console.log(req.params.id);
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
			console.log({ error });
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
	},
	find_by_affiliates: async (req: any, res: any) => {
		try {
			console.log(req.params.affiliate_id);
			const team = await Team.find({ affiliates: { $in: [ req.params.affiliate_id ] } })
				.populate('affiliates')
				.populate('public_code')
				.populate('private_code');
			console.log({ team });
			console.log(req.params.affiliate_id);
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
			console.log({ error });
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
	},
	create: async (req: any, res: any) => {
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
			console.log({ error });
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
	},
	update: async (req: any, res: any) => {
		try {
			console.log({ team_routes_put: req.body });
			const team_pathname = req.params.pathname;
			const team: any = await Team.findOne({ pathname: team_pathname });
			if (team) {
				const updatedTeam = await Team.updateOne({ pathname: team_pathname }, req.body);
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
			console.log({ error });
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
	},
	remove: async (req: any, res: any) => {
		try {
			const message: any = { message: 'Team Deleted' };
			const deleted_team = await Team.updateOne({ pathname: req.params.pathname }, { deleted: true });
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
			console.log({ error });
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
	}
};
