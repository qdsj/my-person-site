import { Body, Controller, Post } from "@nestjs/common";
import { UploadService } from "./upload.service";

@Controller("admin/uploads")
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post("sign")
  signUpload(@Body() body: { filename: string }) {
    return this.uploadService.createSignedUpload(body.filename);
  }
}
