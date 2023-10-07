import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
// import { Request } from 'express';
import { GetUser } from '../auth/decorator';

import { JwtGuard } from '../auth/guard';

@UseGuards(JwtGuard)
@Controller('api/user')
export class UserController {
  @Get('me')
  GetMe(@GetUser() user: User) {
    console.log(user);
    //   GetMe(@GetUser() user: User, @GetUser('email') email: string) {
    return user;
  }
}
