import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { ParkingSpot } from 'src/parking/entities/parking-spot.entity';
import { ParkingTicket } from 'src/ticket/entities/ticket.entity';
import { Vehicle } from 'src/ticket/entities/vehicle.entity';
import { Repository } from 'typeorm';
import { CreateTicketCommand } from '../impl/create-ticket.command';

@CommandHandler(CreateTicketCommand)
export class CreateTicketHandler implements ICommandHandler<CreateTicketCommand> {
    constructor(
        @InjectRepository(Vehicle)
        private vehicleRepository: Repository<Vehicle>,
        @InjectRepository(ParkingTicket)
        private ticketRepository: Repository<ParkingTicket>,
        @InjectRepository(ParkingSpot)
        private spotRepository: Repository<ParkingSpot>,
      ) { }

  async execute(command: CreateTicketCommand) {
    // find the parking spot and
    // check if it is free or exists
    const spot = await this.spotRepository.findOne(command.dto.spotId);
    if (!spot || !spot.isFree) {
        throw new BadRequestException(["Spot not found or not free"]);
    }

    // find the vehicle
    // if does not exist, create a vehicle
    let vehicle = await this.vehicleRepository.findOne({licenseNumber: command.dto.licenseNumber});
    if (!vehicle) {
        vehicle = await this.vehicleRepository.save({
            ...command.dto
        });
    }

    // update the parking spot
    spot.isFree = false;
    spot.vehicle = vehicle;
    await this.spotRepository.save(spot);

    console.log('CreateTicketCommand working, ticket created...');

    // then create a ticket
    const date = new Date().toString();
    return this.ticketRepository.save({
        vehicle: vehicle, issuedAt: date
    })
  }
}