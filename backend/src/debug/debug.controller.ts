import { Body, Controller, Get, Post } from "@nestjs/common";
import { DebugService } from "./debug.service";

type CreateDebugUserPayload = {
  username: string;
  gender: string;
};

@Controller("debug")
export class DebugController {
  constructor(private readonly debugService: DebugService) {}

  @Get("mysql-connection")
  checkMysqlConnection() {
    return this.debugService.checkMysqlConnection();
  }

  @Get("users")
  listUsers() {
    return this.debugService.listUsers();
  }

  @Post("users")
  createUser(@Body() payload: CreateDebugUserPayload) {
    return this.debugService.createUser(payload);
  }
}
