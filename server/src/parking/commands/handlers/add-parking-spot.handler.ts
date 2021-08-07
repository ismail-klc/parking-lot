import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ParkingFloorRepository } from 'src/parking/repositories/parking-floor.repository';
import { ParkingLotRepository } from 'src/parking/repositories/parking-lot.repository';
import { ParkingSpotRepository } from 'src/parking/repositories/parking-spot.repository';
import { getCustomRepository } from 'typeorm';
import { AddParkingSpotCommand } from '../impl/add-parking-spot.command';

@CommandHandler(AddParkingSpotCommand)
export class AddParkingSpotHandler implements ICommandHandler<AddParkingSpotCommand> {
  constructor(
  ) { }

  async execute(command: AddParkingSpotCommand) {
    console.log('AddParkingSpotCommand working, Parking Spot Added...');
    const floorRepository = getCustomRepository(ParkingFloorRepository);
    const spotRepository = getCustomRepository(ParkingSpotRepository);

    const floor = await floorRepository.findOne(command.dto.floorId);
    if (!floor) {
        throw new BadRequestException('Floor not found');
    }

    return spotRepository.save({
      ...command.dto, floor
    });
  }
}