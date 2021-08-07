import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ParkingSpotRepository } from 'src/parking/repositories/parking-spot.repository';
import { getCustomRepository } from 'typeorm';
import { GetParkingSpotsQuery } from '../impl';

@QueryHandler(GetParkingSpotsQuery)
export class GetParkingSpotssHandler implements IQueryHandler<GetParkingSpotsQuery> {

    async execute(query: GetParkingSpotsQuery) {
        const repository = getCustomRepository(ParkingSpotRepository);

        console.log('Async GetParkingSpotsQuery...');
        return repository.find({relations: ['floor']});
    }
}