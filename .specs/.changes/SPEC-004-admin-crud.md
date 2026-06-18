# SPEC-004 — Painel Admin: Formulários CRUD completos

## Contexto
O painel administrativo (`/admin/**`) tem as rotas definidas mas sem implementação.
Esta spec implementa todos os formulários de gestão de projetos e perfil.

## Pré-requisito
SPEC-003 executada. Backend rodando com SPEC-002 aplicada.

---

## Arquivos a criar / modificar

```
src/
├── features/
│   ├── admin/
│   │   ├── components/
│   │   │   ├── AdminLayout.tsx              ← CRIAR
│   │   │   ├── ProjectForm.tsx              ← CRIAR
│   │   │   ├── ProjectsTable.tsx            ← CRIAR
│   │   │   ├── ProfileForm.tsx              ← CRIAR
│   │   │   └── TechSelector.tsx             ← CRIAR
│   │   └── hooks/
│   │       ├── useProjectMutations.ts       ← CRIAR
│   │       └── useProfileMutation.ts        ← CRIAR
│   └── auth/
│       ├── authStore.ts                     ← CRIAR
│       └── useAuth.ts                       ← CRIAR
├── lib/
│   └── axios-config.ts                      ← CRIAR
└── routes/
    ├── admin.index.tsx                      ← MODIFICAR
    ├── admin.profile.tsx                    ← MODIFICAR
    ├── admin.projects.new.tsx               ← MODIFICAR
    └── admin.projects.$id.edit.tsx          ← MODIFICAR
```

---

## Implementação

### `src/features/auth/authStore.ts`
Armazenamento em memória das credenciais de sessão.

```ts
type AuthState = {
  username: string
  password: string
  isAuthenticated: boolean
}

let state: AuthState = {
  username: '',
  password: '',
  isAuthenticated: false,
}

export const authStore = {
  get: () => state,
  set: (username: string, password: string) => {
    state = { username, password, isAuthenticated: true }
  },
  clear: () => {
    state = { username: '', password: '', isAuthenticated: false }
  },
  getBasicAuth: () =>
    state.isAuthenticated
      ? `Basic ${btoa(`${state.username}:${state.password}`)}`
      : null,
}
```

---

### `src/lib/axios-config.ts`
Interceptors globais para auth e Idempotency-Key.

```ts
import axios from 'axios'
import { authStore } from '../features/auth/authStore'
import { v4 as uuidv4 } from 'uuid'

// Verificar se uuid já está instalado; caso contrário usar crypto.randomUUID()
const generateKey = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : uuidv4()

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8080',
})

apiClient.interceptors.request.use((config) => {
  const auth = authStore.getBasicAuth()
  if (auth) {
    config.headers.Authorization = auth
  }
  // Adiciona Idempotency-Key apenas em operações POST
  if (config.method?.toUpperCase() === 'POST') {
    config.headers['Idempotency-Key'] = generateKey()
  }
  return config
})

apiClient.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      authStore.clear()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
```

> Após criar este arquivo, configurar o Orval (`orval.config.ts`) para usar
> `apiClient` como instância Axios ao invés do default. Verificar a documentação
> do Orval sobre `mutator` para isso.

---

### `src/features/admin/components/AdminLayout.tsx`
Layout wrapper com sidebar de navegação para o admin.

```tsx
import { Link, Outlet } from '@tanstack/react-router'
import { LayoutDashboard, FolderOpen, User, Settings, LogOut } from 'lucide-react'
import { authStore } from '../../auth/authStore'
import { Button } from '../../../components/ui/button'

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/projects/new', label: 'Novo Projeto', icon: FolderOpen },
  { to: '/admin/profile', label: 'Perfil', icon: User },
  { to: '/admin/settings', label: 'Configurações', icon: Settings },
]

export function AdminLayout() {
  const handleLogout = () => {
    authStore.clear()
    window.location.href = '/login'
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-56 border-r flex flex-col p-4 gap-1">
        <p className="text-xs text-muted-foreground font-medium px-2 mb-2 mt-1">
          PORTFÓLIO ADMIN
        </p>
        {navItems.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            activeProps={{ className: 'text-foreground bg-secondary font-medium' }}
          >
            <Icon className="w-4 h-4" />
            {label}
          </Link>
        ))}
        <div className="mt-auto">
          <Button variant="ghost" size="sm" className="w-full justify-start gap-2" onClick={handleLogout}>
            <LogOut className="w-4 h-4" />
            Sair
          </Button>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
```

---

### `src/features/admin/components/TechSelector.tsx`
Multi-select de tecnologias para o formulário de projeto.

```tsx
import { useState } from 'react'
import { useGetApiV1AdminPortfolioTecnologias } from '../../../shared/api/generated/portfolio-admin-controller'
import { Badge } from '../../../components/ui/badge'
import { Input } from '../../../components/ui/input'
import { X } from 'lucide-react'
import type { TecnologiaResponse } from '../../../shared/api/model'

interface TechSelectorProps {
  selected: string[]       // array de IDs selecionados
  onChange: (ids: string[]) => void
}

export function TechSelector({ selected, onChange }: TechSelectorProps) {
  const [search, setSearch] = useState('')
  const { data: tecnologias = [] } = useGetApiV1AdminPortfolioTecnologias()

  const filtered = tecnologias.filter((t) =>
    t.nome.toLowerCase().includes(search.toLowerCase())
  )

  const toggle = (id: string) => {
    onChange(
      selected.includes(id)
        ? selected.filter((s) => s !== id)
        : [...selected, id]
    )
  }

  const selectedTechs = tecnologias.filter((t) => selected.includes(t.id ?? ''))

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-1.5 min-h-8">
        {selectedTechs.map((t) => (
          <Badge key={t.id} variant="secondary" className="gap-1">
            {t.nome}
            <button type="button" onClick={() => toggle(t.id ?? '')} className="hover:text-destructive">
              <X className="w-3 h-3" />
            </button>
          </Badge>
        ))}
      </div>
      <Input
        placeholder="Buscar tecnologia..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
        {filtered.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => toggle(t.id ?? '')}
            className={`px-2 py-1 rounded text-xs border transition-colors ${
              selected.includes(t.id ?? '')
                ? 'bg-primary text-primary-foreground border-primary'
                : 'border-border hover:border-primary'
            }`}
          >
            {t.nome}
          </button>
        ))}
      </div>
    </div>
  )
}
```

---

### `src/features/admin/components/ProjectForm.tsx`
Formulário compartilhado de criação e edição de projeto.

```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../components/ui/form'
import { Input } from '../../../components/ui/input'
import { Textarea } from '../../../components/ui/textarea'
import { Button } from '../../../components/ui/button'
import { TechSelector } from './TechSelector'
import type { ProjetoResponse } from '../../../shared/api/model'

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
```

---

### `src/routes/admin.projects.new.tsx`

```tsx
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { ProjectForm, type ProjectFormValues } from '../features/admin/components/ProjectForm'
import { usePostApiV1AdminPortfolioProjetos } from '../shared/api/generated/portfolio-admin-controller'

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
```

---

### `src/routes/admin.index.tsx`
Dashboard com tabela de projetos.

```tsx
import { createFileRoute, Link } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { Button } from '../components/ui/button'
import { useGetApiV1PortfolioProjetos } from '../shared/api/generated/portfolio-publico-controller'
import { useDeleteApiV1AdminPortfolioProjetosId } from '../shared/api/generated/portfolio-admin-controller'
import { toast } from 'sonner'

export const Route = createFileRoute('/admin/')({
  component: AdminDashboard,
})

function AdminDashboard() {
  const { data: projetos = [], isLoading, refetch } = useGetApiV1PortfolioProjetos()
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
                        onClick={() => handleDelete(p.id ?? '', p.titulo)}
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
```

---

### `src/routes/admin.profile.tsx`

```tsx
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
} from '../shared/api/generated/portfolio-admin-controller'

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
  const { data: perfil } = useGetApiV1PortfolioPerfil()
  const { mutateAsync, isPending } = usePutApiV1AdminPortfolioPerfilId()

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    values: {
      nome: perfil?.nome ?? '',
      titulo: perfil?.titulo ?? '',
      bio: perfil?.bio ?? '',
      urlFoto: perfil?.urlFoto ?? '',
      linkLinkedin: perfil?.linkLinkedin ?? '',
      linkGithub: perfil?.linkGithub ?? '',
    },
  })

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
```

---

## Comportamento esperado após execução

- `/login` → formulário de credenciais → redireciona para `/admin`
- `/admin` → tabela com todos os projetos, botões editar e excluir
- `/admin/projects/new` → formulário com auto-geração de slug, multi-select de tecnologias
- `/admin/profile` → formulário pré-populado com dados do perfil atual
- Sucesso em qualquer operação → toast verde
- Erro (400, 409, 500) → toast vermelho com mensagem
- 401 em qualquer requisição → redirect para `/login`

## O que NÃO fazer

- Não usar `localStorage` para credenciais — usar apenas memória (authStore)
- Não criar middleware de autenticação no servidor — auth é client-side via Axios
- Não instalar novas dependências de formulário — react-hook-form + zod já estão no projeto
- Não usar `any` em TypeScript
- Não editar arquivos gerados pelo Orval
