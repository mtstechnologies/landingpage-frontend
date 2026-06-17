import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { AdminSidebar } from "@/features/admin/components/AdminSidebar";
import { ProjectForm } from "@/features/admin/components/ProjectForm";
import { mockAdminProjects } from "@/features/admin/mocks/data";
import type { ProjectFormValues } from "@/features/admin/types";

interface Props {
  projectId?: string;
}

export function ProjectFormPage({ projectId }: Props) {
  const navigate = useNavigate();
  const editing = projectId
    ? mockAdminProjects.find((p) => p.id === projectId)
    : undefined;

  const initialValues: Partial<ProjectFormValues> | undefined = editing && {
    title: editing.title,
    description: editing.description,
    repoUrl: editing.repoUrl ?? "",
    liveUrl: editing.liveUrl ?? "",
    technologies: editing.technologies,
    status: editing.status,
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />

      <main className="md:pl-64">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            to="/admin"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para projetos
          </Link>

          <div className="mt-4 mb-8">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              {editing ? "Editar projeto" : "Novo projeto"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {editing
                ? "Atualize as informações do projeto selecionado."
                : "Preencha os campos para adicionar um novo projeto ao portfólio."}
            </p>
          </div>

          <ProjectForm
            initialValues={initialValues}
            submitLabel={editing ? "Salvar alterações" : "Criar projeto"}
            onCancel={() => navigate({ to: "/admin" })}
            onSubmit={() => navigate({ to: "/admin" })}
          />
        </div>
      </main>
    </div>
  );
}
