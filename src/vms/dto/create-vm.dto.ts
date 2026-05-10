import { IsString, IsInt, Min } from 'class-validator';

export class CreateVmDto {
  @IsString()
  name!: string;

  @IsInt()
  @Min(1)
  cores!: number; 

  @IsInt()
  @Min(1)
  ram!: number;   

  @IsInt()
  @Min(1)
  disk!: number;  

  @IsString()
  os!: string;   
}