import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ProjectHero } from "@/features/portfolio/components/ProjectHero";
import { ProjectContent } from "@/features/portfolio/components/ProjectContent";
import type { Project } from "@/features/portfolio/types";

interface ProjectDetailsPageProps {
  project: Project;
}

export function ProjectDetailsPage({ project }: ProjectDetailsPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <nav className="mx-auto max-w-5xl px-6 pt-8">
        <Link
          to="/"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Voltar ao portfólio
        </Link>
      </nav>

      <ProjectHero project={project} />
      <ProjectContent blocks={project.content} />

      {(project.repoUrl || project.liveUrl) && (
        <section className="mx-auto max-w-2xl px-6 pb-20">
          <div className="flex flex-wrap gap-3 border-t border-border/60 pt-8">
            {project.liveUrl && (
              <Button asChild>
                <a href={project.liveUrl} target="_blank" rel="noreferrer">
                  Ver projeto ao vivo
                </a>
              </Button>
            )}
            {project.repoUrl && (
              <Button asChild variant="outline">
                <a href={project.repoUrl} target="_blank" rel="noreferrer">
                  Ver repositório
                </a>
              </Button>
            )}
          </div>
        </section>
      )}

      <footer className="border-t border-border/60 py-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Alex Carvalho. Todos os direitos reservados.
      </footer>
    </div>
  );
}
