import { mockProjects } from "@/features/portfolio/mocks/data";
import type { AdminProject } from "../types";

const statuses: AdminProject["status"][] = ["published", "published", "draft", "archived"];
const dates = ["2025-02-18", "2025-01-30", "2024-12-12", "2024-10-04"];

export const mockAdminProjects: AdminProject[] = mockProjects.map((p, i) => ({
  ...p,
  repoUrl: `https://github.com/alex/${p.title.toLowerCase().replace(/\s+/g, "-")}`,
  liveUrl: `https://${p.title.toLowerCase().replace(/\s+/g, "-")}.app`,
  status: statuses[i] ?? "draft",
  updatedAt: dates[i] ?? "2025-01-01",
}));

export const availableTechnologies = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "Tailwind",
  "GraphQL",
  "Stripe",
  "Storybook",
  "Radix UI",
  "Vite",
  "Rust",
  "Bun",
  "Docker",
  "AWS",
];
