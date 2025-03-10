import { ApiProperty } from "@nestjs/swagger";

export class InitializeData {
	@ApiProperty({
		description: "Идентификатор пользователя",
		example: 1,
	})
	id: number;
}
