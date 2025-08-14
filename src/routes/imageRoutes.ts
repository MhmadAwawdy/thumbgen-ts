import express from 'express';
import { getImage } from '../controllers/imageController';

const router = express.Router();

router.get('/images', getImage);

export default router;
