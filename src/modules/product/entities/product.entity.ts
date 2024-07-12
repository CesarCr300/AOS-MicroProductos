import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
} from 'typeorm';
import { AuditoryEntity } from '../../auditory/entities/auditory.entity';

@Entity({ name: 'tbl_product' })
export class Product extends AuditoryEntity {
  @PrimaryGeneratedColumn({ name: 'int_id' })
  id: number;

  @Column({ name: 'vch_name', length: 100 })
  name: string;

  @Column({ name: 'vch_image_key', length: 255 })
  imageKey: string;

  @Column({ name: 'vch_description', length: 3000 })
  description: string;

  @Column({ name: 'int_stock' })
  stock: number;

  @Column({ name: 'dec_price', type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @DeleteDateColumn({ name: 'dat_deleted_at', nullable: true })
  deletedAt: Date | null;
}
