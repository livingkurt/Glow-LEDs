import { content_services } from '../services';

export default {
	findAll_contents_c: async (req: any, res: any) => {
		const { query } = req;
		try {
			const contents = await content_services.findAll_contents_s(query);
			if (contents) {
				return res.status(200).send(contents);
			}
			return res.status(404).send({ message: 'Contents Not Found' });
		} catch (error) {
			console.log({ findAll_contents_c_error: error });
			res.status(500).send({ error, message: 'Error Finding Contents' });
		}
	},
	findDisplay_contents_c: async (req: any, res: any) => {
		const { query } = req;
		try {
			const contents = await content_services.findDisplay_contents_s(query);
			if (contents) {
				return res.status(200).send(contents);
			}
			return res.status(404).send({ message: 'Contents Not Found' });
		} catch (error) {
			console.log({ findAll_contents_c_error: error });
			res.status(500).send({ error, message: 'Error Finding Contents' });
		}
	},
	findAllEvents_contents_c: async (req: any, res: any) => {
		const { query } = req;
		try {
			const contents = await content_services.findAllEvents_contents_s(query);
			if (contents) {
				return res.status(200).send(contents);
			}
			return res.status(404).send({ message: 'Contents Not Found' });
		} catch (error) {
			console.log({ findAll_contents_c_error: error });
			res.status(500).send({ error, message: 'Error Finding Contents' });
		}
	},
	findById_contents_c: async (req: any, res: any) => {
		const { params } = req;
		try {
			const content = await content_services.findById_contents_s(params);
			if (content) {
				return res.status(200).send(content);
			}
			return res.status(404).send({ message: 'Content Not Found' });
		} catch (error) {
			console.log({ findById_contents_c_error: error });
			res.status(500).send({ error, message: 'Error Finding Content' });
		}
	},
	create_contents_c: async (req: any, res: any) => {
		const { body } = req;
		try {
			const content = await content_services.create_contents_s(body);
			if (content) {
				return res.status(201).send(content);
			}
			return res.status(500).send({ message: 'Error Creating Content' });
		} catch (error) {
			console.log({ create_contents_c_error: error });
			res.status(500).send({ error, message: 'Error Creating Content' });
		}
	},
	update_contents_c: async (req: any, res: any) => {
		const { params, body } = req;
		try {
			const content = await content_services.update_contents_s(params, body);
			if (content) {
				return res.status(200).send(content);
			}
			return res.status(500).send({ message: 'Error Updating Content' });
		} catch (error) {
			console.log({ update_contents_c_error: error });
			res.status(500).send({ error, message: 'Error Updating Content' });
		}
	},
	remove_contents_c: async (req: any, res: any) => {
		const { params } = req;
		try {
			const content = await content_services.remove_contents_s(params);
			if (content) {
				return res.status(204).send({ message: 'Content Deleted' });
			}
			return res.status(500).send({ message: 'Error Deleting Content' });
		} catch (error) {
			console.log({ remove_contents_c_error: error });
			res.status(500).send({ error, message: 'Error Deleting Content' });
		}
	}
};
