import { ApiProperty } from "@nestjs/swagger";

export class CreateDataDto {
  @ApiProperty({
    description: "Идентификатор",
    example: 1,
    required: false,
  })
  id?: number;

  @ApiProperty({
    description: "Время обновления",
    example: 1610000000,
    required: false,
  })
  updated_at?: number;
}
