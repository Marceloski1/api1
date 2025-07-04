import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() || 'cc',
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('SECRET_KEY') || 'rwfc',
    });
  }
  async validate(payload: any) {
    return {
      name: payload.name,
      role: payload.role,
      userId: payload.userId, //Revisar
    };
  }
}
