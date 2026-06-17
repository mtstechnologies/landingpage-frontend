import { createFileRoute } from "@tanstack/react-router";

import { DashboardPage } from "@/pages/admin/DashboardPage";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Portfolio CMS" },
      { name: "description", content: "Painel administrativo do portfólio." },
    ],
  }),
  component: DashboardPage,
});
