import { useState } from 'react'
import { useGetApiV1AdminPortfolioTecnologias } from '../../../shared/api/generated/default/default'
import { Badge } from '../../../components/ui/badge'
import { Input } from '../../../components/ui/input'
import { X } from 'lucide-react'

interface TechSelectorProps {
  selected: string[]       // array de IDs selecionados
  onChange: (ids: string[]) => void
}

export function TechSelector({ selected, onChange }: TechSelectorProps) {
  const [search, setSearch] = useState('')
  const { data: response } = useGetApiV1AdminPortfolioTecnologias()
  const tecnologias = response?.data ?? []

  const filtered = tecnologias.filter((t) =>
    t.nome?.toLowerCase().includes(search.toLowerCase())
  )

  const toggle = (id: string) => {
    onChange(
      selected.includes(id)
        ? selected.filter((s) => s !== id)
        : [...selected, id]
    )
  }

  const selectedTechs = tecnologias.filter((t) => selected.includes(t.id ?? ''))

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-1.5 min-h-8">
        {selectedTechs.map((t) => (
          <Badge key={t.id} variant="secondary" className="gap-1">
            {t.nome}
            <button type="button" onClick={() => toggle(t.id ?? '')} className="hover:text-destructive">
              <X className="w-3 h-3" />
            </button>
          </Badge>
        ))}
      </div>
      <Input
        placeholder="Buscar tecnologia..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
        {filtered.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => toggle(t.id ?? '')}
            className={`px-2 py-1 rounded text-xs border transition-colors ${
              selected.includes(t.id ?? '')
                ? 'bg-primary text-primary-foreground border-primary'
                : 'border-border hover:border-primary'
            }`}
          >
            {t.nome}
          </button>
        ))}
      </div>
    </div>
  )
}
