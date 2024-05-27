import { JwtModuleAsyncOptions } from '@nestjs/jwt';
import { env } from 'process';
import appConfig from './app.config';

export const jwtConfig: JwtModuleAsyncOptions = {
  useFactory: () => {
    return {
      secret: appConfig().appSecret,
      signOptions: { expiresIn: env.JWT_TOKEN_EXPIRES_IN },
    };
  },
};
