import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import {
  KnowledgeBaseService,
  type KnowledgeDocumentSummary,
} from "./knowledge-base.service";

@Controller()
export class KnowledgeBaseController {
  constructor(private readonly knowledgeBaseService: KnowledgeBaseService) {}

  @Get("admin/knowledge-documents")
  listDocuments() {
    return this.knowledgeBaseService.listDocuments();
  }

  @Post("admin/knowledge-documents")
  createDocument(@Body() body: Partial<KnowledgeDocumentSummary>) {
    return this.knowledgeBaseService.createDocument(body);
  }

  @Post("admin/knowledge-documents/:id/reindex")
  reindex(@Param("id") id: string) {
    return this.knowledgeBaseService.reindex(id);
  }
}
