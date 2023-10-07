import {
  // ForbiddenException,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import { EmailQueueService } from '../email/email-queue.service';

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private jwt: JwtService,
    private emailQueueService: EmailQueueService
  ) {}
  async Login(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new BadRequestException('Incorrect credentials please try again');
    }

    const correctPassword = await argon.verify(user.password, dto.password);

    if (!correctPassword) {
      throw new BadRequestException('Incorrect credentials');
    }

    delete user.password;
    return { user, access_token: await this.signToken(user.id, user.email) };
  }

  async SignUp(dto: AuthDto) {
    const password = await argon.hash(dto.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: password,
        },
        select: {
          id: true,
          email: true,
        },
      });
      this.emailQueueService
        .sendWelcomeEmail(dto.email, 'esteemed user')
        .catch((err) => console.log('bull error', err));

      return user;
    } catch (error) {
      console.log(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('email credentials taken');
        }
      }

      throw error;
    }
  }

  async signToken(userId: number, email: string): Promise<string> {
    const payload = {
      sub: userId,
      email,
    };
    return this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: this.config.get('JWT_SECRET'),
    });
  }
}
