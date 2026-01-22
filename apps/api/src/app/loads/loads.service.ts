import { Injectable } from '@nestjs/common';
import { PrismaService, LoadStatus } from '@loadpocket/prisma';
import { CreateLoadDto } from './dto/create-load.dto';
import { UpdateLoadDto } from './dto/update-load.dto';

@Injectable()
export class LoadsService {
  constructor(private prisma: PrismaService) {}

  async create(createLoadDto: CreateLoadDto) {
    const loadNumber = await this.generateLoadNumber();
    const margin = Number(createLoadDto.customerRate) - Number(createLoadDto.carrierRate);
    
    return this.prisma.load.create({
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
  }

  findAll(status?: LoadStatus) {
    return this.prisma.load.findMany({
      where: status ? { status } : undefined,
      include: {
        customer: true,
        carrier: true,
        dispatcher: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  findOne(id: string) {
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
    return this.prisma.load.update({
      where: { id },
      data: { status },
    });
  }

  remove(id: string) {
    return this.prisma.load.delete({
      where: { id },
    });
  }

  private async generateLoadNumber(): Promise<string> {
    const count = await this.prisma.load.count();
    const padded = String(count + 1).padStart(6, '0');
    return `LD-${padded}`;
  }
}
