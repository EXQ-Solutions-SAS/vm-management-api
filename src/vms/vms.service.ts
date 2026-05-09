// src/vms/vms.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVmDto } from './dto/create-vm.dto';
import { VmsGateway } from './vms.gateway';

@Injectable()
export class VmsService {
  constructor(
    private prisma: PrismaService,
    private vmsGateway: VmsGateway // Inyectamos el gateway para real-time
  ) {}

  async create(data: CreateVmDto) {
    const vm = await this.prisma.virtualMachine.create({ data });
    this.vmsGateway.server.emit('vmCreated', vm); // Notificar creación
    return vm;
  }

  findAll() {
    return this.prisma.virtualMachine.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  async update(id: string, data: any) {
    try {
      const vm = await this.prisma.virtualMachine.update({
        where: { id },
        data,
      });
      this.vmsGateway.server.emit('vmUpdated', vm); // Notificar actualización instantánea 
      return vm;
    } catch (e) {
      throw new NotFoundException(`VM con ID ${id} no encontrada`);
    }
  }

  async remove(id: string) {
    await this.prisma.virtualMachine.delete({ where: { id } });
    this.vmsGateway.server.emit('vmDeleted', id); // Notificar eliminación
    return { deleted: true };
  }
}