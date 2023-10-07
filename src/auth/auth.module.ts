import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { BullModule } from '@nestjs/bull';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
// import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { EmailQueueService } from 'src/email/email-queue.service';
import { EmailModule } from 'src/email/email.module';
import { EmailService } from 'src/email/email.service';

@Module({
  imports: [
    JwtModule.register({}),
    BullModule.registerQueue({
      name: 'email', // Queue name
    }),
  ],
  //   imports: [PrismaModule], create a global module instead
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, EmailQueueService, EmailService],
})
export class AuthModule {}
