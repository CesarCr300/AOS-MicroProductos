import { Column } from 'typeorm';

export class AuditoryEntity {
  @Column({ name: 'int_created_by', nullable: true })
  createdBy: number;
  @Column({ name: 'int_updated_by', nullable: true })
  updatedBy: number;
}
