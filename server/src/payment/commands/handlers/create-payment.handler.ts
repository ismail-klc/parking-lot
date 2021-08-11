import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { ParkingFloor } from 'src/parking/entities/parking-floor.entity';
import { ParkingLot } from 'src/parking/entities/parking-lot.entity';
import { ParkingSpot } from 'src/parking/entities/parking-spot.entity';
import { Payment } from 'src/payment/entities/payment.entity';
import { ParkingTicket, ParkingTicketStatus } from 'src/ticket/entities/ticket.entity';
import { Vehicle } from 'src/ticket/entities/vehicle.entity';
import { Repository } from 'typeorm';
import { CreatePaymentCommand } from '../impl/create-payment.command';

@CommandHandler(CreatePaymentCommand)
export class CreatePaymentHandler implements ICommandHandler<CreatePaymentCommand> {
    constructor(
        @InjectRepository(Vehicle)
        private vehicleRepository: Repository<Vehicle>,
        @InjectRepository(ParkingTicket)
        private ticketRepository: Repository<ParkingTicket>,
        @InjectRepository(ParkingSpot)
        private spotRepository: Repository<ParkingSpot>,
        @InjectRepository(ParkingFloor)
        private floorRepository: Repository<ParkingFloor>,
        @InjectRepository(ParkingLot)
        private lotRepository: Repository<ParkingLot>,
        @InjectRepository(Payment)
        private paymentRepository: Repository<Payment>,
    ) { }

    async execute(command: CreatePaymentCommand) {
        const ticket = await this.ticketRepository.findOne(command.dto.ticketId, { relations: ['vehicle'] });
        if (!ticket) {
            throw new BadRequestException('Ticket not found');
        }

        const vehicle = await this.vehicleRepository.findOne(ticket.vehicle.id);
        if (!vehicle) {
            throw new BadRequestException('Vehicle not found');
        }

        const spot = await this.spotRepository.findOne({ vehicle });
        if (!spot) {
            throw new BadRequestException('Spot not found');
        }

        try {
            ticket.payedAt = command.dto.creationDate;
            ticket.payedAmount = command.dto.amount;
            ticket.status = ParkingTicketStatus.Paid;
            await this.ticketRepository.save(ticket);
        } catch (error) {
            console.log(error);
        }

        try {
            spot.isFree = true;
            spot.vehicle = null;
            await this.spotRepository.save(spot);
        } catch (error) {
            console.log("spot error");

        }



        return this.paymentRepository.save({
            amount: command.dto.amount,
            creationDate: command.dto.creationDate,
            ticket
        });
    }
}