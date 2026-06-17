import { ContactSection } from "@/features/portfolio/components/ContactSection";
import { HeroSection } from "@/features/portfolio/components/HeroSection";
import { ProjectList } from "@/features/portfolio/components/ProjectList";
import { mockProfile, mockProjects } from "@/features/portfolio/mocks/data";

export function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <HeroSection profile={mockProfile} />
      <ProjectList projects={mockProjects} />
      <ContactSection />
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-2 px-6 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {mockProfile.name}. Todos os direitos reservados.</p>
          <p>Construído com React, TypeScript e Tailwind CSS.</p>
        </div>
      </footer>
    </main>
  );
}
