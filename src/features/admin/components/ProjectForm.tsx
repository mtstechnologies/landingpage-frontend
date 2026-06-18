import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../components/ui/form'
import { Input } from '../../../components/ui/input'
import { Textarea } from '../../../components/ui/textarea'
import { Button } from '../../../components/ui/button'
import { TechSelector } from './TechSelector'

const projectSchema = z.object({
  titulo: z.string().min(3, 'Mínimo 3 caracteres'),
  slug: z
    .string()
    .min(3)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use apenas letras minúsculas, números e hífens'),
  descricao: z.string().min(10, 'Mínimo 10 caracteres'),
  urlCapa: z.string().url('URL inválida').optional().or(z.literal('')),
  linkProducao: z.string().url('URL inválida').optional().or(z.literal('')),
  linkRepositorio: z.string().url('URL inválida').optional().or(z.literal('')),
  dataDesenvolvimento: z.string().min(1, 'Data obrigatória'),
  tecnologiaIds: z.array(z.string()),
})

export type ProjectFormValues = z.infer<typeof projectSchema>

interface ProjectFormProps {
  defaultValues?: Partial<ProjectFormValues>
  onSubmit: (values: ProjectFormValues) => Promise<void>
  isSubmitting: boolean
  submitLabel?: string
}

export function ProjectForm({
  defaultValues,
  onSubmit,
  isSubmitting,
  submitLabel = 'Salvar projeto',
}: ProjectFormProps) {
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      titulo: '',
      slug: '',
      descricao: '',
      urlCapa: '',
      linkProducao: '',
      linkRepositorio: '',
      dataDesenvolvimento: '',
      tecnologiaIds: [],
      ...defaultValues,
    },
  })

  // Auto-gera o slug a partir do título enquanto o campo slug está vazio
  const handleTituloChange = (value: string) => {
    if (!form.getValues('slug')) {
      const autoSlug = value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
      form.setValue('slug', autoSlug)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 max-w-2xl">
        <FormField control={form.control} name="titulo" render={({ field }) => (
          <FormItem>
            <FormLabel>Título</FormLabel>
            <FormControl>
              <Input
                {...field}
                onChange={(e) => { field.onChange(e); handleTituloChange(e.target.value) }}
                placeholder="Nome do projeto"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="slug" render={({ field }) => (
          <FormItem>
            <FormLabel>Slug (URL)</FormLabel>
            <FormControl>
              <Input {...field} placeholder="meu-projeto" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="descricao" render={({ field }) => (
          <FormItem>
            <FormLabel>Descrição</FormLabel>
            <FormControl>
              <Textarea {...field} rows={4} placeholder="Descreva o projeto..." />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="urlCapa" render={({ field }) => (
          <FormItem>
            <FormLabel>URL da imagem de capa</FormLabel>
            <FormControl>
              <Input {...field} placeholder="https://..." />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <div className="grid grid-cols-2 gap-4">
          <FormField control={form.control} name="linkProducao" render={({ field }) => (
            <FormItem>
              <FormLabel>Link de produção</FormLabel>
              <FormControl>
                <Input {...field} placeholder="https://..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="linkRepositorio" render={({ field }) => (
            <FormItem>
              <FormLabel>Repositório</FormLabel>
              <FormControl>
                <Input {...field} placeholder="https://github.com/..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <FormField control={form.control} name="dataDesenvolvimento" render={({ field }) => (
          <FormItem>
            <FormLabel>Data de desenvolvimento</FormLabel>
            <FormControl>
              <Input {...field} type="date" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="tecnologiaIds" render={({ field }) => (
          <FormItem>
            <FormLabel>Tecnologias</FormLabel>
            <FormControl>
              <TechSelector selected={field.value} onChange={field.onChange} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <Button type="submit" disabled={isSubmitting} className="self-start">
          {isSubmitting ? 'Salvando...' : submitLabel}
        </Button>
      </form>
    </Form>
  )
}
