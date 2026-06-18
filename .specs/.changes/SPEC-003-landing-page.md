# SPEC-003 — Landing Page Pública (Hero + Projects Grid)

## Contexto
O repositório `landingpage-frontend` tem toda a estrutura criada (rotas, SDK Orval gerado,
design system com shadcn/ui + Tailwind v4), mas os componentes de UI ainda não foram
implementados. A rota `/` (`src/routes/index.tsx`) está vazia.

Esta spec implementa a landing page pública completa.

## Pré-requisito
SPEC-002 executada — o backend deve expor `slug` no response de projetos.
Rodar `npm run api:gen` após o backend atualizado antes de iniciar esta spec.

---

## Estrutura de arquivos a criar / modificar

```
src/
├── routes/
│   └── index.tsx                          ← MODIFICAR (está vazio)
├── features/
│   └── portfolio/
│       ├── components/
│       │   ├── HeroSection.tsx            ← CRIAR
│       │   ├── ProjectsGrid.tsx           ← CRIAR
│       │   ├── ProjectCard.tsx            ← CRIAR
│       │   ├── TechBadge.tsx              ← CRIAR
│       │   ├── SectionWrapper.tsx         ← CRIAR
│       │   └── ContactSection.tsx         ← CRIAR
│       └── hooks/
│           └── usePortfolioData.ts        ← CRIAR
```

---

## Componentes a implementar

### `src/routes/index.tsx`
Orquestrador da landing page. Usa SSR do TanStack Start para carregar dados no servidor.

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { HeroSection } from '../features/portfolio/components/HeroSection'
import { ProjectsGrid } from '../features/portfolio/components/ProjectsGrid'
import { ContactSection } from '../features/portfolio/components/ContactSection'
import { usePortfolioData } from '../features/portfolio/hooks/usePortfolioData'

export const Route = createFileRoute('/')({
  component: LandingPage,
})

function LandingPage() {
  const { perfil, projetos, isLoading } = usePortfolioData()

  return (
    <main className="min-h-screen bg-background">
      <HeroSection perfil={perfil} isLoading={isLoading} />
      <ProjectsGrid projetos={projetos} isLoading={isLoading} />
      <ContactSection perfil={perfil} isLoading={isLoading} />
    </main>
  )
}
```

---

### `src/features/portfolio/hooks/usePortfolioData.ts`
Centraliza as chamadas de API usando os hooks gerados pelo Orval.

```ts
import { useGetApiV1PortfolioPerfil } from '../../shared/api/generated/portfolio-publico-controller'
import { useGetApiV1PortfolioProjetos } from '../../shared/api/generated/portfolio-publico-controller'

export function usePortfolioData() {
  const { data: perfil, isLoading: perfilLoading } = useGetApiV1PortfolioPerfil()
  const { data: projetos, isLoading: projetosLoading } = useGetApiV1PortfolioProjetos()

  return {
    perfil,
    projetos: projetos ?? [],
    isLoading: perfilLoading || projetosLoading,
  }
}
```

> Ajustar os nomes dos hooks conforme o que o Orval gerou em
> `src/shared/api/generated/`. Os nomes seguem o padrão `use + OperationId`.

---

### `src/features/portfolio/components/HeroSection.tsx`

**Comportamento:**
- Exibe foto do perfil (url_foto), nome, título e bio
- Links para LinkedIn e GitHub como botões/ícones
- Enquanto carrega: skeleton com as mesmas dimensões
- Se perfil for null após carregamento: mensagem neutra (não mostrar erro para visitante)

**Layout esperado:**
```
┌─────────────────────────────────────────┐
│  [foto circular]  Nome Completo         │
│                   Título Profissional   │
│                   Bio curta...          │
│                   [LinkedIn] [GitHub]   │
└─────────────────────────────────────────┘
```

**Implementação:**
```tsx
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
```

---

### `src/features/portfolio/components/TechBadge.tsx`

```tsx
import type { TecnologiaResponse } from '../../../shared/api/model'

interface TechBadgeProps {
  tecnologia: TecnologiaResponse
}

export function TechBadge({ tecnologia }: TechBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-secondary text-secondary-foreground text-xs font-medium">
      {tecnologia.urlIcone && (
        <img
          src={tecnologia.urlIcone}
          alt={tecnologia.nome}
          className="w-3.5 h-3.5 object-contain"
          loading="lazy"
        />
      )}
      {tecnologia.nome}
    </span>
  )
}
```

---

### `src/features/portfolio/components/ProjectCard.tsx`

```tsx
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
          params={{ slug: projeto.slug }}
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
```

---

### `src/features/portfolio/components/ProjectsGrid.tsx`

```tsx
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
```

---

### `src/features/portfolio/components/ContactSection.tsx`

```tsx
import { Button } from '../../../components/ui/button'
import { Mail, Linkedin, Github } from 'lucide-react'
import type { PerfilResponse } from '../../../shared/api/model'

interface ContactSectionProps {
  perfil?: PerfilResponse
  isLoading: boolean
}

export function ContactSection({ perfil, isLoading }: ContactSectionProps) {
  if (isLoading || !perfil) return null

  return (
    <section className="container mx-auto px-4 py-20 text-center">
      <h2 className="text-3xl font-bold mb-4">Entre em contato</h2>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        Aberto a oportunidades, colaborações e conversas sobre tecnologia.
      </p>
      <div className="flex justify-center gap-4 flex-wrap">
        <Button asChild>
          <a href={`mailto:${perfil.email ?? ''}`}>
            <Mail className="w-4 h-4 mr-2" />
            Enviar e-mail
          </a>
        </Button>
        {perfil.linkLinkedin && (
          <Button variant="outline" asChild>
            <a href={perfil.linkLinkedin} target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-4 h-4 mr-2" />
              LinkedIn
            </a>
          </Button>
        )}
        {perfil.linkGithub && (
          <Button variant="outline" asChild>
            <a href={perfil.linkGithub} target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </a>
          </Button>
        )}
      </div>
    </section>
  )
}
```

---

## Comportamento esperado após execução

- `npm run dev` → `http://localhost:3000` renderiza a landing page
- Com backend rodando e perfil cadastrado: hero exibe foto, nome, título, bio e links
- Com backend rodando e projetos cadastrados: grid exibe os cards com capa, tech badges e links
- Sem backend / carregando: skeletons aparecem no lugar dos componentes
- Sem dados: empty states limpos (sem erros visíveis para o visitante)
- Clicar no título de um projeto navega para `/projects/{slug}`

## O que NÃO fazer

- Não criar rotas novas — apenas implementar as que existem
- Não instalar novas dependências — usar somente o que já está no `package.json`
- Não editar arquivos em `src/shared/api/generated/` ou `src/shared/api/model/`
- Não criar stores globais (Zustand, Jotai etc.) — usar React Query via hooks Orval
- Não usar `any` em TypeScript
