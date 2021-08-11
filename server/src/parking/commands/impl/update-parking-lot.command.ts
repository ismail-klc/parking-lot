import { UpdateParkingLotDto} from "src/parking/dtos/update-parking-lot.dto";

export class UpdateParkingLotCommand {
  constructor(
    public readonly dto: UpdateParkingLotDto,
  ) { }
}