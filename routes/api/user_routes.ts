import express from 'express';
import { user_controller } from '../../controllers';

const router = express.Router();

// Matches with "/api/books"
router.route('/').get(user_controller.findAll).post(user_controller.create);

// Matches with "/api/books/:id"
router.route('/:id').get(user_controller.findById).put(user_controller.update).delete(user_controller.remove);

router.route('/email/:email').get(user_controller.email);
router.route('/register').post(user_controller.register);
router.route('/login').post(user_controller.login);
router.route('/update/:id').put(user_controller.update_profile);
router.route('/password_reset').post(user_controller.password_reset);
router.route('/reset_password').post(user_controller.reset_password);
router.route('/verify/:id').post(user_controller.verify);
router.route('/getuser/:id').post(user_controller.get_user);
router.route('/checkemail').post(user_controller.checkemail);
router.route('/createadmin').post(user_controller.createadmin);

export default router;
