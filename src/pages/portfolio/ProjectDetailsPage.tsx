import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, Github, ArrowLeft } from 'lucide-react'
import type { ProjetoResponse } from '@/shared/api/model'

interface ProjectDetailsPageProps {
  projeto: ProjetoResponse
}

function formatDate(iso?: string) {
  if (!iso) return null
  try {
    return new Date(iso).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  } catch {
    return null
  }
}

export function ProjectDetailsPage({ projeto }: ProjectDetailsPageProps) {
  const data = formatDate(projeto.dataDesenvolvimento)

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="mx-auto max-w-5xl px-6 pt-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao portfólio
        </Link>
      </nav>

      {/* Hero */}
      <header className="border-b border-border/60 bg-gradient-to-b from-muted/30 to-background mt-6">
        <div className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-16 sm:py-20">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Projeto
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              {projeto.titulo}
            </h1>
            {projeto.descricao && (
              <p className="text-lg text-muted-foreground sm:text-xl">{projeto.descricao}</p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            {data && <time dateTime={projeto.dataDesenvolvimento}>{data}</time>}
            {data && projeto.tecnologias && projeto.tecnologias.length > 0 && (
              <span aria-hidden className="h-1 w-1 rounded-full bg-muted-foreground/50" />
            )}
            <div className="flex flex-wrap gap-2">
              {projeto.tecnologias?.map((tec) => (
                <Badge key={tec.id} variant="secondary">
                  {tec.nome}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Capa */}
        {projeto.urlCapa && (
          <div className="mx-auto max-w-5xl px-6 pb-12">
            <div className="aspect-video w-full overflow-hidden rounded-lg border border-border/60 bg-muted">
              <img
                src={projeto.urlCapa}
                alt={`Capa do projeto ${projeto.titulo}`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        )}
      </header>

      {/* Descrição expandida (caso queira usar descricao como conteúdo principal) */}
      <article className="mx-auto max-w-2xl px-6 py-16">
        {projeto.descricao ? (
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Sobre o projeto
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              {projeto.descricao}
            </p>
          </div>
        ) : (
          <p className="text-base text-muted-foreground">
            O conteúdo detalhado deste projeto será publicado em breve.
          </p>
        )}
      </article>

      {/* Links */}
      {(projeto.linkProducao || projeto.linkRepositorio) && (
        <section className="mx-auto max-w-2xl px-6 pb-20">
          <div className="flex flex-wrap gap-3 border-t border-border/60 pt-8">
            {projeto.linkProducao && (
              <Button asChild>
                <a href={projeto.linkProducao} target="_blank" rel="noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Ver projeto ao vivo
                </a>
              </Button>
            )}
            {projeto.linkRepositorio && (
              <Button asChild variant="outline">
                <a href={projeto.linkRepositorio} target="_blank" rel="noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  Ver repositório
                </a>
              </Button>
            )}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-border/60 py-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Michael Trindade da Silva. Todos os direitos reservados.
      </footer>
    </div>
  )
}
