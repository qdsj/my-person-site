import { Injectable, ServiceUnavailableException } from "@nestjs/common";
import { DataSource } from "typeorm";

type MysqlConnectionRow = {
  ok: number;
  databaseName: string | null;
  currentUser: string;
  mysqlVersion: string;
  serverTime: string;
};

@Injectable()
export class MysqlDebugService {
  constructor(private readonly dataSource: DataSource) {}

  async checkConnection() {
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
}
