import { Module } from '@nestjs/common';
import { FlowersService } from './flowers.service';
import { FlowersController } from './flowers.controller';
import { FlowersGateway } from './flowers.gateway';

@Module({
  controllers: [FlowersController],
  providers: [FlowersService, FlowersGateway],
  exports: [FlowersService],
})
export class FlowersModule {}
