import { EntityRepository, Repository } from 'typeorm';
import { ParkingLot } from '../entities/parking-lot.entity';

@EntityRepository(ParkingLot)
export class ParkingLotRepository extends Repository<ParkingLot> {

}