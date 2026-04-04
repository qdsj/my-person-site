import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ProjectsService, type ProjectRecord } from "./projects.service";

@Controller()
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get("public/projects")
  listProjects() {
    return this.projectsService.listPublicProjects();
  }

  @Get("public/projects/:slug")
  getProject(@Param("slug") slug: string) {
    return this.projectsService.getPublicProject(slug);
  }

  @Post("admin/projects")
  createProject(@Body() body: Partial<ProjectRecord>) {
    return this.projectsService.createProject(body);
  }
}
