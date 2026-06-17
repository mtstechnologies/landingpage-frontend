import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Blank App" },
      { name: "description", content: "A blank React app with Vite, TypeScript, and Tailwind CSS." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <h1 className="text-2xl font-semibold">Blank App</h1>
    </div>
  );
}
