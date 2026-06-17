import { createFileRoute } from "@tanstack/react-router";

import { ProjectFormPage } from "@/pages/admin/ProjectFormPage";

export const Route = createFileRoute("/admin/projects/new")({
  head: () => ({
    meta: [{ title: "Novo projeto — Portfolio CMS" }],
  }),
  component: () => <ProjectFormPage />,
});
