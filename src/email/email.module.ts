import { Global, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { EmailService } from './email.service';
import { EmailProcessor } from './email.processor';
import { EmailQueueService } from './email-queue.service';

@Global()
@Module({
  imports: [
    BullModule.registerQueue({
      name: 'email', // Queue name
    }),
  ],
  providers: [EmailService, EmailProcessor, EmailQueueService],
  exports: [EmailService, EmailQueueService],
})
export class EmailModule {}
