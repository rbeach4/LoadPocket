import { Injectable } from '@nestjs/common';
import { PrismaService } from '@loadpocket/prisma';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';

@Injectable()
export class DocumentsService {
  constructor(private prisma: PrismaService) {}

  create(createDocumentDto: CreateDocumentDto) {
    return this.prisma.document.create({
      data: createDocumentDto,
    });
  }

  findAll(loadId?: string) {
    return this.prisma.document.findMany({
      where: loadId ? { loadId } : undefined,
      orderBy: { createdAt: 'desc' },
    });
  }

  findOne(id: string) {
    return this.prisma.document.findUnique({
      where: { id },
    });
  }

  update(id: string, updateDocumentDto: UpdateDocumentDto) {
    return this.prisma.document.update({
      where: { id },
      data: updateDocumentDto,
    });
  }

  remove(id: string) {
    return this.prisma.document.delete({
      where: { id },
    });
  }
}
