import { ApiProperty } from '@nestjs/swagger';

export class ServiceDataDto {
  @ApiProperty({
    description: 'Идентификатор сервиса',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Идентификатор игры',
    example: 2,
  })
  game_id: number;
}
