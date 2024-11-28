import { IsInt, IsPositive, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  count?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  width?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  height?: number;

  @IsOptional()
  @IsString()
  weight?: string;
}
