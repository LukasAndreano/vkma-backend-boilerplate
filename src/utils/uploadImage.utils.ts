import compressFile from "./compressFile.utils";
import * as md5 from "md5-file";
import { Repository } from "typeorm";
import { Uploads } from "src/entities/uploads.entity";
import * as fs from "node:fs";
import getCurrentTimestamp from "./getCurrentTimestamp.utils";
import * as appRoot from "app-root-path";

interface ImageResponse {
	photo_id: number;
	url: string;
}

const uploadImage = async (
	user_id: number,
	path: string,
	uploadsRepository: Repository<Uploads>,
): Promise<ImageResponse> => {
	// Getting the file hash (md5 hash)
	const hash: string = await md5(path);

	// Checking if the file is already uploaded
	const findUpload = await uploadsRepository
		.createQueryBuilder("uploads")
		.select(["id", "url"])
		.andWhere("hash = :hash", { hash })
		.getRawOne();

	// If it is, we will return the id, url and the uploaded file will be deleted
	if (findUpload) {
		fs.rmSync(path, {
			force: true,
		});

		return {
			photo_id: findUpload.id,
			url: findUpload.url,
		};
	}

	// returns buffer, write to folder
	const compressed = await compressFile(path);

	// Preparing the filenames (keys)
	const filenames = {
		original: `${hash}.png`,
	};

	fs.writeFileSync(`${appRoot}/static/${filenames.original}`, compressed);

	// Inserting the upload into the database
	const url = `${process.env.FILES_PATH}/${filenames.original}`;

	const insert = await uploadsRepository.insert({
		uploaded_by: user_id,
		hash,
		url,
		uploaded_at: getCurrentTimestamp(),
	});

	return {
		photo_id: insert.identifiers[0].id,
		url,
	};
};

export default uploadImage;
