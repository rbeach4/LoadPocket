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
    const invoiceNumber = await this.generateInvoiceNumber();
    
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

    // Queue email to customer
    if (invoice.customer.email) {
      await this.emailQueue.add('send-invoice', {
        invoiceId: invoice.id,
        email: invoice.customer.email,
      });
    }

    return invoice;
  }

  findAll(status?: InvoiceStatus) {
    return this.prisma.invoice.findMany({
      where: status ? { status } : undefined,
      include: {
        customer: true,
        load: true,
      },
      orderBy: { createdAt: 'desc' },
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

  private async generateInvoiceNumber(): Promise<string> {
    const count = await this.prisma.invoice.count();
    const padded = String(count + 1).padStart(6, '0');
    return `INV-${padded}`;
  }
}
