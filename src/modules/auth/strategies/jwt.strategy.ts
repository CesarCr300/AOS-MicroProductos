import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import appConfig from '../../../config/app.config';
import { UserPayload } from '../../user/entities/payload-user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: appConfig().appSecret,
    });
  }

  async validate(payload: UserPayload) {
    if (!payload || !payload.sub || !payload.email || !payload.username) {
      throw new UnauthorizedException('El token no es válido');
    }
    return payload;
  }
}
