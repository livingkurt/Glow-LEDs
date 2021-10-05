import { user_db } from '../db';
import { User } from '../models';
import { getToken } from '../util';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');
const passport = require('passport');
require('dotenv');

export default {
	findAll_users_s: async (query: any) => {
		try {
			const category = query.category ? { category: query.category } : {};
			const searchKeyword = query.searchKeyword
				? {
						first_name: {
							$regex: query.searchKeyword,
							$options: 'i'
						}
					}
				: {};

			let sortOrder = {};
			if (query.sortOrder === 'first name') {
				sortOrder = { first_name: 1 };
			} else if (query.sortOrder === 'last name') {
				sortOrder = { last_name: 1 };
			} else if (query.sortOrder === 'newest' || query.sortOrder === '') {
				sortOrder = { _id: -1 };
			}
			return await user_db.findAll_users_db(searchKeyword, category, sortOrder);
		} catch (error) {
			console.log({ findAll_users_s_error: error });
			throw new Error(error.message);
		}
	},
	findById_users_s: async (params: any) => {
		try {
			return await user_db.findById_users_db(params.id);
		} catch (error) {
			console.log({ findById_users_s_error: error });
			throw new Error(error.message);
		}
	},
	create_users_s: async (body: any) => {
		try {
			let user: any = {};
			let hashed_password = '';
			const temporary_password = process.env.TEMP_PASS;
			return bcrypt.genSalt(10, (err: any, salt: any) => {
				return bcrypt.hash(temporary_password, salt, async (err: any, hash: any) => {
					if (err) throw err;
					hashed_password = hash;
					user = { ...body, password: hashed_password };
					return await user_db.create_users_db(user);
				});
			});
		} catch (error) {
			console.log({ create_users_s_error: error });
			throw new Error(error.message);
		}
	},
	update_profile_users_s: async (params: any, body: any) => {
		try {
			const user: any = await user_db.findById_users_db(params.id);
			if (user) {
				const updatedUser = await user_db.update_users_db(params.id, body);
				if (updatedUser) {
					const payload = {
						_id: updatedUser.id,
						first_name: updatedUser.first_name,
						last_name: updatedUser.last_name,
						email: updatedUser.email,
						affiliate: updatedUser.affiliate,
						cart: updatedUser.cart,
						email_subscription: updatedUser.email_subscription,
						shipping: updatedUser.shipping,
						is_affiliated: updatedUser.is_affiliated,
						isVerified: updatedUser.isVerified,
						isAdmin: updatedUser.isAdmin,
						token: getToken(updatedUser)
					};
					return jwt.sign(
						payload,
						config.JWT_SECRET,
						{
							expiresIn: '48hr'
						},
						(err: any, token: string) => {
							return {
								success: true,
								token: 'Bearer ' + token
							};
						}
					);
				}
			}
		} catch (error) {
			console.log({ update_chips_s_error: error });
			throw new Error(error.message);
		}
	},
	update_users_s: async (params: any, body: any) => {
		try {
			return await user_db.update_users_db(params.id, body);
		} catch (error) {
			console.log({ update_users_s_error: error });
			throw new Error(error.message);
		}
	},
	remove_users_s: async (params: any) => {
		try {
			return await user_db.remove_users_db(params.id);
		} catch (error) {
			console.log({ remove_users_s_error: error });
			throw new Error(error.message);
		}
	},
	email_users_s: async (params: any) => {
		try {
			return await user_db.findByEmail_users_db(params.id);
		} catch (error) {
			console.log({ email_users_s_error: error });
			throw new Error(error.message);
		}
	},
	register_users_s: async (params: any, body: any) => {
		const user: any = await user_db.findByEmail_users_db(params.email);
		if (user) {
			const isMatch = await bcrypt.compare(process.env.TEMP_PASS, user.password);
			if (isMatch) {
				return bcrypt.genSalt(10, (err: any, salt: any) => {
					return bcrypt.hash(body.password, salt, async (err: any, hash: any) => {
						if (err) throw err;
						user.password = hash;
						user.first_name = body.first_name;
						user.last_name = body.last_name;
						user.email = body.email;
						try {
							return await user_db.create_users_db(user);
						} catch (error) {
							console.log({ register_users_s_error: error });
							throw new Error('Error Registering User');
						}
					});
				});
			} else {
				throw new Error('User Already Exists');
			}
		} else {
			const newUser: any = new User({
				first_name: body.first_name,
				last_name: body.last_name,
				email: body.email,
				password: body.password,
				affiliate: body.affiliate,
				cart: body.cart,
				is_affiliated: body.is_affiliated,
				email_subscription: body.email_subscription,
				isAdmin: false,
				isVerified: true
			});

			return bcrypt.genSalt(10, (err: any, salt: any) => {
				return bcrypt.hash(newUser.password, salt, async (err: any, hash: any) => {
					if (err) throw err;
					newUser.password = hash;
					try {
						return await user_db.create_users_db(newUser);
					} catch (error) {
						console.log({ register_users_s_error: error });
						throw new Error('Error Registering User');
					}
				});
			});
		}
	},
	login_users_s: async (email: string, password: string) => {
		const user: any = await user_db.findByEmail_users_db(email);
		if (!user) {
			throw new Error('Email Not Found');
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (isMatch) {
			let response = {};
			const payload = {
				_id: user.id,
				first_name: user.first_name,
				last_name: user.last_name,
				email: user.email,
				affiliate: user.affiliate,
				cart: user.cart,
				email_subscription: user.email_subscription,
				is_affiliated: user.is_affiliated,
				isVerified: user.isVerified,
				isAdmin: user.isAdmin,
				shipping: user.shipping,
				token: getToken(user)
			};
			jwt.sign(
				payload,
				config.JWT_SECRET,
				{
					expiresIn: '48hr' // 1 year in seconds
				},
				(err: any, token: string) => {
					response = {
						success: true,
						token: 'Bearer ' + token
					};
				}
			);
			return response;
		} else {
			throw new Error('Password Incorrect');
		}
	},

	password_reset_users_s: async (req: any, res: any) => {
		try {
			const user: any = await User.findOne({ _id: req.body.user_id });
			if (!user) {
				return res.status(404).send({ message: 'User Does Not Exist' });
			} else {
				bcrypt.genSalt(10, (err: any, salt: any) => {
					bcrypt.hash(req.body.password, salt, async (err: any, hash: any) => {
						if (err) throw err;
						console.log({ new_password: req.body.password, hash: hash });
						const updated_user = await User.updateOne(
							{ _id: req.body.user_id },
							{ ...req.body, password: hash }
						);
						console.log({ user_after_password_change: updated_user });

						res.status(202).send({ message: 'Password Saved', data: user });
					});
				});
			}
		} catch (error) {
			console.log({ password_reset_users_error: error });

			res.status(500).send({ error, message: 'Error Resetting User Password' });
		}
	},
	reset_password_users_s: async (req: any, res: any) => {
		try {
			const email = req.body.email;
			const user = await User.findOne({ email });
			console.log({ user });
			if (user) {
				res.send(user);
			} else {
				res.status(404).send({ message: 'User Not Found' });
			}
		} catch (error) {
			console.log({ reset_password_user_error: error });

			res.status(500).send({ error, message: 'Error Creating User' });
		}
	},
	verify_users_s: async (req: any, res: any) => {
		try {
			const userId = req.params.id;
			console.log({ verify: userId });
			const user: any = await User.findById(userId).populate('affiliate');
			if (user) {
				user.first_name = req.body.first_name || user.first_name;
				user.last_name = req.body.last_name || user.last_name;
				user.email = req.body.email || user.email;
				user.password = req.body.password || user.password;
				user.isAdmin = req.body.isAdmin || user.isAdmin;
				user.cart = req.body.cart || user.cart;
				user.email_subscription = req.body.email_subscription || user.email_subscription;
				user.is_affiliated = req.body.is_affiliated || user.is_affiliated;
				user.isVerified = true;
				user.deleted = req.body.deleted || false;
				const updatedUser = await user.save();
				if (updatedUser) {
					// const updatedUser = await User.updateOne({ _id: userId }, user);
					console.log({ updatedUser });
					res.send({
						_id: updatedUser.id,
						first_name: updatedUser.first_name,
						last_name: updatedUser.last_name,
						email: updatedUser.email,
						affiliate: updatedUser.affiliate,
						email_subscription: updatedUser.email_subscription,
						is_affiliated: updatedUser.is_affiliated,
						// isVerified: updatedUser.isVerified,
						shipping: updatedUser.shipping
						// token: getToken(updatedUser)
					});
				} else {
					return res.status(500).send({ message: ' Error in Updating User.' });
				}
				// res.status(202).send({ message: 'Verified Account' });
			} else {
				res.status(404).send({ message: 'User Not Found' });
			}
		} catch (error) {
			console.log({ verify_user_error: error });

			res.status(500).send({ error, message: 'Error Verifying User' });
		}
	},
	get_user_users_s: async (req: any, res: any) => {
		try {
			const user: any = await User.findOne({ _id: req.params.id }).populate('affiliate');
			if (!user) {
				return res.status(400).send({ message: "User Doesn't Exist" });
			}
			// Check password
			const isMatch = await bcrypt.compare(req.body.current_password, user.password);
			if (isMatch) {
				// console.log({ user })

				res.send({
					_id: user.id,
					first_name: user.first_name,
					last_name: user.last_name,
					email: user.email,
					password: user.password,
					isAdmin: user.isAdmin,
					cart: user.cart,
					isVerified: user.isVerified,
					affiliate: user.affiliate,
					is_affiliated: user.is_affiliated,
					email_subscription: user.email_subscription,
					shipping: user.shipping,
					token: getToken(user)
				});
			} else {
				return res.status(500).send({ message: 'Error Getting User' });
			}
		} catch (error) {
			console.log({ get_user_user_error: error });

			res.status(500).send({ error, message: 'Error Getting User' });
		}
	},
	checkemail_users_s: async (req: any, res: any) => {
		try {
			console.log({ email: req.body.email });
			const user: any = await User.findOne({ email: req.body.email });
			console.log(user);
			if (user) {
				return res.status(400).send({ message: 'User Already Exists' });
			}
			// res.json({ message: "User Already Exists" })
			res.status(200).send({ message: 'No User Found' });
		} catch (error) {
			console.log({ checkemail_user_error: error });
			res.send(error);
		}
	},
	createadmin_users_s: async (req: any, res: any) => {
		try {
			const admin: any = new User({
				first_name: 'Kurt',
				last_name: 'LaVacque',
				email: 'lavacquek@icloud.com',
				password: 'admin',
				isVerified: true,
				isAdmin: true
			});
			const user = await User.findOne({ email: admin.email }).populate('affiliate');
			if (user) {
				return res.status(400).send({ message: 'Email already exists' });
			} else {
				bcrypt.genSalt(10, (err: any, salt: any) => {
					bcrypt.hash(admin.password, salt, async (err: any, hash: any) => {
						if (err) throw err;
						admin.password = hash;
						await admin.save();
						res.json({
							_id: admin.id,
							first_name: admin.first_name,
							last_name: admin.last_name,
							email: admin.email,
							affiliate: admin.affiliate,
							cart: admin.cart,
							is_affiliated: admin.is_affiliated,
							email_subscription: admin.email_subscription,
							isAdmin: admin.isAdmin,
							isVerified: admin.isVerified,
							shipping: admin.shipping,
							token: getToken(admin)
						});
					});
				});
			}
		} catch (error) {
			console.log({ createadmin_user_error: error });
			res.send(error);
		}
	}
};
