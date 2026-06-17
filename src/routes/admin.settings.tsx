import { createFileRoute } from "@tanstack/react-router";

import { SettingsPage } from "@/pages/admin/SettingsPage";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({
    meta: [
      { title: "Configurações — Portfolio CMS" },
      { name: "description", content: "Preferências gerais do portfólio." },
    ],
  }),
  component: SettingsPage,
});
