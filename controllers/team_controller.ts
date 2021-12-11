import { team_services } from '../services';

export default {
	findAll_teams_c: async (req: any, res: any) => {
		const { query } = req;
		try {
			const teams = await team_services.findAll_teams_s(query);
			if (teams) {
				return res.status(200).send(teams);
			}
			return res.status(404).send({ message: 'Teams Not Found' });
		} catch (error) {
			console.log({ findAll_teams_c_error: error });
			res.status(500).send({ error, message: 'Error Finding Teams' });
		}
	},
	findByPathname_teams_c: async (req: any, res: any) => {
		const { params } = req;
		try {
			const team = await team_services.findByPathname_teams_s(params);
			if (team) {
				return res.status(200).send(team);
			}
			return res.status(404).send({ message: 'Team Not Found' });
		} catch (error) {
			console.log({ findById_teams_c_error: error });
			res.status(500).send({ error, message: 'Error Finding Team' });
		}
	},
	findByAffiliate_teams_c: async (req: any, res: any) => {
		const { params } = req;
		try {
			const team = await team_services.findByAffiliate_teams_s(params);
			if (team) {
				return res.status(200).send(team);
			}
			return res.status(404).send({ message: 'Team Not Found' });
		} catch (error) {
			console.log({ findById_teams_c_error: error });
			res.status(500).send({ error, message: 'Error Finding Team' });
		}
	},
	create_teams_c: async (req: any, res: any) => {
		const { body } = req;
		try {
			const team = await team_services.create_teams_s(body);
			if (team) {
				return res.status(201).send({ message: 'New Team Created', data: team });
			}
			return res.status(500).send({ message: 'Error Creating Team' });
		} catch (error) {
			console.log({ create_teams_c_error: error });
			res.status(500).send({ error, message: 'Error Creating Team' });
		}
	},
	update_teams_c: async (req: any, res: any) => {
		const { params, body } = req;
		try {
			const team = await team_services.update_teams_s(params, body);
			if (team) {
				return res.status(200).send(team);
			}
			return res.status(500).send({ message: 'Error Updating Team' });
		} catch (error) {
			console.log({ update_teams_c_error: error });
			res.status(500).send({ error, message: 'Error Updating Team' });
		}
	},
	remove_teams_c: async (req: any, res: any) => {
		const { params } = req;
		try {
			const team = await team_services.remove_teams_s(params);
			if (team) {
				return res.status(204).send({ message: 'Team Deleted' });
			}
			return res.status(500).send({ message: 'Error Deleting Team' });
		} catch (error) {
			console.log({ remove_teams_c_error: error });
			res.status(500).send({ error, message: 'Error Deleting Team' });
		}
	}
};

// import { Team } from '../models';

// export default {
// 	findAll: async (req: any, res: any) => {
// 		try {
// 			const category = req.query.category ? { category: req.query.category } : {};
// 			const search = req.query.search
// 				? {
// 						facebook_name: {
// 							$regex: req.query.search,
// 							$options: 'i'
// 						}
// 					}
// 				: {};

// 			let sort = {};
// 			if (req.query.sort === 'glover name') {
// 				sort = { artist_name: 1 };
// 			} else if (req.query.sort === 'facebook name') {
// 				sort = { facebook_name: 1 };
// 			} else if (req.query.sort === 'sponsor') {
// 				sort = { sponsor: -1 };
// 			} else if (req.query.sort === 'promoter') {
// 				sort = { promoter: -1 };
// 			} else if (req.query.sort === 'active') {
// 				sort = { active: -1 };
// 			} else if (req.query.sort === 'newest' || req.query.sort === '') {
// 				sort = { _id: -1 };
// 			}

// 			const teams = await Team.find({
// 				deleted: false,
// 				...category,
// 				...search
// 			})
// 				.sort(sort)
// 				.populate('affiliates')
// 				.populate('public_code')
// 				.populate('private_code');

// 			console.log({ teams });
// 			res.send(teams);
// 		} catch (error) {
// 			console.log({ error });

// 			res.status(500).send({ error, message: 'Error Getting Teams' });
// 		}
// 	},
// 	findById: async (req: any, res: any) => {
// 		try {
// 			console.log({ pathname: req.params.pathname });
// 			const team = await Team.findOne({ pathname: req.params.pathname })
// 				.populate('affiliates')
// 				.populate('public_code')
// 				.populate('private_code');
// 			if (team) {
// 				res.send(team);
// 			} else {
// 				res.status(404).send({ message: 'Team Not Found.' });
// 			}
// 		} catch (error) {
// 			console.log({ error });

// 			res.status(500).send({ error, message: 'Error Getting Team' });
// 		}
// 	},
// find_by_affiliates: async (req: any, res: any) => {
// 	try {
// 		console.log(req.params.affiliate_id);
// 		const team = await Team.find({ affiliates: { $in: [ req.params.affiliate_id ] } })
// 			.populate('affiliates')
// 			.populate('public_code')
// 			.populate('private_code');
// 		console.log({ team });
// 		console.log(req.params.affiliate_id);
// 		if (team) {
// 			res.send(team);
// 		} else {
// 			res.status(404).send({ message: 'Team Not Found.' });
// 		}
// 	} catch (error) {
// 		console.log({ error });

// 		res.status(500).send({ error, message: 'Error Getting Team' });
// 	}
// },
// 	create: async (req: any, res: any) => {
// 		try {
// 			const newTeam = await Team.create(req.body);
// 			if (newTeam) {
// 				return res.status(201).send({ message: 'New Team Created', data: newTeam });
// 			} else {
// 				return res.status(500).send({ message: ' Error in Creating Team.' });
// 			}
// 		} catch (error) {
// 			console.log({ error });

// 			res.status(500).send({ error, message: 'Error Creating Team' });
// 		}
// 	},
// 	update: async (req: any, res: any) => {
// 		try {
// 			console.log({ team_routes_put: req.body });
// 			const team_pathname = req.params.pathname;
// 			const team: any = await Team.findOne({ pathname: team_pathname });
// 			if (team) {
// 				const updatedTeam = await Team.updateOne({ pathname: team_pathname }, req.body);
// 				if (updatedTeam) {
// 					return res.status(200).send(updatedTeam );
// 				}
// 			} else {
// 				return res.status(500).send({ message: ' Error in Updating Team.' });
// 			}
// 		} catch (error) {
// 			console.log({ error });

// 			res.status(500).send({ error, message: 'Error Getting Team' });
// 		}
// 	},
// 	remove: async (req: any, res: any) => {
// 		try {
// 			const message: any = { message: 'Team Deleted' };
// 			const deleted_team = await Team.updateOne({ pathname: req.params.pathname }, { deleted: true });
// 			if (deleted_team) {
// 				res.send(message);
// 			} else {
// 				res.send('Error in Deletion.');
// 			}
// 		} catch (error) {
// 			console.log({ error });

// 			res.status(500).send({ error, message: 'Error Deleting Team' });
// 		}
// 	}
// };
