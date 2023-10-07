import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private config: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.config.get('MAIL_DEV_HOST'),
      port: this.config.get('MAIL_DEV_PORT'),
      secure: true,
      auth: {
        user: this.config.get('MAIL_DEV_USER'),
        pass: this.config.get('MAIL_DEV_PASS'),
      },
    });

    console.log({
      host: this.config.get('MAIL_DEV_HOST'),
      port: this.config.get('MAIL_DEV_PORT'),
      secure: true,
      auth: {
        user: this.config.get('MAIL_DEV_USER'),
        pass: this.config.get('MAIL_DEV_PASS'),
      },
    });
  }

  async sendWelcomeEmail(email: string, username: string) {
    const mailOptions = {
      sender: 'Test <owujibfavour@gmail.com>',
      to: email,
      subject: 'Welcome to Our App',
      text: `Hello ${username}, welcome to our app!`,
    };

    await this.transporter
      .sendMail({
        ...mailOptions,
      })
      .catch((err) => console.log('error', err));
  }
}
