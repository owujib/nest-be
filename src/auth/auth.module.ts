import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
// import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [JwtModule.register({})],
  //   imports: [PrismaModule], create a global module instead
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
