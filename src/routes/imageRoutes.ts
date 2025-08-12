import express from 'express';
import { getImage } from '../controllers/imageController';

const router = express.Router();

// Route: GET /api/images?filename=...&width=...&height=...
router.get('/images', getImage);

export default router;
