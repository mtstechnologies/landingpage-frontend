import { Link } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginForm } from "@/features/auth/components/LoginForm";

export function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-2 text-center">
          <Link
            to="/"
            className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
          >
            Portfólio
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Acesso ao painel
          </h1>
          <p className="text-sm text-muted-foreground">
            Entre com suas credenciais para gerenciar os projetos.
          </p>
        </div>

        <Card className="border-border/60 shadow-lg shadow-black/10">
          <CardHeader className="space-y-1">
            <CardTitle className="text-lg">Login</CardTitle>
            <CardDescription>Use o e-mail cadastrado como administrador.</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Voltar para o{" "}
          <Link to="/" className="text-foreground underline-offset-4 hover:underline">
            site público
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
