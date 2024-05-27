import { EntityBase } from '../../../base/entity.base';
import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AuditoryEntity } from '../../auditory/entities/auditory.entity';

@Entity({ name: 'tbl_user' })
export class User extends AuditoryEntity implements EntityBase {
  @PrimaryGeneratedColumn({ name: 'int_id' })
  id: number;
  @Column({ name: 'vch_email' })
  email: string;
  @Column({ name: 'vch_password' })
  password: string;
  @Column({ name: 'vch_name' })
  name: string;
  @Column({ name: 'vch_lastname' })
  lastName: string;

  @DeleteDateColumn({ name: 'dat_deleted_at' })
  deletedAt: Date;
}
