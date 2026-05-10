// src/vms/vms.controller.ts
import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { VmsService } from './vms.service';
import { CreateVmDto } from './dto/create-vm.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('vms') // Ruta base para el CRUD
@UseGuards(JwtAuthGuard, RolesGuard) // Protege toda la ruta con JWT y Roles
export class VmsController {
  constructor(private readonly vmsService: VmsService) {}

  @Get()
  findAll() {
    return this.vmsService.findAll();
  }

  @Post() 
  @Roles('ADMIN')
  create(@Body() createVmDto: CreateVmDto) {
    return this.vmsService.create(createVmDto);
  }

  @Put(':id') 
  @Roles('ADMIN')
  update(@Param('id') id: string, @Body() updateVmDto: any) {
    return this.vmsService.update(id, updateVmDto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.vmsService.remove(id);
  }
}