import { ApiProperty } from "@nestjs/swagger";

export class UploadsData {
  @ApiProperty({
    description: "Идентификатор обложки",
    example: 1,
  })
  readonly photo_id: number;

  @ApiProperty({
    description: "Адрес обложки",
    example: "http://localhost:3000/static/...",
  })
  readonly url: string;
}
