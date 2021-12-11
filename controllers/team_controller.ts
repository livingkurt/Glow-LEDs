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
				return res.status(201).send(team);
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
