import { Link } from "@tanstack/react-router";
import { Pencil, Trash2, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
// Imports gerados pelo Orval
import { ProjetoResponse } from "@/shared/api/model";
import { useDeleteApiV1AdminPortfolioProjetosId } from "@/shared/api/generated/default/default";
import { useQueryClient } from "@tanstack/react-query";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

interface Props {
  projects: ProjetoResponse[];
}

export function ProjectsDataTable({ projects }: Props) {
  const queryClient = useQueryClient();
  const { mutate: deleteProject } = useDeleteApiV1AdminPortfolioProjetosId({
    mutation: {
      onSuccess: () => {
        // Invalida a lista para o React Query buscar os dados frescos automaticamente
        queryClient.invalidateQueries({ queryKey: ["getApiV1PortfolioProjetos"] });
      },
    },
  });

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="min-w-[240px]">Título</TableHead>
              <TableHead className="hidden md:table-cell">Tecnologias</TableHead>
              <TableHead className="hidden sm:table-cell">Atualizado em</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id} className="hover:bg-muted/30">
                <TableCell className="font-medium text-foreground">
                  <div className="flex flex-col">
                    <span>{project.titulo}</span>
                    <span className="text-xs text-muted-foreground line-clamp-1">
                      {project.descricao}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex flex-wrap gap-1">
                    {/* Ajuste conforme o tipo retornado pela API */}
                    {project.tecnologias?.slice(0, 3).map((t) => (
                      <Badge key={t.id} variant="secondary" className="font-normal">
                        {t.nome}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                  {project.dataDesenvolvimento ? formatDate(project.dataDesenvolvimento) : '-'}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">Publicado</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon" asChild>
                      <Link to="/admin/projects/$id/edit" params={{ id: project.id! }}>
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      onClick={() => deleteProject({ id: project.id! })}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}