import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Commend } from './commend.entity';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imageUrl: string;

  @Column()
  name: string;

  @Column('int', { nullable: false, default: 0 })
  count: number;

  @Column()
  width: number;

  @Column()
  height: number;

  @Column()
  weight: string;

  @OneToMany(() => Commend, (commend) => commend.product, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  comments: Commend[];

  constructor(
    imageUrl: string,
    name: string,
    count: number,
    width: number,
    height: number,
    weight: string,
  ) {
    this.imageUrl = imageUrl;
    this.name = name;
    this.count = count;
    this.width = width;
    this.height = height;
    this.weight = weight;
  }
}
