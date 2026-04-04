import { Injectable } from "@nestjs/common";

@Injectable()
export class UploadService {
  createSignedUpload(filename: string) {
    return {
      uploadUrl: "https://example-bucket.local/signed-upload",
      filename,
      expiresInSeconds: 900,
      note: "Replace with a real S3-compatible signed upload implementation.",
    };
  }
}
