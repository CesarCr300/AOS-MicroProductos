import { RepositoryBase } from '../../../base/repository.base';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class UserRepository extends RepositoryBase<
  {
    name: 'User';
    type: User;
  },
  User,
  UpdateUserDto,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(dataSource: DataSource) {
    super(dataSource, {
      name: 'User',
      type: new User(),
    });
  }
}
