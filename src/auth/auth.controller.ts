import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('/api/auth')
export class AuthController {
  //   authService: AuthController;
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  //   Signup(@Req() req: Request) {
  Signup(@Body() dto: AuthDto) {
    return this.authService.SignUp(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  Signin(@Body() dto: AuthDto) {
    return this.authService.Login(dto);
  }
}
