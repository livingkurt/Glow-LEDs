import { Parcel } from '../models';

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

			const parcels = await Parcel.find({ deleted: false });

			res.send(parcels);
		} catch (error) {
			console.log({ error });

			res.status(500).send({ error, message: 'Error Getting Parcels' });
		}
	},
	findById: async (req: any, res: any) => {
		try {
			const parcel = await Parcel.findOne({ _id: req.params.id });
			console.log({ parcel });
			console.log(req.params.id);
			if (parcel) {
				res.send(parcel);
			} else {
				res.status(404).send({ message: 'Parcel Not Found.' });
			}
		} catch (error) {
			console.log({ error });

			res.status(500).send({ error, message: 'Error Getting Parcel' });
		}
	},
	create: async (req: any, res: any) => {
		try {
			console.log({ parcel: req.body });
			const newParcel = await Parcel.create(req.body);
			if (newParcel) {
				return res.status(201).send({ message: 'New Parcel Created', data: newParcel });
			} else {
				return res.status(500).send({ message: ' Error in Creating Parcel.' });
			}
		} catch (error) {
			console.log({ error });

			res.status(500).send({ error, message: 'Error Creating Parcel' });
		}
	},
	update: async (req: any, res: any) => {
		try {
			console.log({ parcel_routes_put: req.body });
			const parcel_id = req.params.id;
			const parcel: any = await Parcel.findById(parcel_id);
			if (parcel) {
				const updatedParcel = await Parcel.updateOne({ _id: parcel_id }, req.body);
				if (updatedParcel) {
					return res.status(200).send({ message: 'Parcel Updated', data: updatedParcel });
				}
			} else {
				return res.status(500).send({ message: ' Error in Updating Parcel.' });
			}
		} catch (error) {
			console.log({ error });

			res.status(500).send({ error, message: 'Error Getting Parcel' });
		}
	},
	remove: async (req: any, res: any) => {
		try {
			const message: any = { message: 'Parcel Deleted' };
			const deleted_parcel = await Parcel.updateOne({ _id: req.params.id }, { deleted: true });
			// const deleted_parcel = await Parcel.deleteOne({ _id: req.params.id });
			if (deleted_parcel) {
				res.send(message);
			} else {
				res.send('Error in Deletion.');
			}
		} catch (error) {
			console.log({ error });

			res.status(500).send({ error, message: 'Error Deleting Parcel' });
		}
	}
};
