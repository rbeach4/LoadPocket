import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { PrismaService, InvoiceStatus } from '@loadpocket/prisma';
import { QUEUE_NAMES } from '@loadpocket/queues';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';

@Injectable()
export class InvoicesService {
  constructor(
    private prisma: PrismaService,
    @InjectQueue(QUEUE_NAMES.EMAIL) private emailQueue: Queue,
  ) {}

  async create(createInvoiceDto: CreateInvoiceDto) {
    const invoiceNumber = this.generateInvoiceNumber();
    
    const invoice = await this.prisma.invoice.create({
      data: {
        ...createInvoiceDto,
        invoiceNumber,
      },
      include: {
        customer: true,
        load: true,
        createdBy: true,
      },
    });

    // Queue email to customer (fire-and-forget, don't block response)
    if (invoice.customer.email) {
      this.emailQueue.add('send-invoice', {
        invoiceId: invoice.id,
        email: invoice.customer.email,
      });
    }

    return invoice;
  }

  findAll(status?: InvoiceStatus, skip = 0, take = 50) {
    return this.prisma.invoice.findMany({
      where: status ? { status } : undefined,
      include: {
        customer: true,
        load: true,
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take,
    });
  }

  findOne(id: string) {
    return this.prisma.invoice.findUnique({
      where: { id },
      include: {
        customer: true,
        load: true,
        createdBy: true,
      },
    });
  }

  update(id: string, updateInvoiceDto: UpdateInvoiceDto) {
    return this.prisma.invoice.update({
      where: { id },
      data: updateInvoiceDto,
    });
  }

  markAsPaid(id: string) {
    return this.prisma.invoice.update({
      where: { id },
      data: {
        status: 'PAID',
        paidDate: new Date(),
      },
    });
  }

  remove(id: string) {
    return this.prisma.invoice.delete({
      where: { id },
    });
  }

  private generateInvoiceNumber(): string {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `INV-${timestamp}-${random}`;
  }
}
