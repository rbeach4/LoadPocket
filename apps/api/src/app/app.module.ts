import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
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
import { BullBoardModule } from './bull-board/bull-board.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: process.env.NODE_ENV !== 'production'
          ? {
              target: 'pino-pretty',
              options: {
                colorize: true,
                singleLine: true,
                translateTime: 'SYS:standard',
              },
            }
          : undefined,
        level: process.env.LOG_LEVEL || 'info',
        autoLogging: true,
        redact: ['req.headers.authorization', 'req.body.password'],
      },
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
    BullBoardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
