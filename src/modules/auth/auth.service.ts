import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../user/repository/user.repository';
import { HashingUtil } from '../../utils/hashing';
import { User } from '../user/entities/user.entity';
import { UserPayload } from '../user/entities/payload-user.entity';
import { LoginSuccessDto } from './dto/login-success.dto';

@Injectable()
export class AuthService {
  constructor(
    private _userRepository: UserRepository,
    private _jwt: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this._userRepository.findOne(
      {},
      { where: [{ email }, { username: email }] },
    );
    if (user && (await HashingUtil.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: User): Promise<LoginSuccessDto> {
    const payload: UserPayload = {
      email: user.email,
      sub: user.id,
      username: user.username,
    };
    return {
      access_token: this._jwt.sign(payload),
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
    };
  }
}
