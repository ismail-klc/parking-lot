import { Global, Module } from '@nestjs/common';
import { ParkingModule } from './parking/parking.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { TicketModule } from './ticket/ticket.module';

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: 'secret key',
      signOptions: { expiresIn: '6h' },
    }),
    ParkingModule,
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
    AuthModule,
    TicketModule,
  ],
  exports: [JwtModule],
})
export class AppModule { }
