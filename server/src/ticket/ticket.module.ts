import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingModule } from 'src/parking/parking.module';
import { CommandHandlers } from './commands/handlers';
import { ParkingTicket } from './entities/ticket.entity';
import { Vehicle } from './entities/vehicle.entity';
import { QueryHandlers } from './queries/handler';
import { TicketController } from './ticket.controller';

@Module({
  imports: [
    forwardRef(() => ParkingModule),
    CqrsModule,
    TypeOrmModule.forFeature([Vehicle, ParkingTicket])
  ],
  controllers: [TicketController],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers
  ],
  exports: [TypeOrmModule]
})
export class TicketModule {}
