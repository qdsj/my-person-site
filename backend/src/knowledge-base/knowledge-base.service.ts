import { Injectable } from "@nestjs/common";
import { contentRepository } from "../shared/content.repository";

export type KnowledgeDocumentSummary = {
  id: string;
  title: string;
  status: "draft" | "published";
  locale: string;
};

@Injectable()
export class KnowledgeBaseService {
  listDocuments() {
    return contentRepository.listKnowledgeDocuments();
  }

  createDocument(input: Partial<KnowledgeDocumentSummary>) {
    return {
      message: "Knowledge document create placeholder",
      input,
    };
  }

  reindex(id: string) {
    return {
      message: "Reindex placeholder",
      id,
      nextStep: "Chunk content, create embeddings, and refresh pgvector rows.",
    };
  }
}
