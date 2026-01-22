import { Injectable } from '@nestjs/common';
import { PrismaService } from '@loadpocket/prisma';
import { CreateCarrierDto } from './dto/create-carrier.dto';
import { UpdateCarrierDto } from './dto/update-carrier.dto';

@Injectable()
export class CarriersService {
  constructor(private prisma: PrismaService) {}

  create(createCarrierDto: CreateCarrierDto) {
    return this.prisma.carrier.create({
      data: createCarrierDto,
    });
  }

  findAll(skip = 0, take = 50) {
    return this.prisma.carrier.findMany({
      where: { active: true },
      skip,
      take,
    });
  }

  findOne(id: string) {
    return this.prisma.carrier.findUnique({
      where: { id },
    });
  }

  findByMcNumber(mcNumber: string) {
    return this.prisma.carrier.findUnique({
      where: { mcNumber },
    });
  }

  update(id: string, updateCarrierDto: UpdateCarrierDto) {
    return this.prisma.carrier.update({
      where: { id },
      data: updateCarrierDto,
    });
  }

  remove(id: string) {
    return this.prisma.carrier.update({
      where: { id },
      data: { active: false },
    });
  }
}
