import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import appConfig from '../../../config/app.config';
import { RecoveredPasswordPayload } from '../../../entities/payload-recover-password.entity';

@Injectable()
export class JwtRecoverPasswordStrategy extends PassportStrategy(
  Strategy,
  'jwt-recover-password',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: appConfig().appSecret,
    });
  }

  async validate(payload: RecoveredPasswordPayload) {
    if (!payload || !payload.sub || !payload.recoveringPassword) {
      throw new UnauthorizedException('El token no es válido');
    }
    return payload;
  }
}
