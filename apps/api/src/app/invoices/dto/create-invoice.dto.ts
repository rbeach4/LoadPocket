export class CreateInvoiceDto {
  amount: number;
  dueDate: Date;
  notes?: string;
  customerId: string;
  loadId: string;
  createdById: string;
}
