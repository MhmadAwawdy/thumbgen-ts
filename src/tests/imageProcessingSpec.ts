import { processImage } from '../services/imageService';
import fs from 'fs/promises';
import path from 'path';

describe('processImage', () => {
  const filename = 'fjord';
  const width = 150;
  const height = 150;
  const thumbDir = path.resolve('./thumbnails');
  const outputFile = path.join(thumbDir, `${filename}_${width}x${height}.jpg`);

  beforeAll(async () => {
    // Clean up before test
    try {
      await fs.unlink(outputFile);
    } catch {}
  });

  it('should create a resized image and save it', async () => {
    const resultPath = await processImage(filename, width, height);
    expect(resultPath).toContain(`${filename}_${width}x${height}.jpg`);

    // Check if the file exists now
    try {
      await fs.access(outputFile);
      expect(true).toBe(true);
    } catch {
      fail('Thumbnail was not created');
    }
  });

  it('should reuse the existing thumbnail on second call', async () => {
    const firstCall = await processImage(filename, width, height);
    const secondCall = await processImage(filename, width, height);
    expect(secondCall).toBe(firstCall);
  });

  it('should throw error for non-existent original image', async () => {
    await expectAsync(processImage('nonexistent', width, height)).toBeRejectedWithError(/does not exist/);
  });
});
