import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class EmailQueueService {
  constructor(@InjectQueue('email') private readonly emailQueue: Queue) {}

  async sendWelcomeEmail(email: string, username: string) {
    const job = await this.emailQueue.add(
      'sendWelcomeEmail',
      { email, username },
      {
        removeOnComplete: true,
      }
    );
    return { jobId: job.id };
  }
}
