import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "src/entities/users.entity";
import { UsersUpdaterService } from "./users-updater.service";

@Module({
  providers: [UsersUpdaterService],
  imports: [TypeOrmModule.forFeature([Users])],
})
export class UsersUpdaterModule {}
