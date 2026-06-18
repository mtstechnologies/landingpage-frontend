import { Link } from '@tanstack/react-router'
import { ExternalLink, Github } from 'lucide-react'
import { TechBadge } from './TechBadge'
import { Card, CardContent, CardHeader } from '../../../components/ui/card'
import type { ProjetoResponse } from '../../../shared/api/model'

interface ProjectCardProps {
  projeto: ProjetoResponse
}

export function ProjectCard({ projeto }: ProjectCardProps) {
  return (
    <Card className="group hover:shadow-md transition-shadow duration-200 overflow-hidden">
      {projeto.urlCapa && (
        <div className="aspect-video overflow-hidden">
          <img
            src={projeto.urlCapa}
            alt={projeto.titulo}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
      )}
      <CardHeader className="pb-2">
        <Link
          to="/projects/$slug"
          params={{ slug: projeto.slug || '' }}
          className="font-semibold text-lg hover:text-primary transition-colors line-clamp-1"
        >
          {projeto.titulo}
        </Link>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
          {projeto.descricao}
        </p>
        {projeto.tecnologias && projeto.tecnologias.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {projeto.tecnologias.slice(0, 5).map((tec) => (
              <TechBadge key={tec.id} tecnologia={tec} />
            ))}
            {projeto.tecnologias.length > 5 && (
              <span className="text-xs text-muted-foreground self-center">
                +{projeto.tecnologias.length - 5}
              </span>
            )}
          </div>
        )}
        <div className="flex gap-3 pt-1">
          {projeto.linkProducao && (
            <a
              href={projeto.linkProducao}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Demo
            </a>
          )}
          {projeto.linkRepositorio && (
            <a
              href={projeto.linkRepositorio}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              Código
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
