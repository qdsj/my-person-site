import {
  BadRequestException,
  ConflictException,
  Injectable,
  ServiceUnavailableException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, QueryFailedError, Repository } from "typeorm";
import { DebugUserEntity } from "./debug-user.entity";

type MysqlConnectionRow = {
  ok: number;
  databaseName: string | null;
  currentUser: string;
  mysqlVersion: string;
  serverTime: string;
};

type CreateDebugUserInput = {
  username: string;
  gender: string;
};

@Injectable()
export class DebugService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(DebugUserEntity)
    private readonly debugUserRepository: Repository<DebugUserEntity>,
  ) {}

  async checkMysqlConnection() {
    try {
      const rows = await this.dataSource.query<MysqlConnectionRow[]>(
        "SELECT 1 AS ok, DATABASE() AS databaseName, CURRENT_USER() AS currentUser, VERSION() AS mysqlVersion, NOW() AS serverTime",
      );
      const row = rows[0];

      return {
        ok: Number(row?.ok ?? 0) === 1,
        databaseName: row?.databaseName ?? null,
        currentUser: row?.currentUser ?? "",
        mysqlVersion: row?.mysqlVersion ?? "",
        serverTime: row?.serverTime ?? "",
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : "MySQL connection check failed.";
      const errorCode =
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        typeof error.code === "string"
          ? error.code
          : undefined;

      throw new ServiceUnavailableException({
        ok: false,
        message,
        errorCode,
      });
    }
  }

  async listUsers() {
    const users = await this.debugUserRepository.find({
      order: {
        username: "ASC",
      },
    });

    return {
      ok: true,
      count: users.length,
      users,
    };
  }

  async createUser(input: CreateDebugUserInput) {
    const username = input.username.trim();
    const gender = input.gender.trim();

    if (!username || !gender) {
      throw new BadRequestException({
        ok: false,
        message: "Both username and gender are required.",
      });
    }

    try {
      const user = this.debugUserRepository.create({
        username,
        gender,
      });

      await this.debugUserRepository.insert(user);

      return {
        ok: true,
        user,
      };
    } catch (error) {
      if (error instanceof QueryFailedError) {
        const driverError =
          typeof error.driverError === "object" && error.driverError !== null
            ? error.driverError
            : null;

        if (driverError && "code" in driverError && driverError.code === "ER_DUP_ENTRY") {
          throw new ConflictException({
            ok: false,
            message: "A user with the same username already exists.",
            errorCode: "ER_DUP_ENTRY",
          });
        }
      }

      throw error;
    }
  }
}
