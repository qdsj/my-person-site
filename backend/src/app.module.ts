import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { ChatModule } from "./chat/chat.module";
import { DatabaseModule } from "./database/database.module";
import { DebugModule } from "./debug/debug.module";
import { KnowledgeBaseModule } from "./knowledge-base/knowledge-base.module";
import { MediaModule } from "./media/media.module";
import { ProfileModule } from "./profile/profile.module";
import { ProjectsModule } from "./projects/projects.module";
import { UploadModule } from "./upload/upload.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    DebugModule,
    AuthModule,
    ProfileModule,
    ProjectsModule,
    MediaModule,
    KnowledgeBaseModule,
    ChatModule,
    UploadModule,
  ],
})
export class AppModule {}
