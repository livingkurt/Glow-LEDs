export {};
import express from 'express';
import Email from '../models/email';
import User from '../models/user';
const { isAuth, isAdmin } = require('../util');
import nodemailer from 'nodemailer';
require('dotenv').config();

const router = express.Router();
router.get('/', async (req, res) => {
	const category = req.query.category ? { category: req.query.category } : {};
	const searchKeyword = req.query.searchKeyword
		? {
				p: {
					$regex: req.query.searchKeyword,
					$options: 'i'
				}
			}
		: {};

	let sortOrder = {};
	if (req.query.sortOrder === 'glover name') {
		sortOrder = { image: 1 };
	} else if (req.query.sortOrder === 'facebook name') {
		sortOrder = { p: 1 };
	} else if (req.query.sortOrder === 'song id') {
		sortOrder = { link: 1 };
	} else if (req.query.sortOrder === 'button') {
		sortOrder = { button: 1 };
	} else if (req.query.sortOrder === 'instagram handle') {
		sortOrder = { h2: 1 };
	} else if (req.query.sortOrder === 'release_date' || req.query.sortOrder === '') {
		sortOrder = { release_date: -1 };
	} else if (req.query.sortOrder === 'newest') {
		sortOrder = { _id: -1 };
	}

	const emails = await Email.find({ deleted: false, ...category, ...searchKeyword }).sort(sortOrder);
	// console.log(emails);
	res.send(emails);
});

router.get('/:id', async (req, res) => {
	const email = await Email.findOne({ _id: req.params.id });
	// console.log({ email });
	if (email) {
		res.send(email);
	} else {
		res.status(404).send({ message: 'Email Not Found.' });
	}
});

router.put('/:id', isAuth, isAdmin, async (req, res) => {
	const emailId = req.params.id;
	const email: any = await Email.findById(emailId);
	if (email) {
		const updatedEmail = await Email.updateOne({ _id: emailId }, req.body);
		console.log({ email_routes_post: updatedEmail });
		if (updatedEmail) {
			return res.status(200).send({ message: 'Email Updated', data: updatedEmail });
		}
	}
	return res.status(500).send({ message: ' Error in Updating Email.' });
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

router.post('/', async (req, res) => {
	const newProduct = await Email.create(req.body);
	if (newProduct) {
		return res.status(201).send({ message: 'New Email Created', data: newProduct });
	}
	return res.status(500).send({ message: ' Error in Creating Email.' });
});

let transporter = nodemailer.createTransport({
	service: 'gmail',
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

// var transporter = nodemailer.createTransport(`smtps://${process.env.EMAIL}:${process.env.PASSWORD}@smtp.gmail.com`);

console.log({
	user: process.env.EMAIL,
	pass: process.env.PASSWORD
});

router.post('/announcement', async (req, res) => {
	console.log({ template: req.body.template });
	console.log({ subject: req.body.subject });
	const users = await User.find({});
	const emails = users.map((user: any) => user.email);
	console.log({ emails });

	const test = [ 'lavacquek@icloud.com', 'destanyesalinas@gmail.com', 'zestanye@gmail.com' ];
	test.forEach((email) => {
		let mailOptions = {
			to: email,
			from: process.env.DISPLAY_EMAIL,
			subject: req.body.subject,
			html: req.body.template
		};
		transporter.sendMail(mailOptions, (err, data) => {
			if (err) {
				console.log('Error Occurs', err);
				res.send(err);
			} else {
				console.log('Announcement Email Sent');
				res.send('Email Successfully Sent');
			}
		});
	});
});

// module.exports = router;
export default router;
