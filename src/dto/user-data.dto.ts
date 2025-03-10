import { ApiProperty } from "@nestjs/swagger";

export class UserDataDto {
	@ApiProperty({
		description: "Идентификатор пользователя",
		example: 1,
	})
	id: number;

	@ApiProperty({
		description: "Идентификатор пользователя в VK",
		example: 123456789,
	})
	user_id: number;

	@ApiProperty({
		description: "Дата регистрации пользователя (timestamp)",
		example: 1610000000,
	})
	joined_at: number;
}
