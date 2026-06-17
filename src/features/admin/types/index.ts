import type { Project } from "@/features/portfolio/types";

export type ProjectStatus = "published" | "draft" | "archived";

export interface AdminProject extends Project {
  status: ProjectStatus;
  updatedAt: string;
}

export interface ProjectFormValues {
  title: string;
  description: string;
  repoUrl: string;
  liveUrl: string;
  technologies: string[];
  status: ProjectStatus;
}
