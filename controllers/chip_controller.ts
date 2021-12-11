import { chip_services } from '../services';

export default {
	findAll_chips_c: async (req: any, res: any) => {
		const { query } = req;
		try {
			const chips = await chip_services.findAll_chips_s(query);
			if (chips) {
				return res.status(200).send(chips);
			}
			return res.status(404).send({ message: 'Chips Not Found' });
		} catch (error) {
			console.log({ findAll_chips_c_error: error });
			res.status(500).send({ error, message: 'Error Finding Chips' });
		}
	},
	findById_chips_c: async (req: any, res: any) => {
		const { params } = req;
		try {
			const chip = await chip_services.findById_chips_s(params);
			if (chip) {
				return res.status(200).send(chip);
			}
			return res.status(404).send({ message: 'Chip Not Found' });
		} catch (error) {
			console.log({ findById_chips_c_error: error });
			res.status(500).send({ error, message: 'Error Finding Chip' });
		}
	},
	findByName_chips_c: async (req: any, res: any) => {
		const { params } = req;
		try {
			const chip = await chip_services.findByName_chips_s(params);
			if (chip) {
				return res.status(200).send(chip);
			}
			return res.status(404).send({ message: 'Chip Not Found' });
		} catch (error) {
			console.log({ findById_chips_c_error: error });
			res.status(500).send({ error, message: 'Error Finding Chip' });
		}
	},
	create_chips_c: async (req: any, res: any) => {
		const { body } = req;
		try {
			const chip = await chip_services.create_chips_s(body);
			if (chip) {
				return res.status(201).send(chip);
			}
			return res.status(500).send({ message: 'Error Creating Chip' });
		} catch (error) {
			console.log({ create_chips_c_error: error });
			res.status(500).send({ error, message: 'Error Creating Chip' });
		}
	},
	update_chips_c: async (req: any, res: any) => {
		const { params, body } = req;
		try {
			const chip = await chip_services.update_chips_s(params, body);
			if (chip) {
				return res.status(200).send(chip);
			}
			return res.status(500).send({ message: 'Error Updating Chip' });
		} catch (error) {
			console.log({ update_chips_c_error: error });
			res.status(500).send({ error, message: 'Error Updating Chip' });
		}
	},
	remove_chips_c: async (req: any, res: any) => {
		const { params } = req;
		try {
			const chip = await chip_services.remove_chips_s(params);
			if (chip) {
				return res.status(204).send({ message: 'Chip Deleted' });
			}
			return res.status(500).send({ message: 'Error Deleting Chip' });
		} catch (error) {
			console.log({ remove_chips_c_error: error });
			res.status(500).send({ error, message: 'Error Deleting Chip' });
		}
	}
};
