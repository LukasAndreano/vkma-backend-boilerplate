import * as sharp from 'sharp';
import * as fs from 'fs';

const compressFile = async (path: string): Promise<Buffer> => {
  // Compress original image
  const original: Buffer = await sharp(path).png({ quality: 80 }).toBuffer();

  // Remove original image
  fs.rmSync(path, {
    force: true,
  });

  return original;
};

export default compressFile;
