export {};
import { Log } from '../models';

export default {
	findAll: async (req: any, res: any) => {
		const category = req.query.category ? { category: req.query.category } : {};
		const searchKeyword = req.query.searchKeyword
			? {
					file: {
						$regex: req.query.searchKeyword,
						$options: 'i'
					}
				}
			: {};

		let sortOrder = {};
		if (req.query.sortOrder === 'file') {
			sortOrder = { file: 1 };
		} else if (req.query.sortOrder === 'method') {
			sortOrder = { method: 1 };
		} else if (req.query.sortOrder === 'status') {
			sortOrder = { status: -1 };
		} else if (req.query.sortOrder === 'success') {
			sortOrder = { success: -1 };
		} else if (req.query.sortOrder === 'error') {
			sortOrder = { error: -1 };
		} else if (req.query.sortOrder === 'newest' || req.query.sortOrder === '') {
			sortOrder = { _id: -1 };
		}

		const logs = await Log.find({ deleted: false, ...category, ...searchKeyword }).sort(sortOrder).limit(100);
		// console.log(logs);
		res.send(logs);
	},
	findById: async (req: any, res: any) => {
		const log = await Log.findOne({ _id: req.params.id });
		// console.log({ log });
		if (log) {
			res.send(log);
		} else {
			res.status(404).send({ message: 'Log Not Found.' });
		}
	},
	create: async (req: any, res: any) => {
		const newLog = await Log.create(req.body);
		if (newLog) {
			return res.status(201).send({ message: 'New Log Created', data: newLog });
		}
		return res.status(500).send({ message: ' Error in Creating Log.' });
	},
	update: async (req: any, res: any) => {
		const logId = req.params.id;
		const log: any = await Log.findById(logId);
		if (log) {
			const updatedLog = await Log.updateOne({ _id: logId }, req.body);
			console.log({ log_routes_post: updatedLog });
			if (updatedLog) {
				return res.status(200).send({ message: 'Log Updated', data: updatedLog });
			}
		}
		return res.status(500).send({ message: ' Error in Updating Log.' });
	},
	remove: async (req: any, res: any) => {
		const log = await Log.findById(req.params.id);
		const message: any = { message: 'Log Deleted' };
		// const deleted_log = await updated_log.save();
		const deleted_log = await Log.updateOne({ _id: req.params.id }, { deleted: true });
		if (deleted_log) {
			// await deletedLog.remove();
			res.send(message);
		} else {
			res.send('Error in Deletion.');
		}
	}
};
