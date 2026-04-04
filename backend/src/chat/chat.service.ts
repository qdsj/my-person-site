import { Injectable } from "@nestjs/common";
import { contentRepository } from "../shared/content.repository";

export type ChatInput = {
  message: string;
  locale?: string;
  sessionId?: string;
};

export type ChatReply = {
  answer: string;
  sessionId: string;
  sourceCount: number;
};

@Injectable()
export class ChatService {
  reply(input: ChatInput): ChatReply {
    return contentRepository.createChatReply(
      input.message,
      input.locale ?? "zh",
    );
  }
}
