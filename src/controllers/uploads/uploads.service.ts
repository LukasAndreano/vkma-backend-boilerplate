import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Uploads } from "../../entities/uploads.entity";
import uploadImage from "../../utils/uploadImage.utils";
import { Repository } from "typeorm";
import { UploadsData } from "./dto/upload-data.dto";
import appRoot from "app-root-path";
import { UserDataDto } from "src/dto/user-data.dto";
import { FastifyRequest } from "fastify";
import errorGenerator from "src/utils/errorGenerator.utils";
import Errors from "src/errors.enum";
import * as fs from "node:fs";
import generateRandomName from "src/utils/generateRandomName.utils";

const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

@Injectable()
export class UploadsService {
	constructor(
		@InjectRepository(Uploads)
		private readonly uploadsRepository: Repository<Uploads>,
	) {}

	async upload(user: UserDataDto, req: FastifyRequest): Promise<UploadsData> {
		if (!req.isMultipart()) errorGenerator(Errors.BAD_REQUEST);

		const data = await req.file();

		if (!data) errorGenerator(Errors.BAD_REQUEST);

		if (!allowedTypes.includes(data.mimetype))
			errorGenerator(Errors.ONLY_IMAGES_ARE_ALLOWED);

		const fileBuffer = await data.toBuffer();

		const path = `${appRoot}/files/${generateRandomName(16)}.${data.mimetype.split("/")[1]}`;

		fs.writeFileSync(path, fileBuffer);

		return await uploadImage(user.id, path, this.uploadsRepository);
	}
}
