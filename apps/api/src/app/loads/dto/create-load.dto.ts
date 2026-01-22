import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { LoadStatus } from '@prisma/client';

export class CreateLoadDto {
  @ApiPropertyOptional({ enum: LoadStatus, default: LoadStatus.QUOTED })
  status?: LoadStatus;

  @ApiProperty({ example: '123 Pickup St' })
  originAddress: string;

  @ApiProperty({ example: 'Chicago' })
  originCity: string;

  @ApiProperty({ example: 'IL' })
  originState: string;

  @ApiProperty({ example: '60601' })
  originZip: string;

  @ApiPropertyOptional({ example: '2025-02-01' })
  pickupDate?: Date;

  @ApiPropertyOptional({ example: '08:00' })
  pickupTime?: string;

  @ApiProperty({ example: '456 Delivery Ave' })
  destAddress: string;

  @ApiProperty({ example: 'Dallas' })
  destCity: string;

  @ApiProperty({ example: 'TX' })
  destState: string;

  @ApiProperty({ example: '75201' })
  destZip: string;

  @ApiPropertyOptional({ example: '2025-02-03' })
  deliveryDate?: Date;

  @ApiPropertyOptional({ example: '14:00' })
  deliveryTime?: string;

  @ApiProperty({ example: 2500 })
  customerRate: number;

  @ApiProperty({ example: 2000 })
  carrierRate: number;

  @ApiPropertyOptional({ example: 42000 })
  weight?: number;

  @ApiPropertyOptional({ example: 24 })
  pieces?: number;

  @ApiPropertyOptional({ example: 'Electronics' })
  commodity?: string;

  @ApiPropertyOptional({ example: 'Dry Van' })
  equipment?: string;

  @ApiPropertyOptional()
  notes?: string;

  @ApiProperty({ example: 'cuid123' })
  customerId: string;

  @ApiPropertyOptional({ example: 'cuid456' })
  carrierId?: string;

  @ApiPropertyOptional({ example: 'cuid789' })
  dispatcherId?: string;
}
