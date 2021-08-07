import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ParkingFloorRepository } from 'src/parking/repositories/parking-floor.repository';
import { ParkingLotRepository } from 'src/parking/repositories/parking-lot.repository';
import { getCustomRepository } from 'typeorm';
import { AddParkingFloorCommand } from '../impl/add-parking-floor.command';

@CommandHandler(AddParkingFloorCommand)
export class AddParkingFloorHandler implements ICommandHandler<AddParkingFloorCommand> {
  constructor(
  ) { }

  async execute(command: AddParkingFloorCommand) {
    const parkingLotRepository = getCustomRepository(ParkingLotRepository);
    const parkingFloorRepository = getCustomRepository(ParkingFloorRepository);

    const lot = await parkingLotRepository.findOne(command.dto.lotId);
    if(!lot){
        throw new BadRequestException('Parking lot not found');
    }

    console.log('AddParkingFloorCommand working, Parking Lot Added...');
    return parkingFloorRepository.save({
      ...command.dto, lot
    });
  }
}