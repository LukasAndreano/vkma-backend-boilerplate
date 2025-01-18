import { Module } from "@nestjs/common";
import { InitializeController } from "./initialize.controller";
import { InitializeService } from "./initialize.service";

@Module({
	controllers: [InitializeController],
	providers: [InitializeService],
})
export class InitializeModule {}
