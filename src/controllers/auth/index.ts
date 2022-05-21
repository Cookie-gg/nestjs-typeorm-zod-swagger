import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiCreatedResponse, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth, LoginInput } from '~/domain/models/auth';
import { User } from '~/domain/models/user';
import { AuthService } from '~/services';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiOperation({ summary: 'Login' })
  @ApiBody({ type: LoginInput })
  @ApiCreatedResponse({ type: Auth })
  @ApiResponse({ type: Auth })
  @UseGuards(AuthGuard('local'))
  login(@Req() req: { user: User }) {
    return this.authService.login(req.user);
  }

  @Get('status')
  @ApiOperation({ summary: 'Check logging status' })
  @ApiHeader({ name: 'authorization', description: 'must be started with "bearer"' })
  @ApiCreatedResponse({ type: Auth })
  @ApiResponse({ type: Auth })
  @UseGuards(AuthGuard('jwt'))
  status(@Req() req: { user: User }) {
    return this.authService.login(req.user);
  }

  @Get('refresh')
  @ApiHeader({ name: 'authorization', description: 'must be started with "bearer"' })
  @ApiOperation({ summary: 'Refresh token' })
  @ApiCreatedResponse({ type: Auth })
  @ApiResponse({ type: Auth })
  @UseGuards(AuthGuard('jwt-refresh'))
  refresh(@Req() req: { user: User }) {
    return this.authService.login(req.user);
  }
}
