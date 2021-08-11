import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { AddParkingFloorCommand } from './commands/impl/add-parking-floor.command';
import { AddParkingLotCommand } from './commands/impl/add-parking-lot.command';
import { AddParkingSpotCommand } from './commands/impl/add-parking-spot.command';
import { UpdateParkingLotCommand } from './commands/impl/update-parking-lot.command';
import { AddParkingFloorDto } from './dtos/add-parking-floor.dto';
import { AddParkingLotDto } from './dtos/add-parking-lot-dto';
import { AddParkingSpotDto } from './dtos/add-parking-spot.dto';
import { UpdateParkingLotDto } from './dtos/update-parking-lot.dto';
import {
    GetOneParkingFloorQuery, GetOneParkingLotQuery,
    GetOneParkingSpotQuery, GetParkingFloorsQuery,
    GetParkingLotsQuery, GetParkingSpotsQuery
} from './queries/impl';

@Controller('parking')
export class ParkingController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) { }

    // parking lot
    @Post('parking-lot')
    @UseGuards(AdminGuard)
    async addParkingLot(@Body() dto: AddParkingLotDto) {
        return this.commandBus.execute(new AddParkingLotCommand(dto));
    }

    @Get('parking-lot')
    async getParkingLots() {
        return this.queryBus.execute(new GetParkingLotsQuery());
    }

    @Get('parking-lot/:id')
    async getParkingLot(@Param('id', ParseIntPipe) id: number) {
        return this.queryBus.execute(new GetOneParkingLotQuery(id));
    }

    @Put('parking-lot')
    @UseGuards(AdminGuard)
    async updateParkingLot(@Body() dto: UpdateParkingLotDto) {
        return this.commandBus.execute(new UpdateParkingLotCommand(dto));
    }

    // parking floor
    /////////////////////////////////////////////////////////////////////
    @Post('parking-floor')
    @UseGuards(AdminGuard)
    async addParkingFloor(@Body() dto: AddParkingFloorDto) {
        return this.commandBus.execute(new AddParkingFloorCommand(dto));
    }

    @Get('parking-floor')
    async getParkingFloors() {
        return this.queryBus.execute(new GetParkingFloorsQuery());
    }

    @Get('parking-floor/:id')
    async getParkingFloor(@Param('id', ParseIntPipe) id: number) {
        return this.queryBus.execute(new GetOneParkingFloorQuery(id));
    }

    // parking spot
    /////////////////////////////////////////////////////////////////////
    @Post('parking-spot')
    @UseGuards(AdminGuard)
    async addParkingSpot(@Body() dto: AddParkingSpotDto) {
        return this.commandBus.execute(new AddParkingSpotCommand(dto));
    }

    @Get('parking-spot')
    async getParkingSpots() {
        return this.queryBus.execute(new GetParkingSpotsQuery());
    }

    @Get('parking-spot/:id')
    async getParkingSpot(@Param('id', ParseIntPipe) id: number) {
        return this.queryBus.execute(new GetOneParkingSpotQuery(id));
    }
}
