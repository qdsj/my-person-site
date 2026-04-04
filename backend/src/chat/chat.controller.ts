import { Body, Controller, Post } from "@nestjs/common";
import { ChatService, type ChatInput } from "./chat.service";

@Controller()
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post("public/chat")
  reply(@Body() body: ChatInput) {
    return this.chatService.reply(body);
  }
}
