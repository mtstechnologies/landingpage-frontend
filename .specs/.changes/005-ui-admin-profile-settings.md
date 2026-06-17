# Spec 005_FE: Páginas de Perfil e Configurações do CMS

## 1. Objetivo e Escopo
- **Propósito:** Preencher as rotas ausentes do Painel Administrativo. Criar a interface da página de Perfil (para editar os dados pessoais do autor) e a página de Configurações (preferências gerais do portfólio).
- **Abordagem de Dados:** Interface estritamente visual, com formulários contendo dados mockados.

## 2. Desenho Arquitetural (Feature-Sliced Design)
- **Domínio:** `admin`

### Estrutura de Pastas Esperada
- `src/pages/admin/`:
  - `ProfilePage.tsx`: Layout da página de gerenciamento de perfil.
  - `SettingsPage.tsx`: Layout da página de configurações do sistema.
- `src/features/admin/components/`:
  - `ProfileForm.tsx`: Formulário contendo os campos: Avatar (placeholder de upload), Nome, Bio (Textarea), GitHub URL e LinkedIn URL.
  - `SettingsForm.tsx`: Formulário genérico com opções simuladas (ex: Título do Site, Descrição SEO e um *switch* para alternar visibilidade pública do portfólio).

## 3. Padrões de Estilização e UI
- **Design System:** Manter o padrão do Shadcn UI. Usar o componente `Card` para encapsular os formulários, dando um visual de painel de controle corporativo.
- **Integração de Rotas:** Garantir que a `AdminSidebar` atualize corretamente as rotas ativas quando o usuário clicar em "Perfil" ou "Configurações".

## 4. Test Harness (Critérios de Aceitação do Front-end)
- [ ] O menu lateral do Admin agora navega sem erros para `/admin/profile` e `/admin/settings`.
- [ ] O `ProfileForm` possui campos alinhados à entidade Perfil do nosso back-end.
- [ ] Os formulários respeitam o layout responsivo do Dashboard (não quebram no mobile).