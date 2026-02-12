<div align="center">

# ES.Database

[![CI](https://img.shields.io/github/actions/workflow/status/ESousa97/ESdatabase/ci.yml?style=flat&logo=github-actions&logoColor=white)](https://github.com/ESousa97/ESdatabase/actions/workflows/ci.yml)
[![CodeQL](https://img.shields.io/github/actions/workflow/status/ESousa97/ESdatabase/codeql.yml?style=flat&logo=github&logoColor=white&label=CodeQL)](https://github.com/ESousa97/ESdatabase/actions/workflows/codeql.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat&logo=opensourceinitiative&logoColor=white)](https://opensource.org/licenses/MIT)
[![Status](https://img.shields.io/badge/Status-Archived-lightgrey.svg?style=flat&logo=archive&logoColor=white)](#)

**Sistema web para centralizar, consultar e navegar procedimentos operacionais e conhecimento técnico. Construído com Next.js, React 18 e Material-UI 5.**

[Demo ao Vivo](https://e-sdatabase.vercel.app/login) • [Documentação](docs/ARCHITECTURE.md)

</div>

---

> **⚠️ Projeto Arquivado**
> Este projeto não recebe mais atualizações ou correções. O código permanece disponível como referência e pode ser utilizado livremente sob a licença MIT. Fique à vontade para fazer fork caso deseje continuar o desenvolvimento.

---

## Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Começando](#começando)
  - [Pré-requisitos](#pré-requisitos)
  - [Instalação](#instalação)
  - [Configuração](#configuração)
  - [Uso Local](#uso-local)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Arquitetura](#arquitetura)
- [Segurança](#segurança)
- [Testes](#testes)
- [Deploy](#deploy)
- [Roadmap](#roadmap)
- [Contribuição](#contribuição)
- [Licença](#licença)
- [Contato](#contato)

---

## Sobre o Projeto

O ES.Database organiza conhecimento operacional — procedimentos, guias e referências técnicas — em um único lugar, com UX focada em consulta rápida. Em times de suporte e operações, procedimentos tendem a ficar espalhados entre PDFs, wikis e chats, o que aumenta o MTTR e dificulta o onboarding. Este projeto resolve esse problema centralizando tudo com busca inteligente e múltiplos modos de visualização.

### Por que Next.js + Material-UI?

A combinação oferece SSR/SSG para performance, rotas baseadas em arquivos para simplicidade, e um sistema de design completo que acelera o desenvolvimento de interfaces responsivas e acessíveis. A autenticação via NextAuth garante integração direta com provedores corporativos (Azure AD) e pessoais (Google).

---

## Funcionalidades

- **Autenticação 2FA** — Login via Azure AD e/ou Google com NextAuth.js
- **Allowlist de e-mails** — Controle de acesso por variável de ambiente (opcional)
- **Múltiplos modos de visualização** — Cards, detalhado e compacto
- **Busca global em tempo real** — Pesquisa com debounce por todos os procedimentos
- **Navegação por categorias** — Menu lateral com categorias expansíveis
- **Dark mode** — Alternância de tema com persistência em localStorage
- **Conteúdo rico** — Vídeos do YouTube incorporados, blocos de código copiáveis e imagens
- **Error Boundary global** — Tratamento de erros com fallback UI
- **Security headers** — HSTS, X-Content-Type-Options, X-Frame-Options, CSP
- **Testes automatizados** — Jest + React Testing Library

---

## Tecnologias

### Core

![Next.js](https://img.shields.io/badge/Next.js_14-000000?style=flat&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React_18-61DAFB?style=flat&logo=react&logoColor=black)
![MUI](https://img.shields.io/badge/Material--UI_5-007FFF?style=flat&logo=mui&logoColor=white)
![NextAuth](https://img.shields.io/badge/NextAuth.js-000000?style=flat&logo=auth0&logoColor=white)

### Ferramentas de Desenvolvimento

![Jest](https://img.shields.io/badge/Jest-C21325?style=flat&logo=jest&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=flat&logo=prettier&logoColor=black)
![Husky](https://img.shields.io/badge/Husky-000000?style=flat&logo=git&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat&logo=github-actions&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)

**Requisitos mínimos:**
- Node.js 18+ (recomendado 20 LTS)
- npm 9+

---

## Começando

### Pré-requisitos

```bash
node --version  # v18 ou superior (recomendado v20)
npm --version   # v9 ou superior
```

### Instalação

1. **Clone o repositório**

```bash
git clone https://github.com/ESousa97/ESdatabase.git
cd ESdatabase
```

2. **Instale as dependências**

```bash
npm ci
```

### Configuração

Crie o arquivo `.env.local` a partir do exemplo:

```bash
cp .env.example .env.local
```

Preencha as variáveis necessárias:

```env
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=sua-chave-secreta    # gere com: openssl rand -base64 32

# Azure AD (opcional)
AZURE_AD_CLIENT_ID=your-azure-client-id
AZURE_AD_CLIENT_SECRET=your-azure-client-secret
AZURE_AD_TENANT_ID=your-azure-tenant-id

# Google (opcional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Allowlist (opcional, CSV)
ALLOWED_EMAILS=user1@example.com,user2@example.com
```

> **Nota:** Providers de autenticação são habilitados somente quando suas variáveis estão configuradas. Sem `ALLOWED_EMAILS`, qualquer usuário autenticado tem acesso.

### Uso Local

**Subir o servidor:**

```bash
npm run dev
```

**Acesse:** `http://localhost:3001`

**Build de produção:**

```bash
npm run build
npm run start
```

---

## Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Servidor com hot reload (porta 3001)
npm run build            # Build para produção
npm run start            # Servidor de produção (porta 3001)

# Qualidade de código
npm run lint             # ESLint
npm run lint:fix         # ESLint com auto-fix
npm run format           # Prettier (write)
npm run format:check     # Prettier (check)

# Testes
npm test                 # Jest (watch mode)
npm run test:ci          # Jest (CI com coverage)
npm run test:watch       # Jest (watch)

# Manutenção
npm run clean            # Remove .next, out, dist, coverage
npm run clean:all        # Remove também node_modules
npm run install:clean    # Clean install completo + dev
```

---

## Estrutura do Projeto

```
ESdatabase/
├── componentes/
│   ├── AppBar/                 # Barra de navegação superior
│   ├── CardList/               # Visualização em cartões
│   ├── CompactList/            # Visualização compacta
│   ├── DetailedList/           # Visualização detalhada
│   ├── Dialog/                 # Dialog de confirmação (logout)
│   ├── Drawer/                 # Drawer lateral
│   ├── ErrorBoundary/          # Error Boundary global
│   ├── Layout/                 # MainLayout (AppBar + Drawer + Head)
│   ├── ListViewWrapper/        # Switch entre modos de visualização
│   ├── Login/                  # Ícones e formulário de login
│   ├── Procedures/             # ProcedurePages + ProcedureDetails
│   ├── SearchBox/              # Busca global com resultados em tempo real
│   ├── SideMenu/               # Menu lateral com categorias
│   ├── ThemeProvider/          # Tema MUI + dark mode
│   └── index.js                # Barrel exports
├── data/
│   ├── demoCards.js            # Dados mock para cards
│   └── demoProjects.js         # Dados mock para procedimentos
├── docs/
│   └── ARCHITECTURE.md         # Documentação de arquitetura
├── lib/
│   └── config.js               # Configuração centralizada de env
├── pages/
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth].js  # Configuração NextAuth
│   ├── procedimentos/
│   │   └── [id].js             # Página dinâmica de procedimento
│   ├── _app.js                 # Custom App (providers globais)
│   ├── index.js                # Redirect para login
│   ├── login.js                # Página de login
│   ├── components.js           # Página principal (listagem)
│   ├── privacy.js              # Política de privacidade
│   └── terms.js                # Termos de uso
├── __tests__/
│   ├── ErrorBoundary.test.js   # Testes do Error Boundary
│   ├── ListViewWrapper.test.js # Testes dos modos de visualização
│   └── config.test.js          # Testes da configuração
├── styles/
│   └── scss/                   # Estilos globais SCSS
├── public/                     # Assets estáticos e favicons
├── .github/
│   └── workflows/
│       ├── ci.yml              # Pipeline CI (lint + test + build)
│       └── codeql.yml          # Análise de segurança CodeQL
├── package.json                # Dependências e scripts
├── next.config.js              # Configuração Next.js + security headers
├── jest.config.js              # Configuração Jest
├── CHANGELOG.md                # Histórico de mudanças
├── CONTRIBUTING.md             # Guia de contribuição
├── SECURITY.md                 # Política de segurança
├── CODE_OF_CONDUCT.md          # Código de conduta
└── LICENSE.md                  # Licença MIT
```

> Para mais detalhes sobre a arquitetura, consulte [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

---

## Arquitetura

O projeto segue o padrão do Next.js Pages Router com componentes React organizados por funcionalidade:

```
[Browser]
    │
    ▼
[Next.js Pages Router]
    │
    ├── /login ──────────────► NextAuth (Azure AD / Google)
    │
    ├── /components ─────────► ListViewWrapper
    │                           ├── CardList (cards)
    │                           ├── DetailedList (detalhado)
    │                           └── CompactList (compacto)
    │
    └── /procedimentos/[id] ─► ProcedurePages → ProcedureDetails
                                  ├── Vídeos YouTube
                                  ├── Blocos de código
                                  └── Imagens e conteúdo rico
```

### Princípios

1. **Modular** — Componentes isolados com estilos próprios (styled-components via MUI)
2. **Serverless First** — Deploy via Vercel com edge network
3. **Segurança por Design** — Autenticação + allowlist + security headers em todas as camadas
4. **Mobile First** — Responsivo em todas as interfaces

---

## Segurança

O projeto implementa múltiplas camadas de segurança:

| Camada | Implementação |
|--------|---------------|
| **Autenticação** | OAuth 2.0 (Azure AD + Google) via NextAuth.js |
| **Autorização** | Allowlist de e-mails por variável de ambiente |
| **Headers** | HSTS, X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Referrer-Policy, Permissions-Policy |
| **Sanitização** | DOMPurify para conteúdo HTML renderizado |
| **CI/CD** | npm audit + CodeQL semanal + Dependabot |

---

## Testes

```bash
# Executar testes
npm test

# Testes em CI com coverage
npm run test:ci
```

Os testes cobrem:

| Arquivo | Escopo |
|---------|--------|
| `ErrorBoundary.test.js` | Renderização normal e fallback de erro |
| `ListViewWrapper.test.js` | Switch entre modos cards/detailed/compact |
| `config.test.js` | Valores padrão e allowedEmails |

---

## Deploy

### Vercel (Produção)

O deploy é automático via integração GitHub → Vercel. As variáveis de ambiente devem ser configuradas no painel da Vercel.

```bash
vercel --prod
```

### Local

```bash
npm run dev
# ou para simular produção:
npm run build && npm run start
```

---

## Roadmap

- [ ] Adicionar testes de UI mais específicos (React Testing Library)
- [ ] Isolar camada de dados (fetch) em `lib/`
- [ ] Evoluir mocks `data/` para API real
- [ ] Migrar para App Router (Next.js 14+)

---

## Contribuição

Contribuições são bem-vindas! Veja o guia completo em [CONTRIBUTING.md](CONTRIBUTING.md).

Resumo rápido:

```bash
npm ci && npm run dev        # Setup local
npm run lint                 # Verificar código
npm run test:ci              # Rodar testes
npm run build                # Validar build
```

Este projeto usa **Conventional Commits** — ex: `feat(auth): adicionar logout`, `fix(ui): corrigir layout mobile`.

---

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE.md](LICENSE.md) para mais detalhes.

```
MIT License - você pode usar, copiar, modificar e distribuir este código.
```

---

## Contato

**José Enoque Costa de Sousa**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/enoque-sousa-bb89aa168/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat&logo=github&logoColor=white)](https://github.com/ESousa97)
[![Portfolio](https://img.shields.io/badge/Portfolio-FF5722?style=flat&logo=todoist&logoColor=white)](https://esousa97.github.io/Portifolio/)

---

<div align="center">

**[⬆ Voltar ao topo](#esdatabase)**

Feito com ❤️ por [Enoque Sousa](https://github.com/ESousa97)

_De uma ideia para resolver um problema simples, a um sistema em produção atendendo milhares de usuários, até uma contribuição open source para a comunidade._

**Status do Projeto:** Archived — Sem novas atualizações

</div>
