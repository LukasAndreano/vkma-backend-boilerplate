import sharp from "sharp";
import * as fs from "node:fs";

const compressFile = async (path: string): Promise<Buffer> => {
	const original: Buffer = await sharp(path).png({ quality: 80 }).toBuffer();

	fs.rmSync(path, {
		force: true,
	});

	return original;
};

export default compressFile;
