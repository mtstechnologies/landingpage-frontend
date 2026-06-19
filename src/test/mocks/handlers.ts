import { http, HttpResponse } from 'msw'

const API_BASE = 'http://localhost:8080'

export const handlers = [
  // GET perfil público
  http.get(`${API_BASE}/api/v1/portfolio/perfil`, () => {
    return HttpResponse.json({
      id: 'perfil-uuid-1',
      nome: 'Michael Trindade da Silva',
      titulo: 'Engenheiro de Software',
      bio: 'Desenvolvedor full-stack especializado em arquitetura limpa e produtos escaláveis.',
      urlFoto: 'https://example.com/foto.jpg',
      linkLinkedin: 'https://linkedin.com/in/michael-trindade',
      linkGithub: 'https://github.com/mtstechnologies',
      versao: 0,
    })
  }),

  // GET projetos públicos
  http.get(`${API_BASE}/api/v1/portfolio/projetos`, () => {
    return HttpResponse.json([
      {
        id: 'projeto-uuid-1',
        titulo: 'Portfolio Backend API',
        slug: 'portfolio-backend-api',
        descricao: 'API RESTful com Clean Architecture.',
        urlCapa: 'https://example.com/capa.png',
        linkProducao: 'https://meu-portfolio.com',
        linkRepositorio: 'https://github.com/mtstechnologies/backend',
        dataDesenvolvimento: '2026-06-01',
        tecnologias: [
          { id: 'tech-1', nome: 'Java', urlIcone: null },
          { id: 'tech-2', nome: 'Spring Boot', urlIcone: null },
        ],
        versao: 0,
      },
    ])
  }),

  // GET projeto por slug
  http.get(`${API_BASE}/api/v1/portfolio/projetos/:slug`, ({ params }) => {
    if (params.slug === 'nao-existe') {
      return HttpResponse.json({ title: 'Not Found' }, { status: 404 })
    }
    return HttpResponse.json({
      id: 'projeto-uuid-1',
      titulo: 'Portfolio Backend API',
      slug: params.slug,
      descricao: 'API RESTful com Clean Architecture.',
      urlCapa: null,
      linkProducao: null,
      linkRepositorio: null,
      dataDesenvolvimento: '2026-06-01',
      tecnologias: [],
      versao: 0,
    })
  }),

  // GET tecnologias admin
  http.get(`${API_BASE}/api/v1/admin/portfolio/tecnologias`, () => {
    return HttpResponse.json([
      { id: 'tech-1', nome: 'Java', urlIcone: null },
      { id: 'tech-2', nome: 'Spring Boot', urlIcone: null },
      { id: 'tech-3', nome: 'React', urlIcone: null },
    ])
  }),
]
