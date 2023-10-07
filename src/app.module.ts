import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'containers-us-west-86.railway.app', // Redis server host
        port: 6794, // Redis server port
        username: 'default',
        password: '23KSSEZl9QiHYXU9kLhD',
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    BookmarkModule,
    PrismaModule,
    EmailModule,
  ],
})
export class AppModule {}
