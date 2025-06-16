import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import RefreshToken from 'src/common/entities/refresh-token.entity';
import Ejercicio from 'src/ejercicio/entities/ejercicio.entity';
import User from 'src/user/entities/user.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export default class DatabaseService {
  constructor(
    @InjectEntityManager() public readonly em: EntityManager,
    @InjectRepository(Ejercicio)
    public readonly ejercicio: Repository<Ejercicio>,
    @InjectRepository(RefreshToken)
    public readonly refreshToken: Repository<RefreshToken>,
    @InjectRepository(User) public readonly user: Repository<User>,
  ) {}
}
