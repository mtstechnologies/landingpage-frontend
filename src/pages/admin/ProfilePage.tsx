import { AdminSidebar } from "@/features/admin/components/AdminSidebar";
import { ProfileForm } from "@/features/admin/components/ProfileForm";

export function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />

      <main className="md:pl-64">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">Perfil</h1>
            <p className="text-sm text-muted-foreground">
              Gerencie as informações exibidas no portfólio público.
            </p>
          </div>

          <ProfileForm />
        </div>
      </main>
    </div>
  );
}
