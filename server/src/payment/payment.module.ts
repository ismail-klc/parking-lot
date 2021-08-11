import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingModule } from 'src/parking/parking.module';
import { TicketModule } from 'src/ticket/ticket.module';
import { CommandHandlers } from './commands/handlers';
import { Payment } from './entities/payment.entity';
import { EventHandlers } from './events/handlers';
import { PaymentController } from './payment.controller';
import { QueryHandlers } from './queries/handlers';

@Module({
  imports: [
    CqrsModule,
    TicketModule,
    ParkingModule,
    TypeOrmModule.forFeature([Payment ])
  ],
  controllers: [PaymentController],
  providers: [
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers
  ]
})
export class PaymentModule {}
