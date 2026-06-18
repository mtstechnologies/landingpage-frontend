import { createFileRoute } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../components/ui/form'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { Button } from '../components/ui/button'
import {
  useGetApiV1PortfolioPerfil,
  usePutApiV1AdminPortfolioPerfilId,
} from '../shared/api/generated/default/default'
import { useEffect } from 'react'

export const Route = createFileRoute('/admin/profile')({
  component: ProfilePage,
})

const profileSchema = z.object({
  nome: z.string().min(2),
  titulo: z.string().min(2),
  bio: z.string().min(10),
  urlFoto: z.string().url().optional().or(z.literal('')),
  linkLinkedin: z.string().url().optional().or(z.literal('')),
  linkGithub: z.string().url().optional().or(z.literal('')),
})

type ProfileFormValues = z.infer<typeof profileSchema>

function ProfilePage() {
  const { data: response } = useGetApiV1PortfolioPerfil()
  const perfil = response?.data
  const { mutateAsync, isPending } = usePutApiV1AdminPortfolioPerfilId()

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      nome: '',
      titulo: '',
      bio: '',
      urlFoto: '',
      linkLinkedin: '',
      linkGithub: '',
    },
  })

  useEffect(() => {
    if (perfil) {
      form.reset({
        nome: perfil.nome ?? '',
        titulo: perfil.titulo ?? '',
        bio: perfil.bio ?? '',
        urlFoto: perfil.urlFoto ?? '',
        linkLinkedin: perfil.linkLinkedin ?? '',
        linkGithub: perfil.linkGithub ?? '',
      })
    }
  }, [perfil, form])

  const handleSubmit = async (values: ProfileFormValues) => {
    if (!perfil?.id) {
      toast.error('Perfil não encontrado.')
      return
    }
    try {
      await mutateAsync({ id: perfil.id, data: values })
      toast.success('Perfil atualizado!')
    } catch {
      toast.error('Erro ao atualizar perfil.')
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Meu perfil</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-5 max-w-2xl">
          <FormField control={form.control} name="nome" render={({ field }) => (
            <FormItem>
              <FormLabel>Nome completo</FormLabel>
              <FormControl><Input {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="titulo" render={({ field }) => (
            <FormItem>
              <FormLabel>Título profissional</FormLabel>
              <FormControl><Input {...field} placeholder="Engenheiro de Software" /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="bio" render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl><Textarea {...field} rows={4} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="urlFoto" render={({ field }) => (
            <FormItem>
              <FormLabel>URL da foto</FormLabel>
              <FormControl><Input {...field} placeholder="https://..." /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <div className="grid grid-cols-2 gap-4">
            <FormField control={form.control} name="linkLinkedin" render={({ field }) => (
              <FormItem>
                <FormLabel>LinkedIn</FormLabel>
                <FormControl><Input {...field} placeholder="https://linkedin.com/in/..." /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="linkGithub" render={({ field }) => (
              <FormItem>
                <FormLabel>GitHub</FormLabel>
                <FormControl><Input {...field} placeholder="https://github.com/..." /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
          <Button type="submit" disabled={isPending} className="self-start">
            {isPending ? 'Salvando...' : 'Salvar perfil'}
          </Button>
        </form>
      </Form>
    </div>
  )
}
