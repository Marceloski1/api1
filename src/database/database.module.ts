import { Module } from '@nestjs/common';
import DatabaseService from './database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from 'process';
import User from 'src/user/entities/user.entity';
import Ejercicio from 'src/ejercicio/entities/ejercicio.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_DATABASE'),
        synchronize: true,
        entities: [User, Ejercicio],
      }),
    }),
    TypeOrmModule.forFeature([User, Ejercicio]),
  ],
  exports: [DatabaseService],
  providers: [DatabaseService],
})
export class DatabaseModule {}
