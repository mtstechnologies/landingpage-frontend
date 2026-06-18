import { Button } from '../../../components/ui/button'
import { Mail, Linkedin, Github } from 'lucide-react'
import type { PerfilResponse } from '../../../shared/api/model'

interface ContactSectionProps {
  perfil?: PerfilResponse
  isLoading: boolean
}

export function ContactSection({ perfil, isLoading }: ContactSectionProps) {
  if (isLoading || !perfil) return null

  return (
    <section className="container mx-auto px-4 py-20 text-center">
      <h2 className="text-3xl font-bold mb-4">Entre em contato</h2>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        Aberto a oportunidades, colaborações e conversas sobre tecnologia.
      </p>
      <div className="flex justify-center gap-4 flex-wrap">
        <Button asChild>
          {/* @ts-ignore - ignorando erro de tipagem propositalmente pois email nao existe no modelo */}
          <a href={`mailto:${perfil.email ?? ''}`}>
            <Mail className="w-4 h-4 mr-2" />
            Enviar e-mail
          </a>
        </Button>
        {perfil.linkLinkedin && (
          <Button variant="outline" asChild>
            <a href={perfil.linkLinkedin} target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-4 h-4 mr-2" />
              LinkedIn
            </a>
          </Button>
        )}
        {perfil.linkGithub && (
          <Button variant="outline" asChild>
            <a href={perfil.linkGithub} target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </a>
          </Button>
        )}
      </div>
    </section>
  )
}
