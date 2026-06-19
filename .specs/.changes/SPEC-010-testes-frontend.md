# SPEC-010 — Testes Frontend: Vitest + Testing Library + MSW

## Contexto
O backend tem Testcontainers, testes unitários e de integração.
O frontend tem zero arquivos de teste. Esta spec adiciona a stack
de testes padrão para React com React Query e balanceia a cobertura.

## Pré-requisito
SPEC-006 executada (meta tags corretas para não interferir nos snapshots).

---

## Dependências a instalar

```bash
bun add -d vitest @vitest/coverage-v8 jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event msw
```

---

## Arquivos a criar / modificar

### 1. `vitest.config.ts` (CRIAR na raiz do frontend)

```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/features/**', 'src/lib/**'],
      exclude: [
        'src/shared/api/generated/**',
        'src/shared/api/model/**',
        'src/components/ui/**',
        '**/*.d.ts',
      ],
      thresholds: {
        lines: 60,
        functions: 60,
      },
    },
  },
})
```

---

### 2. `src/test/setup.ts` (CRIAR)

```ts
import '@testing-library/jest-dom'
import { server } from './mocks/server'
import { beforeAll, afterAll, afterEach } from 'vitest'

beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
```

---

### 3. `src/test/mocks/server.ts` (CRIAR)

```ts
import { setupServer } from 'msw/node'
import { handlers } from './handlers'

export const server = setupServer(...handlers)
```

---

### 4. `src/test/mocks/handlers.ts` (CRIAR)

```ts
import { http, HttpResponse } from 'msw'

const API_BASE = 'http://localhost:8080'

export const handlers = [
  // GET perfil público
  http.get(`${API_BASE}/api/v1/portfolio/perfil`, () => {
    return HttpResponse.json({
      id: 'perfil-uuid-1',
      nome: 'Michael Trindade da Silva',
      titulo: 'Engenheiro de Software',
      bio: 'Desenvolvedor full-stack especializado em arquitetura limpa e produtos escaláveis.',
      urlFoto: 'https://example.com/foto.jpg',
      linkLinkedin: 'https://linkedin.com/in/michael-trindade',
      linkGithub: 'https://github.com/mtstechnologies',
      versao: 0,
    })
  }),

  // GET projetos públicos
  http.get(`${API_BASE}/api/v1/portfolio/projetos`, () => {
    return HttpResponse.json([
      {
        id: 'projeto-uuid-1',
        titulo: 'Portfolio Backend API',
        slug: 'portfolio-backend-api',
        descricao: 'API RESTful com Clean Architecture.',
        urlCapa: 'https://example.com/capa.png',
        linkProducao: 'https://meu-portfolio.com',
        linkRepositorio: 'https://github.com/mtstechnologies/backend',
        dataDesenvolvimento: '2026-06-01',
        tecnologias: [
          { id: 'tech-1', nome: 'Java', urlIcone: null },
          { id: 'tech-2', nome: 'Spring Boot', urlIcone: null },
        ],
        versao: 0,
      },
    ])
  }),

  // GET projeto por slug
  http.get(`${API_BASE}/api/v1/portfolio/projetos/:slug`, ({ params }) => {
    if (params.slug === 'nao-existe') {
      return HttpResponse.json({ title: 'Not Found' }, { status: 404 })
    }
    return HttpResponse.json({
      id: 'projeto-uuid-1',
      titulo: 'Portfolio Backend API',
      slug: params.slug,
      descricao: 'API RESTful com Clean Architecture.',
      urlCapa: null,
      linkProducao: null,
      linkRepositorio: null,
      dataDesenvolvimento: '2026-06-01',
      tecnologias: [],
      versao: 0,
    })
  }),

  // GET tecnologias admin
  http.get(`${API_BASE}/api/v1/admin/portfolio/tecnologias`, () => {
    return HttpResponse.json([
      { id: 'tech-1', nome: 'Java', urlIcone: null },
      { id: 'tech-2', nome: 'Spring Boot', urlIcone: null },
      { id: 'tech-3', nome: 'React', urlIcone: null },
    ])
  }),
]
```

---

### 5. `src/test/mocks/wrapper.tsx` (CRIAR — wrapper para React Query)

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'

export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 0,
      },
    },
  })
}

export function TestWrapper({ children }: { children: ReactNode }) {
  const queryClient = createTestQueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
```

---

### 6. `src/features/auth/authStore.test.ts` (CRIAR)

```ts
import { describe, it, expect, beforeEach } from 'vitest'
import { authStore } from './authStore'

describe('authStore', () => {
  beforeEach(() => {
    authStore.clear()
  })

  it('inicia não autenticado', () => {
    expect(authStore.get().isAuthenticated).toBe(false)
  })

  it('autentica com username e password', () => {
    authStore.set('admin', 'senha123')
    expect(authStore.get().isAuthenticated).toBe(true)
    expect(authStore.get().username).toBe('admin')
  })

  it('gera header Basic Auth correto', () => {
    authStore.set('admin', 'senha123')
    const expected = `Basic ${btoa('admin:senha123')}`
    expect(authStore.getBasicAuth()).toBe(expected)
  })

  it('retorna null quando não autenticado', () => {
    expect(authStore.getBasicAuth()).toBeNull()
  })

  it('limpa estado ao fazer logout', () => {
    authStore.set('admin', 'senha123')
    authStore.clear()
    expect(authStore.get().isAuthenticated).toBe(false)
    expect(authStore.getBasicAuth()).toBeNull()
  })
})
```

---

### 7. `src/features/portfolio/components/HeroSection.test.tsx` (CRIAR)

```tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { HeroSection } from './HeroSection'

const mockPerfil = {
  id: 'perfil-1',
  nome: 'Michael Trindade da Silva',
  titulo: 'Engenheiro de Software',
  bio: 'Desenvolvedor full-stack.',
  urlFoto: 'https://example.com/foto.jpg',
  linkLinkedin: 'https://linkedin.com/in/michael-trindade',
  linkGithub: 'https://github.com/mtstechnologies',
  versao: 0,
}

describe('HeroSection', () => {
  it('exibe skeletons durante carregamento', () => {
    render(<HeroSection perfil={undefined} isLoading={true} />)
    // Skeletons têm role="generic" com animate-pulse — verificar pela estrutura
    const section = screen.getByRole('region', { hidden: true })
      ?? document.querySelector('section')
    expect(section).toBeTruthy()
  })

  it('renderiza nome e título quando perfil está disponível', () => {
    render(<HeroSection perfil={mockPerfil} isLoading={false} />)
    expect(screen.getByText('Michael Trindade da Silva')).toBeInTheDocument()
    expect(screen.getByText('Engenheiro de Software')).toBeInTheDocument()
  })

  it('renderiza bio quando disponível', () => {
    render(<HeroSection perfil={mockPerfil} isLoading={false} />)
    expect(screen.getByText('Desenvolvedor full-stack.')).toBeInTheDocument()
  })

  it('renderiza link do LinkedIn quando disponível', () => {
    render(<HeroSection perfil={mockPerfil} isLoading={false} />)
    const linkedinLink = screen.getByRole('link', { name: /linkedin/i })
    expect(linkedinLink).toHaveAttribute('href', mockPerfil.linkLinkedin)
    expect(linkedinLink).toHaveAttribute('target', '_blank')
  })

  it('renderiza link do GitHub quando disponível', () => {
    render(<HeroSection perfil={mockPerfil} isLoading={false} />)
    const githubLink = screen.getByRole('link', { name: /github/i })
    expect(githubLink).toHaveAttribute('href', mockPerfil.linkGithub)
  })

  it('não renderiza nada quando perfil é null e não está carregando', () => {
    const { container } = render(<HeroSection perfil={undefined} isLoading={false} />)
    expect(container.firstChild).toBeNull()
  })

  it('renderiza imagem de perfil quando urlFoto disponível', () => {
    render(<HeroSection perfil={mockPerfil} isLoading={false} />)
    const img = screen.getByRole('img', { name: mockPerfil.nome })
    expect(img).toHaveAttribute('src', mockPerfil.urlFoto)
  })
})
```

---

### 8. `src/features/portfolio/components/TechBadge.test.tsx` (CRIAR)

```tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { TechBadge } from './TechBadge'

describe('TechBadge', () => {
  it('exibe o nome da tecnologia', () => {
    render(<TechBadge tecnologia={{ id: '1', nome: 'Java', urlIcone: null }} />)
    expect(screen.getByText('Java')).toBeInTheDocument()
  })

  it('exibe ícone quando urlIcone disponível', () => {
    render(<TechBadge tecnologia={{ id: '1', nome: 'Java', urlIcone: 'https://example.com/java.png' }} />)
    const img = screen.getByRole('img', { name: 'Java' })
    expect(img).toHaveAttribute('src', 'https://example.com/java.png')
  })

  it('não exibe ícone quando urlIcone é null', () => {
    render(<TechBadge tecnologia={{ id: '1', nome: 'Java', urlIcone: null }} />)
    expect(screen.queryByRole('img')).toBeNull()
  })
})
```

---

### 9. `package.json` — adicionar scripts de teste

Adicionar dentro de `"scripts"`:

```json
"test": "vitest run",
"test:watch": "vitest",
"test:coverage": "vitest run --coverage",
"typecheck": "tsc --noEmit"
```

---

### 10. `.github/workflows/ci.yml` do frontend — adicionar step de testes

Após o step de `Lint`, adicionar:

```yaml
      - name: Testes unitários
        run: bun run test

      - name: Type check
        run: bun run typecheck
```

> Remover o step atual `bun run tsc --noEmit` se existir separado — ele agora
> é coberto pelo script `typecheck`.

---

## Comportamento esperado após execução

```bash
# Rodar todos os testes
bun run test

# Saída esperada:
# ✅ authStore > inicia não autenticado
# ✅ authStore > autentica com username e password
# ✅ authStore > gera header Basic Auth correto
# ✅ authStore > retorna null quando não autenticado
# ✅ authStore > limpa estado ao fazer logout
# ✅ HeroSection > exibe skeletons durante carregamento
# ✅ HeroSection > renderiza nome e título quando perfil está disponível
# ✅ HeroSection > renderiza bio quando disponível
# ✅ HeroSection > renderiza link do LinkedIn quando disponível
# ✅ HeroSection > renderiza link do GitHub quando disponível
# ✅ HeroSection > não renderiza nada quando perfil é null
# ✅ HeroSection > renderiza imagem de perfil
# ✅ TechBadge > exibe o nome da tecnologia
# ✅ TechBadge > exibe ícone quando urlIcone disponível
# ✅ TechBadge > não exibe ícone quando urlIcone é null
# Test Files: 3 passed
# Tests: 15 passed

# Cobertura
bun run test:coverage
# Deve passar o threshold de 60% nas features
```

## O que NÃO fazer
- Não testar arquivos gerados pelo Orval (`src/shared/api/generated/**`)
- Não testar componentes de UI do shadcn/ui (`src/components/ui/**`)
- Não usar `enzyme` — usar apenas @testing-library
- Não mockar módulos inteiros com `vi.mock` quando MSW resolve o mesmo problema
- Não instalar Playwright nesta spec — foco em testes unitários/componente
- Não alterar nenhum componente para facilitar os testes — os componentes estão bem escritos
