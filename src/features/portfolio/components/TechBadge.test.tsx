import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { TechBadge } from './TechBadge'

describe('TechBadge', () => {
  it('exibe o nome da tecnologia', () => {
    render(<TechBadge tecnologia={{ id: '1', nome: 'Java', urlIcone: null }} />)
    expect(screen.getByText('Java')).toBeInTheDocument()
  })

  it('exibe ícone quando urlIcone disponível', () => {
    render(<TechBadge tecnologia={{ id: '1', nome: 'Java', urlIcone: 'https://example.com/java.png' }} />)
    const img = screen.getByRole('img', { name: 'Java' })
    expect(img).toHaveAttribute('src', 'https://example.com/java.png')
  })

  it('não exibe ícone quando urlIcone é null', () => {
    render(<TechBadge tecnologia={{ id: '1', nome: 'Java', urlIcone: null }} />)
    expect(screen.queryByRole('img')).toBeNull()
  })
})
