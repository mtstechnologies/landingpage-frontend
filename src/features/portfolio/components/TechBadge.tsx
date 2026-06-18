import type { TecnologiaResponse } from '../../../shared/api/model'

interface TechBadgeProps {
  tecnologia: TecnologiaResponse
}

export function TechBadge({ tecnologia }: TechBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-secondary text-secondary-foreground text-xs font-medium">
      {tecnologia.urlIcone && (
        <img
          src={tecnologia.urlIcone}
          alt={tecnologia.nome}
          className="w-3.5 h-3.5 object-contain"
          loading="lazy"
        />
      )}
      {tecnologia.nome}
    </span>
  )
}
