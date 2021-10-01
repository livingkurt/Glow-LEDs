import { User } from '../models';
import { getToken } from '../util';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');
const passport = require('passport');
require('dotenv');

// router.get('/', isAuth, async (req: any, res: { send: (arg0: any) => void }) => {
// 	const users = await User.find({ deleted: false }).populate('user').sort({ createdAt: -1 });
// 	res.send(users);
// });

// const validateRegisterInput = require('../validation/register');
// const validateLoginInput = require('../validation/login');

export default {
	email: async (req: any, res: any) => {
		try {
			const user = await User.findOne({ email: req.params.email }).populate('affiliate');
			if (user) {
				res.send(user);
			} else {
				res.status(404).send('Order Not Found.');
			}
		} catch (error) {
			console.log({ email__usererror: error });

			res.status(500).send({ error, message: 'Error Getting User' });
		}
	},
	register: async (req: any, res: any) => {
		// Form validation

		const user: any = await User.findOne({ email: req.body.email });
		console.log({ user });

		if (user) {
			console.log('User Exists');
			const isMatch = await bcrypt.compare(process.env.TEMP_PASS, user.password);
			if (isMatch) {
				bcrypt.genSalt(10, (err: any, salt: any) => {
					bcrypt.hash(req.body.password, salt, async (err: any, hash: any) => {
						if (err) throw err;
						// Check password
						user.password = hash;
						user.first_name = req.body.first_name;
						user.last_name = req.body.last_name;
						user.email = req.body.email;
						await user.save().then((user: any) => res.json(user)).catch((err: any) => {
							console.log({ err });
							res.status(500).json({ message: 'Error Registering User' });
						});

						// res.status(202).send({ message: 'Password Saved', data: user });
					});
				});
			} else {
				res.status(500).json({ message: 'User Already Exists' });
			}
			// return res.status(400).json({ message: 'Email already exists' });
		} else {
			console.log('User Does Not Exists');
			const newUser: any = new User({
				first_name: req.body.first_name,
				last_name: req.body.last_name,
				email: req.body.email,
				password: req.body.password,
				affiliate: req.body.affiliate,
				cart: req.body.cart,
				is_affiliated: req.body.is_affiliated,
				email_subscription: req.body.email_subscription,
				isAdmin: false,
				isVerified: true
			});

			// Hash password before saving in database
			bcrypt.genSalt(10, (err: any, salt: any) => {
				bcrypt.hash(newUser.password, salt, (err: any, hash: any) => {
					if (err) throw err;
					newUser.password = hash;
					newUser.save().then((user: any) => res.json(user)).catch((err: any) => {
						res.status(500).json({ message: 'Error Registering User' });
					});
				});
			});
		}
	},
	login: async (req: any, res: any) => {
		// Form validation

		// const { errors, isValid } = validateLoginInput(req.body);

		// // Check validation
		// if (!isValid) {
		// 	return res.status(400).json(errors);
		// }

		const email = req.body.email;
		const password = req.body.password;

		// Find user by email
		const user: any = await User.findOne({ email }).populate('affiliate').populate({ path: 'affiliate.chips' }); // .populate({
		// Check if user exists
		if (!user) {
			return res.status(404).json({ message: 'Email not found' });
		}
		// Check password
		const isMatch = await bcrypt.compare(password, user.password);
		if (isMatch) {
			// User matched
			// Create JWT Payload
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

			// Sign token
			jwt.sign(
				payload,
				config.JWT_SECRET,
				{
					expiresIn: '48hr' // 1 year in seconds
				},
				(err: any, token: string) => {
					res.json({
						success: true,
						token: 'Bearer ' + token
					});
				}
			);
		} else {
			return res.status(400).json({ message: 'Password incorrect' });
		}
	},
	findAll: async (req: any, res: any) => {
		try {
			const category = req.query.category ? { category: req.query.category } : {};
			const searchKeyword = req.query.searchKeyword
				? {
						first_name: {
							$regex: req.query.searchKeyword,
							$options: 'i'
						}
					}
				: {};

			let sortOrder = {};
			if (req.query.sortOrder === 'first name') {
				sortOrder = { first_name: 1 };
			} else if (req.query.sortOrder === 'last name') {
				sortOrder = { last_name: 1 };
			} else if (req.query.sortOrder === 'newest' || req.query.sortOrder === '') {
				sortOrder = { _id: -1 };
			}

			const users = await User.find({ deleted: false, ...category, ...searchKeyword })
				.populate('affiliate')
				.sort(sortOrder);

			res.send(users);
		} catch (error) {
			console.log({ findAll_users_error: error });

			res.status(500).send({ error, message: 'Error Getting Users' });
		}
	},
	findById: async (req: any, res: any) => {
		try {
			const user = await User.findOne({ _id: req.params.id }).populate('affiliate');
			// .populate('affiliate.private_code')
			// .populate('affiliate.public_code')
			// .populate('affiliate.chips')
			// .populate('affiliate.products');
			if (user) {
				res.send(user);
			} else {
				res.status(404).send('Order Not Found.');
			}
		} catch (error) {
			console.log({ findById_users_error: error });

			res.status(500).send({ error, message: 'Error Getting User' });
		}
	},
	create: async (req: any, res: any) => {
		try {
			let user: any = {};
			let hashed_password = '';
			const temporary_password = process.env.TEMP_PASS;
			bcrypt.genSalt(10, (err: any, salt: any) => {
				bcrypt.hash(temporary_password, salt, async (err: any, hash: any) => {
					if (err) throw err;
					hashed_password = hash;
					user = { ...req.body, password: hashed_password };
					const newUser = await User.create(user);
					if (newUser) {
						return res.status(201).send({ message: 'New User Created', data: newUser });
					} else {
						return res.status(500).send({ message: ' Error in Creating User.' });
					}
				});
			});
		} catch (error) {
			console.log({ create_users_error: error });

			res.status(500).send({ error, message: 'Error Creating User' });
		}
	},
	update_profile: async (req: any, res: any) => {
		try {
			console.log({ '/update/:id': req.body });
			// try {
			const userId = req.params.id;

			const user: any = await User.findById(userId).populate({ path: 'affiliate.chips' });
			// .populate({
			// 	path: 'affiliate',
			// 	populate: {
			// 		path: 'public_code',
			// 		model: 'Affiliate'
			// 	}
			// });
			// .populate('affiliate.private_code')
			// .populate({ path: 'affiliate', populate: { path: 'private_code' } })
			// .populate({ path: 'affiliate', populate: { path: 'public_code' } })
			// .populate({ path: 'affiliate', populate: { path: 'chips' } })
			// .populate({ path: 'affiliate', populate: { path: 'products' } });
			// .populate('affiliate.public_code')
			// .populate('affiliate.chips')
			// .populate('affiliate.products');
			// console.log({ user });
			if (user) {
				const updatedUser = await User.updateOne({ _id: userId }, req.body);
				console.log({ updatedUser });
				if (updatedUser) {
					// const updatedUser = await User.updateOne({ _id: userId }, user);
					// console.log({ updatedUser });
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
					// Sign token
					jwt.sign(
						payload,
						config.JWT_SECRET,
						{
							expiresIn: '48hr' // 1 year in seconds
						},
						(err: any, token: string) => {
							res.json({
								success: true,
								token: 'Bearer ' + token
							});
						}
					);
				} else {
					return res.status(500).send({ message: ' Error in Updating User.' });
				}
			} else {
				res.status(404).send({ message: 'User Not Found' });
			}
		} catch (error) {
			console.log({ update_profile_users_error: error });

			res.status(500).send({ error, message: 'Error Creating User' });
		}
	},
	update: async (req: any, res: any) => {
		try {
			console.log({ user_routes_put: req.body });
			const userId = req.params.id;
			const user: any = await User.findById(userId);
			if (user) {
				const updatedUser = await User.updateOne({ _id: userId }, req.body);
				if (updatedUser) {
					return res.status(200).send({ message: 'User Updated', data: updatedUser });
				}
			} else {
				return res.status(500).send({ message: ' Error in Updating User.' });
			}
		} catch (error) {
			console.log({ update_users_error: error });

			res.status(500).send({ error, message: 'Error Creating User' });
		}
	},
	remove: async (req: any, res: any) => {
		try {
			const user = await User.findById(req.params.id);

			const message: any = { message: 'User Deleted' };
			const deleted_user = await User.updateOne({ _id: req.params.id }, { deleted: true });
			if (deleted_user) {
				res.send(message);
			} else {
				res.send('Error in Deletion.');
			}
		} catch (error) {
			console.log({ remove_users_error: error });

			res.status(500).send({ error, message: 'Error Deleting User' });
		}
	},
	password_reset: async (req: any, res: any) => {
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
	reset_password: async (req: any, res: any) => {
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
	verify: async (req: any, res: any) => {
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
	get_user: async (req: any, res: any) => {
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
	checkemail: async (req: any, res: any) => {
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
	createadmin: async (req: any, res: any) => {
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
