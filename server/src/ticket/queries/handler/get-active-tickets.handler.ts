import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { ParkingTicket, ParkingTicketStatus } from 'src/ticket/entities/ticket.entity';
import { Repository } from 'typeorm';
import { GetActiveTicketsQuery } from '../impl/get-active-tickets.query';

@QueryHandler(GetActiveTicketsQuery)
export class GetActiveTicketsHandler implements IQueryHandler<GetActiveTicketsQuery> {
    constructor(
        @InjectRepository(ParkingTicket)
        private ticketRepository: Repository<ParkingTicket>,
    ) { }

    async execute(query: GetActiveTicketsQuery) {

        console.log('Async GetActiveTicketsQuery...');
        return this.ticketRepository.find({
            where: {
                status: ParkingTicketStatus.Active,

            },
            relations: ['vehicle'],
        });
    }
}