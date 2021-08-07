import { AddParkingSpotDto } from "src/parking/dtos/add-parking-spot.dto";

export class AddParkingSpotCommand {
    constructor(
      public readonly dto: AddParkingSpotDto,
    ) {}
  }