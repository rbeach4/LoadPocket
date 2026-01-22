import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty({ example: 'Acme Shipping Co' })
  name: string;

  @ApiPropertyOptional({ example: 'contact@acme.com' })
  email?: string;

  @ApiPropertyOptional({ example: '555-123-4567' })
  phone?: string;

  @ApiPropertyOptional({ example: '123 Main St' })
  address?: string;

  @ApiPropertyOptional({ example: 'Chicago' })
  city?: string;

  @ApiPropertyOptional({ example: 'IL' })
  state?: string;

  @ApiPropertyOptional({ example: '60601' })
  zip?: string;

  @ApiPropertyOptional({ example: 'John Smith' })
  contactName?: string;

  @ApiPropertyOptional()
  notes?: string;

  @ApiPropertyOptional({ example: 50000 })
  creditLimit?: number;

  @ApiPropertyOptional({ example: 30 })
  paymentTerms?: number;
}
