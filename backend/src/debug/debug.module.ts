import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DebugController } from "./debug.controller";
import { DebugUserEntity } from "./debug-user.entity";
import { DebugService } from "./debug.service";

@Module({
  imports: [TypeOrmModule.forFeature([DebugUserEntity])],
  controllers: [DebugController],
  providers: [DebugService],
})
export class DebugModule {}
