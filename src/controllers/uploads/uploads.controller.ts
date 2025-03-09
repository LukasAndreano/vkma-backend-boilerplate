import { Controller, Post, Headers, Req } from "@nestjs/common";
import {
	ApiBody,
	ApiConsumes,
	ApiOperation,
	ApiResponse,
	ApiTags,
} from "@nestjs/swagger";
import { UploadsService } from "./uploads.service";
import { UploadsData } from "./dto/upload-data.dto";
import { UserDataDto } from "src/dto/user-data.dto";
import { FastifyRequest } from "fastify";
import { Throttle } from "@nestjs/throttler";

@ApiTags("Загрузка изображений")
@Controller("uploads")
export class UploadsController {
	constructor(private readonly uploadsService: UploadsService) {}

	@ApiOperation({
		summary:
			"Загрузка фотографий на бэкенд. Принимаются форматы: jpg, jpeg, png, webp (до 20мб).",
	})
	@ApiResponse({
		status: 200,
		type: UploadsData,
	})
	@ApiConsumes("multipart/form-data")
	@Post()
	@Throttle({ default: { limit: 1, ttl: 3 } })
	async upload(
		@Headers() headers: { userData: UserDataDto },
		@Req() req: FastifyRequest,
	): Promise<UploadsData> {
		return this.uploadsService.upload(headers.userData, req);
	}
}
