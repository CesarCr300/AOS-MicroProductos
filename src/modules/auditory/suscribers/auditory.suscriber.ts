import { ClsService } from 'nestjs-cls';
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';

import { AuditoryEntity } from '../entities/auditory.entity';

@EventSubscriber()
export class AuditorySuscriber
  implements EntitySubscriberInterface<AuditoryEntity>
{
  constructor(
    dataSource: DataSource,
    private readonly cls: ClsService,
  ) {
    dataSource.subscribers.push(this);
  }
  //   listenTo() {
  //     return AuditoryEntity;
  //   }
  //this.cls.get('user') can be null because i'm putting public the create user ep to facilitate the creation of the user to the interviewers
  beforeInsert(event: InsertEvent<AuditoryEntity>) {
    if (!this.cls.get('user')) return;
    event.entity.createdBy = this.cls.get('user').sub;
  }

  beforeUpdate(event: UpdateEvent<AuditoryEntity>) {
    if (!this.cls.get('user')) return;
    event.entity.updatedBy = this.cls.get('user').sub;
  }
}
