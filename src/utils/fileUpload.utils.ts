import { extname } from "node:path";
import generateRandomName from "./generateRandomName.utils";
import Errors from "src/errors.enum";
import { HttpException } from "@nestjs/common";

export const imageFileFilter = (req, file, callback) => {
	if (!file.originalname.toLowerCase().match(/\.(jpg|jpeg|png|webp)$/) || !req)
		return callback(
			new HttpException(
				{
					status: false,
					...Errors.ONLY_IMAGES_ARE_ALLOWED,
				},
				process.env.FORCE_200_FOR_ERRORS === "true" ? 200 : 400,
			),
			false,
		);

	callback(null, true);
};

export const editFileName = (_req, file, callback) => {
	const fileExtName = extname(file.originalname);
	callback(null, `${generateRandomName(64)}${fileExtName}`);
};
