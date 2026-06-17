# Spec 004_FE: Componentes de Acabamento (Contato, 404 e Skeletons)

## 1. Objetivo e Escopo
- **Propósito:** Desenvolver os elementos de polimento de UI/UX do sistema. Criar a Seção de Contato na Landing Page, a página customizada de erro 404 (Not Found) e os componentes de esqueleto de carregamento (Skeleton Loaders) para transições fluidas de estado.
- **Abordagem de Dados:** Componentes visuais puros. Os formulários e estados devem simular comportamento em memória.

## 2. Desenho Arquitetural (Feature-Sliced Design)

### Estrutura de Pastas Esperada
- `src/pages/error/`:
  - `NotFoundPage.tsx`: Tela de erro 404 limpa, com uma ilustração moderna ou tipografia marcante e um botão funcional "Voltar para o Início".
- `src/features/portfolio/components/`:
  - `ContactSection.tsx`: Seção contendo um formulário de mensagem (Nome, E-mail, Assunto, Mensagem) e cards com links para Redes Sociais (GitHub, LinkedIn).
  - `ProjectCardSkeleton.tsx`: Versão em esqueleto (pulsante) do `ProjectCard` para mascarar o tempo de resposta da API.
- `src/features/admin/components/`:
  - `TableSkeleton.tsx`: Linhas e colunas em esqueleto simulando o carregamento da Data Table do CMS.

## 3. Padrões de Estilização e UI
- **Animações (Skeletons):** Utilizar a classe utilitária `animate-pulse` nativa do Tailwind CSS sobre blocos cinzas desaturados (ex: `bg-muted` ou `bg-zinc-800`), simulando fielmente o formato dos componentes originais de texto, imagens e badges.
- **Formulário de Contato:** Aplicar validações visuais básicas de HTML5 (campos obrigatórios e formato de e-mail) com estados visuais de foco bem definidos.

## 4. Test Harness (Critérios de Aceitação do Front-end)
- [ ] A página 404 é acionada corretamente quando uma rota inexistente é digitada e o botão de retorno funciona.
- [ ] O formulário de contato impede o envio caso campos obrigatórios estejam vazios.
- [ ] Os Skeletons de projeto e da tabela do admin mimetizam perfeitamente a estrutura física dos componentes reais que vão substituir.