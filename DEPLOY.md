# Deploy — Portfolio Frontend

## Stack de produção recomendada

| Serviço | Provedor | Tier | Custo |
|---------|----------|------|-------|
| Frontend | Vercel | Hobby | gratuito |
| DNS/SSL | Cloudflare | Free | gratuito |

---

## Deploy na Vercel

### 1. Via GitHub (recomendado)

1. Acessar [vercel.com](https://vercel.com) → New Project
2. Importar o repositório `landingpage-frontend`
3. Framework Preset: **Other** (TanStack Start é detectado automaticamente)
4. Build Command: `bun run build`
5. Output Directory: `dist`

### 2. Variáveis de ambiente na Vercel

Settings → Environment Variables → adicionar:

```
VITE_API_URL=https://sua-api.railway.app
```

### 3. Domínio personalizado

Settings → Domains → adicionar `michaeltrindade.dev`

---

## Cloudflare (DNS + SSL)

1. Adicionar domínio no Cloudflare
2. Apontar CNAME `@` para o domínio da Vercel (`cname.vercel-dns.com`)
3. SSL: Full
4. Proxy: Ativado

---

## Fluxo de atualização de conteúdo

```
Admin cadastra projeto em /admin
        ↓
POST /api/v1/admin/portfolio/projetos (backend Railway)
        ↓
GET /api/v1/portfolio/projetos (frontend consome em tempo real)
        ↓
Projeto aparece na landing page sem novo deploy
```

## Checklist de go-live

- [ ] `VITE_API_URL` apontando para o backend de produção
- [ ] Build de produção sem erros: `bun run build`
- [ ] Testes passando: `bun run test`
- [ ] TypeCheck limpo: `bun run typecheck`
- [ ] Favicon aparecendo na aba do browser
- [ ] Meta tags corretas: inspecionar `view-source:https://seudominio.com`
- [ ] LinkedIn preview correto: testar em [cards.linkedin.com/post-inspector](https://cards.linkedin.com/post-inspector/)
- [ ] Perfil cadastrado no admin: nome, bio, foto, LinkedIn, GitHub
- [ ] Pelo menos 1 projeto real cadastrado com slug, descrição e tecnologias
