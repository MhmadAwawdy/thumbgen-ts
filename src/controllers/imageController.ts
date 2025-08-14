import { Request, Response } from 'express';
import { processImage } from '../services/imageService';

export const getImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const filename = req.query.filename as string;
    const widthParam = req.query.width as string;
    const heightParam = req.query.height as string;

    // Validate filename
    if (!filename || filename.trim() === '') {
      res.status(400).json({ error: 'Filename is required' });
      return;
    }

    // Validate and parse width
    const width = parseInt(widthParam, 10);
    if (!widthParam || isNaN(width) || width <= 0) {
      res.status(400).json({ error: 'Width must be a positive number' });
      return;
    }

    // Validate and parse height
    const height = parseInt(heightParam, 10);
    if (!heightParam || isNaN(height) || height <= 0) {
      res.status(400).json({ error: 'Height must be a positive number' });
      return;
    }

    // Optional: Add reasonable limits to prevent abuse
    const MAX_DIMENSION = 2000;
    if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
      res.status(400).json({
        error: `Dimensions cannot exceed ${MAX_DIMENSION}px`,
      });
      return;
    }

    // Process the image
    const thumbPath = await processImage(filename.trim(), width, height);

    // Send the processed image file
    res.sendFile(thumbPath, { root: '.' }, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        if (!res.headersSent) {
          res.status(500).json({ error: 'Failed to send processed image' });
        }
      }
    });
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : 'Failed to process image';
    console.error('Error in getImage controller:', errorMessage);

    if (!res.headersSent) {
      res.status(500).json({ error: errorMessage });
    }
  }
};
