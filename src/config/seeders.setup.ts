import { INestApplication } from '@nestjs/common';
import AdminSeederService from 'src/user/seeders/admin-seeder.service';

export default async function (app: INestApplication) {
  const userSeederService = app.get(AdminSeederService);
  await userSeederService.createAsyncAdmin();
}
