import { Chip } from '../models';

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

			const chips = await Chip.find({ deleted: false, ...category, ...searchKeyword })
				.sort(sortOrder)
				.populate('user');
			res.send(chips);
		} catch (error) {
			console.log({ error });

			res.status(500).send({ error, message: 'Error Getting Chips' });
		}
	},
	findById: async (req: any, res: any) => {
		try {
			const chip = await Chip.findOne({ _id: req.params.id }).populate('user');
			console.log({ chip });
			console.log(req.params.id);
			if (chip) {
				res.send(chip);
			} else {
				res.status(404).send({ message: 'Chip Not Found.' });
			}
		} catch (error) {
			console.log({ error });

			res.status(500).send({ error, message: 'Error Getting Chip' });
		}
	},
	create: async (req: any, res: any) => {
		try {
			const newChip = await Chip.create(req.body);
			if (newChip) {
				return res.status(201).send({ message: 'New Chip Created', data: newChip });
			} else {
				return res.status(500).send({ message: ' Error in Creating Chip.' });
			}
		} catch (error) {
			console.log({ error });
			res.status(500).send({ error, message: 'Error Creating Chip' });
		}
	},
	update: async (req: any, res: any) => {
		try {
			console.log({ chip_routes_put: req.body });
			const chip_id = req.params.id;
			const chip: any = await Chip.findById(chip_id);
			if (chip) {
				const updatedChip = await Chip.updateOne({ _id: chip_id }, req.body);
				if (updatedChip) {
					return res.status(200).send({ message: 'Chip Updated', data: updatedChip });
				}
			} else {
				return res.status(500).send({ message: ' Error in Updating Chip.' });
			}
		} catch (error) {
			console.log({ error });

			res.status(500).send({ error, message: 'Error Getting Chip' });
		}
	},
	remove: async (req: any, res: any) => {
		try {
			const message: any = { message: 'Chip Deleted' };
			const deleted_chip = await Chip.updateOne({ _id: req.params.id }, { deleted: true });
			if (deleted_chip) {
				res.send(message);
			} else {
				res.send('Error in Deletion.');
			}
		} catch (error) {
			console.log({ error });

			res.status(500).send({ error, message: 'Error Deleting Chip' });
		}
	}
};
