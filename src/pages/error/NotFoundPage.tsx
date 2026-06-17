import { Link } from "@tanstack/react-router";
import { ArrowLeft, Compass } from "lucide-react";

import { Button } from "@/components/ui/button";

export function NotFoundPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 py-20 text-foreground">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,theme(colors.primary/15),transparent_60%)]"
      />
      <div className="relative mx-auto flex max-w-xl flex-col items-center text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          <Compass className="h-3.5 w-3.5" />
          Rota não encontrada
        </span>
        <h1 className="mt-8 bg-gradient-to-br from-foreground via-foreground to-muted-foreground bg-clip-text text-8xl font-bold tracking-tight text-transparent sm:text-9xl">
          404
        </h1>
        <h2 className="mt-6 text-2xl font-semibold tracking-tight sm:text-3xl">
          Esta página saiu do mapa
        </h2>
        <p className="mt-3 max-w-md text-base text-muted-foreground">
          O endereço que você tentou acessar não existe, foi movido ou ainda está em construção.
          Vamos te levar de volta para o início.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" className="gap-2">
            <Link to="/">
              <ArrowLeft className="h-4 w-4" />
              Voltar para o início
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/login">Acessar painel</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
