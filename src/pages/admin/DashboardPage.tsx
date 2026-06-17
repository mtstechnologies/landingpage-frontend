import { Link } from "@tanstack/react-router";
import { Plus, FolderKanban, CheckCircle2, FileEdit } from "lucide-react";

import { AdminSidebar } from "@/features/admin/components/AdminSidebar";
import { ProjectsDataTable } from "@/features/admin/components/ProjectsDataTable";
import { Button } from "@/components/ui/button";
import { mockAdminProjects } from "@/features/admin/mocks/data";

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{label}</span>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <p className="mt-2 text-2xl font-semibold text-foreground">{value}</p>
    </div>
  );
}

export function DashboardPage() {
  const projects = mockAdminProjects;
  const published = projects.filter((p) => p.status === "published").length;
  const drafts = projects.filter((p) => p.status === "draft").length;

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />

      <main className="md:pl-64">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                Projetos
              </h1>
              <p className="text-sm text-muted-foreground">
                Gerencie os projetos exibidos no seu portfólio.
              </p>
            </div>
            <Button asChild>
              <Link to="/admin/projects/new">
                <Plus className="h-4 w-4" />
                Novo projeto
              </Link>
            </Button>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <StatCard label="Total" value={projects.length} icon={FolderKanban} />
            <StatCard label="Publicados" value={published} icon={CheckCircle2} />
            <StatCard label="Rascunhos" value={drafts} icon={FileEdit} />
          </div>

          <div className="mt-6">
            <ProjectsDataTable projects={projects} />
          </div>
        </div>
      </main>
    </div>
  );
}
