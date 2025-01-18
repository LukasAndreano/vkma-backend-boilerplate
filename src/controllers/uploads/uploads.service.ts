import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Uploads } from "../../entities/uploads.entity";
import uploadImage from "../../utils/uploadImage.utils";
import { Repository } from "typeorm";
import { UploadsData } from "./dto/upload-data.dto";
import * as appRoot from "app-root-path";
import { UserDataDto } from "src/dto/user-data.dto";

@Injectable()
export class UploadsService {
	constructor(
		@InjectRepository(Uploads)
		private readonly uploadsRepository: Repository<Uploads>,
	) {}

	async upload(
		user: UserDataDto,
		file: Express.Multer.File,
	): Promise<UploadsData> {
		return await uploadImage(
			user.id,
			`${appRoot}/${file.path}`,
			this.uploadsRepository,
		);
	}
}
