import { IsString, IsInt, Min } from 'class-validator';

export class CreateVmDto {
  @IsString()
  name!: string;

  @IsInt()
  @Min(1)
  cores!: number; // Coincide con Prisma

  @IsInt()
  @Min(1)
  ram!: number;   // Coincide con Prisma

  @IsInt()
  @Min(1)
  disk!: number;  // Coincide con Prisma

  @IsString()
  os!: string;    // Obligatorio en Prisma
}