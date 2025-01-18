import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Uploads } from "src/entities/uploads.entity";
import { UploadsController } from "./uploads.controller";
import { UploadsService } from "./uploads.service";

@Module({
	controllers: [UploadsController],
	providers: [UploadsService],
	imports: [TypeOrmModule.forFeature([Uploads])],
})
export class UploadsModule {}
