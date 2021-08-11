import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ParkingLotRepository } from 'src/parking/repositories/parking-lot.repository';
import { getCustomRepository } from 'typeorm';
import { UpdateParkingLotCommand } from '../impl/update-parking-lot.command';

@CommandHandler(UpdateParkingLotCommand)
export class UpdateParkingLotHandler implements ICommandHandler<UpdateParkingLotCommand> {
    constructor(
    ) { }

    async execute(command: UpdateParkingLotCommand) {
        console.log('UpdateParkingRateCommand working');
        const repository = getCustomRepository(ParkingLotRepository);

        const lot = await repository.findOne(command.dto.lotId);
        if (!lot) {
            throw new BadRequestException('Parking Lot not found');
        }

        return repository.save({
            id: command.dto.lotId,
            ...lot,
            ...command.dto
        });
    }
}