import express from 'express';
import { chip_controller } from '../../controllers';
// const chip_controller = require("../../controllers/chip_controller");

const router = express.Router();

// Matches with "/api/books"
router.route('/').get(chip_controller.findAll).post(chip_controller.create);

// Matches with "/api/books/:id"
router.route('/:id').get(chip_controller.findById).put(chip_controller.update).delete(chip_controller.remove);

export default router;
