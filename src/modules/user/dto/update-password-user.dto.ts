import { IsNotEmpty } from 'class-validator';

export class UpdatePasswordUserDto {
  @IsNotEmpty()
  originalPassword: string;
  @IsNotEmpty()
  newPassword: string;
}
