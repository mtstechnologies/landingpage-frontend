import { Skeleton } from '../../../components/ui/skeleton'
import { Button } from '../../../components/ui/button'
import { Linkedin, Github } from 'lucide-react'
import type { PerfilResponse } from '../../../shared/api/model'

interface HeroSectionProps {
  perfil?: PerfilResponse
  isLoading: boolean
}

export function HeroSection({ perfil, isLoading }: HeroSectionProps) {
  if (isLoading) {
    return (
      <section className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center gap-8">
        <Skeleton className="w-32 h-32 rounded-full flex-shrink-0" />
        <div className="flex flex-col gap-3 w-full max-w-lg">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-16 w-full" />
          <div className="flex gap-3">
            <Skeleton className="h-10 w-28" />
            <Skeleton className="h-10 w-28" />
          </div>
        </div>
      </section>
    )
  }

  if (!perfil) return null

  return (
    <section className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center gap-8">
      {perfil.urlFoto && (
        <img
          src={perfil.urlFoto}
          alt={perfil.nome}
          className="w-32 h-32 rounded-full object-cover flex-shrink-0 border border-border"
          loading="eager"
        />
      )}
      <div className="flex flex-col gap-3">
        <h1 className="text-4xl font-bold tracking-tight">{perfil.nome}</h1>
        <p className="text-xl text-muted-foreground">{perfil.titulo}</p>
        <p className="text-base text-muted-foreground max-w-lg leading-relaxed">{perfil.bio}</p>
        <div className="flex gap-3 mt-2">
          {perfil.linkLinkedin && (
            <Button variant="outline" size="sm" asChild>
              <a href={perfil.linkLinkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn
              </a>
            </Button>
          )}
          {perfil.linkGithub && (
            <Button variant="outline" size="sm" asChild>
              <a href={perfil.linkGithub} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </a>
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
