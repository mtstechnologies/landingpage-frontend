import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { HeroSection } from './HeroSection'

const mockPerfil = {
  id: 'perfil-1',
  nome: 'Michael Trindade da Silva',
  titulo: 'Engenheiro de Software',
  bio: 'Desenvolvedor full-stack.',
  urlFoto: 'https://example.com/foto.jpg',
  linkLinkedin: 'https://linkedin.com/in/michael-trindade',
  linkGithub: 'https://github.com/mtstechnologies',
  versao: 0,
}

describe('HeroSection', () => {
  it('exibe skeletons durante carregamento', () => {
    render(<HeroSection perfil={undefined} isLoading={true} />)
    // Skeletons têm role="generic" com animate-pulse — verificar pela estrutura
    const section = screen.queryByRole('region', { hidden: true })
      ?? document.querySelector('section')
    expect(section).toBeTruthy()
  })

  it('renderiza nome e título quando perfil está disponível', () => {
    render(<HeroSection perfil={mockPerfil} isLoading={false} />)
    expect(screen.getByText('Michael Trindade da Silva')).toBeInTheDocument()
    expect(screen.getByText('Engenheiro de Software')).toBeInTheDocument()
  })

  it('renderiza bio quando disponível', () => {
    render(<HeroSection perfil={mockPerfil} isLoading={false} />)
    expect(screen.getByText('Desenvolvedor full-stack.')).toBeInTheDocument()
  })

  it('renderiza link do LinkedIn quando disponível', () => {
    render(<HeroSection perfil={mockPerfil} isLoading={false} />)
    const linkedinLink = screen.getByRole('link', { name: /linkedin/i })
    expect(linkedinLink).toHaveAttribute('href', mockPerfil.linkLinkedin)
    expect(linkedinLink).toHaveAttribute('target', '_blank')
  })

  it('renderiza link do GitHub quando disponível', () => {
    render(<HeroSection perfil={mockPerfil} isLoading={false} />)
    const githubLink = screen.getByRole('link', { name: /github/i })
    expect(githubLink).toHaveAttribute('href', mockPerfil.linkGithub)
  })

  it('não renderiza nada quando perfil é null e não está carregando', () => {
    const { container } = render(<HeroSection perfil={undefined} isLoading={false} />)
    expect(container.firstChild).toBeNull()
  })

  it('renderiza imagem de perfil quando urlFoto disponível', () => {
    render(<HeroSection perfil={mockPerfil} isLoading={false} />)
    const img = screen.getByRole('img', { name: mockPerfil.nome })
    expect(img).toHaveAttribute('src', mockPerfil.urlFoto)
  })
})
