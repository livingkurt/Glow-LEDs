import { Email, User } from '../models';

export default {
	findAll_emails_db: async (filter: any, sort: any) => {
		try {
			console.log({ filter });
			return await Email.find(filter).sort(sort);
		} catch (error) {
			console.log({ findAll_emails_db_error: error });
			throw new Error(error.message);
		}
	},
	findById_emails_db: async (id: string) => {
		try {
			return await Email.findOne({ _id: id });
		} catch (error) {
			console.log({ findById_emails_db_error: error });
			throw new Error(error.message);
		}
	},
	create_emails_db: async (body: any) => {
		try {
			return await Email.create(body);
		} catch (error) {
			console.log({ create_emails_db_error: error });
			throw new Error(error.message);
		}
	},
	update_emails_db: async (id: string, body: any) => {
		try {
			const email: any = await Email.findOne({ _id: id });
			if (email) {
				return await Email.updateOne({ _id: id }, body);
			}
		} catch (error) {
			console.log({ update_emails_db_error: error });
			throw new Error(error.message);
		}
	},
	remove_emails_db: async (id: string) => {
		try {
			const email: any = await Email.findOne({ _id: id });
			if (email) {
				return await Email.updateOne({ _id: id }, { deleted: true });
			}
		} catch (error) {
			console.log({ remove_emails_db_error: error });
			throw new Error(error.message);
		}
	}
};
