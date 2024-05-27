import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtRecoverPasswordAuthGuard extends AuthGuard(
  'jwt-recover-password',
) {}
