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
