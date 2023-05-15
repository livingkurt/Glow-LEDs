import express from "express";
import { image_controller } from "../images";
import { upload } from "./image_helper";

const router = express.Router();
router.route("/delete_multiple").post(image_controller.remove_multiple_images_c);

router.route("/:id").get(image_controller.findById_images_c).put(image_controller.update_images_c).delete(image_controller.remove_images_c);

router.route("/upload/image").post(upload.array("images", 10), image_controller.upload_images_c);
router.route("/upload/video").post(upload.array("images", 10), image_controller.upload_images_c);
router.route("/").get(image_controller.findAll_images_c).post(image_controller.create_images_c);

export default router;
