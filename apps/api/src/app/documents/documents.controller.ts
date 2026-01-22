import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';

@ApiTags('documents')
@ApiBearerAuth()
@Controller({
  path: 'documents',
  version: '1',
})
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new document' })
  create(@Body() createDocumentDto: CreateDocumentDto) {
    return this.documentsService.create(createDocumentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all documents' })
  findAll(@Query('loadId') loadId?: string) {
    return this.documentsService.findAll(loadId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a document by ID' })
  findOne(@Param('id') id: string) {
    return this.documentsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a document' })
  update(@Param('id') id: string, @Body() updateDocumentDto: UpdateDocumentDto) {
    return this.documentsService.update(id, updateDocumentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a document' })
  remove(@Param('id') id: string) {
    return this.documentsService.remove(id);
  }
}
