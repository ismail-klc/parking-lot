import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ParkingLotRepository } from 'src/parking/repositories/parking-lot.repository';
import { getCustomRepository } from 'typeorm';
import { GetParkingLotsQuery } from '../impl';

@QueryHandler(GetParkingLotsQuery)
export class GetParkingLotsHandler implements IQueryHandler<GetParkingLotsQuery> {

  async execute(query: GetParkingLotsQuery) {
    const repository = getCustomRepository(ParkingLotRepository);

    console.log('Async GetParkingLotsQuery...');
    return repository.find({relations: ['floors']});
  }
}