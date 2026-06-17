import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Project } from "../types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      to="/projects/$slug"
      params={{ slug: project.slug }}
      className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-xl"
    >
      <Card className="flex h-full flex-col overflow-hidden pt-0 transition-colors group-hover:border-ring">
        <div className="aspect-video w-full overflow-hidden bg-muted">
          <img
            src={project.coverImage}
            alt={`Capa do projeto ${project.title}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <CardHeader>
          <CardTitle className="text-xl">{project.title}</CardTitle>
          <CardDescription className="line-clamp-3">{project.description}</CardDescription>
        </CardHeader>
        <CardContent className="mt-auto flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="secondary">
              {tech}
            </Badge>
          ))}
        </CardContent>
      </Card>
    </Link>
  );
}
