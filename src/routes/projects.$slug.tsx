import { createFileRoute, notFound } from "@tanstack/react-router";
import { ProjectDetailsPage } from "@/pages/portfolio/ProjectDetailsPage";
import { mockProjects } from "@/features/portfolio/mocks/data";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = mockProjects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.project.title} — Case Study` : "Case Study" },
      {
        name: "description",
        content: loaderData?.project.subtitle ?? loaderData?.project.description ?? "Case study",
      },
      ...(loaderData?.project.coverImage
        ? [{ property: "og:image", content: loaderData.project.coverImage } as const]
        : []),
    ],
  }),
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center px-4 text-center">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Projeto não encontrado</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          O case que você procura não existe ou foi removido.
        </p>
      </div>
    </div>
  ),
  component: RouteComponent,
});

function RouteComponent() {
  const { project } = Route.useLoaderData();
  return <ProjectDetailsPage project={project} />;
}
