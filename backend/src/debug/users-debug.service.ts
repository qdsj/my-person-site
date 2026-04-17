import { BadRequestException, ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { QueryFailedError, Repository } from "typeorm";
import { DebugUserEntity } from "./debug-user.entity";

type CreateDebugUserInput = {
  username: string;
  gender: string;
};

@Injectable()
export class UsersDebugService {
  constructor(
    @InjectRepository(DebugUserEntity)
    private readonly debugUserRepository: Repository<DebugUserEntity>,
  ) {}

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
