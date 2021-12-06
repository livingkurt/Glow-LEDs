// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

import App from './App';
import { account_created, contact, contact_confirmation, password_reset, reset_password } from './pages';
import email_subscription from './pages/email_subscription';
import express from 'express';
const router = express.Router();

router.get('/email_subscription', function(req: { body: any }, res: { send: (arg0: string) => void }) {
	res.send(App({ body: email_subscription(req.body), title: 'Glow LEDs Reset Password' }));
});

router.get('/password_reset', function(req: { body: any }, res: { send: (arg0: string) => void }) {
	res.send(App({ body: reset_password(req.body), title: 'Glow LEDs Reset Password' }));
});

router.get('/account_created', function(req: { body: any }, res: { send: (arg0: string) => void }) {
	res.send(App({ body: account_created(req.body), title: 'Glow LEDs Account Created' }));
});

router.get('/password_reset', function(req: { body: any }, res: { send: (arg0: string) => void }) {
	res.send(App({ body: password_reset(req.body), title: 'Glow LEDs Password Reset' }));
});

router.get('/contact_confirmation', function(
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
) {
	res.send(contact_confirmation(req.body));
});
router.get('/contact', function(
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
) {
	res.send(contact(req.body));
});

export default router;
