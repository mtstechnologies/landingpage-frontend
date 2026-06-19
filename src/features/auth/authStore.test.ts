import { describe, it, expect, beforeEach } from 'vitest'
import { authStore } from './authStore'

describe('authStore', () => {
  beforeEach(() => {
    authStore.clear()
  })

  it('inicia não autenticado', () => {
    expect(authStore.get().isAuthenticated).toBe(false)
  })

  it('autentica com username e password', () => {
    authStore.set('admin', 'senha123')
    expect(authStore.get().isAuthenticated).toBe(true)
    expect(authStore.get().username).toBe('admin')
  })

  it('gera header Basic Auth correto', () => {
    authStore.set('admin', 'senha123')
    const expected = `Basic ${btoa('admin:senha123')}`
    expect(authStore.getBasicAuth()).toBe(expected)
  })

  it('retorna null quando não autenticado', () => {
    expect(authStore.getBasicAuth()).toBeNull()
  })

  it('limpa estado ao fazer logout', () => {
    authStore.set('admin', 'senha123')
    authStore.clear()
    expect(authStore.get().isAuthenticated).toBe(false)
    expect(authStore.getBasicAuth()).toBeNull()
  })
})
