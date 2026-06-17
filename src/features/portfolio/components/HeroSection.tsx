import { Button } from "@/components/ui/button";
import type { Profile } from "../types";

interface HeroSectionProps {
  profile: Profile;
}

export function HeroSection({ profile }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-accent/40 via-background to-background" />
      <div className="mx-auto flex max-w-5xl flex-col items-start gap-6 px-6 py-24 sm:py-32 lg:py-40">
        <span className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Portfólio
        </span>
        <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          {profile.name}
        </h1>
        <p className="text-xl font-medium text-muted-foreground sm:text-2xl">
          {profile.title}
        </p>
        <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          {profile.bio}
        </p>
        <div className="mt-2 flex flex-wrap gap-3">
          <Button size="lg">Ver projetos</Button>
          <Button size="lg" variant="outline">
            Entrar em contato
          </Button>
        </div>
      </div>
    </section>
  );
}
