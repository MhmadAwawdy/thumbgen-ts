import fs from 'fs/promises';
import path from 'path';

/**
 * Check if a file exists asynchronously.
 * @param filePath Absolute or relative path to the file
 * @returns Promise<boolean> true if file exists, else false
 */
export const fileExists = async (filePath: string): Promise<boolean> => {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
};

/**
 * Safely build a file path inside a directory with extension.
 * @param dir Directory path
 * @param filename Filename without extension
 * @param ext Extension with dot (e.g. '.jpg')
 * @returns Full path string
 */
export const buildFilePath = (
  dir: string,
  filename: string,
  ext: string
): string => {
  return path.resolve(dir, `${filename}${ext}`);
};
