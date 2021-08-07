import { EntityRepository, Repository } from 'typeorm';
import { ParkingSpot } from '../entities/parking-spot.entity';

@EntityRepository(ParkingSpot)
export class ParkingSpotRepository extends Repository<ParkingSpot> {

}