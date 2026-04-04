import { Injectable } from "@nestjs/common";

export type LoginPayload = {
  username: string;
  password: string;
};

@Injectable()
export class AuthService {
  login(payload: LoginPayload) {
    return {
      ok: true,
      message: "Replace with real password verification and session issuance.",
      username: payload.username,
    };
  }
}
