import { Controller, Post, Body, HttpCode, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(200) 
  async login(@Body() loginData: { username: string, password: string }) {
    const user = await this.authService.validateUser(loginData.username, loginData.password);
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() registerData: { username: string, email: string, password: string }) {
    return this.authService.register(registerData.username, registerData.email, registerData.password);
  }
}
