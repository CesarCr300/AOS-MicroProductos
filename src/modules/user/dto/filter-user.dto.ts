import { OmitType, PartialType } from '@nestjs/swagger';

import { User } from '../entities/user.entity';

export class FilterUserDto extends PartialType(OmitType(User, ['password'])) {}
