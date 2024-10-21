import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional } from "class-validator";

export class ProfilePatchBody {
  @ApiProperty({
    description: "Уведомления от приложения",
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  notifications: boolean;

  @ApiProperty({
    description: "Признак прохождения онбординга",
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  onboarding: boolean;
}
