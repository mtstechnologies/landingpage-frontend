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
