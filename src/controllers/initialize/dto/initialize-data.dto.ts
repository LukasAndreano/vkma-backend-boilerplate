import { ApiProperty } from "@nestjs/swagger";

export class InitializeData {
  @ApiProperty({
    description: "Идентификатор пользователя",
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: "Имя и фамилия пользователя",
    example: "Никита Балин",
  })
  name: string;

  @ApiProperty({
    description: "Ссылка на аватар пользователя",
    example:
      "https://sun9-3.userapi.com/impg/.../photo_2021-01-01_12-34-56.jpg?size=200x0&quality=90&sign=...&c_uniq_tag=...",
  })
  avatar: string;

  @ApiProperty({
    description: "Признак получения уведомлений от приложения",
    example: false,
  })
  notifications: boolean;
}
