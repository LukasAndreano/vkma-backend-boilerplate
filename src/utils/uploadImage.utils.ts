import compressFile from "./compressFile.utils";
import md5 from "md5-file";
import { Repository } from "typeorm";
import { Uploads } from "src/entities/uploads.entity";
import * as fs from "node:fs";
import getCurrentTimestamp from "./getCurrentTimestamp.utils";
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

		const existingUpload = await uploadsRepository
			.createQueryBuilder("uploads")
			.select(["id", "url"])
			.where("hash = :hash", { hash })
			.getRawOne();

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

		const fileUrl = `/static/${filename}`;

		const insertResult = await uploadsRepository.insert({
			uploaded_by: user_id,
			hash,
			url: fileUrl,
			uploaded_at: getCurrentTimestamp(),
		});

		return {
			photo_id: insertResult.identifiers[0].id,
			url: fileUrl,
		};
	} catch (error) {
		console.error("Ошибка при загрузке изображения:", error);

		throw error;
	}
};

export default uploadImage;
