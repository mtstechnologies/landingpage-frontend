import { Link } from "@tanstack/react-router";
import { Plus, FolderKanban, CheckCircle2, FileEdit } from "lucide-react";

import { AdminSidebar } from "@/features/admin/components/AdminSidebar";
import { ProjectsDataTable } from "@/features/admin/components/ProjectsDataTable";
import { TableSkeleton } from "@/features/admin/components/TableSkeleton"; // Importe o Skeleton
import { Button } from "@/components/ui/button";

// Importe o hook do Orval
import { useGetApiV1PortfolioProjetos } from "@/shared/api/generated/default/default";

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
  // Chamada para a API real
  const queryResult = useGetApiV1PortfolioProjetos();
  const projects = queryResult.data?.data || [];
  const isLoading = queryResult.isLoading;
  
  const published = 0;
  const drafts = 0;

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
                Gerencie os projetos do seu portfólio via API.
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
            {isLoading ? (
              <TableSkeleton />
            ) : (
              <ProjectsDataTable projects={projects} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}