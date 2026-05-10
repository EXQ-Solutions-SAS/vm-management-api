import { VMStatus } from '@prisma/client';

export class VirtualMachine {
  id!: string;
  name!: string;
  cores!: number;
  ram!: number;
  disk!: number;
  os!: string;
  status!: VMStatus;
  createdAt!: Date;
}