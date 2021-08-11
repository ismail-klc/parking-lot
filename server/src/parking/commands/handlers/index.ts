import { AddParkingFloorHandler } from './add-parking-floor.handler';
import { AddParkingLotHandler } from './add-parking-lot.handler';
import { AddParkingSpotHandler } from './add-parking-spot.handler';
import { UpdateParkingLotHandler } from './update-parking-lot.handler';

export const CommandHandlers = [
    AddParkingLotHandler,
    AddParkingFloorHandler,
    AddParkingSpotHandler,
    UpdateParkingLotHandler
];