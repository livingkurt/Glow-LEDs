import express from "express";
import { user_controller } from "../users";
import { isAdmin, isAuth, setCurrentUser } from "../../middlewares/authMiddleware";

const router = express.Router();

router.route("/email/:email").get(user_controller.findByEmail_users_c);
router.route("/affiliate/:id").get(user_controller.findByEmail_users_c);

router.route("/check_password/:id").post(user_controller.check_password_c);
router.route("/validate_email/:email").post(user_controller.validate_email_c);
router.route("/register").post(user_controller.register_users_c);
router.route("/login").post(user_controller.login_users_c);
router.route("/login_as_user").post(isAuth, isAdmin, user_controller.login_as_user_users_c);
router.route("/update/:id").put(user_controller.update_profile_users_c);
router.route("/password_reset").put(user_controller.password_reset_users_c);
router.route("/reset_password").post(user_controller.reset_password_users_c);
router.route("/refresh_login").put(user_controller.refresh_login_users_c);
router.route("/logout").delete(setCurrentUser, user_controller.logout_users_c);

router.route("/filters").get(user_controller.create_filters_users_c);
// router.route('/verify/:id').post(user_controller.verify_users_c);
// router.route('/checkemail').post(user_controller.checkemail_users_c);
// router.route('/createadmin').post(user_controller.createadmin_users_c);

router.route("/:id").get(user_controller.findById_users_c).put(user_controller.update_users_c).delete(user_controller.remove_users_c);

router.route("/").get(user_controller.findAll_users_c).post(user_controller.create_users_c);

export default router;
