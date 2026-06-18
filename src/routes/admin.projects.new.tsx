import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { ProjectForm, type ProjectFormValues } from '../features/admin/components/ProjectForm'
import { usePostApiV1AdminPortfolioProjetos } from '../shared/api/generated/default/default'

export const Route = createFileRoute('/admin/projects/new')({
  component: NewProjectPage,
})

function NewProjectPage() {
  const navigate = useNavigate()
  const { mutateAsync, isPending } = usePostApiV1AdminPortfolioProjetos()

  const handleSubmit = async (values: ProjectFormValues) => {
    try {
      await mutateAsync({ data: values })
      toast.success('Projeto criado com sucesso!')
      navigate({ to: '/admin' })
    } catch {
      toast.error('Erro ao criar projeto. Tente novamente.')
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Novo projeto</h1>
      <ProjectForm onSubmit={handleSubmit} isSubmitting={isPending} />
    </div>
  )
}
