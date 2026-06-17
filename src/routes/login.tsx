import { createFileRoute } from "@tanstack/react-router";
import { LoginPage } from "@/pages/auth/LoginPage";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — Painel Administrativo" },
      {
        name: "description",
        content: "Acesse o painel administrativo do portfólio.",
      },
    ],
  }),
  component: LoginPage,
});
