import { Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  login() { return 'You have logged in'; }

  @Post('logout')
  logout() { return 'You have logged out'; }

  @Post('signup')
  signup() { return 'You have signed up'; }
}
