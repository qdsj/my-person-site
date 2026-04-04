import { Injectable } from "@nestjs/common";
import { contentRepository } from "../shared/content.repository";

export type MediaRecord = {
  id: string;
  kind: "image" | "video";
  title: string;
  status: "draft" | "published";
};

@Injectable()
export class MediaService {
  listPublicMedia() {
    return contentRepository.listMedia();
  }

  createMedia(input: Partial<MediaRecord>) {
    return {
      message: "Media create placeholder",
      input,
    };
  }
}
