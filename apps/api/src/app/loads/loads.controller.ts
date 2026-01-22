import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { LoadStatus } from '@prisma/client';
import { LoadsService } from './loads.service';
import { CreateLoadDto } from './dto/create-load.dto';
import { UpdateLoadDto } from './dto/update-load.dto';

@ApiTags('loads')
@ApiBearerAuth()
@Controller('loads')
export class LoadsController {
  constructor(private readonly loadsService: LoadsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new load' })
  create(@Body() createLoadDto: CreateLoadDto) {
    return this.loadsService.create(createLoadDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all loads' })
  findAll(@Query('status') status?: LoadStatus) {
    return this.loadsService.findAll(status);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a load by ID' })
  findOne(@Param('id') id: string) {
    return this.loadsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a load' })
  update(@Param('id') id: string, @Body() updateLoadDto: UpdateLoadDto) {
    return this.loadsService.update(id, updateLoadDto);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update load status' })
  updateStatus(@Param('id') id: string, @Body('status') status: LoadStatus) {
    return this.loadsService.updateStatus(id, status);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a load' })
  remove(@Param('id') id: string) {
    return this.loadsService.remove(id);
  }
}
