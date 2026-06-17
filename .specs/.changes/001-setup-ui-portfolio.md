# Spec 001_FE: Fundação Visual da Landing Page e Portfólio

## 1. Objetivo e Escopo
- **Propósito:** Criar a "casca" visual (UI) da Landing Page do portfólio do desenvolvedor. A interface deve conter um bloco de introdução (Hero Section) e uma listagem de projetos renderizados em formato de cards.
- **Abordagem de Dados:** Os dados nesta fase serão estritamente "mockados" em memória. Nenhuma chamada real à API deve ser implementada agora.

## 2. Desenho Arquitetural (Feature-Sliced Design)
- **Domínio Principal:** `portfolio`

### Estrutura de Pastas Esperada
- `src/pages/home/`: Casca principal da página de entrada. Deve importar os componentes estruturais, mas não conter regras de negócio inline.
- `src/features/portfolio/`:
  - `components/HeroSection.tsx`: Componente de apresentação com o nome, título e uma breve bio.
  - `components/ProjectList.tsx`: Grid responsivo contendo os cards dos projetos.
  - `components/ProjectCard.tsx`: Card individual exibindo a imagem de capa, título, descrição curta e os ícones das tecnologias.
  - `types/index.ts`: Tipagem simulada dos dados (Perfil e Projeto) baseada na semântica do contrato do Back-end.

## 3. Padrões de Estilização e UI
- **Tailwind CSS:** Uso estrito de classes utilitárias semânticas. Classes arbitrárias com valores soltos (ex: `w-[350px]`, `text-[#ff0000]`) são proibidas. Use o espaçamento e a paleta nativa configurada.
- **Componentes Atômicos:** Botões, Badges de tecnologias e Cards devem utilizar a fundação do `src/components/ui/` (Design System local, preferencialmente baseado no padrão Shadcn UI).
- **Responsividade:** Mobile-first obrigatório. O grid de projetos deve começar em 1 coluna no mobile e escalar para 2 ou 3 colunas em telas `md` e `lg`.

## 4. Estrutura de Dados Simulada (Mock)
- O componente de listagem deve ser inicializado com um array fixo de 3 a 4 projetos de exemplo com imagens de placeholder (ex: via Unsplash).

## 5. Test Harness (Critérios de Aceitação do Front-end)
- [ ] O projeto renderiza a interface no navegador sem erros de console.
- [ ] O código não possui arquivos css externos ou estilos inline; tudo é resolvido via Tailwind.
- [ ] A separação FSD é respeitada: os componentes de domínio estão enclausurados dentro de `src/features/portfolio/`.