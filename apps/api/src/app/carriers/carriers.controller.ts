import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CarriersService } from './carriers.service';
import { CreateCarrierDto } from './dto/create-carrier.dto';
import { UpdateCarrierDto } from './dto/update-carrier.dto';

@ApiTags('carriers')
@ApiBearerAuth()
@Controller({
  path: 'carriers',
  version: '1',
})
export class CarriersController {
  constructor(private readonly carriersService: CarriersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new carrier' })
  create(@Body() createCarrierDto: CreateCarrierDto) {
    return this.carriersService.create(createCarrierDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all carriers' })
  findAll() {
    return this.carriersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a carrier by ID' })
  findOne(@Param('id') id: string) {
    return this.carriersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a carrier' })
  update(@Param('id') id: string, @Body() updateCarrierDto: UpdateCarrierDto) {
    return this.carriersService.update(id, updateCarrierDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a carrier' })
  remove(@Param('id') id: string) {
    return this.carriersService.remove(id);
  }
}
