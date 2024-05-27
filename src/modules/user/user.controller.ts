import {
  Controller,
  Post,
  Body,
  Patch,
  UseGuards,
  Get,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Public } from '../auth/utils/isPublic';
import { JwtRecoverPasswordAuthGuard } from '../auth/guards/jwt-recover-password.guard';
import { UserService } from './user.service';
import {
  GetLinkToResetPasswordUserDto,
  CreateUserDto,
  UpdatePasswordUserDto,
  RecoverPasswordUserDto,
} from './dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Public()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Patch('update-password')
  updatePassword(@Body() update: UpdatePasswordUserDto) {
    return this.userService.updatePassword(update);
  }

  @Get('link-to-reset-password')
  @Public()
  sendLinkToResetPassword(@Query() dto: GetLinkToResetPasswordUserDto) {
    return this.userService.sendLinkToResetPassword(dto);
  }

  @Post('recover-password')
  @Public()
  @UseGuards(JwtRecoverPasswordAuthGuard)
  recoverPassword(@Body() dto: RecoverPasswordUserDto) {
    return this.userService.recoverPassword(dto);
  }
}
