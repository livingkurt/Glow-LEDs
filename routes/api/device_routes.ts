import express from 'express';
import { device_controller } from '../../controllers';

const router = express.Router();

router.route('/').get(device_controller.findAll).post(device_controller.create);
router.route('/mine').get(device_controller.find_all_mine);

router.route('/:id').get(device_controller.findById).put(device_controller.update).delete(device_controller.remove);

router.route('/update_leds').post(device_controller.update_leds);
router.route('/update_rgb').post(device_controller.update_rgb);
router.route('/update_hsv').post(device_controller.update_hsv);
router.route('/settings').post(device_controller.settings);
router.route('/device_name').post(device_controller.device_name);
router.route('/reset').post(device_controller.reset);

export default router;
