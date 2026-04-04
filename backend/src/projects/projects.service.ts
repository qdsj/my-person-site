import { Injectable } from "@nestjs/common";
import { contentRepository } from "../shared/content.repository";

export type ProjectRecord = {
  id: string;
  slug: string;
  title: string;
  status: "draft" | "published";
};

@Injectable()
export class ProjectsService {
  listPublicProjects() {
    return contentRepository.listProjects();
  }

  getPublicProject(slug: string) {
    return contentRepository.getProjectBySlug(slug);
  }

  createProject(input: Partial<ProjectRecord>) {
    return {
      message: "Project create placeholder",
      input,
    };
  }
}
