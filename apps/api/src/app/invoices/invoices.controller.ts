import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { InvoiceStatus } from '@prisma/client';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';

@ApiTags('invoices')
@ApiBearerAuth()
@Controller({
  path: 'invoices',
  version: '1',
})
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new invoice' })
  create(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoicesService.create(createInvoiceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all invoices' })
  findAll(@Query('status') status?: InvoiceStatus) {
    return this.invoicesService.findAll(status);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an invoice by ID' })
  findOne(@Param('id') id: string) {
    return this.invoicesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an invoice' })
  update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
    return this.invoicesService.update(id, updateInvoiceDto);
  }

  @Patch(':id/paid')
  @ApiOperation({ summary: 'Mark invoice as paid' })
  markAsPaid(@Param('id') id: string) {
    return this.invoicesService.markAsPaid(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an invoice' })
  remove(@Param('id') id: string) {
    return this.invoicesService.remove(id);
  }
}
