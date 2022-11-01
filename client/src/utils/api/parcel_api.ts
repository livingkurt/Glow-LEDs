import express from 'express';
import { parcel_controller } from '../../controllers';
const { isAuth, isAdmin } = require('../../util');

const router = express.Router();

router.route('/').get(parcel_controller.findAll_parcels_c).post(isAuth, isAdmin, parcel_controller.create_parcels_c);

router
	.route('/:id')
	.get(parcel_controller.findById_parcels_c)
	.put(isAuth, isAdmin, parcel_controller.update_parcels_c)
	.delete(isAuth, isAdmin, parcel_controller.remove_parcels_c);

export default router;
