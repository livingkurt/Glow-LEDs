import { User } from '../models';
import { user_services } from '../services';
import { getToken } from '../util';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');
const passport = require('passport');
require('dotenv');

export default {
	findAll_users_c: async (req: any, res: any) => {
		const { query } = req;
		try {
			const user = await user_services.findAll_users_s(query);
			if (user) {
				return res.status(200).send({ message: 'User Found', data: user });
			}
			return res.status(404).send({ message: 'User Not Found' });
		} catch (error) {
			console.log({ findById_users_c_error: error });
			res.status(500).send({ error, message: 'Error Finding User' });
		}
	},
	findById_users_c: async (req: any, res: any) => {
		const { params } = req;
		try {
			const user = await user_services.findById_users_s(params);
			if (user) {
				return res.status(200).send({ message: 'User Found', data: user });
			}
			return res.status(404).send({ message: 'User Not Found' });
		} catch (error) {
			console.log({ findById_users_c_error: error });
			res.status(500).send({ error, message: 'Error Finding User' });
		}
	},
	create_users_c: async (req: any, res: any) => {
		const { body } = req;
		try {
			const user = await user_services.create_users_s(body);
			if (user) {
				return res.status(200).send({ message: 'User Found', data: user });
			}
			return res.status(404).send({ message: 'User Not Found' });
		} catch (error) {
			console.log({ findById_users_c_error: error });
			res.status(500).send({ error, message: 'Error Finding User' });
		}
	},
	update_profile_users_c: async (req: any, res: any) => {
		const { params, body } = req;
		try {
			const user = await user_services.update_profile_users_s(params, body);
			if (user) {
				return res.status(200).send({ message: 'User Found', data: user });
			}
			return res.status(404).send({ message: 'User Not Found' });
		} catch (error) {
			console.log({ findById_users_c_error: error });
			res.status(500).send({ error, message: 'Error Finding User' });
		}
	},
	update_users_c: async (req: any, res: any) => {
		const { params, body } = req;
		try {
			const user = await user_services.update_users_s(params, body);
			if (user) {
				return res.status(200).send({ message: 'User Found', data: user });
			}
			return res.status(404).send({ message: 'User Not Found' });
		} catch (error) {
			console.log({ findById_users_c_error: error });
			res.status(500).send({ error, message: 'Error Finding User' });
		}
	},
	remove_users_c: async (req: any, res: any) => {
		const { params } = req;
		try {
			const user = await user_services.remove_users_s(params);
			if (user) {
				return res.status(200).send({ message: 'User Found', data: user });
			}
			return res.status(404).send({ message: 'User Not Found' });
		} catch (error) {
			console.log({ findById_users_c_error: error });
			res.status(500).send({ error, message: 'Error Finding User' });
		}
	},
	email_users_c: async (req: any, res: any) => {
		const { params } = req;
		try {
			const user = await user_services.email_users_s(params);
			if (user) {
				return res.status(200).send({ message: 'User Found', data: user });
			}
			return res.status(404).send({ message: 'User Not Found' });
		} catch (error) {
			console.log({ findById_users_c_error: error });
			res.status(500).send({ error, message: 'Error Finding User' });
		}
	},
	register_users_c: async (req: any, res: any) => {
		const { params, body } = req;
		try {
			const user = await user_services.register_users_s(params, body);
			if (user) {
				return res.status(200).send({ message: 'User Found', data: user });
			}
			return res.status(404).send({ message: 'User Not Found' });
		} catch (error) {
			console.log({ findById_users_c_error: error });
			res.status(500).send({ error, message: 'Error Finding User' });
		}
	},
	login_users_c: async (req: any, res: any) => {
		const { body } = req;
		try {
			const user = await user_services.login_users_s(body.email, body.password);
			console.log({ user });
			if (user) {
				return res.status(200).send({ message: 'User Found', data: user });
			}
			return res.status(404).send({ message: 'User Not Found' });
		} catch (error) {
			console.log({ findById_users_c_error: error });
			res.status(500).send({ error, message: 'Error Finding User' });
		}
	},
	password_reset_users_c: async (req: any, res: any) => {
		const { params } = req;
		try {
			const user = await user_services.password_reset_users_s(params);
			if (user) {
				return res.status(200).send({ message: 'User Found', data: user });
			}
			return res.status(404).send({ message: 'User Not Found' });
		} catch (error) {
			console.log({ findById_users_c_error: error });
			res.status(500).send({ error, message: 'Error Finding User' });
		}
	},
	reset_password_users_c: async (req: any, res: any) => {
		const { params } = req;
		try {
			const user = await user_services.reset_password_users_s(params);
			if (user) {
				return res.status(200).send({ message: 'User Found', data: user });
			}
			return res.status(404).send({ message: 'User Not Found' });
		} catch (error) {
			console.log({ findById_users_c_error: error });
			res.status(500).send({ error, message: 'Error Finding User' });
		}
	},
	verify_users_c: async (req: any, res: any) => {
		const { params } = req;
		try {
			const user = await user_services.verify_users_s(params);
			if (user) {
				return res.status(200).send({ message: 'User Found', data: user });
			}
			return res.status(404).send({ message: 'User Not Found' });
		} catch (error) {
			console.log({ findById_users_c_error: error });
			res.status(500).send({ error, message: 'Error Finding User' });
		}
	},
	get_user_users_c: async (req: any, res: any) => {
		const { params } = req;
		try {
			const user = await user_services.get_user_users_s(params);
			if (user) {
				return res.status(200).send({ message: 'User Found', data: user });
			}
			return res.status(404).send({ message: 'User Not Found' });
		} catch (error) {
			console.log({ findById_users_c_error: error });
			res.status(500).send({ error, message: 'Error Finding User' });
		}
	},
	checkemail_users_c: async (req: any, res: any) => {
		const { params } = req;
		try {
			const user = await user_services.checkemail_users_s(params);
			if (user) {
				return res.status(200).send({ message: 'User Found', data: user });
			}
			return res.status(404).send({ message: 'User Not Found' });
		} catch (error) {
			console.log({ findById_users_c_error: error });
			res.status(500).send({ error, message: 'Error Finding User' });
		}
	},
	createadmin_users_c: async (req: any, res: any) => {
		const { params } = req;
		try {
			const user = await user_services.createadmin_users_s(params);
			if (user) {
				return res.status(200).send({ message: 'User Found', data: user });
			}
			return res.status(404).send({ message: 'User Not Found' });
		} catch (error) {
			console.log({ findById_users_c_error: error });
			res.status(500).send({ error, message: 'Error Finding User' });
		}
	}
};
