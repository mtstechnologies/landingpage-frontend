# SPEC-011 — ADR: Architecture Decision Records

## Contexto
As decisões arquiteturais do projeto são sofisticadas (API-First, idempotência Redis,
optimistic locking, Feature-Sliced Design) mas estão documentadas apenas nos READMEs
de forma descritiva. ADRs (Architecture Decision Records) são o formato padrão da
indústria para registrar *por que* uma decisão foi tomada — contexto, alternativas
consideradas e consequências. Um portfólio com ADRs sinaliza maturidade de Staff Engineer.

## Pré-requisito
Nenhum — pode ser executada em paralelo com qualquer outra spec.

---

## Estrutura a criar

### Backend — `docs/adr/`
```
docs/
└── adr/
    ├── README.md
    ├── ADR-001-api-first-openapi.md
    ├── ADR-002-idempotencia-redis.md
    ├── ADR-003-optimistic-locking.md
    └── ADR-004-monolito-modular.md
```

### Frontend — `docs/adr/`
```
docs/
└── adr/
    ├── README.md
    ├── ADR-001-api-first-orval-react-query.md
    ├── ADR-002-feature-sliced-design.md
    └── ADR-003-auth-http-basic-client-side.md
```

---

## Arquivos a criar — Backend

### `docs/adr/README.md` (backend)

```markdown
# Architecture Decision Records — Portfolio Backend

Este diretório contém os ADRs (Architecture Decision Records) do projeto.
Cada ADR documenta uma decisão arquitetural significativa: o contexto que levou
à decisão, as alternativas consideradas e as consequências esperadas.

## Índice

| ADR | Título | Status |
|-----|--------|--------|
| [ADR-001](./ADR-001-api-first-openapi.md) | API-First com OpenAPI e SpringDoc | ✅ Aceito |
| [ADR-002](./ADR-002-idempotencia-redis.md) | Idempotência por Redis no POST | ✅ Aceito |
| [ADR-003](./ADR-003-optimistic-locking.md) | Controle de concorrência com Optimistic Locking | ✅ Aceito |
| [ADR-004](./ADR-004-monolito-modular.md) | Monolito Modular com Clean Architecture | ✅ Aceito |

## Formato
Baseado no template de Michael Nygard (2011).
```

---

### `docs/adr/ADR-001-api-first-openapi.md` (backend)

```markdown
# ADR-001 — API-First com OpenAPI e SpringDoc

**Status:** Aceito
**Data:** 2026-06
**Autor:** Michael Trindade da Silva

## Contexto

O projeto possui dois consumidores distintos da API: a landing page pública
(leitura de dados) e o painel administrativo (escrita). O frontend é desenvolvido
separadamente e precisa de um contrato estável para gerar código automaticamente.
Sem um contrato formal, mudanças no backend quebram silenciosamente o frontend.

## Decisão

Adotar a abordagem **API-First**: o contrato OpenAPI é a fonte de verdade.

- O SpringDoc gera o `openapi.yaml` automaticamente a partir das anotações do Spring
- O arquivo é exportado automaticamente pelo CI e commitado em `.specs/openapi.yaml`
- O frontend consome o YAML via **Orval** para gerar hooks React Query e tipos TypeScript
- Qualquer divergência entre backend e frontend quebra o build antes de chegar em produção

## Alternativas consideradas

| Alternativa | Motivo da rejeição |
|-------------|-------------------|
| Contract-first (escrever YAML à mão) | Overhead de manutenção; YAML e código ficam dessincronizados |
| GraphQL | Overkill para um portfólio com modelo de dados simples |
| tRPC | Requer Node.js no backend; incompatível com Spring Boot |
| Sem contrato formal | Acoplamento frágil; erros só aparecem em runtime |

## Consequências

**Positivas:**
- Frontend sempre tipado com os tipos exatos do backend
- Mudanças no contrato são detectadas no CI antes do merge
- Documentação Swagger UI gratuita em `/swagger-ui.html`
- Onboarding de novos desenvolvedores mais rápido

**Negativas:**
- Adiciona um step de geração de SDK ao fluxo de desenvolvimento
- `api:gen` precisa ser rodado após cada mudança no backend
```

---

### `docs/adr/ADR-002-idempotencia-redis.md` (backend)

```markdown
# ADR-002 — Idempotência por Redis no POST

**Status:** Aceito
**Data:** 2026-06
**Autor:** Michael Trindade da Silva

## Contexto

Operações HTTP `POST` não são nativamente idempotentes. Em ambientes com retry
automático (timeouts de rede, bugs no frontend), a mesma requisição de criação
pode ser enviada múltiplas vezes, resultando em dados duplicados. Para um CMS
de portfólio onde o admin cria projetos e tecnologias, duplicatas são um problema
real de integridade de dados.

## Decisão

Implementar idempotência via **Redis** com o padrão de `Idempotency-Key`:

- O cliente envia um UUID único no header `Idempotency-Key` em todo `POST`
- O `IdempotencyInterceptor` verifica o Redis antes de processar
- Se a chave já existe: retorna `409 Conflict`
- Se não existe: processa e armazena a chave com TTL de 10 minutos
- Requisições sem o header recebem `400 Bad Request`

## Alternativas consideradas

| Alternativa | Motivo da rejeição |
|-------------|-------------------|
| Constraint UNIQUE no banco | Cobre apenas duplicatas de dados, não de requisições |
| Idempotência no banco de dados | Requer lógica complexa de upsert em cada entidade |
| Sem idempotência | Risco de dados duplicados em retry |
| Idempotência em memória (sem Redis) | Não sobrevive a reinicializações da aplicação |

## Consequências

**Positivas:**
- Exatamente-uma-vez semântica para criações (`exactly-once semantics`)
- Proteção contra bugs de duplo-clique no frontend
- Redis já está no stack para cache — sem dependência nova

**Negativas:**
- Todos os clientes precisam gerar e enviar `Idempotency-Key`
- Adiciona latência de rede para consulta ao Redis por requisição
- TTL de 10 minutos significa que após esse período a mesma chave pode ser reprocessada
```

---

### `docs/adr/ADR-003-optimistic-locking.md` (backend)

```markdown
# ADR-003 — Controle de concorrência com Optimistic Locking

**Status:** Aceito
**Data:** 2026-06
**Autor:** Michael Trindade da Silva

## Contexto

O painel administrativo pode ser usado em múltiplas sessões simultaneamente
(ex: admin logado no celular e no desktop). Sem controle de concorrência,
a segunda gravação silenciosamente sobrescreve a primeira, causando perda de dados.

## Decisão

Usar **Optimistic Locking** via campo `@Version` do JPA/Hibernate em todas as entidades:
`Perfil`, `Projeto` e `Tecnologia`.

- Cada entidade tem um campo `versao: Integer` anotado com `@Version`
- O Hibernate verifica que a versão no banco corresponde à versão enviada antes do UPDATE
- Se houver conflito: `ObjectOptimisticLockingFailureException` → `GlobalExceptionHandler` → `409 Conflict`

## Alternativas consideradas

| Alternativa | Motivo da rejeição |
|-------------|-------------------|
| Pessimistic Locking (`SELECT FOR UPDATE`) | Degrada performance; bloqueia leituras |
| Last-write-wins (sem controle) | Perda silenciosa de dados |
| Timestamp-based optimistic locking | Menos confiável que versão inteira em ambientes distribuídos |

## Consequências

**Positivas:**
- Zero locks no banco de dados em leituras (performance máxima)
- Detecção determinística de conflitos
- Implementação trivial — uma anotação por entidade

**Negativas:**
- O frontend precisa enviar o campo `versao` ao fazer PUT
- Em conflito, o usuário precisa recarregar os dados e tentar novamente
```

---

### `docs/adr/ADR-004-monolito-modular.md` (backend)

```markdown
# ADR-004 — Monolito Modular com Clean Architecture

**Status:** Aceito
**Data:** 2026-06
**Autor:** Michael Trindade da Silva

## Contexto

Para um portfólio pessoal, a escolha da arquitetura precisa balancear
complexidade operacional (microsserviços são caros de operar sozinho)
com qualidade de código (código monolítico puro é difícil de evoluir).

## Decisão

Adotar **Monolito Modular** com separação estrita de camadas inspirada em
Clean Architecture e DDD estratégico:

```
config/           → Cross-cutting concerns (segurança, idempotência, MDC)
modulo_portfolio/ → Bounded Context isolado
  domain/         → Entidades JPA + exceções de domínio
  application/    → Service com regras de negócio
  infrastructure/ → Repositories (Spring Data JPA)
  web/            → Controllers + DTOs
```

Referências lógicas entre bounded contexts (ex: `usuario_id` em `Perfil`)
são UUIDs simples — sem FK física — preservando o isolamento.

## Alternativas consideradas

| Alternativa | Motivo da rejeição |
|-------------|-------------------|
| Microsserviços | Overhead operacional inviável para um dev solo |
| Monolito em camadas simples | Difícil de escalar para novos módulos sem acoplamento |
| Serverless (AWS Lambda) | Cold start e vendor lock-in desnecessários |

## Consequências

**Positivas:**
- Deploy simples: um único JAR + Docker Compose
- Facilmente evoluível para microsserviços — módulos já são isolados
- Testabilidade alta — cada camada é independente

**Negativas:**
- Um único processo; falha total afeta tudo
- Escala vertical apenas (por ora suficiente para portfólio)
```

---

## Arquivos a criar — Frontend

### `docs/adr/README.md` (frontend)

```markdown
# Architecture Decision Records — Portfolio Frontend

| ADR | Título | Status |
|-----|--------|--------|
| [ADR-001](./ADR-001-api-first-orval-react-query.md) | SDK gerado por OpenAPI via Orval + React Query | ✅ Aceito |
| [ADR-002](./ADR-002-feature-sliced-design.md) | Feature-Sliced Design como organização de pastas | ✅ Aceito |
| [ADR-003](./ADR-003-auth-http-basic-client-side.md) | Autenticação HTTP Basic gerenciada no cliente | ✅ Aceito |
```

---

### `docs/adr/ADR-001-api-first-orval-react-query.md` (frontend)

```markdown
# ADR-001 — SDK gerado por OpenAPI via Orval + React Query

**Status:** Aceito
**Data:** 2026-06
**Autor:** Michael Trindade da Silva

## Contexto

O frontend precisa se comunicar com o backend de forma typesafe,
sem que mudanças na API quebrem silenciosamente os componentes.
Escrever manualmente os hooks de fetch para cada endpoint é propenso
a erros e gera drift entre tipos do frontend e contratos do backend.

## Decisão

Usar **Orval** para gerar automaticamente a partir do `openapi.yaml`:
- Hooks React Query (`useGetApiV1PortfolioProjetos`, etc.)
- Tipos TypeScript exatos dos DTOs do backend
- Cliente Axios configurável via `customInstance`

Os arquivos gerados em `src/shared/api/generated/` nunca são editados manualmente.

## Alternativas consideradas

| Alternativa | Motivo da rejeição |
|-------------|-------------------|
| openapi-generator | Output verboso; integração com React Query manual |
| Fetch manual + tipos manuais | Drift garantido entre frontend e backend |
| SWR ao invés de React Query | React Query tem melhor suporte a mutations e invalidação |
| GraphQL Code Generator | Requereria GraphQL no backend |

## Consequências

**Positivas:**
- Tipos sempre sincronizados com o backend
- Zero código de fetch manual nas features
- CI detecta SDK desatualizado antes do merge

**Negativas:**
- `api:gen` precisa ser rodado após mudanças no backend
- Os nomes dos hooks seguem o padrão do Orval (verboso mas previsível)
```

---

### `docs/adr/ADR-002-feature-sliced-design.md` (frontend)

```markdown
# ADR-002 — Feature-Sliced Design como organização de pastas

**Status:** Aceito
**Data:** 2026-06
**Autor:** Michael Trindade da Silva

## Contexto

A organização padrão por tipo (`components/`, `hooks/`, `utils/`) escala mal:
adicionar uma feature nova requer editar múltiplas pastas e o acoplamento entre
features é invisível. Para um portfólio com duas features distintas (landing page
pública e painel admin), uma estrutura baseada em domínio é mais sustentável.

## Decisão

Adotar **Feature-Sliced Design (FSD)** adaptado:

```
src/
  features/
    portfolio/    → Componentes e hooks da landing page pública
    admin/        → Componentes do painel administrativo
    auth/         → Lógica de autenticação
  shared/
    api/          → SDK gerado (não editar)
  components/ui/  → Design system (shadcn/ui)
  routes/         → Roteamento (TanStack Router file-based)
```

## Consequências

**Positivas:**
- Cada feature é um módulo isolado e coeso
- Fácil identificar o impacto de uma mudança
- Onboarding: novo dev sabe onde encontrar qualquer código

**Negativas:**
- Mais pastas que a estrutura flat
- Alguns componentes compartilhados precisam de decisão: feature ou shared?
```

---

### `docs/adr/ADR-003-auth-http-basic-client-side.md` (frontend)

```markdown
# ADR-003 — Autenticação HTTP Basic gerenciada no cliente

**Status:** Aceito
**Data:** 2026-06
**Autor:** Michael Trindade da Silva

## Contexto

O backend usa HTTP Basic Auth. O frontend precisa armazenar as credenciais
durante a sessão e enviá-las em cada requisição ao admin. As opções são:
armazenar em localStorage, sessionStorage, cookie ou memória.

## Decisão

Armazenar credenciais **em memória** (módulo `authStore.ts`) via variável
de módulo JavaScript. O interceptor do Axios injeta o header `Authorization`
automaticamente em cada requisição ao admin.

- Credenciais nunca tocam o DOM nem o storage do browser
- A sessão expira ao recarregar a página (comportamento intencional)
- Interceptor de resposta redireciona para `/login` em qualquer `401`

## Alternativas consideradas

| Alternativa | Motivo da rejeição |
|-------------|-------------------|
| localStorage | XSS pode roubar credenciais; persistência desnecessária |
| sessionStorage | Mesma superfície de XSS; vaza entre abas |
| Cookie httpOnly | Requer mudança no backend (Set-Cookie); complexidade de CSRF |
| JWT | Overkill; requereria mudança completa no mecanismo de auth do backend |

## Consequências

**Positivas:**
- Zero superfície de ataque via XSS para as credenciais
- Implementação simples — um módulo de 20 linhas

**Negativas:**
- Sessão perdida ao recarregar a página (usuário precisa fazer login novamente)
- Não funciona com múltiplas abas do admin simultaneamente
```

---

## Comportamento esperado após execução

```bash
# Backend — verificar estrutura criada
ls docs/adr/
# ADR-001-api-first-openapi.md
# ADR-002-idempotencia-redis.md
# ADR-003-optimistic-locking.md
# ADR-004-monolito-modular.md
# README.md

# Frontend — verificar estrutura criada
ls docs/adr/
# ADR-001-api-first-orval-react-query.md
# ADR-002-feature-sliced-design.md
# ADR-003-auth-http-basic-client-side.md
# README.md
```

## O que NÃO fazer
- Não alterar nenhum arquivo de código — esta spec é puramente documental
- Não criar ADRs para decisões futuras (ex: "ADR sobre microsserviços que não fizemos")
- Não usar formato diferente do especificado acima
- Não adicionar ADRs com status "Rejeitado" — documentar apenas o que foi implementado
- Não traduzir os nomes dos padrões (Optimistic Locking, Feature-Sliced Design)
