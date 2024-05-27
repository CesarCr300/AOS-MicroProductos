import { IsNotEmpty } from 'class-validator';

export class RecoverPasswordUserDto {
  @IsNotEmpty()
  password: string;
}
