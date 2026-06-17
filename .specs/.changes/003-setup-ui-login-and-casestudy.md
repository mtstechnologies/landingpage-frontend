# Spec 003_FE: Tela de Login e Página de Case Study (Detalhes do Projeto)

## 1. Objetivo e Escopo
- **Propósito:** Concluir as cascas visuais essenciais do sistema. Criar a interface de Autenticação (Login) para acesso ao CMS e a página pública de Detalhes do Projeto (Case Study) para exibir o aprofundamento técnico do portfólio.
- **Abordagem de Dados:** Interface estritamente visual, com dados mockados em memória.

## 2. Desenho Arquitetural (Feature-Sliced Design)
- **Domínios:** `auth` (Autenticação) e expansão do `portfolio` (Pública).

### Estrutura de Pastas Esperada
- `src/pages/auth/`:
  - `LoginPage.tsx`: Página centralizada de login com design minimalista.
- `src/pages/portfolio/`:
  - `ProjectDetailsPage.tsx`: Página pública detalhada do projeto (rota dinâmica ex: `/projects/:slug`).
- `src/features/auth/`:
  - `components/LoginForm.tsx`: Formulário de login (Email, Senha, Botão de Submit).
- `src/features/portfolio/`:
  - `components/ProjectHero.tsx`: Cabeçalho do Case Study (Título, Subtítulo, Data, Imagem de Capa e Badges de Tecnologias).
  - `components/ProjectContent.tsx`: Área simulando a renderização de um texto rico (Rich Text/Markdown), onde o usuário explicará a arquitetura e os desafios do projeto.

## 3. Padrões de Estilização e UI
- **Design System:** Manter a consistência com o Shadcn UI e Tailwind CSS, garantindo o modo escuro por padrão.
- **Login:** Layout centralizado na tela (flex center, h-screen) com um card sutil e elegante.
- **Case Study:** Layout focado em leitura (tipografia otimizada, max-width reduzido para o bloco de texto não cansar a vista, similar a um artigo do Medium ou documentação técnica).

## 4. Test Harness (Critérios de Aceitação do Front-end)
- [ ] O formulário de login possui os campos de e-mail e senha bem alinhados.
- [ ] A página de detalhes do projeto apresenta uma hierarquia de informação clara: Capa -> Título -> Badges -> Corpo do Texto.
- [ ] Responsividade testada: margens e tamanhos de fonte se ajustam perfeitamente no mobile.