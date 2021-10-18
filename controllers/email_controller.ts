import { email_services } from '../services';
import nodemailer from 'nodemailer';
import App from '../email_templates/App';
import {
	account_created,
	password_reset,
	reset_password,
	contact,
	contact_confirmation
} from '../email_templates/pages/index';

const transporter = nodemailer.createTransport({
	service: 'gmail',
	pool: true,
	auth: {
		user: process.env.EMAIL,
		pass: process.env.PASSWORD
	}
});

export default {
	findAll_emails_c: async (req: any, res: any) => {
		const { query } = req;
		try {
			const emails = await email_services.findAll_emails_s(query);
			if (emails) {
				return res.status(200).send({ message: 'Emails Found', data: emails });
			}
			return res.status(404).send({ message: 'Emails Not Found' });
		} catch (error) {
			console.log({ findAll_emails_c_error: error });
			res.status(500).send({ error, message: 'Error Finding Emails' });
		}
	},
	findById_emails_c: async (req: any, res: any) => {
		const { params } = req;
		try {
			const email = await email_services.findById_emails_s(params);
			console.log({ email });
			if (email) {
				return res.status(200).send({ message: 'Email Found', data: email });
			}
			return res.status(404).send({ message: 'Email Not Found' });
		} catch (error) {
			console.log({ findById_emails_c_error: error });
			res.status(500).send({ error, message: 'Error Finding Email' });
		}
	},
	create_emails_c: async (req: any, res: any) => {
		const { body } = req;
		try {
			const email = await email_services.create_emails_s(body);
			if (email) {
				return res.status(201).send({ message: 'New Email Created', data: email });
			}
			return res.status(500).send({ message: 'Error Creating Email' });
		} catch (error) {
			console.log({ create_emails_c_error: error });
			res.status(500).send({ error, message: 'Error Creating Email' });
		}
	},
	update_emails_c: async (req: any, res: any) => {
		const { params, body } = req;
		try {
			const email = await email_services.update_emails_s(params, body);
			if (email) {
				return res.status(200).send({ message: 'Email Updated', data: email });
			}
			return res.status(500).send({ message: 'Error Updating Email' });
		} catch (error) {
			console.log({ update_emails_c_error: error });
			res.status(500).send({ error, message: 'Error Updating Email' });
		}
	},
	send_emails_c: async (req: any, res: any) => {
		const { body } = req;
		try {
			const email = await email_services.send_emails_s(body);
			transporter.sendMail(email, (error, data) => {
				if (error) {
					return res.status(500).send({ error, message: 'Error Updating Email' });
				} else {
					return res.status(200).send({ message: 'Email Updated', data: data });
				}
			});
		} catch (error) {
			console.log({ update_emails_c_error: error });
			res.status(500).send({ error, message: 'Error Updating Email' });
		}
	},
	send_all_emails_c: async (req: any, res: any) => {
		const { body } = req;
		try {
			console.log({ body });
			const email = await email_services.send_emails_s(body);
			transporter.sendMail(email, (error, data) => {
				if (error) {
					return res.status(500).send({ error, message: 'Error Updating Email' });
				} else {
					return res.status(200).send({ message: 'Email Updated', data: data });
				}
			});
		} catch (error) {
			console.log({ update_emails_c_error: error });
			res.status(500).send({ error, message: 'Error Updating Email' });
		}
	},
	remove_emails_c: async (req: any, res: any) => {
		const { params } = req;
		try {
			const email = await email_services.remove_emails_s(params);
			if (email) {
				return res.status(204).send({ message: 'Email Deleted' });
			}
			return res.status(500).send({ message: 'Error Deleting Email' });
		} catch (error) {
			console.log({ remove_emails_c_error: error });
			res.status(500).send({ error, message: 'Error Deleting Email' });
		}
	},
	send_user_contact_emails_c: async (req: any, res: any) => {
		const mailOptions = {
			to: process.env.DISPLAY_EMAIL,
			from: req.body.email,
			subject: `New message from ${req.body.first_name} - ${req.body.reason_for_contact}`,
			html: contact(req.body)
		};
		transporter.sendMail(mailOptions, (err, data) => {
			if (err) {
				console.log('Error Occurs', err);
				res.status(500).send({ error: err, message: 'Error Sending Email' });
			} else {
				console.log('Contact Email Sent to ' + req.body.first_name);
				res.status(200).send({ message: 'Email Successfully Sent' });
			}
		});
	},
	send_admin_contact_emails_c: async (req: any, res: any) => {
		const mailOptions = {
			from: process.env.DISPLAY_EMAIL,
			to: req.body.email,
			subject: `Thank you for Contacting Glow LEDs Support`,
			html: contact_confirmation(req.body)
		};
		transporter.sendMail(mailOptions, (err, data) => {
			if (err) {
				console.log('Error Occurs', err);
				res.status(500).send({ error: err, message: 'Error Sending Email' });
			} else {
				console.log('Contact Email Sent to ' + req.body.first_name);
				res.status(200).send({ message: 'Email Successfully Sent' });
			}
		});
	},
	send_password_reset_emails_c: async (req: any, res: any) => {
		console.log({ passwordreset: req.body });

		const mailOptions = {
			from: process.env.DISPLAY_EMAIL,
			to: req.body.data.email,
			subject: 'Glow LEDs Password Reset',
			html: App({ body: password_reset(req.body), title: 'Glow LEDs Password Reset' })
			// bcc: req.body.data.email
		};

		transporter.sendMail(mailOptions, (err, data) => {
			if (err) {
				console.log('Error Occurs', err);
				res.status(500).send({ error: err, message: 'Error Sending Email' });
			} else {
				console.log('Password Reset Email Sent to ' + req.body.data.first_name);
				res.status(200).send({ message: 'Email Successfully Sent' });
			}
		});
	},
	send_reset_password_emails_c: async (req: any, res: any) => {
		console.log({ reset_password: req.body });

		const mailOptions = {
			from: process.env.DISPLAY_EMAIL,
			to: req.body.email,
			subject: 'Glow LEDs Reset Password',
			html: App({ body: reset_password(req.body), title: 'Glow LEDs Reset Password' })
			// bcc: req.body.data.email
		};

		transporter.sendMail(mailOptions, (err, data) => {
			if (err) {
				console.log('Error Occurs', err);
				res.status(500).send({ error: err, message: 'Error Sending Email' });
			} else {
				console.log('Reset Password Email Sent to ' + req.body.first_name);
				res.status(200).send({ message: 'Email Successfully Sent' });
			}
		});
	},
	send_verified_emails_c: async (req: any, res: any) => {
		console.log({ register: req.body });

		const mailOptions = {
			from: process.env.DISPLAY_EMAIL,
			to: req.body.email,
			subject: 'Glow LEDs Account Created',
			html: App({ body: account_created(req.body), title: 'Glow LEDs Account Created' })
			// bcc: req.body.data.email
		};

		transporter.sendMail(mailOptions, (err, data) => {
			if (err) {
				console.log('Error Occurs', err);
				res.status(500).send({ error: err, message: 'Error Sending Email' });
			} else {
				console.log('Registration Email Sent to ' + req.body.first_name);
				res.status(200).send({ message: 'Email Successfully Sent' });
			}
		});
	}
};

// import { Email, User } from '../models';

// export {};
// import express from 'express';

// import nodemailer from 'nodemailer';
// require('dotenv').config();
// import App from '../email_templates/App';
// import {
// 	account_created,
// 	password_reset,
// 	reset_password,
// 	contact,
// 	contact_confirmation
// } from '../email_templates/pages/index';
// const sgMail = require('@sendgrid/mail');
// const PHE = require('print-html-element');

// const transporter = nodemailer.createTransport({
// 	service: 'gmail',
// 	pool: true,
// 	auth: {
// 		user: process.env.EMAIL,
// 		pass: process.env.PASSWORD
// 	}
// });

// export default {
// 	findAll: async (req: any, res: any) => {
// 		try {
// 			const email_type = req.query.category ? { email_type: req.query.category } : {};
// 			console.log(email_type);
// 			const search = req.query.search
// 				? {
// 						email_type: {
// 							$regex: req.query.search,
// 							$options: 'i'
// 						}
// 					}
// 				: {};

// 			let sortOrder = {};
// 			if (req.query.sortOrder === 'email type') {
// 				sortOrder = { email_type: 1 };
// 			} else if (req.query.sortOrder === 'newest' || req.query.sortOrder === '') {
// 				sortOrder = { _id: -1 };
// 			}

// 			const emails = await Email.find({ deleted: false, ...email_type, ...search }).sort(sortOrder);

// 			res.send(emails);
// 		} catch (error) {
// 			console.log({ error });

// 			res.status(500).send({ error, message: 'Error Getting Emails' });
// 		}
// 	},
// 	findById: async (req: any, res: any) => {
// 		try {
// 			const email = await Email.findOne({ _id: req.params.id });
// 			console.log({ email });
// 			console.log(req.params.id);
// 			if (email) {
// 				res.send(email);
// 			} else {
// 				res.status(404).send({ message: 'Email Not Found.' });
// 			}
// 		} catch (error) {
// 			console.log({ error });

// 			res.status(500).send({ error, message: 'Error Getting Email' });
// 		}
// 	},
// 	create: async (req: any, res: any) => {
// 		try {
// 			console.log({ create: req.body });
// 			const newEmail = await Email.create(req.body);
// 			console.log({ newEmail });
// 			if (newEmail) {
// 				return res.status(201).send({ message: 'New Email Created', data: newEmail });
// 			} else {
// 				return res.status(500).send({ message: ' Error in Creating Email.' });
// 			}
// 		} catch (error) {
// 			console.log({ error });
// 			console.log({ error });

// 			res.status(500).send({ error, message: 'Error Creating Email' });
// 		}
// 	},
// 	update: async (req: any, res: any) => {
// 		try {
// 			console.log({ email_routes_put: req.body });
// 			const email_id = req.params.id;
// 			const email: any = await Email.findById(email_id);
// 			if (email) {
// 				const updatedEmail = await Email.updateOne({ _id: email_id }, req.body);
// 				if (updatedEmail) {
// 					return res.status(200).send({ message: 'Email Updated', data: updatedEmail });
// 				}
// 			} else {
// 				return res.status(500).send({ message: ' Error in Updating Email.' });
// 			}
// 		} catch (error) {
// 			console.log({ error });

// 			res.status(500).send({ error, message: 'Error Getting Email' });
// 		}
// 	},
// 	remove: async (req: any, res: any) => {
// 		try {
// 			const message: any = { message: 'Email Deleted' };
// 			const deleted_email = await Email.updateOne({ _id: req.params.id }, { deleted: true });
// 			if (deleted_email) {
// 				res.send(message);
// 			} else {
// 				res.send('Error in Deletion.');
// 			}
// 		} catch (error) {
// 			console.log({ error });

// 			res.status(500).send({ error, message: 'Error Deleting Email' });
// 		}
// 	},
// send_announcement_email: async (req: any, res: any) => {
// 	// console.log({ template: req.body.template });
// 	const users = await User.find({ deleted: false, email_subscription: true });
// 	// const all_emails = users.map((user: any) => user.email).reverse();
// 	// console.log({ all_emails });
// 	const all_emails = users
// 		.filter((user: any) => user.deleted === false)
// 		.filter((user: any) => user.email_subscription === true)
// 		.map((user: any) => user.email);
// 	console.log({ all_emails });
// 	const test = [
// 		'lavacquek@icloud.com',
// 		'lavacquek@gmail.com',
// 		'livingkurt222@gmail.com',
// 		'destanyesalinas@gmail.com',
// 		'zestanye@gmail.com'
// 	];
// 	// const test = [ 'lavacquek@icloud.com' ];
// 	const emails: any = req.body.test ? test : all_emails;
// 	const mailOptions = {
// 		to: process.env.EMAIL,
// 		from: process.env.DISPLAY_EMAIL,
// 		subject: req.body.subject,
// 		html: req.body.template,
// 		bcc: emails
// 	};
// 	transporter.sendMail(mailOptions, (err, data) => {
// 		if (err) {
// 			console.log('Error Occurs', err);
// 			res.status(500).send({ error: err, message: 'Error Sending Email' });
// 		} else {
// 			console.log(req.body.subject);
// 			res.send(req.body.subject);
// 		}
// 	});

// 		// res.send('Order Email Sent to');
// 	},
// 	send_user_email: async (req: any, res: any) => {
// 		// console.log({ send_user_email: req.body });
// 		const test = [ 'lavacquek@icloud.com' ];
// 		const mailOptions = {
// 			to: req.body.email,
// 			from: process.env.DISPLAY_EMAIL,
// 			subject: req.body.subject,
// 			html: req.body.template
// 			// bcc: req.body.email
// 		};
// 		transporter.sendMail(mailOptions, (err, data) => {
// 			if (err) {
// 				console.log('Error Occurs', err);
// 				res.status(500).send({ error: err, message: 'Error Sending Email' });
// 			} else {
// 				console.log(req.body.subject);
// 				res.send(req.body.subject);
// 			}
// 		});
// 	},
// 	send_admin_email: async (req: any, res: any) => {
// 		// console.log({ send_user_email_created: req.body });
// 		const mailOptions = {
// 			to: process.env.EMAIL,
// 			from: process.env.DISPLAY_EMAIL,
// 			subject: req.body.subject,
// 			html: req.body.template
// 			// bcc: req.body.email
// 		};
// 		transporter.sendMail(mailOptions, (err, data) => {
// 			if (err) {
// 				console.log('Error Occurs', err);
// 				res.status(500).send({ error: err, message: 'Error Sending Email' });
// 			} else {
// 				console.log(req.body.subject);
// 				res.send(req.body.subject);
// 			}
// 		});
// 	},
// send_user_contact_email: async (req: any, res: any) => {
// 	// const data = req.body;
// 	console.log({ contact: req.body });
// 	// console.log(process.env.SENDGRID_SECRET);
// 	// sgMail.setApiKey(process.env.SENDGRID_SECRET);
// 	const mailOptions = {
// 		to: process.env.DISPLAY_EMAIL,
// 		from: req.body.email,
// 		subject: `New message from ${req.body.first_name} - ${req.body.reason_for_contact}`,
// 		html: contact(req.body)
// 		// bcc: req.body.email
// 	};
// 	transporter.sendMail(mailOptions, (err, data) => {
// 		if (err) {
// 			console.log('Error Occurs', err);
// 			res.status(500).send({ error: err, message: 'Error Sending Email' });
// 		} else {
// 			console.log('Contact Email Sent to ' + req.body.first_name);
// 			res.status(200).send({ message: 'Email Successfully Sent' });
// 		}
// 	});
// },
// send_admin_contact_email: async (req: any, res: any) => {
// 	// const data = req.body;
// 	console.log({ contact: req.body });
// 	// console.log(process.env.SENDGRID_SECRET);
// 	// sgMail.setApiKey(process.env.SENDGRID_SECRET);
// 	const mailOptions = {
// 		from: process.env.DISPLAY_EMAIL,
// 		to: req.body.email,
// 		subject: `Thank you for Contacting Glow LEDs Support`,
// 		html: contact_confirmation(req.body)
// 		// bcc: req.body.email
// 	};

// 	// try {
// 	// 	sgMail.send(mailOptions);
// 	// 	res.send(200);
// 	// } catch (err) {
// 	// 	res.status(422).send(err);
// 	// }
// 	transporter.sendMail(mailOptions, (err, data) => {
// 		if (err) {
// 			console.log('Error Occurs', err);
// 			res.status(500).send({ error: err, message: 'Error Sending Email' });
// 		} else {
// 			console.log('Contact Email Sent to ' + req.body.first_name);
// 			res.status(200).send({ message: 'Email Successfully Sent' });
// 		}
// 	});
// },
// send_password_reset_email: async (req: any, res: any) => {
// 	console.log({ passwordreset: req.body });

// 	const mailOptions = {
// 		from: process.env.DISPLAY_EMAIL,
// 		to: req.body.data.email,
// 		subject: 'Glow LEDs Password Reset',
// 		html: App({ body: password_reset(req.body), title: 'Glow LEDs Password Reset' })
// 		// bcc: req.body.data.email
// 	};

// 	transporter.sendMail(mailOptions, (err, data) => {
// 		if (err) {
// 			console.log('Error Occurs', err);
// 			res.status(500).send({ error: err, message: 'Error Sending Email' });
// 		} else {
// 			console.log('Password Reset Email Sent to ' + req.body.data.first_name);
// 			res.status(200).send({ message: 'Email Successfully Sent' });
// 		}
// 	});
// },
// send_reset_password_email: async (req: any, res: any) => {
// 	console.log({ reset_password: req.body });

// 	const mailOptions = {
// 		from: process.env.DISPLAY_EMAIL,
// 		to: req.body.email,
// 		subject: 'Glow LEDs Reset Password',
// 		html: App({ body: reset_password(req.body), title: 'Glow LEDs Reset Password' })
// 		// bcc: req.body.data.email
// 	};

// 	transporter.sendMail(mailOptions, (err, data) => {
// 		if (err) {
// 			console.log('Error Occurs', err);
// 			res.status(500).send({ error: err, message: 'Error Sending Email' });
// 		} else {
// 			console.log('Reset Password Email Sent to ' + req.body.first_name);
// 			res.status(200).send({ message: 'Email Successfully Sent' });
// 		}
// 	});
// },
// send_verified_email: async (req: any, res: any) => {
// 	console.log({ register: req.body });

// 	const mailOptions = {
// 		from: process.env.DISPLAY_EMAIL,
// 		to: req.body.email,
// 		subject: 'Glow LEDs Account Created',
// 		html: App({ body: account_created(req.body), title: 'Glow LEDs Account Created' })
// 		// bcc: req.body.data.email
// 	};

// 	transporter.sendMail(mailOptions, (err, data) => {
// 		if (err) {
// 			console.log('Error Occurs', err);
// 			res.status(500).send({ error: err, message: 'Error Sending Email' });
// 		} else {
// 			console.log('Registration Email Sent to ' + req.body.first_name);
// 			res.status(200).send({ message: 'Email Successfully Sent' });
// 		}
// 	});
// }
// };
