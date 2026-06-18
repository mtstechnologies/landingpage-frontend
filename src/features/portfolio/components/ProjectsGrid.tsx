import { Skeleton } from '../../../components/ui/skeleton'
import { ProjectCard } from './ProjectCard'
import type { ProjetoResponse } from '../../../shared/api/model'

interface ProjectsGridProps {
  projetos: ProjetoResponse[]
  isLoading: boolean
}

export function ProjectsGrid({ projetos, isLoading }: ProjectsGridProps) {
  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold mb-10">Projetos</h2>

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-3">
              <Skeleton className="aspect-video w-full rounded-lg" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-16 w-full" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!isLoading && projetos.length === 0 && (
        <p className="text-muted-foreground text-center py-16">
          Nenhum projeto cadastrado ainda.
        </p>
      )}

      {!isLoading && projetos.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projetos.map((projeto) => (
            <ProjectCard key={projeto.id} projeto={projeto} />
          ))}
        </div>
      )}
    </section>
  )
}
