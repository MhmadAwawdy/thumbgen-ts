import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';

const fullSizeDir = path.resolve('./fullsize');
const thumbDir = path.resolve('./thumbnails');

const ensureThumbDir = async (): Promise<void> => {
  try {
    await fs.access(thumbDir);
  } catch {
    await fs.mkdir(thumbDir, { recursive: true });
  }
};

export const processImage = async (
  filename: string,
  width: number,
  height: number
): Promise<string> => {
  // Input validation
  if (!filename || typeof filename !== 'string') {
    throw new Error('Invalid filename provided');
  }

  if (!Number.isInteger(width) || width <= 0) {
    throw new Error('Width must be a positive integer');
  }

  if (!Number.isInteger(height) || height <= 0) {
    throw new Error('Height must be a positive integer');
  }

  const inputPath = path.join(fullSizeDir, `${filename}.jpg`);
  const outputFilename = `${filename}_${width}x${height}.jpg`;
  const outputPath = path.join(thumbDir, outputFilename);

  // Ensure thumbnails directory exists
  await ensureThumbDir();

  // Check if thumbnail already exists (caching)
  try {
    await fs.access(outputPath);
    console.log(`[Cache Hit] Serving existing thumbnail: ${outputFilename}`);
    return path.relative(process.cwd(), outputPath);
  } catch {
    // Thumbnail doesn't exist, proceed with creation
  }

  // Check if original image exists
  try {
    await fs.access(inputPath);
  } catch {
    throw new Error(`Original image "${filename}.jpg" does not exist`);
  }

  try {
    console.log(`[Processing] Creating thumbnail: ${outputFilename}`);
    await sharp(inputPath)
      .resize(width, height, {
        fit: 'cover', // Maintain aspect ratio and crop if necessary
        position: 'center',
      })
      .jpeg({ quality: 80 }) // Optimize for web
      .toFile(outputPath);

    console.log(`[Success] Thumbnail created: ${outputFilename}`);
    return path.relative(process.cwd(), outputPath);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Error processing the image: ${errorMessage}`);
  }
};
