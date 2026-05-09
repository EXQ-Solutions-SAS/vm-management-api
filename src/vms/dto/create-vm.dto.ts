// src/vms/dto/create-vm.dto.ts
import { IsString, IsInt, Min, IsEnum, IsNotEmpty } from 'class-validator';
import { VMStatus } from '@prisma/client';

export class CreateVmDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsInt()
  @Min(1, { message: 'Cores debe ser al menos 1' })
  cores!: number;

  @IsInt()
  @Min(1, { message: 'RAM no puede ser negativa o cero' })
  ram!: number;

  @IsInt()
  @Min(1)
  disk!: number;

  @IsString()
  os!: string;

  @IsEnum(VMStatus)
  status!: VMStatus;
}