import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import DatabaseService from 'src/database/database.service';
import RegisterInDto from './dto/in/register.in.dto';
import UserOutDto from './dto/out/user.out.dto';
import { Role } from 'src/common/decorators/rols.decorator';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly dataBaseService: DatabaseService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.dataBaseService.user.findOne({
      where: { email, isActive: true },
    });

    if (!user || !(await user.validatePassword(password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      name: user.name,
      email: user.email,
      userId: user.id,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(
      { sub: user.id },
      { expiresIn: '7d' },
    );

    const rt = await this.dataBaseService.refreshToken.findOne({
      where: { userId: user.id },
    });

    if (!rt) {
      const newRT = this.dataBaseService.refreshToken.create({
        userId: user.id,
        refreshToken: refreshToken,
      });
      await this.dataBaseService.refreshToken.save(newRT);
      this.logger.log(`Created new refresh token for User ${user.id}`);
    } else {
      await this.dataBaseService.refreshToken.update(rt.id, {
        refreshToken: refreshToken,
      });
    }
    this.logger.log(`Autenticated User ${user.id}`);

    return { accessToken, refreshToken };
  }

  async refresh(oldRefreshToken: string) {
    try {
      const payload = this.jwtService.verify(oldRefreshToken);
      const userId = payload.sub;

      const rt = await this.dataBaseService.refreshToken.findOne({
        where: { userId },
      });

      if (!rt || rt.refreshToken !== oldRefreshToken) {
        throw new Error();
      }

      const user = await this.dataBaseService.user.findOne({
        where: { id: rt.userId },
      });

      if (!user) {
        throw new Error();
      }
      const newPayload = {
        email: user.email,
        name: user.name,
        userId: user.id,
        role: user.role,
      };

      const accessToken = this.jwtService.sign(newPayload);
      const refreshToken = this.jwtService.sign(
        { sub: user.id },
        { expiresIn: '7d' },
      );

      if (!rt) {
        const newRT = this.dataBaseService.refreshToken.create({
          userId: user.id,
          refreshToken: refreshToken,
        });

        await this.dataBaseService.refreshToken.save(newRT);
        this.logger.log(`Created new refresh token for User ${user.id}`);
      } else {
        await this.dataBaseService.refreshToken.update(rt.id, {
          refreshToken: refreshToken,
        });
      }

      this.logger.log(`Created new refresh token for User ${rt.userId}`);

      return { accessToken, refreshToken };
    } catch (err) {
      this.logger.log('Refresh token failed', err);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async register(dto: RegisterInDto): Promise<UserOutDto> {
    const existingUserName = await this.dataBaseService.user.findOne({
      where: { name: dto.name },
    });

    if (existingUserName) {
      throw new ConflictException(`User with name ${dto.name} alredy exist`);
    }

    const existingUserEmail = await this.dataBaseService.user.findOne({
      where: { email: dto.email },
    });

    if (existingUserEmail) {
      throw new ConflictException(`User with email ${dto.email} alredy exist`);
    }

    const newUser = this.dataBaseService.user.create({
      email: dto.email,
      password: dto.password,
      role: Role.USER,
      name: dto.name,
      isActive: true,
      phone: dto.phone,
    });

    await this.dataBaseService.user.save(newUser);

    this.logger.log(`Created new user with ID ${newUser.id}`);

    return {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
      isActive: newUser.isActive,
      phone: newUser.phone,
    };
  }

  async changePassword(
    userId: number,
    oldPassword: string,
    newPassword: string,
  ): Promise<void> {
    const user = await this.dataBaseService.user.findOne({
      where: { id: userId },
    });

    if (!user || !(await user.validatePassword(oldPassword))) {
      throw new BadRequestException('Invalid credentials');
    }

    user.password = newPassword;

    await this.dataBaseService.user.save(user);

    this.logger.log(`Updated user Password with ID ${user.id}`);
  }
}
