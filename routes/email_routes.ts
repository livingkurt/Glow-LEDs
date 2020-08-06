export {};
import nodemailer from 'nodemailer';
import express from 'express';
import User from '../models/user';
import main_layout from '../email_templates/App';
import styles from '../email_templates/styles';
import {
	contact_view,
	reset_password_view,
	verified_account_view,
	verify_account_view,
	order_view
} from '../email_templates/pages/index';
require('dotenv').config();
const router = express.Router();

let transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.EMAIL,
		pass: process.env.PASSWORD
	}
});

router.post('/contact', async (req, res) => {
	const data = req.body.user_name;
	console.log({ data });

	let mailOptions = {
		from: data.email,
		to: process.env.DISPLAY_EMAIL,
		subject: `New message from ${data.name} - ${data.order_number} - ${data.reason_for_contact}`,
		html: main_layout(contact_view(data), styles())
	};

	transporter.sendMail(mailOptions, (err, data) => {
		if (err) {
			console.log('Error Occurs', err);
			res.send(err);
		} else {
			console.log('Contact Email Sent to ' + data.name);
			res.send('Email Successfully Sent');
		}
	});
});

router.post('/passwordreset', async (req, res) => {
	console.log({ passwordreset: req.body });

	let mailOptions = {
		from: process.env.DISPLAY_EMAIL,
		to: req.body.email,
		subject: 'Glow LEDs Password Reset',
		html: main_layout(reset_password_view(req.body), styles())
	};

	transporter.sendMail(mailOptions, (err, data) => {
		if (err) {
			console.log('Error Occurs', err);
			res.send(err);
		} else {
			console.log('Password Reset Email Sent to ' + req.body.name);
			res.send('Email Successfully Sent');
		}
	});
});

router.post('/verified', async (req, res) => {
	console.log({ register: req.body });

	let mailOptions = {
		from: process.env.DISPLAY_EMAIL,
		to: req.body.email,
		subject: 'Glow LEDs Account Confirmation',
		html: main_layout(verified_account_view(req.body), styles())
	};

	transporter.sendMail(mailOptions, (err, data) => {
		if (err) {
			console.log('Error Occurs', err);
			res.send(err);
		} else {
			console.log('Registration Email Sent to ' + req.body.name);
			res.send('Email Successfully Sent');
		}
	});
});

router.post('/verify', async (req, res) => {
	console.log({ register: req.body });

	let mailOptions = {
		from: process.env.DISPLAY_EMAIL,
		to: req.body.email,
		subject: 'Glow LEDs Account Verification',
		html: main_layout(verify_account_view(req.body), styles())
	};

	transporter.sendMail(mailOptions, (err, data) => {
		if (err) {
			console.log('Error Occurs', err);
			res.send(err);
		} else {
			console.log('Verification Email Sent to ' + req.body.name);
			res.send('Email Successfully Sent');
		}
	});
});

router.post('/order', async (req, res) => {
	console.log({ order: req.body.orderItems });
	let user = {};
	let mailOptions = {
		from: process.env.DISPLAY_EMAIL,
		to: req.body.user_data.email,
		subject: 'Glow LEDs Order Confirmation',
		html: main_layout(order_view({ ...req.body, title: 'Your Order Has Been Placed' }), styles())
	};

	transporter.sendMail(mailOptions, (err, data) => {
		if (err) {
			console.log('Error Occurs', err);
			res.send(err);
		} else {
			console.log('Order Email Sent to ' + req.body.user_data.name);
			res.send('Email Successfully Sent');
		}
	});
});

router.post('/sale', async (req, res) => {
	console.log({ sale: req.body });
	let user = {};
	let mailOptions = {
		from: process.env.DISPLAY_EMAIL,
		to: process.env.EMAIL,
		subject: 'New Order from ' + req.body.user_data.name,
		html: main_layout(order_view({ ...req.body, title: 'New Order from ' + req.body.user_data.name }), styles())
	};

	transporter.sendMail(mailOptions, (err, data) => {
		if (err) {
			console.log('Error Occurs', err);
			res.send(err);
		} else {
			console.log('New Order Made by ' + req.body.user_data.name);
			res.send('Email Successfully Sent');
		}
	});
});

router.post('/paid', async (req, res) => {
	console.log({ paid: req.body });
	let user = {};
	let mailOptions = {
		from: process.env.DISPLAY_EMAIL,
		to: process.env.EMAIL,
		subject: 'Order Paid by ' + req.body.user_data.name,
		html: main_layout(order_view({ ...req.body, title: 'Order Paid by ' + req.body.user_data.name }), styles())
	};

	transporter.sendMail(mailOptions, (err, data) => {
		if (err) {
			console.log('Error Occurs', err);
			res.send(err);
		} else {
			console.log('New Order Paid by ' + req.body.user_data.name);
			res.send('Email Successfully Sent');
		}
	});
});

router.post('/shipping', async (req, res) => {
	console.log({ shipping: req.body });
	let user: any = {};
	try {
		user = await User.findOne({ _id: req.body.user });
	} catch (error) {
		res.send({ msg: error.message });
	}

	let mailOptions = {
		from: process.env.DISPLAY_EMAIL,
		// from: 'Kurt LaVacque <lavacquek@gmail.com>',
		to: req.body.email,
		subject: 'Glow LEDs Shipping Confirmation',
		html: main_layout(order_view({ ...req.body, title: 'Your Item has Shipped!' }), styles())
	};
	console.log(req.body);

	transporter.sendMail(mailOptions, (err, data) => {
		if (err) {
			console.log('Error Occurs', err);
			res.send(err);
		} else {
			console.log('Shipping Email Sent to ' + req.body.name);
			res.send('Email Successfully Sent');
		}
	});
});

router.post('/delivery', async (req, res) => {
	console.log({ delivery: req.body });
	let user: any = {};
	try {
		user = await User.findOne({ _id: req.body.user });
	} catch (error) {
		res.send({ msg: error.message });
	}

	let mailOptions = {
		from: process.env.DISPLAY_EMAIL,
		to: req.body.email,
		subject: 'Glow LEDs Delivery Confirmation',
		html: main_layout(order_view({ ...req.body, title: 'Your Item has Been Delivered!' }), styles())
	};

	transporter.sendMail(mailOptions, (err, data) => {
		if (err) {
			console.log('Error Occurs', err);
			res.send(err);
		} else {
			console.log('Delivery Email Sent to ' + req.body.name);
			res.send('Email Successfully Sent');
		}
	});
});

// module.exports = router;
export default router;