import { paycheck_services } from '../services';

export default {
	findAll_paychecks_c: async (req: any, res: any) => {
		const { query } = req;
		try {
			const paychecks = await paycheck_services.findAll_paychecks_s(query);
			if (paychecks) {
				return res.status(200).send({ message: 'Paychecks Found', data: paychecks });
			}
			return res.status(404).send({ message: 'Paychecks Not Found' });
		} catch (error) {
			console.log({ findAll_paychecks_c_error: error });
			res.status(500).send({ error, message: 'Error Finding Paychecks' });
		}
	},
	findById_paychecks_c: async (req: any, res: any) => {
		const { params } = req;
		try {
			const paycheck = await paycheck_services.findById_paychecks_s(params);
			console.log({ paycheck });
			if (paycheck) {
				return res.status(200).send({ message: 'Paycheck Found', data: paycheck });
			}
			return res.status(404).send({ message: 'Paycheck Not Found' });
		} catch (error) {
			console.log({ findById_paychecks_c_error: error });
			res.status(500).send({ error, message: 'Error Finding Paycheck' });
		}
	},
	findMy_paychecks: async (req: any, res: any) => {
		const { params } = req;
		try {
			const paycheck = await paycheck_services.findMy_paychecks_s(params);
			console.log({ paycheck });
			if (paycheck) {
				return res.status(200).send({ message: 'Paycheck Found', data: paycheck });
			}
			return res.status(404).send({ message: 'Paycheck Not Found' });
		} catch (error) {
			console.log({ findById_paychecks_c_error: error });
			res.status(500).send({ error, message: 'Error Finding Paycheck' });
		}
	},
	create_paychecks_c: async (req: any, res: any) => {
		const { body } = req;
		try {
			const paycheck = await paycheck_services.create_paychecks_s(body);
			if (paycheck) {
				return res.status(201).send({ message: 'New Paycheck Created', data: paycheck });
			}
			return res.status(500).send({ message: 'Error Creating Paycheck' });
		} catch (error) {
			console.log({ create_paychecks_c_error: error });
			res.status(500).send({ error, message: 'Error Creating Paycheck' });
		}
	},
	update_paychecks_c: async (req: any, res: any) => {
		const { params, body } = req;
		try {
			const paycheck = await paycheck_services.update_paychecks_s(params, body);
			if (paycheck) {
				return res.status(200).send({ message: 'Paycheck Updated', data: paycheck });
			}
			return res.status(500).send({ message: 'Error Updating Paycheck' });
		} catch (error) {
			console.log({ update_paychecks_c_error: error });
			res.status(500).send({ error, message: 'Error Updating Paycheck' });
		}
	},
	remove_paychecks_c: async (req: any, res: any) => {
		const { params } = req;
		try {
			const paycheck = await paycheck_services.remove_paychecks_s(params);
			if (paycheck) {
				return res.status(204).send({ message: 'Paycheck Deleted' });
			}
			return res.status(500).send({ message: 'Error Deleting Paycheck' });
		} catch (error) {
			console.log({ remove_paychecks_c_error: error });
			res.status(500).send({ error, message: 'Error Deleting Paycheck' });
		}
	}
};

// import { Paycheck } from '../models';

// export default {
// 	findAll: async (req: any, res: any) => {
// 		try {
// 			const category = req.query.category ? { category: req.query.category } : {};
// 			const searchKeyword = req.query.searchKeyword
// 				? {
// 						facebook_name: {
// 							$regex: req.query.searchKeyword,
// 							$options: 'i'
// 						}
// 					}
// 				: {};

// 			let sortOrder = {};
// 			if (req.query.sortOrder === 'glover name') {
// 				sortOrder = { artist_name: 1 };
// 			} else if (req.query.sortOrder === 'facebook name') {
// 				sortOrder = { facebook_name: 1 };
// 			} else if (req.query.sortOrder === 'newest' || req.query.sortOrder === '') {
// 				sortOrder = { _id: -1 };
// 			}

// 			const paychecks = await Paycheck.find({ deleted: false, ...category, ...searchKeyword })
// 				.sort(sortOrder)
// 				.populate('user')
// 				.populate('affiliate')
// 				.populate('team');

// 			res.send(paychecks);
// 		} catch (error) {
// 			console.log({ error });

// 			res.status(500).send({ error, message: 'Error Getting Paychecks' });
// 		}
// 	},
// 	get_my_paychecks: async (req: any, res: any) => {
// 		console.log('get_my_paychecks');
// 		console.log({ affiliate: req.user.affiliate });
// 		try {
// 			const paychecks = await Paycheck.find({ deleted: false, affiliate: req.user.affiliate._id })
// 				.sort({ _id: -1 })
// 				.populate('affiliate');
// 			console.log({ paychecks });

// 			res.send(paychecks);
// 		} catch (error) {
// 			console.log({ error });

// 			res.status(500).send({ error, message: 'Error Getting Your Paychecks' });
// 		}
// 	},
// 	findById: async (req: any, res: any) => {
// 		try {
// 			const paycheck = await Paycheck.findOne({ _id: req.params.id }).populate('user').populate('affiliate');
// 			console.log({ paycheck });
// 			console.log(req.params.id);
// 			if (paycheck) {
// 				res.send(paycheck);
// 			} else {
// 				res.status(404).send({ message: 'Paycheck Not Found.' });
// 			}
// 		} catch (error) {
// 			console.log({ error });

// 			res.status(500).send({ error, message: 'Error Getting Paycheck' });
// 		}
// 	},
// 	create: async (req: any, res: any) => {
// 		try {
// 			console.log({ paycheck: req.body });
// 			const newPaycheck = await Paycheck.create(req.body);
// 			if (newPaycheck) {
// 				return res.status(201).send({ message: 'New Paycheck Created', data: newPaycheck });
// 			} else {
// 				return res.status(500).send({ message: ' Error in Creating Paycheck.' });
// 			}
// 		} catch (error) {
// 			console.log({ error });

// 			res.status(500).send({ error, message: 'Error Creating Paycheck' });
// 		}
// 	},
// 	update: async (req: any, res: any) => {
// 		try {
// 			console.log({ paycheck_routes_put: req.body });
// 			const paycheck_id = req.params.id;
// 			const paycheck: any = await Paycheck.findById(paycheck_id);
// 			if (paycheck) {
// 				const updatedPaycheck = await Paycheck.updateOne({ _id: paycheck_id }, req.body);
// 				if (updatedPaycheck) {
// 					return res.status(200).send({ message: 'Paycheck Updated', data: updatedPaycheck });
// 				}
// 			} else {
// 				return res.status(500).send({ message: ' Error in Updating Paycheck.' });
// 			}
// 		} catch (error) {
// 			console.log({ error });

// 			res.status(500).send({ error, message: 'Error Getting Paycheck' });
// 		}
// 	},
// 	remove: async (req: any, res: any) => {
// 		try {
// 			const message: any = { message: 'Paycheck Deleted' };
// 			const deleted_paycheck = await Paycheck.updateOne({ _id: req.params.id }, { deleted: true });
// 			// const deleted_paycheck = await Paycheck.deleteOne({ _id: req.params.id });
// 			if (deleted_paycheck) {
// 				res.send(message);
// 			} else {
// 				res.send('Error in Deletion.');
// 			}
// 		} catch (error) {
// 			console.log({ error });

// 			res.status(500).send({ error, message: 'Error Deleting Paycheck' });
// 		}
// 	}
// };
