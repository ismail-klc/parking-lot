import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { ParkingLotRepository } from 'src/parking/repositories/parking-lot.repository';
import { ParkingTicket, ParkingTicketStatus } from 'src/ticket/entities/ticket.entity';
import { Between, getCustomRepository, Repository } from 'typeorm';
import { GetStatisticsQuery } from '../impl';

@QueryHandler(GetStatisticsQuery)
export class GetStatisticsHandler implements IQueryHandler<GetStatisticsQuery> {
    constructor(
        @InjectRepository(ParkingTicket)
        private ticketRepository: Repository<ParkingTicket>,
    ) { }

    async execute(query: GetStatisticsQuery) {
        const repository = getCustomRepository(ParkingLotRepository);

        const lot = await repository.findOne({ relations: ['parkingFloors', 'parkingFloors.parkingSpots'] });

        // parking floors count
        const parkingFloorsCount = lot.parkingFloors.length;

        // parking spots count
        let capacity = 0
        let freeSpots = 0
        for (const floor of lot.parkingFloors) {
            for (const spot of floor.parkingSpots) {
                capacity += 1
                if (spot.isFree) {
                    freeSpots += 1
                }
            }
        }


        // daily entrance
        const day = new Date()
        const today = new Date(day.getFullYear(), day.getMonth(), day.getDate())
        const tomorrow = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1)

        const tickets = await this.ticketRepository.find({
            where: {
                issuedAt: Between(
                    today.toISOString(),
                    tomorrow.toISOString(),
                )
            }
        })

        // daily earnings
        let dailyEarnings = 0
        for (const ticket of tickets) {
            if (ticket.status === ParkingTicketStatus.Paid) {
                dailyEarnings += parseFloat(ticket.payedAmount.toString())
            }
        }

        return {
            parkingFloorsCount,
            capacity,
            freeSpots,
            dailyEarnings,
            dailyEntrance: tickets.length,
            lot
        };
    }
}