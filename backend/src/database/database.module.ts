import { join } from "node:path";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule, type TypeOrmModuleOptions } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        type: "mysql",
        connectorPackage: "mysql2",
        host: configService.getOrThrow<string>("PERSON_SITE_DB_HOST"),
        port: Number(configService.getOrThrow<string>("PERSON_SITE_DB_PORT")),
        username: configService.getOrThrow<string>("PERSON_SITE_DB_USER"),
        password: configService.getOrThrow<string>("PERSON_SITE_DB_PASSWORD"),
        database: configService.getOrThrow<string>("PERSON_SITE_DB_NAME"),
        charset: "utf8mb4",
        timezone: "Z",
        entities: [join(__dirname, "..", "**", "*.entity.js")],
        synchronize: false,
        retryAttempts: 3,
        retryDelay: 1000,
      }),
    }),
  ],
})
export class DatabaseModule {}
