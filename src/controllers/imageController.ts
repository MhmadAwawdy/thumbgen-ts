import { Request, Response } from 'express';
import { processImage } from '../services/imageService';

export const getImage = async (req: Request, res: Response): Promise<void> => {
  const filename = req.query.filename as string;
  const width = parseInt(req.query.width as string);
  const height = parseInt(req.query.height as string);

  // Validate required query params
  if (!filename) {
    res.status(400).json({ error: 'Filename is required' });
    return;
  }

  if (!width || width <= 0 || isNaN(width)) {
    res.status(400).json({ error: 'Width must be a positive number' });
    return;
  }

  if (!height || height <= 0 || isNaN(height)) {
    res.status(400).json({ error: 'Height must be a positive number' });
    return;
  }

  try {
    // Call the service to process image
    const thumbPath = await processImage(filename, width, height);

    // Send back the resized image file
    res.sendFile(thumbPath, { root: '.' });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to process image' });
  }
};
