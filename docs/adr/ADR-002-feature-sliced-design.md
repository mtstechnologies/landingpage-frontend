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
