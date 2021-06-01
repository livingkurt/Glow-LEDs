export {};
import express from 'express';
import Email from '../models/email';
import User from '../models/user';
const { isAuth, isAdmin } = require('../util');
import nodemailer from 'nodemailer';
require('dotenv').config();
import { log_error, log_request } from '../util';
import App from '../email_templates/App';
import {
	account_created,
	password_reset,
	reset_password,
	contact,
	contact_confirmation
} from '../email_templates/pages/index';
const sgMail = require('@sendgrid/mail');
const PHE = require('print-html-element');

const router = express.Router();
router.get('/', async (req, res) => {
	try {
		const email_type = req.query.category ? { email_type: req.query.category } : {};
		console.log(email_type);
		const searchKeyword = req.query.searchKeyword
			? {
					email_type: {
						$regex: req.query.searchKeyword,
						$options: 'i'
					}
				}
			: {};

		let sortOrder = {};
		if (req.query.sortOrder === 'email type') {
			sortOrder = { email_type: 1 };
		} else if (req.query.sortOrder === 'newest' || req.query.sortOrder === '') {
			sortOrder = { _id: -1 };
		}

		const emails = await Email.find({ deleted: false, ...email_type, ...searchKeyword }).sort(sortOrder);
		log_request({
			method: 'GET',
			path: req.originalUrl,
			collection: 'Email',
			data: emails,
			status: 200,
			success: true,
			ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
		});
		res.send(emails);
	} catch (error) {
		log_error({
			method: 'GET',
			path: req.originalUrl,
			collection: 'Email',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Getting Emails' });
	}
});

// router.get('/:id', async (req, res) => {
// 	const email = await Email.findOne({ _id: req.params.id });
// 	// console.log({ email });
// 	if (email) {
// 		res.send(email);
// 	} else {
// 		res.status(404).send({ message: 'Email Not Found.' });
// 	}
// });

router.get('/:id', async (req, res) => {
	try {
		const email = await Email.findOne({ _id: req.params.id });
		console.log({ email });
		console.log(req.params.id);
		if (email) {
			log_request({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Email',
				data: [ email ],
				status: 200,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			res.send(email);
		} else {
			log_request({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Email',
				data: [ email ],
				status: 404,
				success: false,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			res.status(404).send({ message: 'Email Not Found.' });
		}
	} catch (error) {
		log_error({
			method: 'GET',
			path: req.originalUrl,
			collection: 'Email',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Getting Email' });
	}
});

// router.put('/:id', isAuth, isAdmin, async (req, res) => {
// 	console.log({ put: req.body });
// 	const emailId = req.params.id;
// 	const email: any = await Email.findById(emailId);
// 	if (email) {
// 		const updatedEmail = await Email.updateOne({ _id: emailId }, req.body);
// 		console.log({ email_routes_post: updatedEmail });
// 		if (updatedEmail) {
// 			return res.status(200).send({ message: 'Email Updated', data: updatedEmail });
// 		}
// 	}
// 	return res.status(500).send({ message: ' Error in Updating Email.' });
// });

router.put('/:id', isAuth, isAdmin, async (req, res) => {
	try {
		console.log({ email_routes_put: req.body });
		const email_id = req.params.id;
		const email: any = await Email.findById(email_id);
		if (email) {
			const updatedEmail = await Email.updateOne({ _id: email_id }, req.body);
			if (updatedEmail) {
				log_request({
					method: 'PUT',
					path: req.originalUrl,
					collection: 'Email',
					data: [ email ],
					status: 200,
					success: true,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				return res.status(200).send({ message: 'Email Updated', data: updatedEmail });
			}
		} else {
			log_error({
				method: 'PUT',
				path: req.originalUrl,
				collection: 'Email',
				data: [ email ],
				status: 500,
				success: false,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			return res.status(500).send({ message: ' Error in Updating Email.' });
		}
	} catch (error) {
		log_error({
			method: 'PUT',
			path: req.originalUrl,
			collection: 'Email',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Getting Email' });
	}
});

router.delete('/:id', isAuth, isAdmin, async (req: { params: { id: any } }, res: { send: (arg0: string) => void }) => {
	const email = await Email.findById(req.params.id);
	const message: any = { message: 'Email Deleted' };
	// const deleted_email = await updated_email.save();
	const deleted_email = await Email.updateOne({ _id: req.params.id }, { deleted: true });
	if (deleted_email) {
		// await deletedEmail.remove();
		res.send(message);
	} else {
		res.send('Error in Deletion.');
	}
});

router.delete('/:id', isAuth, isAdmin, async (req: any, res: any) => {
	try {
		const message: any = { message: 'Email Deleted' };
		const deleted_email = await Email.updateOne({ _id: req.params.id }, { deleted: true });
		if (deleted_email) {
			log_request({
				method: 'DELETE',
				path: req.originalUrl,
				collection: 'Email',
				data: [ deleted_email ],
				status: 200,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			res.send(message);
		} else {
			log_request({
				method: 'DELETE',
				path: req.originalUrl,
				collection: 'Email',
				data: [ deleted_email ],
				status: 500,
				success: false,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			res.send('Error in Deletion.');
		}
	} catch (error) {
		log_error({
			method: 'DELETE',
			path: req.originalUrl,
			collection: 'Email',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Deleting Email' });
	}
});

// router.post('/', async (req, res) => {
// 	const newProduct = await Email.create(req.body);
// 	if (newProduct) {
// 		return res.status(201).send({ message: 'New Email Created', data: newProduct });
// 	}
// 	return res.status(500).send({ message: ' Error in Creating Email.' });
// });

router.post('/', isAuth, isAdmin, async (req: any, res: any) => {
	try {
		const newEmail = await Email.create(req.body);
		if (newEmail) {
			log_request({
				method: 'POST',
				path: req.originalUrl,
				collection: 'Email',
				data: [ newEmail ],
				status: 201,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			return res.status(201).send({ message: 'New Email Created', data: newEmail });
		} else {
			log_request({
				method: 'POST',
				path: req.originalUrl,
				collection: 'Email',
				data: [ newEmail ],
				status: 500,
				success: false,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			return res.status(500).send({ message: ' Error in Creating Email.' });
		}
	} catch (error) {
		log_error({
			method: 'POST',
			path: req.originalUrl,
			collection: 'Email',
			error,
			status: 500,
			success: false
		});
		res.status(500).send({ error, message: 'Error Creating Email' });
	}
});

let transporter = nodemailer.createTransport({
	service: 'gmail',
	pool: true,
	auth: {
		user: process.env.EMAIL,
		pass: process.env.PASSWORD
	}
});
// let transporter = nodemailer.createTransport({
// 	host: 'mail.domain.com',
// 	port: 465,
// 	secure: true,
// 	auth: {
// 		user: process.env.EMAIL,
// 		pass: process.env.PASSWORD
// 	},
// 	tls: {
// 		rejectUnauthorized: false
// 	}
// });

// const transporter = nodemailer.createTransport(`smtps://${process.env.EMAIL}:${process.env.PASSWORD}@smtp.gmail.com`);

// console.log({
// 	user: process.env.EMAIL,
// 	pass: process.env.PASSWORD
// });

router.post('/announcement', async (req, res) => {
	// console.log({ template: req.body.template });
	const users = await User.find({ email_subscription: true });
	// const all_emails = users.map((user: any) => user.email).reverse();
	// console.log({ all_emails });
	const all_emails = users.filter((user: any) => user.email_subscription === true).map((user: any) => user.email);
	console.log({ all_emails });
	const test = [
		'lavacquek@icloud.com',
		'lavacquek@gmail.com',
		'livingkurt222@gmail.com',
		'destanyesalinas@gmail.com',
		'zestanye@gmail.com'
	];
	// const test = [ 'lavacquek@icloud.com' ];
	let emails: any = req.body.test ? test : all_emails;
	let mailOptions = {
		to: process.env.EMAIL,
		from: process.env.DISPLAY_EMAIL,
		subject: req.body.subject,
		html: req.body.template,
		bcc: emails
	};
	transporter.sendMail(mailOptions, (err, data) => {
		if (err) {
			console.log('Error Occurs', err);
			res.status(500).send({ error: err, message: 'Error Sending Email' });
		} else {
			console.log(req.body.subject);
			res.send(req.body.subject);
		}
	});

	// res.send('Order Email Sent to');
});

router.post('/send_user_email', async (req, res) => {
	console.log({ send_user_email: req.body });
	const test = [ 'lavacquek@icloud.com' ];
	let mailOptions = {
		to: req.body.email,
		from: process.env.DISPLAY_EMAIL,
		subject: req.body.subject,
		html: req.body.template
		// bcc: req.body.email
	};
	transporter.sendMail(mailOptions, (err, data) => {
		if (err) {
			console.log('Error Occurs', err);
			res.status(500).send({ error: err, message: 'Error Sending Email' });
		} else {
			console.log(req.body.subject);
			res.send(req.body.subject);
		}
	});

	// res.send('Order Email Sent to');
});
router.post('/send_admin_email', async (req, res) => {
	console.log({ send_user_email_created: req.body });
	let mailOptions = {
		to: process.env.EMAIL,
		from: process.env.DISPLAY_EMAIL,
		subject: req.body.subject,
		html: req.body.template
		// bcc: req.body.email
	};
	transporter.sendMail(mailOptions, (err, data) => {
		if (err) {
			console.log('Error Occurs', err);
			res.status(500).send({ error: err, message: 'Error Sending Email' });
		} else {
			console.log(req.body.subject);
			res.send(req.body.subject);
		}
	});

	// res.send('Order Email Sent to');
});

router.post('/invoice', async (req, res) => {
	console.log({ invoice: req.body });
	// PHE.printHtml(invoice_view(req.body));
	res.render('./invoice.html');
});

router.post('/contact', async (req, res) => {
	// const data = req.body;
	console.log({ contact: req.body });
	// console.log(process.env.SENDGRID_SECRET);
	// sgMail.setApiKey(process.env.SENDGRID_SECRET);
	let mailOptions = {
		to: process.env.DISPLAY_EMAIL,
		from: req.body.email,
		subject: `New message from ${req.body.first_name} - ${req.body.reason_for_contact}`,
		html: contact(req.body)
		// bcc: req.body.email
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
});

router.post('/contactconfirmation', async (req, res) => {
	// const data = req.body;
	console.log({ contact: req.body });
	// console.log(process.env.SENDGRID_SECRET);
	// sgMail.setApiKey(process.env.SENDGRID_SECRET);
	let mailOptions = {
		from: process.env.DISPLAY_EMAIL,
		to: req.body.email,
		subject: `Thank you for Contacting Glow LEDs Support`,
		html: contact_confirmation(req.body)
		// bcc: req.body.email
	};

	// try {
	// 	sgMail.send(mailOptions);
	// 	res.send(200);
	// } catch (err) {
	// 	res.status(422).send(err);
	// }
	transporter.sendMail(mailOptions, (err, data) => {
		if (err) {
			console.log('Error Occurs', err);
			res.status(500).send({ error: err, message: 'Error Sending Email' });
		} else {
			console.log('Contact Email Sent to ' + req.body.first_name);
			res.status(200).send({ message: 'Email Successfully Sent' });
		}
	});
});

router.post('/password_reset', async (req, res) => {
	console.log({ passwordreset: req.body });

	let mailOptions = {
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
});
router.post('/reset_password', async (req, res) => {
	console.log({ reset_password: req.body });

	let mailOptions = {
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
});

router.post('/verified', async (req, res) => {
	console.log({ register: req.body });

	let mailOptions = {
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
});

export default router;
