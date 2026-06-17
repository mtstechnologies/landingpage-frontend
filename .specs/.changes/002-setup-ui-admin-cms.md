# Spec 002_FE: Interface do Painel Administrativo (CMS)

## 1. Objetivo e Escopo
- **Propósito:** Criar a interface privada (Dashboard) para gestão do portfólio. Esta área permitirá ao administrador visualizar a lista de projetos em formato de tabela e acessar o formulário de cadastro/edição.
- **Abordagem de Dados:** Interface puramente visual com dados mockados. Sem integração real de API ou autenticação neste momento.

## 2. Desenho Arquitetural (Feature-Sliced Design)
- **Domínio Principal:** `admin`

### Estrutura de Pastas Esperada
- `src/pages/admin/`: 
  - `DashboardPage.tsx`: Layout principal contendo uma Sidebar de navegação lateral e a área de conteúdo central.
  - `ProjectFormPage.tsx`: Página dedicada ao formulário de criação/edição de um projeto.
- `src/features/admin/`:
  - `components/AdminSidebar.tsx`: Menu lateral com links para "Projetos", "Perfil" e "Configurações".
  - `components/ProjectsDataTable.tsx`: Tabela de dados exibindo os projetos cadastrados (Colunas: Título, Data, Status, Ações).
  - `components/ProjectForm.tsx`: Formulário visual contendo campos para Título, Descrição (Textarea), URL do Repositório, URL de Produção e um seletor múltiplo (combobox/badges) para Tecnologias.

## 3. Padrões de Estilização e UI
- **Design System:** Utilizar componentes da biblioteca local (Shadcn UI base). A tabela de dados deve ter um visual limpo e corporativo.
- **Layout:** A Sidebar deve ser fixa à esquerda no desktop e transformar-se em um menu "hambúrguer" (Sheet/Drawer) no mobile.
- **Formulários:** Organizar os campos do `ProjectForm` em um grid lógico (ex: campos curtos lado a lado, textarea ocupando a linha inteira).

## 4. Test Harness (Critérios de Aceitação do Front-end)
- [ ] A rota de Dashboard renderiza a Sidebar e a Tabela sem quebrar o layout no mobile.
- [ ] O formulário de projetos exibe todos os campos necessários para preencher a entidade `Projeto` mapeada na Spec 001_BE.
- [ ] Todo o escopo do CMS está isolado na feature `admin`.