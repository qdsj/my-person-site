import { Body, Controller, Get, Post } from "@nestjs/common";
import { MediaService, type MediaRecord } from "./media.service";

@Controller()
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get("public/media")
  listMedia() {
    return this.mediaService.listPublicMedia();
  }

  @Post("admin/media")
  createMedia(@Body() body: Partial<MediaRecord>) {
    return this.mediaService.createMedia(body);
  }
}
