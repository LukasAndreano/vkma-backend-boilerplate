import { Controller, Get, Headers } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserDataDto } from "src/dto/user-data.dto";
import { InitializeData } from "./dto/initialize-data.dto";
import { InitializeService } from "./initialize.service";

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
  async initialize(
    @Headers("user") user: UserDataDto,
  ): Promise<InitializeData> {
    return await this.initializeService.initialize(user);
  }
}
