import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/pages/home/HomePage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Alex Carvalho — Engenheiro de Software" },
      {
        name: "description",
        content:
          "Portfólio de Alex Carvalho, engenheiro de software full-stack focado em produtos escaláveis, arquitetura limpa e experiência do usuário.",
      },
    ],
  }),
  component: HomePage,
});
