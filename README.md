# Portfolio Front-end (React + FSD)

Este projeto compõe a interface do portfólio de engenharia de software de Michael Trindade. A arquitetura segue o **Feature-Sliced Design (FSD)**, garantindo desacoplamento e escalabilidade.

## 🚀 Arquitetura e Tecnologias
- **Framework:** React com Vite + TanStack Router (SSR-ready).
- **Gerenciamento de Estado:** TanStack Query (React Query).
- **Comunicação:** Axios + Orval (Geração automática de SDK via OpenAPI).
- **Estilização:** Tailwind CSS (Semântico).
- **Gerenciador de Pacotes:** Bun.

## 🛠 Como Iniciar

### Pré-requisitos
- [Bun](https://bun.sh/) instalado.
- Servidor Spring Boot rodando na porta `8080`.

### Instalação
```bash
bun install
```

## Comandos Principais

```bash
bun run dev - Inicia o servidor de desenvolvimento.
```

```bash
bun run api:gen - Re-sincroniza o front-end com o contrato openapi.yaml. Execute sempre que houver mudanças no Back-end.
```

```bash
bun run build - Gera os arquivos de produção otimizados.
```

## Governança (FSD)

```bash
src/shared/api/: Contém o contrato da API e o SDK gerado. Não editar manualmente.

src/features/: Lógica de negócio isolada por domínio (ex: admin, portfolio).

.specs/: Contrato OpenAPI e especificações de design que guiam o desenvolvimento.
```