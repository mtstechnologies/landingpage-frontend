import { createFileRoute, notFound } from '@tanstack/react-router'
import { useGetApiV1PortfolioProjetosSlug } from '../shared/api/generated/default/default'
import { ProjectDetailsPage } from '@/pages/portfolio/ProjectDetailsPage'
import { Skeleton } from '@/components/ui/skeleton'

export const Route = createFileRoute('/projects/$slug')({
  head: () => ({
    meta: [
      { title: 'Projeto — Michael Trindade' },
      { name: 'description', content: 'Detalhe de projeto no portfólio de Michael Trindade.' },
    ],
  }),
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center px-4 text-center">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Projeto não encontrado</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          O projeto que você procura não existe ou foi removido.
        </p>
      </div>
    </div>
  ),
  component: ProjectDetailRoute,
})

function ProjectDetailRoute() {
  const { slug } = Route.useParams()
  const { data: response, isLoading, isError } = useGetApiV1PortfolioProjetosSlug(slug)
  const projeto = response?.data

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-3xl px-6 py-16 flex flex-col gap-6">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="aspect-video w-full rounded-lg" />
        </div>
      </div>
    )
  }

  if (isError || !projeto) {
    throw notFound()
  }

  return <ProjectDetailsPage projeto={projeto} />
}
