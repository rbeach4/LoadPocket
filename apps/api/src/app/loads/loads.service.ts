import { Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { PrismaService, LoadStatus } from '@loadpocket/prisma';
import { CreateLoadDto } from './dto/create-load.dto';
import { UpdateLoadDto } from './dto/update-load.dto';

@Injectable()
export class LoadsService {
  constructor(
    private prisma: PrismaService,
    @InjectPinoLogger(LoadsService.name) private readonly logger: PinoLogger,
  ) {}

  async create(createLoadDto: CreateLoadDto) {
    const loadNumber = this.generateLoadNumber();
    const margin = Number(createLoadDto.customerRate) - Number(createLoadDto.carrierRate);
    
    this.logger.info({ loadNumber, customerId: createLoadDto.customerId }, 'Creating new load');

    const load = await this.prisma.load.create({
      data: {
        ...createLoadDto,
        loadNumber,
        margin,
      },
      include: {
        customer: true,
        carrier: true,
        dispatcher: true,
      },
    });

    this.logger.info({ loadId: load.id, loadNumber }, 'Load created successfully');

    return load;
  }

  findAll(status?: LoadStatus, skip = 0, take = 50) {
    this.logger.debug({ status, skip, take }, 'Fetching loads');

    return this.prisma.load.findMany({
      where: status ? { status } : undefined,
      include: {
        customer: true,
        carrier: true,
        dispatcher: true,
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take,
    });
  }

  findOne(id: string) {
    this.logger.debug({ id }, 'Fetching load by ID');
    
    return this.prisma.load.findUnique({
      where: { id },
      include: {
        customer: true,
        carrier: true,
        dispatcher: true,
        documents: true,
        invoice: true,
      },
    });
  }

  update(id: string, updateLoadDto: UpdateLoadDto) {
    this.logger.info({ id }, 'Updating load');
    
    const data: any = { ...updateLoadDto };
    
    if (updateLoadDto.customerRate && updateLoadDto.carrierRate) {
      data.margin = Number(updateLoadDto.customerRate) - Number(updateLoadDto.carrierRate);
    }
    
    return this.prisma.load.update({
      where: { id },
      data,
      include: {
        customer: true,
        carrier: true,
        dispatcher: true,
      },
    });
  }

  updateStatus(id: string, status: LoadStatus) {
    this.logger.info({ id, status }, 'Updating load status');
    
    return this.prisma.load.update({
      where: { id },
      data: { status },
    });
  }

  remove(id: string) {
    this.logger.warn({ id }, 'Deleting load');
    
    return this.prisma.load.delete({
      where: { id },
    });
  }

  private generateLoadNumber(): string {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `LD-${timestamp}-${random}`;
  }
}
