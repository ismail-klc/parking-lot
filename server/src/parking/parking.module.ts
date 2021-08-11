import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketModule } from 'src/ticket/ticket.module';
import { CommandHandlers } from './commands/handlers';
import { ParkingFloor } from './entities/parking-floor.entity';
import { ParkingLot } from './entities/parking-lot.entity';
import { ParkingSpot } from './entities/parking-spot.entity';
import { ParkingController } from './parking.controller';
import { QueryHandlers } from './queries/handlers';
import { ParkingLotRepository } from './repositories/parking-lot.repository';

@Module({
    imports: [
        CqrsModule,
        forwardRef(() => TicketModule),
        TypeOrmModule.forFeature([ParkingLot, ParkingFloor, ParkingSpot])
    ],
    controllers: [ParkingController],
    providers: [
        ParkingLotRepository,
        ...CommandHandlers,
        ...QueryHandlers
    ],
    exports: [TypeOrmModule]
})
export class ParkingModule { }
