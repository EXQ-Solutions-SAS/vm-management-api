// src/vms/vms.controller.ts
import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { VmsService } from './vms.service';
import { CreateVmDto } from './dto/create-vm.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('vms') // Ruta base para el CRUD
@UseGuards(JwtAuthGuard, RolesGuard) // Protege toda la ruta con JWT y Roles [cite: 41]
export class VmsController {
  constructor(private readonly vmsService: VmsService) {}

  @Get() // GET /vms - Disponible para Admin y Cliente [cite: 43]
  findAll() {
    return this.vmsService.findAll();
  }

  @Post() // POST /vms - Solo Admin [cite: 42]
  @Roles('ADMIN')
  create(@Body() createVmDto: CreateVmDto) {
    return this.vmsService.create(createVmDto);
  }

  @Put(':id') // PUT /vms/:id - Solo Admin [cite: 44]
  @Roles('ADMIN')
  update(@Param('id') id: string, @Body() updateVmDto: any) {
    return this.vmsService.update(id, updateVmDto);
  }

  @Delete(':id') // DELETE /vms/:id - Solo Admin [cite: 45]
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.vmsService.remove(id);
  }
}