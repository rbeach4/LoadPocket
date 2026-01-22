import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth.module';
import { UsersModule } from './users.module';
import { CustomersModule } from './customers.module';
import { CarriersModule } from './carriers.module';
import { LoadsModule } from './loads.module';
import { DocumentsModule } from './documents.module';
import { InvoicesModule } from './invoices.module';
import { ReportsModule } from './reports.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CustomersModule } from './customers/customers.module';
import { CarriersModule } from './carriers/carriers.module';
import { LoadsModule } from './loads/loads.module';
import { DocumentsModule } from './documents/documents.module';
import { InvoicesModule } from './invoices/invoices.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    CustomersModule,
    CarriersModule,
    LoadsModule,
    DocumentsModule,
    InvoicesModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
