import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ParkingSpotRepository } from 'src/parking/repositories/parking-spot.repository';
import { getCustomRepository } from 'typeorm';
import { GetOneParkingSpotQuery } from '../impl';

@QueryHandler(GetOneParkingSpotQuery)
export class GetOneParkingSpotHandler implements IQueryHandler<GetOneParkingSpotQuery> {

  async execute(query: GetOneParkingSpotQuery) {
    const repository = getCustomRepository(ParkingSpotRepository);

    console.log('Async GetOneParkingSpotQuery...');
    return repository.findOne(query.id, {relations: ['floor']});
  }
}