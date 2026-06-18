import { createFileRoute } from '@tanstack/react-router'
import { HeroSection } from '../features/portfolio/components/HeroSection'
import { ProjectsGrid } from '../features/portfolio/components/ProjectsGrid'
import { ContactSection } from '../features/portfolio/components/ContactSection'
import { usePortfolioData } from '../features/portfolio/hooks/usePortfolioData'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: "Michael Trindade — Engenheiro de Software" },
      {
        name: "description",
        content:
          "Portfólio de Michael Trindade, engenheiro de software full-stack focado em produtos escaláveis, arquitetura limpa e experiência do usuário.",
      },
    ],
  }),
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
