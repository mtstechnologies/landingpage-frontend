import { Badge } from "@/components/ui/badge";
import type { Project } from "../types";

interface ProjectHeroProps {
  project: Project;
}

function formatDate(iso?: string) {
  if (!iso) return null;
  try {
    return new Date(iso).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch {
    return null;
  }
}

export function ProjectHero({ project }: ProjectHeroProps) {
  const publishedAt = formatDate(project.publishedAt);

  return (
    <header className="border-b border-border/60 bg-gradient-to-b from-muted/30 to-background">
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-16 sm:py-20">
        <div className="flex flex-col gap-3">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Case study
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            {project.title}
          </h1>
          {project.subtitle && (
            <p className="text-lg text-muted-foreground sm:text-xl">{project.subtitle}</p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
          {publishedAt && <time dateTime={project.publishedAt}>{publishedAt}</time>}
          {publishedAt && <span aria-hidden className="h-1 w-1 rounded-full bg-muted-foreground/50" />}
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 pb-12">
        <div className="aspect-video w-full overflow-hidden rounded-lg border border-border/60 bg-muted">
          <img
            src={project.coverImage}
            alt={`Capa do projeto ${project.title}`}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </header>
  );
}
