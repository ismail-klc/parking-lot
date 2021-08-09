import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { ParkingLot } from 'src/parking/entities/parking-lot.entity';
import { ParkingTicket, ParkingTicketStatus } from 'src/ticket/entities/ticket.entity';
import { Repository } from 'typeorm';
import { GetTicketByIdQuery } from '../impl/get-ticket-by-id.query';

@QueryHandler(GetTicketByIdQuery)
export class GetTicketByIdHandler implements IQueryHandler<GetTicketByIdQuery> {
    constructor(
        @InjectRepository(ParkingTicket)
        private ticketRepository: Repository<ParkingTicket>,
        @InjectRepository(ParkingLot)
        private lotRepository: Repository<ParkingLot>,
    ) { }

    async execute(query: GetTicketByIdQuery) {
        console.log('Async GetTicketByIdQuery...');
        const ticket = await this.ticketRepository.findOne({
            where: {
                status: ParkingTicketStatus.Active,
                id: query.id
            },
            relations: ['vehicle', 'parkingLot'],
        });
        if (!ticket) {
            throw new NotFoundException('Ticket not found');
        }

        const now = new Date()
        const time = Math.abs(now.getTime() - ticket.issuedAt.getTime()) / 36e5;
        const amount = parseFloat((time * ticket.parkingLot.parkingRate).toFixed(1));
        
        ticket.payedAmount = amount
        ticket.payedAt = now
        return ticket;
    }
}