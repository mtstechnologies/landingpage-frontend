import { createFileRoute } from "@tanstack/react-router";

import { ProjectFormPage } from "@/pages/admin/ProjectFormPage";

export const Route = createFileRoute("/admin/projects/$id/edit")({
  head: () => ({
    meta: [{ title: "Editar projeto — Portfolio CMS" }],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  return <ProjectFormPage projectId={id} />;
}
