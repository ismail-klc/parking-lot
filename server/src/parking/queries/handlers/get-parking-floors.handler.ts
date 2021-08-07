import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ParkingFloorRepository } from 'src/parking/repositories/parking-floor.repository';
import { getCustomRepository } from 'typeorm';
import { GetParkingFloorsQuery } from '../impl';

@QueryHandler(GetParkingFloorsQuery)
export class GetParkingFloorssHandler implements IQueryHandler<GetParkingFloorsQuery> {

  async execute(query: GetParkingFloorsQuery) {
    const repository = getCustomRepository(ParkingFloorRepository);

    console.log('Async GetParkingFloorsQuery...');
    return repository.find({ relations: ['lot', 'parkingSpots']});
  }
}