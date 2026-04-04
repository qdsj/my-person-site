import { Body, Controller, Get, Patch } from "@nestjs/common";
import { ProfileService, type ProfileRecord } from "./profile.service";

@Controller()
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get("public/profile")
  getProfile() {
    return this.profileService.getPublicProfile();
  }

  @Patch("admin/profile")
  updateProfile(@Body() body: Partial<ProfileRecord>) {
    return this.profileService.updateProfile(body);
  }
}
