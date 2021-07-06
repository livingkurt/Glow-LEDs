import express from 'express';
import { log_controller } from '../../controllers';
// const log_controller = require("../../controllers/log_controller");

const router = express.Router();

router.route('/').get(log_controller.findAll).post(log_controller.create);

router.route('/:id').get(log_controller.findById).put(log_controller.update).delete(log_controller.remove);

export default router;
