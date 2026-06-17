import type { Project } from "../types";
import { ProjectCard } from "./ProjectCard";

interface ProjectListProps {
  projects: Project[];
}

export function ProjectList({ projects }: ProjectListProps) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
      <div className="mb-12 flex flex-col gap-3">
        <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Trabalhos selecionados
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Projetos em destaque
        </h2>
        <p className="max-w-2xl text-base text-muted-foreground">
          Uma seleção dos produtos e ferramentas que construí recentemente, com foco em
          arquitetura, performance e experiência do usuário.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
