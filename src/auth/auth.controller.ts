import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  HttpException,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import AuthOutDto from './dto/out/auth.out.dto';
import LoginInDto from './dto/in/login.in.dto';
import RefreshInDto from './dto/in/refresh.in.dto';
import RegisterInDto from './dto/in/register.in.dto';
import UserOutDto from './dto/out/user.out.dto';
import ChangePasswordInDto from './dto/in/change-password.in.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Role, Rols } from 'src/common/decorators/rols.decorator';
import ForgotPasswordInDto from './dto/in/forgotPassword.in.dto';
import ResetPasswordInDto from './dto/in/reset-password.in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('')
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiOkResponse({ description: 'ok' })
  @ApiForbiddenResponse({ description: 'Forbbiden' })
  @ApiCreatedResponse({ description: 'Login successful', type: AuthOutDto })
  @ApiOperation({ summary: 'Autenticate into system' })
  async login(@Body() body: LoginInDto): Promise<AuthOutDto> {
    const { accessToken, refreshToken } = await this.authService.login(
      body.email,
      body.password,
    );
    return {
      accessTokem: accessToken,
      refreshToken: refreshToken,
    };
  }

  @Post('refresh')
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiOkResponse({ description: 'ok' })
  @ApiForbiddenResponse({ description: 'Invalid Refresh Token' })
  @ApiCreatedResponse({
    description: 'Refresh tokes succesful',
    type: AuthOutDto,
  })
  @ApiOperation({ summary: 'Refresh Token' })
  async refresh(@Body() body: RefreshInDto): Promise<AuthOutDto> {
    const { accessToken, refreshToken } = await this.authService.refresh(
      body.refreshToken,
    );

    return {
      accessTokem: accessToken,
      refreshToken: refreshToken,
    };
  }

  @Post('register')
  @Rols(Role.TRAINER)
  @ApiCreatedResponse({
    description: 'Register Customer Successful',
    type: UserOutDto,
  })
  @ApiConflictResponse({
    description: 'Conflict with name or Email',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiOperation({ summary: 'Register User' })
  //@UseInterceptors(TokenInterceptor)
  async register(@Body() dto: RegisterInDto): Promise<UserOutDto> {
    return this.authService.register(dto);
  }

  @Post('change-password')
  @Rols(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Invalid Credentials' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiCreatedResponse({ description: 'Password changed successfully' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiOperation({ summary: 'Change current user password' })
  async changePassword(
    @Body() dto: ChangePasswordInDto,
    @Request() req,
  ): Promise<void> {
    const userId = req.user.userId;
    return this.authService.changePassword(
      userId,
      dto.oldPassword,
      dto.newPassword,
    );
  }

  @Post('forgot-password')
  @Rols(Role.USER, Role.ADMIN)
  @ApiOkResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: `Bad Request` })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiOperation({ summary: 'Sends an email to user to resed his password' })
  async forgotPassword(@Body() dto: ForgotPasswordInDto): Promise<void> {
    await this.authService.forgotPassword(dto.email);
  }

  @Post('reset-password')
  //@Rols(Role.USER, Role.ADMIN)
  @ApiOkResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: `Bad Request` })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiOperation({ summary: 'Complete reset password progress' })
  async resetPassword(@Body() dto: ResetPasswordInDto): Promise<void> {
    await this.authService.resetPassword(dto.resetToken, dto.newPassword);
  }
}
