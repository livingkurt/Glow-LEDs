import { survey_services } from '../services';

export default {
	findAll_surveys_c: async (req: any, res: any) => {
		const { query } = req;
		try {
			const surveys = await survey_services.findAll_surveys_s(query);
			if (surveys) {
				return res.status(200).send(surveys);
			}
			return res.status(404).send({ message: 'Surveys Not Found' });
		} catch (error) {
			console.log({ findAll_surveys_c_error: error });
			res.status(500).send({ error, message: 'Error Finding Surveys' });
		}
	},
	findById_surveys_c: async (req: any, res: any) => {
		const { params } = req;
		try {
			const survey = await survey_services.findById_surveys_s(params);
			if (survey) {
				return res.status(200).send(survey);
			}
			return res.status(404).send({ message: 'Survey Not Found' });
		} catch (error) {
			console.log({ findById_surveys_c_error: error });
			res.status(500).send({ error, message: 'Error Finding Survey' });
		}
	},
	create_surveys_c: async (req: any, res: any) => {
		const { body } = req;
		try {
			const survey = await survey_services.create_surveys_s(body);
			if (survey) {
				return res.status(201).send(survey);
			}
			return res.status(500).send({ message: 'Error Creating Survey' });
		} catch (error) {
			console.log({ create_surveys_c_error: error });
			res.status(500).send({ error, message: 'Error Creating Survey' });
		}
	},
	update_surveys_c: async (req: any, res: any) => {
		const { params, body } = req;
		try {
			const survey = await survey_services.update_surveys_s(params, body);
			if (survey) {
				return res.status(200).send(survey);
			}
			return res.status(500).send({ message: 'Error Updating Survey' });
		} catch (error) {
			console.log({ update_surveys_c_error: error });
			res.status(500).send({ error, message: 'Error Updating Survey' });
		}
	},
	remove_surveys_c: async (req: any, res: any) => {
		const { params } = req;
		try {
			const survey = await survey_services.remove_surveys_s(params);
			if (survey) {
				return res.status(204).send({ message: 'Survey Deleted' });
			}
			return res.status(500).send({ message: 'Error Deleting Survey' });
		} catch (error) {
			console.log({ remove_surveys_c_error: error });
			res.status(500).send({ error, message: 'Error Deleting Survey' });
		}
	}
};
