import { BadRequestException } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { ParkingFloor } from 'src/parking/entities/parking-floor.entity';
import { ParkingLot } from 'src/parking/entities/parking-lot.entity';
import { ParkingSpot } from 'src/parking/entities/parking-spot.entity';
import { Payment, PaymentType } from 'src/payment/entities/payment.entity';
import { ParkingTicket, ParkingTicketStatus } from 'src/ticket/entities/ticket.entity';
import { Vehicle } from 'src/ticket/entities/vehicle.entity';
import { getConnection, Repository } from 'typeorm';
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
        @InjectRepository(Payment)
        private paymentRepository: Repository<Payment>,
        private readonly publisher: EventPublisher,
    ) { }

    async execute(command: CreatePaymentCommand) {
        // get ticket and check if exists
        const ticket = await this.ticketRepository.findOne(command.dto.ticketId, { relations: ['vehicle'] });
        if (!ticket) {
            throw new BadRequestException('Ticket not found');
        }

        // get vehicle and check if exists
        const vehicle = await this.vehicleRepository.findOne(ticket.vehicle.id);
        if (!vehicle) {
            throw new BadRequestException('Vehicle not found');
        }

        // get parking spot and check if exists
        const spot = await this.spotRepository.findOne({ vehicle });
        if (!spot) {
            throw new BadRequestException('Spot not found');
        }

        // get a connection and create a new query runner
        const connection = getConnection();
        const queryRunner = connection.createQueryRunner();

        // establish real database connection using our new query runner
        await queryRunner.connect();

        await queryRunner.startTransaction();
        console.log("paymentcreatedcommand working");

        try {
            // save ticket
            ticket.payedAt = command.dto.creationDate;
            ticket.payedAmount = command.dto.amount;
            ticket.status = ParkingTicketStatus.Paid;
            await queryRunner.manager.save(ticket);

            // save spot
            spot.isFree = true;
            spot.vehicle = null;
            await queryRunner.manager.save(spot);

            // create payment
            const payment = this.paymentRepository.create({
                amount: command.dto.amount,
                creationDate: command.dto.creationDate,
                ticket,
                paymentType: command.dto.type
            })
            await queryRunner.manager.save(payment);


            // send event 
            if (command.dto.type === PaymentType.CreditCard) {
                const pay = this.publisher.mergeObjectContext(
                    payment
                );
                pay.creditCardPayment();
                pay.commit();
            }

            await queryRunner.commitTransaction();

            return payment;
        } 
        catch (err) {
            // since we have errors let's rollback changes we made
            await queryRunner.rollbackTransaction();
            throw new Error(err);

        } finally {
            // you need to release query runner which is manually created:
            await queryRunner.release();
        }
    }
}