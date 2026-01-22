export class CreateCustomerDto {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  contactName?: string;
  notes?: string;
  creditLimit?: number;
  paymentTerms?: number;
}
