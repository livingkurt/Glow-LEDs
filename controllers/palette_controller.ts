import { Palette } from '../models';

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
			} else if (req.query.sortOrder === 'newest' || req.query.sortOrder === '') {
				sortOrder = { name: 1 };
			}

			const palettes = await Palette.find({ deleted: false });

			res.send(palettes);
		} catch (error) {
			console.log({ error });

			res.status(500).send({ error, message: 'Error Getting Palettes' });
		}
	},
	findById: async (req: any, res: any) => {
		try {
			const palette = await Palette.findOne({ _id: req.params.id });
			console.log({ palette });
			console.log(req.params.id);
			if (palette) {
				res.send(palette);
			} else {
				res.status(404).send({ message: 'Palette Not Found.' });
			}
		} catch (error) {
			console.log({ error });

			res.status(500).send({ error, message: 'Error Getting Palette' });
		}
	},
	create: async (req: any, res: any) => {
		try {
			console.log({ palette: req.body });
			const newPalette = await Palette.create(req.body);
			if (newPalette) {
				return res.status(201).send({ message: 'New Palette Created', data: newPalette });
			} else {
				return res.status(500).send({ message: ' Error in Creating Palette.' });
			}
		} catch (error) {
			console.log({ error });

			res.status(500).send({ error, message: 'Error Creating Palette' });
		}
	},
	update: async (req: any, res: any) => {
		try {
			console.log({ palette_routes_put: req.body });
			const palette_id = req.params.id;
			const palette: any = await Palette.findById(palette_id);
			if (palette) {
				const updatedPalette = await Palette.updateOne({ _id: palette_id }, req.body);
				if (updatedPalette) {
					return res.status(200).send({ message: 'Palette Updated', data: updatedPalette });
				}
			} else {
				return res.status(500).send({ message: ' Error in Updating Palette.' });
			}
		} catch (error) {
			console.log({ error });

			res.status(500).send({ error, message: 'Error Getting Palette' });
		}
	},
	remove: async (req: any, res: any) => {
		try {
			const message: any = { message: 'Palette Deleted' };
			const deleted_palette = await Palette.updateOne({ _id: req.params.id }, { deleted: true });
			// const deleted_palette = await Palette.deleteOne({ _id: req.params.id });
			if (deleted_palette) {
				res.send(message);
			} else {
				res.send('Error in Deletion.');
			}
		} catch (error) {
			console.log({ error });

			res.status(500).send({ error, message: 'Error Deleting Palette' });
		}
	}
};
