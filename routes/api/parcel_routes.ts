import express from 'express';
import { parcel_controller } from '../../controllers';
// const parcel_controller = require("../../controllers/parcel_controller");

const router = express.Router();

// Matches with "/api/books"
router.route('/').get(parcel_controller.findAll).post(parcel_controller.create);

// Matches with "/api/books/:id"
router.route('/:id').get(parcel_controller.findById).put(parcel_controller.update).delete(parcel_controller.remove);

export default router;
