export {};
import { Log } from '../models';

export default {
	findAll: async (req: any, res: any) => {
		const category = req.query.category ? { category: req.query.category } : {};
		const search = req.query.search
			? {
					file: {
						$regex: req.query.search,
						$options: 'i'
					}
				}
			: {};

		const sort_query = req.query.sort.toLowerCase();
		let sort = {};
		if (sort_query === 'file') {
			sort = { file: 1 };
		} else if (sort_query === 'method') {
			sort = { method: 1 };
		} else if (sort_query === 'status') {
			sort = { status: -1 };
		} else if (sort_query === 'success') {
			sort = { success: -1 };
		} else if (sort_query === 'error') {
			sort = { error: -1 };
		} else if (sort_query === 'newest' || sort_query === '') {
			sort = { _id: -1 };
		}

		const logs = await Log.find({ deleted: false, ...category, ...search }).sort(sort).limit(100);
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
