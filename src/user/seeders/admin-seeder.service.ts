import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Role } from 'src/common/decorators/rols.decorator';
import DatabaseService from 'src/database/database.service';

@Injectable()
export default class AdminSeederService {
  constructor(
    private readonly database: DatabaseService,
    private readonly configService: ConfigService,
  ) {}

  async createAsyncAdmin(): Promise<void> {
    const adminEmail = this.configService.get('SEED_ADMIN_EMAIL');
    const adminPassword = this.configService.get('SEED_ADMIN_PASSWORD');

    const existUser = this.database.user.findOne({
      where: { email: adminEmail },
    });

    if (!existUser) {
      const adminUser = this.database.user.create({
        name: 'Admin',
        email: adminEmail,
        phone: '1234567890',
        password: adminPassword,
        role: Role.ADMIN,
        isActive: true,
      });

      await this.database.user.save(adminUser);
      console.log('Admin Created:', adminUser);
    }
  }
}
