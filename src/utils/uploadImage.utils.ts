import compressFile from "./compressFile.utils";
import md5 from "md5-file";
import { Repository } from "typeorm";
import { Uploads } from "src/entities/uploads.entity";
import * as fs from "node:fs";
import appRoot from "app-root-path";

interface ImageResponse {
	photo_id: number;
	url: string;
}

const uploadImage = async (
	user_id: number,
	path: string,
	uploadsRepository: Repository<Uploads>,
): Promise<ImageResponse> => {
	try {
		const hash: string = await md5(path);

		const existingUpload = await uploadsRepository.findOne({
			select: ["id", "url"],
			where: { hash },
		});

		if (existingUpload) {
			fs.rmSync(path, { force: true });

			return {
				photo_id: existingUpload.id,
				url: existingUpload.url,
			};
		}

		const compressedBuffer = await compressFile(path);

		const filename = `${hash}.png`;

		const filePath = `${appRoot.path}/static/${filename}`;

		fs.writeFileSync(filePath, compressedBuffer);

		const newUpload = uploadsRepository.create({
			uploaded_by: user_id,
			hash,
			url: `/static/${filename}`,
		});

		newUpload.setUploadedAt();

		const insertResult = await uploadsRepository.save(newUpload);

		return {
			photo_id: insertResult.id,
			url: insertResult.url,
		};
	} catch (error) {
		console.error("Ошибка при загрузке изображения:", error);

		throw error;
	}
};

export default uploadImage;
