// src/vms/vms.module.ts
import { Module } from '@nestjs/common';
import { VmsService } from './vms.service';
import { VmsController } from './vms.controller';
import { VmsGateway } from './vms.gateway';

@Module({
  controllers: [VmsController],
  providers: [VmsService, VmsGateway],
  exports: [VmsService]
})
export class VmsModule {}