import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingModule } from 'src/parking/parking.module';
import { TicketModule } from 'src/ticket/ticket.module';
import { CommandHandlers } from './commands/handlers';
import { Payment } from './entities/payment.entity';
import { PaymentController } from './payment.controller';

@Module({
  imports: [
    CqrsModule,
    TicketModule,
    ParkingModule,
    TypeOrmModule.forFeature([Payment ])
  ],
  controllers: [PaymentController],
  providers: [
    ...CommandHandlers
  ]
})
export class PaymentModule {}
