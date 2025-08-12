import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';

const fullSizeDir = path.resolve('./fullsize');
const thumbDir = path.resolve('./thumbnails');

export const processImage = async (
  filename: string,
  width: number,
  height: number
): Promise<string> => {
  // Define paths
  const inputPath = path.join(fullSizeDir, `${filename}.jpg`);
  const outputFilename = `${filename}_${width}x${height}.jpg`;
  const outputPath = path.join(thumbDir, outputFilename);

  // Check if thumbnail already exists
  try {
    await fs.access(outputPath);
    // Thumbnail exists, return path relative to project root
    return path.relative(process.cwd(), outputPath);
  } catch {
    // Thumbnail does not exist, continue to create it
  }

  // Check if original file exists
  try {
    await fs.access(inputPath);
  } catch {
    throw new Error(`Original image "${filename}.jpg" does not exist`);
  }

  // Process image with sharp
  try {
    await sharp(inputPath)
      .resize(width, height)
      .toFile(outputPath);

    return path.relative(process.cwd(), outputPath);
  } catch (error: any) {
    throw new Error('Error processing the image: ' + error.message);
  }
};
