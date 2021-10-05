import { user_db } from '../db';
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
			console.log({ findAll_users_c_error: error });
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
			console.log({ create_users_c_error: error });
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
			console.log({ update_profile_users_c_error: error });
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
			console.log({ update_users_c_error: error });
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
			console.log({ remove_users_c_error: error });
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
			console.log({ email_users_c_error: error });
			res.status(500).send({ error, message: 'Error Finding User' });
		}
	},
	register_users_c: async (req: any, res: any) => {
		const { body } = req;
		try {
			const { user, matched } = await user_services.register_users_s(body);
			console.log({ user, matched });
			bcrypt.genSalt(10, (err: any, salt: any) => {
				bcrypt.hash(req.body.password, salt, async (err: any, hash: any) => {
					if (err) throw err;
					if (matched) {
						user.password = hash;
						user.first_name = req.body.first_name;
						user.last_name = req.body.last_name;
						user.email = req.body.email;
					} else {
						user.password = hash;
					}
					try {
						const new_user = await user_db.create_users_db(user);
						console.log({ new_user });
						return res.status(200).send({ message: 'New User Registered', data: new_user });
					} catch (error) {
						console.log({ error });
						res.status(500).json({ message: 'Error Registering User', error });
					}
				});
			});
		} catch (error) {
			console.log({ register_users_c_error: error });
			res.status(500).send({ error, message: 'Error Registering User' });
		}
	},
	login_users_c: async (req: any, res: any) => {
		const { body } = req;
		try {
			const user = await user_services.login_users_s(body.email, body.password);
			if (user) {
				return jwt.sign(
					user,
					config.JWT_SECRET,
					{
						expiresIn: '48hr'
					},
					(err: any, token: string) => {
						return res.status(200).send({
							message: 'User Found',
							data: {
								success: true,
								token: 'Bearer ' + token
							}
						});
					}
				);
			}
			return res.status(404).send({ message: 'User Not Found' });
		} catch (error) {
			console.log({ login_users_c_error: error });
			res.status(500).send({ error, message: 'Error Finding User' });
		}
	},
	password_reset_users_c: async (req: any, res: any) => {
		const { body } = req;
		try {
			const user = await user_services.password_reset_users_s(body);
			bcrypt.genSalt(10, (err: any, salt: any) => {
				bcrypt.hash(body.password, salt, async (err: any, hash: any) => {
					if (err) throw err;
					try {
						user.password = hash;
						const new_user = await user_db.update_users_db(user._id, user);
						return res.status(200).send({ message: 'Password Updated', data: new_user });
					} catch (error) {
						console.log({ error });
						res.status(500).json({ message: 'Error Registering User', error });
					}
				});
			});
		} catch (error) {
			console.log({ password_reset_users_c_error: error });
			res.status(500).send({ error, message: 'Error Registering User' });
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
			console.log({ reset_password_users_c_error: error });
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
			console.log({ verify_users_c_error: error });
			res.status(500).send({ error, message: 'Error Finding User' });
		}
	},
	check_password_c: async (req: any, res: any) => {
		const { params, body } = req;
		console.log({ params, body });
		try {
			const user = await user_services.check_password_s(params, body);
			console.log({ check_password_c: user });
			if (user !== undefined) {
				return res.status(200).send({ message: 'User Found', data: user });
			}
			return res.status(404).send({ message: 'User Not Found' });
		} catch (error) {
			console.log({ check_password_c_error: error });
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
			console.log({ checkemail_users_c_error: error });
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
			console.log({ createadmin_users_c_error: error });
			res.status(500).send({ error, message: 'Error Finding User' });
		}
	}
};
