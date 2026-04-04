import { Injectable } from "@nestjs/common";
import { contentRepository } from "../shared/content.repository";

export type ProfileRecord = {
  name: string;
  headline: string;
  summary: string;
  locales: string[];
};

@Injectable()
export class ProfileService {
  getPublicProfile() {
    return contentRepository.getProfile();
  }

  updateProfile(input: Partial<ProfileRecord>) {
    return {
      message: "Profile update placeholder",
      input,
    };
  }
}
