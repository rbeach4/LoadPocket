import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@loadpocket/prisma';
import { QueuesModule } from '@loadpocket/queues';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CustomersModule } from './customers/customers.module';
import { CarriersModule } from './carriers/carriers.module';
import { LoadsModule } from './loads/loads.module';
import { DocumentsModule } from './documents/documents.module';
import { InvoicesModule } from './invoices/invoices.module';
import { ReportsModule } from './reports/reports.module';
import { JobsModule } from './jobs/jobs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    QueuesModule,
    AuthModule,
    UsersModule,
    CustomersModule,
    CarriersModule,
    LoadsModule,
    DocumentsModule,
    InvoicesModule,
    ReportsModule,
    JobsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
