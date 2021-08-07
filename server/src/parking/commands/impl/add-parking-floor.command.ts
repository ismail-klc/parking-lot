import { AddParkingFloorDto } from "src/parking/dtos/add-parking-floor.dto";

export class AddParkingFloorCommand {
    constructor(
      public readonly dto: AddParkingFloorDto,
    ) {}
  }