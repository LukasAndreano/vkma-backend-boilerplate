import { Body, Controller, Headers, Patch } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserDataDto } from "src/dto/user-data.dto";
import { ProfilePatchBody } from "./dto/profile-body.dto";
import { ProfileService } from "./profile.service";

@ApiTags("Модуль профиля")
@Controller("profile")
export class ProfileController {
	constructor(private readonly profileService: ProfileService) {}

	@Patch()
	@ApiOperation({
		summary: "Обновление данных профиля",
	})
	@ApiResponse({
		status: 200,
		type: Boolean,
	})
	async updateProfile(
		@Headers("user-data") user: UserDataDto,
		@Body() body: ProfilePatchBody,
	): Promise<boolean> {
		return await this.profileService.updateProfile(user, body);
	}
}
