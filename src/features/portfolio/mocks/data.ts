import type { Profile, Project } from "../types";

export const mockProfile: Profile = {
  name: "Alex Carvalho",
  title: "Engenheiro de Software Full-Stack",
  bio: "Construindo produtos digitais escaláveis com foco em arquitetura limpa, performance e experiência do usuário. Apaixonado por TypeScript, sistemas distribuídos e design de interfaces.",
};

export const mockProjects: Project[] = [
  {
    id: "1",
    slug: "orbit-analytics",
    title: "Orbit Analytics",
    subtitle: "Observabilidade em tempo real para times de produto",
    description:
      "Plataforma de observabilidade em tempo real para times de produto, com dashboards customizáveis e alertas inteligentes.",
    coverImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    publishedAt: "2025-08-12",
    content: [
      {
        heading: "Contexto",
        paragraphs: [
          "O Orbit nasceu da necessidade de unificar métricas de produto, eventos de negócio e telemetria de infraestrutura em uma única superfície de observabilidade — sem o custo cognitivo de orquestrar três ferramentas distintas.",
          "O desafio principal era servir consultas analíticas com latência inferior a 200ms mesmo sobre janelas de 30 dias, mantendo um modelo de dados flexível para times de produto criarem seus próprios painéis.",
        ],
      },
      {
        heading: "Arquitetura",
        paragraphs: [
          "Optamos por uma arquitetura event-driven com ingestão via Kafka, materialização em ClickHouse para consultas OLAP e um BFF em Node.js responsável por traduzir filtros de dashboard em queries otimizadas.",
          "O frontend em React/TypeScript consome dados via TanStack Query com cache agressivo por dashboard, e as visualizações usam um pipeline de transformação puro, isolando a camada de gráfico (Recharts) de qualquer regra de negócio.",
        ],
      },
      {
        heading: "Aprendizados",
        paragraphs: [
          "Investir cedo em um design system interno reduziu drasticamente o tempo de entrega de novas visualizações e padronizou a leitura dos painéis pelos times de produto.",
        ],
      },
    ],
  },
  {
    id: "2",
    slug: "nimbus-commerce",
    title: "Nimbus Commerce",
    subtitle: "E-commerce headless focado em performance",
    description:
      "Headless e-commerce focado em performance, com checkout otimizado e integrações nativas com gateways de pagamento.",
    coverImage:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&q=80",
    technologies: ["Next.js", "Stripe", "Tailwind", "GraphQL"],
    publishedAt: "2025-05-03",
    content: [
      {
        heading: "Contexto",
        paragraphs: [
          "O Nimbus é uma camada de storefront headless construída para operações que precisam escalar campanhas sazonais sem sacrificar Core Web Vitals.",
        ],
      },
      {
        heading: "Arquitetura",
        paragraphs: [
          "Adotamos Next.js com renderização híbrida (ISR para catálogo, SSR para carrinho) e uma camada GraphQL que isola o storefront das particularidades de cada PIM/ERP integrado.",
          "O checkout foi modelado como uma máquina de estados explícita, permitindo recuperar carrinhos abandonados e auditar cada transição com integridade.",
        ],
      },
    ],
  },
  {
    id: "3",
    slug: "helix-designkit",
    title: "Helix DesignKit",
    subtitle: "Design system open-source acessível por padrão",
    description:
      "Design system open-source com mais de 80 componentes acessíveis, tokens semânticos e documentação interativa.",
    coverImage:
      "https://images.unsplash.com/photo-1545665277-5937489579f2?auto=format&fit=crop&w=1600&q=80",
    technologies: ["React", "Storybook", "Radix UI", "Vite"],
    publishedAt: "2025-02-18",
    content: [
      {
        heading: "Contexto",
        paragraphs: [
          "O Helix consolida primitivas acessíveis sobre Radix UI e expõe tokens semânticos versionados, permitindo que produtos diferentes mantenham coerência visual sem acoplar implementação.",
        ],
      },
      {
        heading: "Arquitetura",
        paragraphs: [
          "A biblioteca é distribuída como pacotes independentes (tokens, primitives, patterns) para reduzir o bundle final e permitir adoção incremental por times legados.",
        ],
      },
    ],
  },
  {
    id: "4",
    slug: "aurora-cli",
    title: "Aurora CLI",
    subtitle: "Scaffolding opinativo para projetos full-stack",
    description:
      "Ferramenta de linha de comando para scaffolding de projetos full-stack com convenções opinativas e DX excepcional.",
    coverImage:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
    technologies: ["Rust", "TypeScript", "Bun"],
    publishedAt: "2024-11-22",
    content: [
      {
        heading: "Contexto",
        paragraphs: [
          "A Aurora reduz o tempo de bootstrap de novos serviços de horas para minutos, codificando convenções de observabilidade, autenticação e CI/CD em templates versionados.",
        ],
      },
      {
        heading: "Arquitetura",
        paragraphs: [
          "O núcleo é escrito em Rust por questões de performance e portabilidade, enquanto os templates de aplicação seguem o stack TypeScript/Bun do ecossistema do time.",
        ],
      },
    ],
  },
];
