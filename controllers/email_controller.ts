import { email_services } from '../services';
import nodemailer from 'nodemailer';
import App from '../email_templates/App';
import {
	account_created,
	password_reset,
	reset_password,
	contact,
	contact_confirmation,
	order_status,
	order,
	review,
	affiliate,
	feature,
	announcement
} from '../email_templates/pages/index';
import email_subscription from '../email_templates/pages/email_subscription';
import { content_db } from '../db';

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
				return res.status(200).send(emails);
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
				return res.status(200).send(email);
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
				return res.status(201).send(email);
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
				return res.status(200).send(email);
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
					return res.status(200).send(data);
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
			const email = await email_services.send_all_emails_s(body);
			transporter.sendMail(email, (error, data) => {
				if (error) {
					return res.status(500).send({ error, message: 'Error Updating Email' });
				} else {
					return res.status(200).send(data);
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
	send_order_emails_c: async (req: any, res: any) => {
		console.log({ send_order_emails_c: req.body });
		const contents = await content_db.findAll_contents_db({ deleted: false }, { _id: -1 }, 0);

		const mailOptions = {
			from: process.env.DISPLAY_EMAIL,
			to: req.body.email,
			subject: 'Enjoy 10% off your next purchase!',
			html: App({
				body: order({ ...req.body, categories: contents && contents[0].home_page.slideshow }),
				title: 'Enjoy 10% off your next purchase!'
			})
		};

		transporter.sendMail(mailOptions, (err, data) => {
			if (err) {
				console.log('Error Occurs', err);
				res.status(500).send({ error: err, message: 'Error Sending Email' });
			} else {
				console.log('Email Sent to ' + req.body.email);
				res.status(200).send({ message: 'Email Successfully Sent' });
			}
		});
	},
	send_order_status_emails_c: async (req: any, res: any) => {
		console.log({ send_order_status_emails_c: req.body });
		const contents = await content_db.findAll_contents_db({ deleted: false }, { _id: -1 }, 0);

		const mailOptions = {
			from: process.env.DISPLAY_EMAIL,
			to: req.body.email,
			subject: 'Enjoy 10% off your next purchase!',
			html: App({
				body: order_status({ ...req.body, categories: contents && contents[0].home_page.slideshow }),
				title: 'Enjoy 10% off your next purchase!'
			})
		};

		transporter.sendMail(mailOptions, (err, data) => {
			if (err) {
				console.log('Error Occurs', err);
				res.status(500).send({ error: err, message: 'Error Sending Email' });
			} else {
				console.log('Email Sent to ' + req.body.email);
				res.status(200).send({ message: 'Email Successfully Sent' });
			}
		});
	},
	send_review_emails_c: async (req: any, res: any) => {
		console.log({ send_order_status_emails_c: req.body });
		const contents = await content_db.findAll_contents_db({ deleted: false }, { _id: -1 }, 0);

		const mailOptions = {
			from: process.env.DISPLAY_EMAIL,
			to: req.body.email,
			subject: 'Enjoy 10% off your next purchase!',
			html: App({
				body: review({ ...req.body, categories: contents && contents[0].home_page.slideshow }),
				title: 'Enjoy 10% off your next purchase!'
			})
		};

		transporter.sendMail(mailOptions, (err, data) => {
			if (err) {
				console.log('Error Occurs', err);
				res.status(500).send({ error: err, message: 'Error Sending Email' });
			} else {
				console.log('Email Sent to ' + req.body.email);
				res.status(200).send({ message: 'Email Successfully Sent' });
			}
		});
	},
	send_affiliate_emails_c: async (req: any, res: any) => {
		console.log({ send_order_status_emails_c: req.body });
		const contents = await content_db.findAll_contents_db({ deleted: false }, { _id: -1 }, 0);

		const mailOptions = {
			from: process.env.DISPLAY_EMAIL,
			to: req.body.email,
			subject: 'Enjoy 10% off your next purchase!',
			html: App({
				body: affiliate({ ...req.body, categories: contents && contents[0].home_page.slideshow }),
				title: 'Enjoy 10% off your next purchase!'
			})
		};

		transporter.sendMail(mailOptions, (err, data) => {
			if (err) {
				console.log('Error Occurs', err);
				res.status(500).send({ error: err, message: 'Error Sending Email' });
			} else {
				console.log('Email Sent to ' + req.body.email);
				res.status(200).send({ message: 'Email Successfully Sent' });
			}
		});
	},
	send_feature_emails_c: async (req: any, res: any) => {
		console.log({ send_order_status_emails_c: req.body });
		const contents = await content_db.findAll_contents_db({ deleted: false }, { _id: -1 }, 0);

		const mailOptions = {
			from: process.env.DISPLAY_EMAIL,
			to: req.body.email,
			subject: 'Enjoy 10% off your next purchase!',
			html: App({
				body: feature({ ...req.body, categories: contents && contents[0].home_page.slideshow }),
				title: 'Enjoy 10% off your next purchase!'
			})
		};

		transporter.sendMail(mailOptions, (err, data) => {
			if (err) {
				console.log('Error Occurs', err);
				res.status(500).send({ error: err, message: 'Error Sending Email' });
			} else {
				console.log('Email Sent to ' + req.body.email);
				res.status(200).send({ message: 'Email Successfully Sent' });
			}
		});
	},
	send_announcement_emails_c: async (req: any, res: any) => {
		console.log({ send_announcement_emails_c: req.body });
		const contents = await content_db.findAll_contents_db({ deleted: false }, { _id: -1 }, 0);

		const mailOptions = {
			from: process.env.DISPLAY_EMAIL,
			to: req.body.email,
			subject: 'Enjoy 10% off your next purchase!',
			html: App({
				body: announcement({ ...req.body, categories: contents && contents[0].home_page.slideshow }),
				title: 'Enjoy 10% off your next purchase!'
			})
		};

		transporter.sendMail(mailOptions, (err, data) => {
			if (err) {
				console.log('Error Occurs', err);
				res.status(500).send({ error: err, message: 'Error Sending Email' });
			} else {
				console.log('Email Sent to ' + req.body.email);
				res.status(200).send({ message: 'Email Successfully Sent' });
			}
		});
	},
	send_email_subscription_emails_c: async (req: any, res: any) => {
		console.log({ send_email_subscription_emails_c: req.body });
		const contents = await content_db.findAll_contents_db({ deleted: false }, { _id: -1 }, 0);

		const mailOptions = {
			from: process.env.DISPLAY_EMAIL,
			to: req.body.email,
			subject: 'Enjoy 10% off your next purchase!',
			html: App({
				body: email_subscription({ ...req.body, categories: contents && contents[0].home_page.slideshow }),
				title: 'Enjoy 10% off your next purchase!'
			})
		};

		transporter.sendMail(mailOptions, (err, data) => {
			if (err) {
				console.log('Error Occurs', err);
				res.status(500).send({ error: err, message: 'Error Sending Email' });
			} else {
				console.log('Email Sent to ' + req.body.email);
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
	send_account_created_emails_c: async (req: any, res: any) => {
		console.log({ send_email_subscription_emails_c: req.body });
		const contents = await content_db.findAll_contents_db({ deleted: false }, { _id: -1 }, 0);

		const mailOptions = {
			from: process.env.DISPLAY_EMAIL,
			to: req.body.email,
			subject: 'Glow LEDs Account Created',
			html: App({
				body: account_created({ user: req.body, categories: contents && contents[0].home_page.slideshow }),
				title: 'Glow LEDs Account Created'
			})
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
	},
	send_verified_emails_c: async (req: any, res: any) => {
		console.log({ register: req.body });

		const mailOptions = {
			from: process.env.DISPLAY_EMAIL,
			to: req.body.email,
			subject: 'Glow LEDs Account Created',
			html: App({ body: account_created(req.body), title: 'Glow LEDs Account Created' })
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
