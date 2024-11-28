import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity('commends')
export class Commend {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 255, nullable: false })
  description: string;
  @Column({ type: 'timestamp', nullable: true })
  date: Date;
  @ManyToOne(() => Product, (product) => product.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  product: Product;

  constructor(description: string) {
    this.description = description;
    this.date = new Date();
  }
}
