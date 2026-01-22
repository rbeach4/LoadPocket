import { LoadStatus } from '@prisma/client';

export class CreateLoadDto {
  status?: LoadStatus;
  
  originAddress: string;
  originCity: string;
  originState: string;
  originZip: string;
  pickupDate?: Date;
  pickupTime?: string;
  
  destAddress: string;
  destCity: string;
  destState: string;
  destZip: string;
  deliveryDate?: Date;
  deliveryTime?: string;
  
  customerRate: number;
  carrierRate: number;
  
  weight?: number;
  pieces?: number;
  commodity?: string;
  equipment?: string;
  notes?: string;
  
  customerId: string;
  carrierId?: string;
  dispatcherId?: string;
}
