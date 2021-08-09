import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { ParkingFloor } from 'src/parking/entities/parking-floor.entity';
import { ParkingLot } from 'src/parking/entities/parking-lot.entity';
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
        @InjectRepository(ParkingFloor)
        private floorRepository: Repository<ParkingFloor>,
        @InjectRepository(ParkingLot)
        private lotRepository: Repository<ParkingLot>,
      ) { }

  async execute(command: CreateTicketCommand) {
    // find the parking spot and
    // check if it is free or exists
    const spot = await this.spotRepository.findOne(command.dto.spotId);
    if (!spot) {
        throw new BadRequestException(["Spot not found"]);
    }
    if (!spot.isFree) {
        throw new BadRequestException(["Spot not free"]);
    }

    const floor = await this.floorRepository.findOne(spot.floor);
    if (!floor) {
        throw new BadRequestException(["Floor not found"]);
    }
    const lot = await this.lotRepository.findOne(floor.lot);
    if (!lot) {
        throw new BadRequestException(["Lot not found"]);
    }

    // find the vehicle
    // if does not exist, create a vehicle
    let vehicle = await this.vehicleRepository.findOne({licenseNumber: command.dto.licenseNumber});
    if (!vehicle) {
        vehicle = await this.vehicleRepository.save({
            ...command.dto
        });
    }

    // is the vehicle already in a parking spot
    const isVehicleExist = await this.spotRepository.findOne({ vehicle: vehicle });
    if (isVehicleExist) {
        throw new BadRequestException(["This vehicle is already in a parking spot"]);
    } 

    // update the parking spot
    spot.isFree = false;
    spot.vehicle = vehicle;
    await this.spotRepository.save(spot);

    console.log('CreateTicketCommand working, ticket created...');

    // then create a ticket
    const date = new Date().toString();
    return this.ticketRepository.save({
        vehicle: vehicle, issuedAt: date, parkingLot: lot
    })
  }
}