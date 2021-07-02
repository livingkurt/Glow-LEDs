import express from 'express';
import { email_controller } from '../../controllers';

const router = express.Router();

// Matches with "/api/books"
router.route('/').get(email_controller.findAll).post(email_controller.create);

// Matches with "/api/books/:id"
router.route('/:id').get(email_controller.findById).put(email_controller.update).delete(email_controller.remove);

router.route('/send_announcement').post(email_controller.send_announcement_email);
router.route('/send_user_email').post(email_controller.send_user_email);
router.route('/send_admin_email').post(email_controller.send_admin_email);
router.route('/contact').post(email_controller.send_user_contact_email);
router.route('/contactconfirmation').post(email_controller.send_admin_contact_email);
router.route('/password_reset').post(email_controller.send_password_reset_email);
router.route('/reset_password').post(email_controller.send_reset_password_email);
router.route('/verified').post(email_controller.send_verified_email);

export default router;
