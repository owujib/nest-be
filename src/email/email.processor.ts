import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { EmailService } from './email.service';

@Processor('email')
export class EmailProcessor {
  constructor(private readonly emailService: EmailService) {}

  @Process('sendWelcomeEmail')
  async sendWelcomeEmail(job: Job) {
    const { email, username } = job.data;
    // Your email sending logic using the EmailService
    const job2 = await this.emailService.sendWelcomeEmail(email, username);
    console.log({ job2 });
    return job2;
  }
}
