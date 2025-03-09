import { Controller, Get, Headers } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserDataDto } from "src/dto/user-data.dto";
import { InitializeData } from "./dto/initialize-data.dto";
import { InitializeService } from "./initialize.service";
import { Throttle } from "@nestjs/throttler";

@ApiTags("Модуль инициализации (первый запрос)")
@Controller("initialize")
export class InitializeController {
	constructor(private readonly initializeService: InitializeService) {}

	@Get()
	@ApiOperation({
		summary: "Инициализация приложения",
	})
	@ApiResponse({
		status: 200,
		type: InitializeData,
	})
	@Throttle({ default: { limit: 1, ttl: 3 } })
	async initialize(
		@Headers() headers: { userData: UserDataDto },
	): Promise<InitializeData> {
		return await this.initializeService.initialize(headers.userData);
	}
}
