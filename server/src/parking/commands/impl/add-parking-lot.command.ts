import { AddParkingLotDto } from "src/parking/dtos/add-parking-lot-dto";

export class AddParkingLotCommand {
    constructor(
      public readonly dto: AddParkingLotDto,
    ) {}
  }