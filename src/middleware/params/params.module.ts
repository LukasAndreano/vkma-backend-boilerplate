import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Users } from 'src/entities/users.entity';
import { ParamsService } from './params.service';

@Module({
  providers: [ParamsService],
  exports: [ParamsService],
  imports: [TypeOrmModule.forFeature([Users])],
})
export class StartParamsModule {}
