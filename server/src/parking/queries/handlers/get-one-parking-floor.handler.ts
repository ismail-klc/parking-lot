import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ParkingFloorRepository } from 'src/parking/repositories/parking-floor.repository';
import { getCustomRepository } from 'typeorm';
import { GetOneParkingFloorQuery } from '../impl';

@QueryHandler(GetOneParkingFloorQuery)
export class GetOneParkingFloorHandler implements IQueryHandler<GetOneParkingFloorQuery> {

  async execute(query: GetOneParkingFloorQuery) {
    const repository = getCustomRepository(ParkingFloorRepository);

    console.log('Async GetOneParkingFloorQuery...');
    return repository.findOne(query.id, {relations: ['lot', 'parkingSpots']});
  }
}