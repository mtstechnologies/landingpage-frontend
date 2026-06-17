import type { Profile, Project } from "../types";

export const mockProfile: Profile = {
  name: "Alex Carvalho",
  title: "Engenheiro de Software Full-Stack",
  bio: "Construindo produtos digitais escaláveis com foco em arquitetura limpa, performance e experiência do usuário. Apaixonado por TypeScript, sistemas distribuídos e design de interfaces.",
};

export const mockProjects: Project[] = [
  {
    id: "1",
    title: "Orbit Analytics",
    description:
      "Plataforma de observabilidade em tempo real para times de produto, com dashboards customizáveis e alertas inteligentes.",
    coverImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL"],
  },
  {
    id: "2",
    title: "Nimbus Commerce",
    description:
      "Headless e-commerce focado em performance, com checkout otimizado e integrações nativas com gateways de pagamento.",
    coverImage:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
    technologies: ["Next.js", "Stripe", "Tailwind", "GraphQL"],
  },
  {
    id: "3",
    title: "Helix DesignKit",
    description:
      "Design system open-source com mais de 80 componentes acessíveis, tokens semânticos e documentação interativa.",
    coverImage:
      "https://images.unsplash.com/photo-1545665277-5937489579f2?auto=format&fit=crop&w=1200&q=80",
    technologies: ["React", "Storybook", "Radix UI", "Vite"],
  },
  {
    id: "4",
    title: "Aurora CLI",
    description:
      "Ferramenta de linha de comando para scaffolding de projetos full-stack com convenções opinativas e DX excepcional.",
    coverImage:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    technologies: ["Rust", "TypeScript", "Bun"],
  },
];
