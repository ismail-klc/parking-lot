import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ParkingLotRepository } from 'src/parking/repositories/parking-lot.repository';
import { getCustomRepository } from 'typeorm';
import { GetOneParkingLotQuery } from '../impl';

@QueryHandler(GetOneParkingLotQuery)
export class GetOneParkingLotHandler implements IQueryHandler<GetOneParkingLotQuery> {

  async execute(query: GetOneParkingLotQuery) {
    const repository = getCustomRepository(ParkingLotRepository);

    console.log('Async GetOneParkingLotQuery...');
    return repository.findOne(query.id, { relations: ['parkingFloors', 'parkingFloors.parkingSpots'] });
  }
}