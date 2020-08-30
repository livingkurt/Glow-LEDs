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
	order_view,
	contact_confirmation_view,
	not_verified_view,
	refund_view
} from '../email_templates/pages/index';
const sgMail = require('@sendgrid/mail');
require('dotenv').config();
const router = express.Router();

let transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.EMAIL,
		pass: process.env.PASSWORD
	}
});

// module.exports = (app) => {
// 	app.post('/api/email/order_confirmation', async (req, res) => {
// 		const { recipient, orderNumber } = req.body;
// 		sgMail.setApiKey(process.env.SENDGRID_SECRET);
// 		const msg = {
// 			to: recipient,
// 			from: 'keibooher@gmail.com', // Use the email address or domain you verified above
// 			subject: 'Sending with Twilio SendGrid is Fun',
// 			text: 'and easy to do anywhere, even with Node.js',
// 			html: confirmationTemplate(orderNumber)
// 		};
// 		try {
// 			sgMail.send(msg);
// 			res.send(200);
// 		} catch (err) {
// 			res.status(422).send(err);
// 		}
// 	});
// };

// router.post('/contact', async (req, res) => {
// 	// const data = req.body;
// 	// console.log({ contact: req.body });
// 	console.log(process.env.SENDGRID_SECRET);
// 	sgMail.setApiKey(process.env.SENDGRID_SECRET);
// 	const msg = {
// 		to: 'info.glowleds@gmail.com',
// 		from: 'info.glowleds@gmail.com', // Use the email address or domain you verified above
// 		subject: `New message from ${req.body.first_name} - ${req.body.reason_for_contact}`,
// 		text: 'and easy to do anywhere, even with Node.js',
// 		html: contact_view(req.body)
// 	};
// 	try {
// 		sgMail.send(msg);
// 		res.send(200);
// 	} catch (err) {
// 		res.status(422).send(err);
// 	}
// });

router.post('/contact', async (req, res) => {
	// const data = req.body;
	console.log({ contact: req.body });
	console.log(process.env.SENDGRID_SECRET);
	// sgMail.setApiKey(process.env.SENDGRID_SECRET);
	let mailOptions = {
		to: process.env.DISPLAY_EMAIL,
		from: req.body.email,
		subject: `New message from ${req.body.first_name} - ${req.body.reason_for_contact}`,
		html: contact_view(req.body)
	};
	transporter.sendMail(mailOptions, (err, data) => {
		if (err) {
			console.log('Error Occurs', err);
			res.send(err);
		} else {
			console.log('Contact Email Sent to ' + req.body.first_name);
			res.send('Email Successfully Sent');
		}
	});
});

router.post('/contactconfirmation', async (req, res) => {
	// const data = req.body;
	console.log({ contact: req.body });
	console.log(process.env.SENDGRID_SECRET);
	// sgMail.setApiKey(process.env.SENDGRID_SECRET);
	let mailOptions = {
		from: process.env.DISPLAY_EMAIL,
		to: req.body.email,
		subject: `Thank you for Contacting Glow LEDs Support`,
		html: contact_confirmation_view(req.body)
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
			res.send(err);
		} else {
			console.log('Contact Email Sent to ' + req.body.first_name);
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
			console.log('Password Reset Email Sent to ' + req.body.first_name);
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
			console.log('Registration Email Sent to ' + req.body.first_name);
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
			console.log('Verification Email Sent to ' + req.body.first_name);
			res.send('Email Successfully Sent');
		}
	});
});

router.post('/order', async (req, res) => {
	console.log({ order: req.body.token });
	console.log({ order: req.body.token.card.last4 });

	const paid = 'Paid';
	const shipped = 'Not Shipped';
	// const delivered = "Not Shipped"
	let user = {};
	let mailOptions = {
		from: process.env.DISPLAY_EMAIL,
		to: req.body.shipping.email,
		subject: 'Glow LEDs Order Confirmation',
		html: main_layout(order_view({ ...req.body, title: 'Your Order Has Been Placed', paid, shipped }), styles())
	};

	transporter.sendMail(mailOptions, (err, data) => {
		if (err) {
			console.log('Error Occurs', err);
			res.send(err);
		} else {
			console.log('Order Email Sent to ' + req.body.shipping.first_name);
			res.send('Email Successfully Sent');
		}
	});
});
router.post('/refund', async (req, res) => {
	console.log({ refund: req.body });
	// console.log({ order: req.body.token.card.last4 });

	const paid = 'Paid';
	const shipped = req.body.isShipped ? 'Shipped' : 'Not Shipped';
	const refunded = true;
	// const delivered = "Not Shipped"
	let user = {};
	let mailOptions = {
		from: process.env.DISPLAY_EMAIL,
		to: req.body.shipping.email,
		subject: 'Glow LEDs Order Refund',
		html: main_layout(
			refund_view({ ...req.body, title: 'You have been refunded for your order', paid, shipped, refunded }),
			styles()
		)
	};

	transporter.sendMail(mailOptions, (err, data) => {
		if (err) {
			console.log('Error Occurs', err);
			res.send(err);
		} else {
			console.log('Order Email Sent to ' + req.body.shipping.first_name);
			res.send('Email Successfully Sent');
		}
	});
});
router.post('/order', async (req, res) => {
	console.log({ order: req.body.token });
	console.log({ order: req.body.token.card.last4 });

	const paid = 'Paid';
	const shipped = 'Not Shipped';
	// const delivered = "Not Shipped"
	let user = {};
	let mailOptions = {
		from: process.env.DISPLAY_EMAIL,
		to: req.body.shipping.email,
		subject: 'Glow LEDs Order Confirmation',
		html: main_layout(order_view({ ...req.body, title: 'Your Order Has Been Placed', paid, shipped }), styles())
	};

	transporter.sendMail(mailOptions, (err, data) => {
		if (err) {
			console.log('Error Occurs', err);
			res.send(err);
		} else {
			console.log('Order Email Sent to ' + req.body.shipping.first_name);
			res.send('Email Successfully Sent');
		}
	});
});

router.post('/sale', async (req, res) => {
	// console.log({ sale: req.body });
	// console.log({ sale_items: req.body.orderItems });
	const paid = 'Paid';
	const shipped = 'Not Shipped';
	let user = {};
	let mailOptions = {
		from: process.env.DISPLAY_EMAIL,
		to: process.env.EMAIL,
		subject: 'New Order from ' + req.body.shipping.first_name,
		html: main_layout(
			order_view({ ...req.body, title: 'New Order from ' + req.body.shipping.first_name, paid, shipped }),
			styles()
		)
	};

	transporter.sendMail(mailOptions, (err, data) => {
		if (err) {
			console.log('Error Occurs', err);
			res.send(err);
		} else {
			console.log('New Order Made by ' + req.body.shipping.first_name);
			res.send('Email Successfully Sent');
		}
	});
});

router.post('/paid', async (req, res) => {
	console.log({ paid: req.body });
	let user = {};
	const paid = 'Paid';
	const shipped = 'Not Shipped';
	let mailOptions = {
		from: process.env.DISPLAY_EMAIL,
		to: process.env.EMAIL,
		subject: 'Order Paid by ' + req.body.shipping.first_name,
		html: main_layout(
			order_view({ ...req.body, title: 'Order Paid by ' + req.body.shipping.first_name, paid, shipped }),
			styles()
		)
	};

	transporter.sendMail(mailOptions, (err, data) => {
		if (err) {
			console.log('Error Occurs', err);
			res.send(err);
		} else {
			console.log('New Order Paid by ' + req.body.shipping.first_name);
			res.send('Email Successfully Sent');
		}
	});
});
router.post('/notpaid', async (req, res) => {
	console.log({ notpaid: req.body });
	let user = {};
	const paid = 'Not Paid';
	const shipped = 'Not Shipped';
	// const body = 'You have placed an order but have yet to pay. Would you like assistance completing your order?';
	let mailOptions = {
		from: process.env.DISPLAY_EMAIL,
		to: req.body.shipping.email,
		bcc: process.env.EMAIL,
		subject: 'Glow LEDs Order Not Complete',
		html: main_layout(order_view({ ...req.body, title: 'Order Not Complete', paid, shipped }), styles())
	};

	transporter.sendMail(mailOptions, (err, data) => {
		if (err) {
			console.log('Error Occurs', err);
			res.send(err);
		} else {
			console.log('Order Not Complete for ' + req.body.shipping.first_name);
			res.send('Email Successfully Sent');
		}
	});
});
router.post('/notverified', async (req, res) => {
	console.log({ notpaid: req.body });
	let user = {};

	let mailOptions = {
		from: process.env.DISPLAY_EMAIL,
		to: req.body.email,
		bcc: process.env.EMAIL,
		subject: 'Having Trouble Verifying your Glow LEDs Account',
		html: main_layout(not_verified_view(req.body), styles())
	};

	transporter.sendMail(mailOptions, (err, data) => {
		if (err) {
			console.log('Error Occurs', err);
			res.send(err);
		} else {
			console.log('Not Verified Email Sent to ' + req.body.first_name);
			res.send('Email Successfully Sent');
		}
	});
});

router.post('/orderpaid', async (req, res) => {
	console.log({ paid: req.body });
	let user = {};
	const paid = 'Paid';
	const shipped = 'Not Shipped';
	let mailOptions = {
		from: process.env.DISPLAY_EMAIL,
		to: req.body.shipping.email,
		subject: 'Here is your receipt from Glow LEDs',
		html: main_layout(
			order_view({ ...req.body, title: 'Order Complete! \nHere is your receipt from Glow LEDs', paid, shipped }),
			styles()
		)
	};

	transporter.sendMail(mailOptions, (err, data) => {
		if (err) {
			console.log('Error Occurs', err);
			res.send(err);
		} else {
			console.log('New Order Paid by ' + req.body.shipping.first_name);
			res.send('Email Successfully Sent');
		}
	});
});

router.post('/shipping', async (req, res) => {
	console.log({ shipping: req.body });
	let user: any = {};
	const paid = 'Paid';
	const shipped = 'Shipped';
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
		html: main_layout(order_view({ ...req.body, title: 'Your Item has Shipped!', paid, shipped }), styles())
	};
	console.log(req.body);

	transporter.sendMail(mailOptions, (err, data) => {
		if (err) {
			console.log('Error Occurs', err);
			res.send(err);
		} else {
			console.log('Shipping Email Sent to ' + req.body.first_name);
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
			console.log('Delivery Email Sent to ' + req.body.first_name);
			res.send('Email Successfully Sent');
		}
	});
});

// module.exports = router;
export default router;
