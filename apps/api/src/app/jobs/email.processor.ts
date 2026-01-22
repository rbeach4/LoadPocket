import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { QUEUE_NAMES } from '@loadpocket/queues';

@Processor(QUEUE_NAMES.EMAIL)
export class EmailProcessor extends WorkerHost {
  private readonly logger = new Logger(EmailProcessor.name);

  async process(job: Job): Promise<void> {
    this.logger.log(`Processing email job ${job.id}: ${job.name}`);
    
    switch (job.name) {
      case 'send-invoice':
        await this.sendInvoiceEmail(job.data);
        break;
      case 'send-rate-confirmation':
        await this.sendRateConfirmation(job.data);
        break;
      default:
        this.logger.warn(`Unknown job name: ${job.name}`);
    }
  }

  private async sendInvoiceEmail(data: { invoiceId: string; email: string }) {
    this.logger.log(`Sending invoice ${data.invoiceId} to ${data.email}`);
    // TODO: Implement email sending
  }

  private async sendRateConfirmation(data: { loadId: string; email: string }) {
    this.logger.log(`Sending rate confirmation for load ${data.loadId} to ${data.email}`);
    // TODO: Implement email sending
  }
}
