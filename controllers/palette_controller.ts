import { palette_services } from '../services';

export default {
	findAll_palettes_c: async (req: any, res: any) => {
		const { query } = req;
		try {
			const palettes = await palette_services.findAll_palettes_s(query);
			if (palettes) {
				return res.status(200).send(palettes);
			}
			return res.status(404).send({ message: 'Palettes Not Found' });
		} catch (error) {
			console.log({ findAll_palettes_c_error: error });
			res.status(500).send({ error, message: 'Error Finding Palettes' });
		}
	},
	findById_palettes_c: async (req: any, res: any) => {
		const { params } = req;
		try {
			const palette = await palette_services.findById_palettes_s(params);
			console.log({ palette });
			if (palette) {
				return res.status(200).send(palette);
			}
			return res.status(404).send({ message: 'Palette Not Found' });
		} catch (error) {
			console.log({ findById_palettes_c_error: error });
			res.status(500).send({ error, message: 'Error Finding Palette' });
		}
	},
	findMy_palettes: async (req: any, res: any) => {
		const { params } = req;
		try {
			const palette = await palette_services.findMy_palettes_s(params);
			console.log({ palette });
			if (palette) {
				return res.status(200).send(palette);
			}
			return res.status(404).send({ message: 'Paycheck Not Found' });
		} catch (error) {
			console.log({ findById_palettes_c_error: error });
			res.status(500).send({ error, message: 'Error Finding Paycheck' });
		}
	},
	create_palettes_c: async (req: any, res: any) => {
		const { body } = req;
		try {
			const palette = await palette_services.create_palettes_s(body);
			if (palette) {
				return res.status(201).send(palette);
			}
			return res.status(500).send({ message: 'Error Creating Palette' });
		} catch (error) {
			console.log({ create_palettes_c_error: error });
			res.status(500).send({ error, message: 'Error Creating Palette' });
		}
	},
	update_palettes_c: async (req: any, res: any) => {
		const { params, body } = req;
		try {
			const palette = await palette_services.update_palettes_s(params, body);
			if (palette) {
				return res.status(200).send(palette);
			}
			return res.status(500).send({ message: 'Error Updating Palette' });
		} catch (error) {
			console.log({ update_palettes_c_error: error });
			res.status(500).send({ error, message: 'Error Updating Palette' });
		}
	},
	remove_palettes_c: async (req: any, res: any) => {
		const { params } = req;
		try {
			const palette = await palette_services.remove_palettes_s(params);
			if (palette) {
				return res.status(204).send({ message: 'Palette Deleted' });
			}
			return res.status(500).send({ message: 'Error Deleting Palette' });
		} catch (error) {
			console.log({ remove_palettes_c_error: error });
			res.status(500).send({ error, message: 'Error Deleting Palette' });
		}
	}
};
