import { createFileRoute } from "@tanstack/react-router";

import { ProfilePage } from "@/pages/admin/ProfilePage";

export const Route = createFileRoute("/admin/profile")({
  head: () => ({
    meta: [
      { title: "Perfil — Portfolio CMS" },
      { name: "description", content: "Gerencie os dados do seu perfil público." },
    ],
  }),
  component: ProfilePage,
});
