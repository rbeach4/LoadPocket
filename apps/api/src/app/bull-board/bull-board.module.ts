import { Module, OnModuleInit, Inject } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { getQueueToken } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { QUEUE_NAMES } from '@loadpocket/queues';

@Module({})
export class BullBoardModule implements OnModuleInit {
  constructor(
    private adapterHost: HttpAdapterHost,
    @Inject(getQueueToken(QUEUE_NAMES.EMAIL)) private emailQueue: Queue,
    @Inject(getQueueToken(QUEUE_NAMES.DOCUMENTS)) private documentsQueue: Queue,
    @Inject(getQueueToken(QUEUE_NAMES.INVOICES)) private invoicesQueue: Queue,
  ) {}

  onModuleInit() {
    const serverAdapter = new ExpressAdapter();
    serverAdapter.setBasePath('/admin/queues');

    createBullBoard({
      queues: [
        new BullMQAdapter(this.emailQueue),
        new BullMQAdapter(this.documentsQueue),
        new BullMQAdapter(this.invoicesQueue),
      ],
      serverAdapter,
    });

    const app = this.adapterHost.httpAdapter.getInstance();
    app.use('/admin/queues', serverAdapter.getRouter());
  }
}
