import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
// import { Request } from 'express';
import { GetUser } from 'src/auth/decorator';

import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('api/user')
export class UserController {
  @Get('me')
  GetMe(@GetUser() user: User) {
    //   GetMe(@GetUser() user: User, @GetUser('email') email: string) {
    return user;
  }
}
