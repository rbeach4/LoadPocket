import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateInvoiceDto {
  @ApiProperty({ example: 2500 })
  amount: number;

  @ApiProperty({ example: '2025-03-01' })
  dueDate: Date;

  @ApiPropertyOptional()
  notes?: string;

  @ApiProperty({ example: 'cuid123' })
  customerId: string;

  @ApiProperty({ example: 'cuid456' })
  loadId: string;

  @ApiProperty({ example: 'cuid789' })
  createdById: string;
}
