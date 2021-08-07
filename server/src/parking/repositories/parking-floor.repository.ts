import { EntityRepository, Repository } from 'typeorm';
import { ParkingFloor } from '../entities/parking-floor.entity';

@EntityRepository(ParkingFloor)
export class ParkingFloorRepository extends Repository<ParkingFloor> {

}