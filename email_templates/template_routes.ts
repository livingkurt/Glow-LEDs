// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

import App from './App';
import {
	account_created,
	affiliate,
	announcement,
	contact,
	contact_confirmation,
	feature,
	order,
	password_reset,
	reset_password,
	review
} from './pages';
import email_subscription from './pages/email_subscription';
import express from 'express';
import { Header, Footer } from './components';
import { content_db, email_db, user_db } from '../db';
const router = express.Router();

// App({header: Header({title: 'Glow LEDs Reset Password'}), footer: Footer()})

router.get('/email_subscription', async (req: { body: any }, res: { send: (arg0: string) => void }) => {
	const contents = await content_db.findAll_contents_db({ deleted: false }, { _id: -1 }, 0);
	const body = {
		email: 'info.glowleds@gmail.com',
		promo_code: 'xoteag',
		categories: contents && contents[0].home_page.slideshow
	};

	res.send(App({ body: email_subscription(body), title: 'Enjoy 10% off your next purchase!' }));
});
router.get('/order', async (req: { body: any }, res: { send: (arg0: string) => void }) => {
	const contents = await content_db.findAll_contents_db({ deleted: false }, { _id: -1 }, 0);
	const body = {
		email: 'info.glowleds@gmail.com',
		promo_code: 'xoteag',
		categories: contents && contents[0].home_page.slideshow
	};

	res.send(App({ body: order(body), title: 'Enjoy 10% off your next purchase!' }));
});
router.get('/review', async (req: { body: any }, res: { send: (arg0: string) => void }) => {
	const contents = await content_db.findAll_contents_db({ deleted: false }, { _id: -1 }, 0);
	const body = {
		email: 'info.glowleds@gmail.com',
		promo_code: 'xoteag',
		categories: contents && contents[0].home_page.slideshow
	};

	res.send(App({ body: review(body), title: 'Enjoy 10% off your next purchase!' }));
});
router.get('/affiliate', async (req: { body: any }, res: { send: (arg0: string) => void }) => {
	const contents = await content_db.findAll_contents_db({ deleted: false }, { _id: -1 }, 0);
	const body = {
		email: 'info.glowleds@gmail.com',
		promo_code: 'xoteag',
		categories: contents && contents[0].home_page.slideshow
	};

	res.send(App({ body: affiliate(body), title: 'Enjoy 10% off your next purchase!' }));
});
router.get('/feature', async (req: { body: any }, res: { send: (arg0: string) => void }) => {
	const contents = await content_db.findAll_contents_db({ deleted: false }, { _id: -1 }, 0);
	const body = {
		email: 'info.glowleds@gmail.com',
		promo_code: 'xoteag',
		categories: contents && contents[0].home_page.slideshow
	};

	res.send(App({ body: feature(body), title: 'Enjoy 10% off your next purchase!' }));
});
router.get('/announcement', async (req: { body: any }, res: { send: (arg0: string) => void }) => {
	const emails = await email_db.findAll_emails_db({ deleted: false, active: true }, { _id: -1 });
	// console.log({ emails });
	// const body = {
	// 	content: emails[0]
	// };

	res.send(App({ body: announcement(emails[0]), title: emails[0].h1 }));
});

router.get(
	'/contact',
	(
		req: {
			body: {
				message: string;
				first_name: string;
				last_name: string;
				email: string;
				order_number: string;
				reason_for_contact: string;
				inspirational_pictures: string[];
				artist_name: string;
				instagram_handle: string;
				facebook_name: string;
				song_id: string;
				quote: string;
			};
		},
		res: { send: (arg0: string) => void }
	) => {
		res.send(contact(req.body));
	}
);

router.get(
	'/contact_confirmation',
	(
		req: {
			body: {
				message: string;
				first_name: string;
				last_name: string;
				email: string;
				order_number: string;
				reason_for_contact: string;
				inspirational_pictures: string[];
				artist_name: string;
				instagram_handle: string;
				facebook_name: string;
				song_id: string;
				quote: string;
			};
		},
		res: { send: (arg0: string) => void }
	) => {
		res.send(contact_confirmation(req.body));
	}
);

router.get('/reset_password', async (req: { body: any }, res: { send: (arg0: string) => void }) => {
	const user = await user_db.findByEmail_users_db('lavacquek@icloud.com');
	res.send(App({ body: reset_password(user), title: 'Password Reset Instructions ' }));
});
router.get('/password_reset', async (req: { body: any }, res: { send: (arg0: string) => void }) => {
	const user = await user_db.findById_users_db('5f2d7c0e9005a57059801ce8');
	res.send(App({ body: password_reset(user), title: 'Password Reset Successful' }));
});

router.get('/account_created', async (req: { body: any }, res: { send: (arg0: string) => void }) => {
	const user = await user_db.findById_users_db('5f2d7c0e9005a57059801ce8');
	const contents = await content_db.findAll_contents_db({ deleted: false }, { _id: -1 }, 0);
	const body = {
		user,
		categories: contents && contents[0].home_page.slideshow
	};

	res.send(App({ body: account_created(body), title: 'Glow LEDs Account Created' }));
});

export default router;
