import { team_db } from '../db';

export default {
	findAll_teams_s: async (query: any) => {
		try {
			const promoter = query.category === 'rave_mob' ? { promoter: true } : {};
			const search = query.search
				? {
						team_name: {
							$regex: query.search,
							$options: 'i'
						}
					}
				: {};

			const sort_query = query.sort.toLowerCase();
			let sort = {};
			if (sort_query === 'glover name') {
				sort = { artist_name: 1 };
			} else if (sort_query === 'facebook name') {
				sort = { facebook_name: 1 };
			} else if (sort_query === 'sponsor') {
				sort = { sponsor: -1 };
			} else if (sort_query === 'promoter') {
				sort = { promoter: -1 };
			} else if (sort_query === 'active') {
				sort = { active: -1 };
			} else if (sort_query === 'newest' || sort_query === '') {
				sort = { _id: -1 };
			}
			const filter = { deleted: false, ...promoter, ...search };
			console.log({ filter });
			return await team_db.findAll_teams_db(filter, sort);
		} catch (error) {
			console.log({ findAll_teams_s_error: error });
			throw new Error(error.message);
		}
	},
	findByPathname_teams_s: async (params: any) => {
		try {
			return await team_db.findByPathname_teams_db(params.pathname);
		} catch (error) {
			console.log({ findById_teams_s_error: error });
			throw new Error(error.message);
		}
	},
	findByAffiliate_teams_s: async (params: any) => {
		try {
			return await team_db.findByAffiliate_teams_db(params.id);
		} catch (error) {
			console.log({ findById_teams_s_error: error });
			throw new Error(error.message);
		}
	},
	create_teams_s: async (body: any) => {
		try {
			return await team_db.create_teams_db(body);
		} catch (error) {
			console.log({ create_teams_s_error: error });
			throw new Error(error.message);
		}
	},
	update_teams_s: async (params: any, body: any) => {
		try {
			return await team_db.update_teams_db(params.pathname, body);
		} catch (error) {
			console.log({ update_teams_s_error: error });
			throw new Error(error.message);
		}
	},
	remove_teams_s: async (params: any) => {
		try {
			return await team_db.remove_teams_db(params.pathname);
		} catch (error) {
			console.log({ remove_teams_s_error: error });
			throw new Error(error.message);
		}
	}
};

// import { Team } from '../models';

// export default {
// findAll: async (req: any, res: any) => {
// 	try {
// 		const category = req.query.category ? { category: req.query.category } : {};
// 		const search = req.query.search
// 			? {
// 					facebook_name: {
// 						$regex: req.query.search,
// 						$options: 'i'
// 					}
// 				}
// 			: {};

// 		const sort_query = query.sort.toLowerCase()
let sort = {};
// 		if (sort_query === 'glover name') {
// 			sort = { artist_name: 1 };
// 		} else if (sort_query === 'facebook name') {
// 			sort = { facebook_name: 1 };
// 		} else if (sort_query === 'sponsor') {
// 			sort = { sponsor: -1 };
// 		} else if (sort_query === 'promoter') {
// 			sort = { promoter: -1 };
// 		} else if (sort_query === 'active') {
// 			sort = { active: -1 };
// 		} else if (sort_query === 'newest' || sort_query === '') {
// 			sort = { _id: -1 };
// 		}

// 		const teams = await Team.find({
// 			deleted: false,
// 			...category,
// 			...search
// 		})
// 			.sort(sort)
// 			.populate('affiliates')
// 			.populate('public_code')
// 			.populate('private_code');

// 		console.log({ teams });
// 		res.send(teams);
// 	} catch (error) {
// 		console.log({ error });

// 		res.status(500).send({ error, message: 'Error Getting Teams' });
// 	}
// },
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
// 	find_by_affiliates: async (req: any, res: any) => {
// 		try {
// 			console.log(req.params.affiliate_id);
// 			const team = await Team.find({ affiliates: { $in: [ req.params.affiliate_id ] } })
// 				.populate('affiliates')
// 				.populate('public_code')
// 				.populate('private_code');
// 			console.log({ team });
// 			console.log(req.params.affiliate_id);
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
// 					return res.status(200).send({ message: 'Team Updated', data: updatedTeam });
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
