import express from 'express';
import { email_controller } from '../../controllers';
const { isAuth, isAdmin } = require('../../util');
const router = express.Router();

router.route('/').get(email_controller.findAll_emails_c).post(isAuth, isAdmin, email_controller.create_emails_c);

router.route('/send_announcement').post(email_controller.send_all_emails_c);
router.route('/send_email_subscription').post(email_controller.send_email_subscription_emails_c);

router.route('/send_email').post(email_controller.send_emails_c);
// router.route('/send_user_email').post(email_controller.send_user_email_emails_c);
// router.route('/send_admin_email').post(email_controller.send_admin_email_emails_c);
router.route('/contact').post(email_controller.send_user_contact_emails_c);
router.route('/contactconfirmation').post(email_controller.send_admin_contact_emails_c);
router.route('/password_reset').post(email_controller.send_password_reset_emails_c);
router.route('/reset_password').post(email_controller.send_reset_password_emails_c);
router.route('/verified').post(email_controller.send_verified_emails_c);

router
	.route('/:id')
	.get(email_controller.findById_emails_c)
	.put(isAuth, isAdmin, email_controller.update_emails_c)
	.delete(isAuth, isAdmin, email_controller.remove_emails_c);

export default router;
