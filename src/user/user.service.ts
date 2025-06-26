import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/in/create-user.in.dto';
import { UpdateUserDto } from './dto/in/update-user.in.dto';
import User from './entities/user.entity';
import DatabaseService from 'src/database/database.service';
import UsersOutDto from './dto/out/user.out.dto';
import createPatchFields from 'src/common/dto/patch/patch-field.util';
import { JwtService } from '@nestjs/jwt';
import UserSearchInDto from './dto/in/user.search.in.dto';
import PaginatedInDto from 'src/common/dto/pagination/paginated.in.dto';
import PaginatedOutDto from 'src/common/dto/pagination/paginated.out.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  public async search(
    dto: UserSearchInDto,
  ): Promise<PaginatedOutDto<UsersOutDto>> {
    const queryBuilder = this.databaseService.user.createQueryBuilder('user');

    //Filterin
    if (dto.search) {
      queryBuilder.where(
        'user.name ILIKE :search OR user.email ILIKE :search',
        {
          search: `%${dto.search}`,
        },
      );
    }

    if (dto.isActice !== undefined && dto.isActice !== null) {
      queryBuilder.andWhere('user.isActive =:isActive', {
        isActive: dto.isActice,
      });
    }

    if (dto.role !== undefined && dto.role !== null) {
      queryBuilder.andWhere('user.role = :role', {
        role: dto.role,
      });
    }

    //Ordering
    const orderBy = dto.orderBy || 'id';
    const orderDirection =
      dto.orderDirection?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    queryBuilder.orderBy(`user.${orderBy}`, orderDirection);

    //Pagination
    const [result, total] = await queryBuilder
      .skip((dto.page - 1) * dto.pageSize)
      .take(dto.pageSize)
      .getManyAndCount();

    const userOut = result.map((user) => this.toOutDto(user));

    return {
      data: userOut,
      total,
      page: dto.page,
      pageSize: dto.pageSize,
      hasNextPage: dto.page * dto.pageSize < total,
      hasPreviousPage: dto.page > 1,
    };
  }

  public async getAll(): Promise<UsersOutDto[]> {
    const users = await this.databaseService.user.find();

    return users.map((user) => this.toOutDto(user));
  }

  public async getById(id: number): Promise<UsersOutDto> {
    const user = await this.databaseService.user.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return this.toOutDto(user);
  }

  public async getByName(name: string): Promise<UsersOutDto> {
    const user = await this.databaseService.user.findOne({
      where: { name },
    });
    if (!user) {
      throw new NotFoundException(`User with username ${name} not found`);
    }

    return this.toOutDto(user);
  }

  public async post(createUserDto: CreateUserDto) {
    const existName = await this.databaseService.user.findOne({
      where: { name: createUserDto.name },
    });
    if (existName)
      throw new ConflictException(
        `User wihh name ${createUserDto.name} already exist`,
      );

    const existEmail = await this.databaseService.user.findOne({
      where: { email: createUserDto.email },
    });

    if (existEmail) {
      throw new ConflictException(
        `User with email ${createUserDto.email} already exist`,
      );
    }
    const newUser = await this.databaseService.user.create({
      name: createUserDto.name,
      role: createUserDto.role,
      password: createUserDto.password,
      phone: createUserDto.phone,
      email: createUserDto.email,
      isActive: true,
    });

    await this.databaseService.user.save(newUser);

    this.logger.log(`Create new user with ID ${newUser.id}`);

    return this.toOutDto(newUser);
  }

  public async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.name) {
      const user = await this.databaseService.user.findOne({
        where: { name: updateUserDto.name },
      });
      if (user && user.id !== id) {
        throw new ConflictException(
          `User with name ${updateUserDto.name} alredy exist`,
        );
      }
    }
    if (updateUserDto.email) {
      const user = await this.databaseService.user.findOne({
        where: { email: updateUserDto.email },
      });
      if (user && user.id !== id) {
        throw new ConflictException(`User with id ${user.id} already exist`);
      }
    }

    const user = await this.databaseService.user.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const patchDto = createPatchFields(updateUserDto);

    await this.databaseService.user.update(id, patchDto);
    this.logger.log(`Updated user with ID ${id}`);
    this.logger.log({ ...patchDto });
  }

  public async delete(id: number, name: string): Promise<void> {
    const user = await this.databaseService.user.findOne({
      where: { name },
    });
    if (!user) {
      throw new NotFoundException(`User with name ${name} don´t exist`);
    }
    if (user.id === id) {
      throw new ConflictException(`Usuario en sesión no puede ser borrado `);
    }

    const userDelete = await this.databaseService.user.delete(id);
    if (userDelete.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    this.logger.log(`Deleted user with ID ${id}`);
  }

  private toOutDto(user: User): UsersOutDto {
    return {
      id: user.id,
      name: user.name,
      role: user.role,
      email: user.email,
      isActive: user.isActive,
      phone: user.phone,
    };
  }
}
