import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ParkingLotRepository } from 'src/parking/repositories/parking-lot.repository';
import { getCustomRepository } from 'typeorm';
import { AddParkingLotCommand } from '../impl/add-parking-lot.command';

@CommandHandler(AddParkingLotCommand)
export class AddParkingLotHandler implements ICommandHandler<AddParkingLotCommand> {
  constructor(
  ) { }

  async execute(command: AddParkingLotCommand) {
    console.log('AddParkingLotCommand working, Parking Lot Added...');
    const repository = getCustomRepository(ParkingLotRepository);

    return repository.save({
      ...command.dto
    });
  }
}