import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DebugController } from "./debug.controller";
import { DebugUserEntity } from "./debug-user.entity";
import { MilvusDebugService } from "./milvus-debug.service";
import { MysqlDebugService } from "./mysql-debug.service";
import { UsersDebugService } from "./users-debug.service";

@Module({
  imports: [TypeOrmModule.forFeature([DebugUserEntity])],
  controllers: [DebugController],
  providers: [MysqlDebugService, UsersDebugService, MilvusDebugService],
})
export class DebugModule {}
