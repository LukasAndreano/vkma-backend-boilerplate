import { Module } from '@nestjs/common';
import { UsersUpdaterModule } from './users-updater/users-updater.module';

@Module({
  imports: [UsersUpdaterModule],
})
export class TasksModule {}
