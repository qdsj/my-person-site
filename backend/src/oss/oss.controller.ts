import { Controller, Get, HttpStatus } from "@nestjs/common";
import { OssService } from "./oss.service";

@Controller("oss")
export class OssController {
  constructor(private readonly ossService: OssService) {}

  @Get()
  oss() {
    return {
      data: "oss",
    };
  }

  @Get("getTempSignature")
  async getTempSignature() {
    try {
      const params = await this.ossService.getTempSignature();
      return {
        status: HttpStatus.OK,
        message: "success",
        data: params,
      };
    } catch (error) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: error instanceof Error ? error.message : "failed",
        data: null,
      };
    }
  }
}
