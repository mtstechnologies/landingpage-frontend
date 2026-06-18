import { Link, Outlet } from '@tanstack/react-router'
import { LayoutDashboard, FolderOpen, User, Settings, LogOut } from 'lucide-react'
import { authStore } from '../../auth/authStore'
import { Button } from '../../../components/ui/button'

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/projects/new', label: 'Novo Projeto', icon: FolderOpen },
  { to: '/admin/profile', label: 'Perfil', icon: User },
  { to: '/admin/settings', label: 'Configurações', icon: Settings },
]

export function AdminLayout() {
  const handleLogout = () => {
    authStore.clear()
    window.location.href = '/login'
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-56 border-r flex flex-col p-4 gap-1">
        <p className="text-xs text-muted-foreground font-medium px-2 mb-2 mt-1">
          PORTFÓLIO ADMIN
        </p>
        {navItems.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            activeProps={{ className: 'text-foreground bg-secondary font-medium' }}
          >
            <Icon className="w-4 h-4" />
            {label}
          </Link>
        ))}
        <div className="mt-auto">
          <Button variant="ghost" size="sm" className="w-full justify-start gap-2" onClick={handleLogout}>
            <LogOut className="w-4 h-4" />
            Sair
          </Button>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
