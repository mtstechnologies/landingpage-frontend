import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/pages/home/HomePage";

export const Route = createFileRoute("/")({
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
  component: HomePage,
});
