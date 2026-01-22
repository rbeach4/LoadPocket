import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCarrierDto {
  @ApiProperty({ example: 'Fast Freight LLC' })
  name: string;

  @ApiPropertyOptional({ example: 'MC123456' })
  mcNumber?: string;

  @ApiPropertyOptional({ example: 'DOT789012' })
  dotNumber?: string;

  @ApiPropertyOptional({ example: 'dispatch@fastfreight.com' })
  email?: string;

  @ApiPropertyOptional({ example: '555-987-6543' })
  phone?: string;

  @ApiPropertyOptional({ example: '456 Truck Lane' })
  address?: string;

  @ApiPropertyOptional({ example: 'Dallas' })
  city?: string;

  @ApiPropertyOptional({ example: 'TX' })
  state?: string;

  @ApiPropertyOptional({ example: '75201' })
  zip?: string;

  @ApiPropertyOptional({ example: 'Mike Driver' })
  contactName?: string;

  @ApiPropertyOptional()
  notes?: string;

  @ApiPropertyOptional({ example: '2025-12-31' })
  insuranceExp?: Date;
}
