import { User, Token } from '../models';
import { prnt } from '../util';
require('dotenv');

export default {
	findAll_users_db: async (filter: any, sort: any) => {
		try {
			return await User.find(filter).sort(sort).populate('affiliate');
		} catch (error) {
			console.log({ findAll_users_db_error: error });
			throw new Error(error.message);
		}
	},
	findById_users_db: async (id: string) => {
		try {
			return await User.findOne({ _id: id }).populate('affiliate');
		} catch (error) {
			console.log({ findById_users_db_error: error });
			throw new Error(error.message);
		}
	},
	findByEmail_users_db: async (email: string) => {
		try {
			return await User.findOne({ email }).populate('affiliate');
		} catch (error) {
			console.log({ findByEmail_users_db_error: error });
			throw new Error(error.message);
		}
	},
	create_users_db: async (user: any) => {
		prnt({ create_users_db: user });
		try {
			return await User.create(user);
		} catch (error) {
			console.log({ create_users_db_error: error });
			throw new Error(error.message);
		}
	},
	create_token_users_db: async (token: any) => {
		prnt({ create_users_db: token });
		try {
			return await Token.create(token);
		} catch (error) {
			console.log({ create_users_db_error: error });
			throw new Error(error.message);
		}
	},
	update_users_db: async (id: string, body: any) => {
		try {
			const user: any = await User.findOne({ _id: id });
			console.log({ user });
			if (user) {
				return await User.updateOne({ _id: id }, body);
			}
		} catch (error) {
			console.log({ update_users_db_error: error });
			throw new Error(error.message);
		}
	},
	remove_users_db: async (id: string) => {
		try {
			const user: any = await User.findOne({ _id: id });
			if (user) {
				return await User.updateOne({ _id: id }, { deleted: true });
			}
		} catch (error) {
			console.log({ remove_users_db_error: error });
			throw new Error(error.message);
		}
	}
};
