import express from 'express';
import { parcel_controller } from '../../controllers';
const { isAuth, isAdmin } = require('../../util');

const router = express.Router();

// Matches with "/api/books"
router.route('/').get(parcel_controller.findAll).post(isAuth, isAdmin, parcel_controller.create);

// Matches with "/api/books/:id"
router
	.route('/:id')
	.get(parcel_controller.findById)
	.put(isAuth, isAdmin, parcel_controller.update)
	.delete(isAuth, isAdmin, parcel_controller.remove);

export default router;
