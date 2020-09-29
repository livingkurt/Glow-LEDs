export {};
import express from 'express';
import Device from '../models/device';
const { isAuth, isAdmin } = require('../util');

const router = express.Router();

router.get('/', async (req, res) => {
	const category = req.query.category ? { category: req.query.category } : {};
	const searchKeyword = req.query.searchKeyword
		? {
				device_name: {
					$regex: req.query.searchKeyword,
					$options: 'i'
				}
			}
		: {};

	// let sortOrder = {};
	// if (req.query.sortOrder === 'glover name') {
	// 	sortOrder = { glover_name: 1 };
	// } else if (req.query.sortOrder === 'facebook name') {
	// 	sortOrder = { facebook_name: 1 };
	// } else if (req.query.sortOrder === 'song id') {
	// 	sortOrder = { song_id: 1 };
	// } else if (req.query.sortOrder === 'product') {
	// 	sortOrder = { product: 1 };
	// } else if (req.query.sortOrder === 'instagram handle') {
	// 	sortOrder = { instagram_handle: 1 };
	// } else if (req.query.sortOrder === 'release_date' || req.query.sortOrder === '') {
	// 	sortOrder = { release_date: -1 };
	// } else if (req.query.sortOrder === 'newest') {
	// 	sortOrder = { _id: -1 };
	// }

	const devices = await Device.find({ deleted: false, ...category, ...searchKeyword });
	// console.log(devices);
	res.send(devices);
});

router.get('/mine', isAuth, async (req: any, res: any) => {
	const devices = await Device.find({ deleted: false, user: req.user._id }).sort({ _id: -1 });
	res.send(devices);
});

router.get('/:id', async (req, res) => {
	const device = await Device.findOne({ _id: req.params.id });
	console.log({ device });
	console.log(req.params.id);
	if (device) {
		res.send(device);
	} else {
		res.status(404).send({ message: 'Device Not Found.' });
	}
});

router.post('/', async (req, res) => {
	console.log('Post New Device');
	const newDevice = await Device.create(req.body);
	if (newDevice) {
		return res.status(201).send({ message: 'New Device Created', data: newDevice });
	}
	return res.status(500).send({ message: ' Error in Creating Device.' });
});

router.put('/:id', isAuth, async (req, res) => {
	console.log({ device_routes_put: req.body });
	const deviceId = req.params.id;
	const device: any = await Device.findById(deviceId);
	if (device) {
		const updatedDevice = await Device.updateOne({ _id: deviceId }, req.body);
		if (updatedDevice) {
			return res.status(200).send({ message: 'Device Updated', data: updatedDevice });
		}
	}
	return res.status(500).send({ message: ' Error in Updating Device.' });
});

router.delete('/:id', isAuth, async (req: { params: { id: any } }, res: { send: (arg0: string) => void }) => {
	const device = await Device.findById(req.params.id);
	const updated_device = { ...device, deleted: true };
	const message: any = { message: 'Device Deleted' };
	// const deleted_device = await updated_device.save();
	const deleted_device = await Device.updateOne({ _id: req.params.id }, { deleted: true });
	if (deleted_device) {
		// await deletedDevice.remove();
		res.send(message);
	} else {
		res.send('Error in Deletion.');
	}
});

// module.exports = router;
export default router;
