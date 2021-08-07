import { GetOneParkingFloorHandler } from "./get-one-parking-floor.handler";
import { GetOneParkingLotHandler } from "./get-one-parking-lot.handler";
import { GetOneParkingSpotHandler } from "./get-one-parking-spot.handler";
import { GetParkingFloorssHandler } from "./get-parking-floors.handler";
import { GetParkingLotsHandler } from "./get-parking-lots.handler";
import { GetParkingSpotssHandler } from "./get-parking-spots.handler";

export const QueryHandlers = [
    GetParkingLotsHandler, 
    GetParkingSpotssHandler,
    GetParkingFloorssHandler,
    GetOneParkingLotHandler,
    GetOneParkingFloorHandler,
    GetOneParkingSpotHandler
];