import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { ProjectForm, type ProjectFormValues } from '../features/admin/components/ProjectForm'
import { usePutApiV1AdminPortfolioProjetosId, useGetApiV1PortfolioProjetos } from '../shared/api/generated/default/default'
import { useEffect, useState } from 'react'
import type { ProjetoResponse } from '../shared/api/model'

export const Route = createFileRoute('/admin/projects/$id/edit')({
  component: EditProjectPage,
})

function EditProjectPage() {
  const { id } = Route.useParams()
  const navigate = useNavigate()
  const { data: response, isLoading } = useGetApiV1PortfolioProjetos()
  const { mutateAsync, isPending } = usePutApiV1AdminPortfolioProjetosId()
  const [projectToEdit, setProjectToEdit] = useState<ProjetoResponse | null>(null)

  useEffect(() => {
    if (response?.data) {
      const p = response.data.find(x => x.id === id)
      if (p) setProjectToEdit(p)
    }
  }, [response?.data, id])

  const handleSubmit = async (values: ProjectFormValues) => {
    try {
      await mutateAsync({ id, data: values })
      toast.success('Projeto atualizado com sucesso!')
      navigate({ to: '/admin' })
    } catch {
      toast.error('Erro ao atualizar projeto. Tente novamente.')
    }
  }

  if (isLoading) return <p>Carregando...</p>
  if (!projectToEdit) return <p>Projeto não encontrado.</p>

  const defaultValues: Partial<ProjectFormValues> = {
    titulo: projectToEdit.titulo ?? '',
    slug: projectToEdit.slug ?? '',
    descricao: projectToEdit.descricao ?? '',
    urlCapa: projectToEdit.urlCapa ?? '',
    linkProducao: projectToEdit.linkProducao ?? '',
    linkRepositorio: projectToEdit.linkRepositorio ?? '',
    dataDesenvolvimento: projectToEdit.dataDesenvolvimento ?? '',
    tecnologiaIds: projectToEdit.tecnologias?.map(t => t.id ?? '') ?? [],
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Editar projeto</h1>
      <ProjectForm onSubmit={handleSubmit} isSubmitting={isPending} defaultValues={defaultValues} submitLabel="Atualizar projeto" />
    </div>
  )
}
