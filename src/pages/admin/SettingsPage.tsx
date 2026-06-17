import { AdminSidebar } from "@/features/admin/components/AdminSidebar";
import { SettingsForm } from "@/features/admin/components/SettingsForm";

export function SettingsPage() {
  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />

      <main className="md:pl-64">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">Configurações</h1>
            <p className="text-sm text-muted-foreground">
              Ajuste as preferências gerais do portfólio.
            </p>
          </div>

          <SettingsForm />
        </div>
      </main>
    </div>
  );
}
