import { Body, Controller, Post } from "@nestjs/common";
import { AuthService, type LoginPayload } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  login(@Body() payload: LoginPayload) {
    return this.authService.login(payload);
  }
}
