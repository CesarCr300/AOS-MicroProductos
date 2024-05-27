import { IsNotEmpty } from 'class-validator';

export class GetLinkToResetPasswordUserDto {
  @IsNotEmpty()
  emailOrUsername: string;
}
