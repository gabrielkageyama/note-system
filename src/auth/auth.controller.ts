import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthLoginDto, AuthSignUpDto } from "./dtos";


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  login(@Body() dto: AuthLoginDto) {

    return this.authService.login(dto);
  }

  @Post('logout')
  logout() { return 'You have logged out'; }

  @Post('signup')
  signup(@Body() dto: AuthSignUpDto) {

    return this.authService.signup(dto);
  }
}
