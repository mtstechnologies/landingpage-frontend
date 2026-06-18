import { createFileRoute, Link } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { Button } from '../components/ui/button'
import { useGetApiV1PortfolioProjetos, useDeleteApiV1AdminPortfolioProjetosId } from '../shared/api/generated/default/default'
import { toast } from 'sonner'

export const Route = createFileRoute('/admin/')({
  component: AdminDashboard,
})

function AdminDashboard() {
  const { data: response, isLoading, refetch } = useGetApiV1PortfolioProjetos()
  const projetos = response?.data ?? []
  const { mutateAsync: deletar } = useDeleteApiV1AdminPortfolioProjetosId()

  const handleDelete = async (id: string, titulo: string) => {
    if (!confirm(`Excluir "${titulo}"?`)) return
    try {
      await deletar({ id })
      toast.success('Projeto excluído.')
      refetch()
    } catch {
      toast.error('Erro ao excluir projeto.')
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Projetos</h1>
        <Button asChild size="sm">
          <Link to="/admin/projects/new">
            <Plus className="w-4 h-4 mr-2" />
            Novo projeto
          </Link>
        </Button>
      </div>

      {isLoading && <p className="text-muted-foreground">Carregando...</p>}

      {!isLoading && projetos.length === 0 && (
        <p className="text-muted-foreground">Nenhum projeto cadastrado.</p>
      )}

      {!isLoading && projetos.length > 0 && (
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-secondary text-secondary-foreground">
              <tr>
                <th className="text-left p-3 font-medium">Título</th>
                <th className="text-left p-3 font-medium">Slug</th>
                <th className="text-left p-3 font-medium">Tecnologias</th>
                <th className="p-3" />
              </tr>
            </thead>
            <tbody>
              {projetos.map((p) => (
                <tr key={p.id} className="border-t hover:bg-secondary/40 transition-colors">
                  <td className="p-3 font-medium">{p.titulo}</td>
                  <td className="p-3 text-muted-foreground font-mono text-xs">{p.slug}</td>
                  <td className="p-3 text-muted-foreground">{p.tecnologias?.length ?? 0} tech</td>
                  <td className="p-3">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" asChild>
                        <Link to="/admin/projects/$id/edit" params={{ id: p.id ?? '' }}>
                          Editar
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDelete(p.id ?? '', p.titulo ?? '')}
                      >
                        Excluir
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
