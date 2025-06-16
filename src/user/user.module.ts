import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/database/database.module';
import AdminSeederService from './seeders/admin-seeder.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Module({
  imports: [ConfigModule, DatabaseModule],
  controllers: [UserController],
  providers: [UserService, AdminSeederService],
  exports: [UserService, AdminSeederService],
})
export class UserModule {}
