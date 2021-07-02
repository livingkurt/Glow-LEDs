import express from 'express';
import { content_controller } from '../../controllers';

const router = express.Router();

// Matches with "/api/books"
router.route('/').get(content_controller.findAll).post(content_controller.create);

// Matches with "/api/books/:id"
router.route('/:id').get(content_controller.findById).put(content_controller.update).delete(content_controller.remove);

export default router;
