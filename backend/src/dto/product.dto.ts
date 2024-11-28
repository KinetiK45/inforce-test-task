import { IsString, IsInt, IsObject, IsArray } from 'class-validator';
import { Expose, Transform, Exclude } from 'class-transformer';

export class ProductDto {
  @Expose()
  @IsString()
  imageUrl: string;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsInt()
  count: number;

  @Expose()
  @IsString()
  weight: string;

  @Expose()
  @IsArray()
  @IsString({ each: true })
  comments: string[];

  @Expose()
  @IsObject()
  @Transform(
    ({ obj }) => ({
      width: obj.width,
      height: obj.height,
    }),
    { toClassOnly: true },
  )
  size: { width: number; height: number };

  @Exclude()
  width: number;

  @Exclude()
  height: number;
}
