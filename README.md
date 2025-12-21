# ES.Database

Sistema web para centralizar, consultar e navegar procedimentos operacionais e conhecimento técnico.

## Status do projeto

- **Maintained:** best-effort
- **Stack:** Next.js (Pages Router) + React 18 + MUI 5

## Badges

[![CI](https://github.com/ESousa97/ESdatabase/actions/workflows/ci.yml/badge.svg)](https://github.com/ESousa97/ESdatabase/actions/workflows/ci.yml)
[![CodeQL](https://github.com/ESousa97/ESdatabase/actions/workflows/codeql.yml/badge.svg)](https://github.com/ESousa97/ESdatabase/actions/workflows/codeql.yml)

## Visão geral

O ES.Database organiza conhecimento operacional (procedimentos, guias e referências técnicas) em um único lugar, com UX focada em consulta rápida.

## Problema que resolve

Em times de suporte/ops, procedimentos tendem a ficar espalhados (PDFs, wikis e chats). Isso aumenta MTTR e dificulta onboarding.

## Funcionalidades

- Autenticação com NextAuth (Azure AD e/ou Google)
- Allowlist de e-mails por variável de ambiente (opcional)
- Listagens em múltiplos modos (cards / detalhado / compacto)
- Dark mode

## Stack e requisitos

- Node.js 18+ (recomendado 20 LTS)
- npm 9+
- Next.js 14
- React 18
- MUI 5

## Instalação

```bash
npm ci
```

## Uso

### Rodar em desenvolvimento

```bash
copy .env.example .env.local
npm run dev
```

Abra `http://localhost:3001`.

### Build e execução de produção

```bash
npm run build
npm run start
```

## Configuração

Todas as variáveis estão documentadas em `.env.example`.

Principais:

- `NEXTAUTH_URL` (ex.: `http://localhost:3001`)
- `NEXTAUTH_SECRET` (gere com `openssl rand -base64 32`)
- `AZURE_AD_CLIENT_ID`, `AZURE_AD_CLIENT_SECRET`, `AZURE_AD_TENANT_ID`
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
- `ALLOWED_EMAILS` (CSV, opcional)

## Arquitetura

Documentação e diagrama textual: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)

Resumo:

```
[Browser]
    |
    v
[Next.js Pages Router]
    |
    +--> /login --------------> NextAuth (OAuth Providers)
    |
    +--> /components ---------> UI + ListViewWrapper
    |
    +--> /procedimentos/[id] -> ProcedurePages -> ProcedureDetails
```

## Scripts

- `npm run dev` — desenvolvimento
- `npm run build` — build
- `npm run start` — start
- `npm run lint` — ESLint
- `npm run lint:fix` — ESLint (fix)
- `npm run format` — Prettier (write)
- `npm run format:check` — Prettier (check)
- `npm test` — Jest
- `npm run test:ci` — Jest (CI)

## Roadmap (curto)

- Adicionar testes de UI mais específicos (RTL)
- Isolar camada de dados (fetch) em `lib/`
- Evoluir mocks `data/` para API real

## Contribuição

Veja [CONTRIBUTING.md](CONTRIBUTING.md).

## Licença

MIT — veja [LICENSE.md](LICENSE.md).

- **Lista branca de e-mails** para controle de acesso
- **Gerenciamento de sessões** com NextAuth.js
- **Criptografia HTTPS** e cabeçalhos seguros

### 🔍 Busca Inteligente & Navegação

- **Busca global em tempo real** por todos os procedimentos
- **Navegação por categorias** com menus expansíveis
- **Filtros avançados** por data, ordem alfabética e atualizações
- **Design responsivo** para acesso móvel e desktop

### 📊 Modos Múltiplos de Visualização

- **📱 Visualização em Cartões** com thumbnails
- **📋 Visualização Detalhada** com metadados completos
- **📄 Visualização Compacta** para densidade máxima de informação
- **🎨 Modos Claro/Escuro** conforme preferência do usuário

### 🎬 Suporte a Conteúdo Rico

- **📹 Tutoriais incorporados do YouTube** com player customizado
- **🖼️ Galerias de imagens** com carregamento otimizado
- **💻 Blocos de código copiáveis** com realce de sintaxe
- **📝 Parsing customizado de Markdown** com elementos interativos

### ⚡ Performance Otimizada

- **Renderização no Servidor (SSR)** com Next.js
- **Geração Estática (SSG)** para carregamento rápido
- **Otimização e lazy loading de imagens**
- **Integração com CDN** para distribuição global

---

## 🛠️ Stack Tecnológica

<details>
<summary><strong>Tecnologias Frontend</strong></summary>

| Tecnologia        | Versão  | Propósito                       |
| ----------------- | ------- | ------------------------------- |
| **Next.js**       | 14.1.4  | Framework React com SSR/SSG     |
| **React**         | 18.2.0  | Biblioteca para UI              |
| **Material-UI**   | 5.18.0  | Sistema de design e componentes |
| **Framer Motion** | 11.0.24 | Animações e transições          |
| **TypeScript**    | 5.4.4   | Tipagem estática e melhor DX    |

</details>

<details>
<summary><strong>Backend & Infraestrutura</strong></summary>

| Tecnologia             | Propósito                              |
| ---------------------- | -------------------------------------- |
| **Next.js API Routes** | Funções backend serverless             |
| **PostgreSQL**         | Banco de dados principal               |
| **NextAuth.js**        | Autenticação e gerenciamento de sessão |
| **Vercel**             | Plataforma de deploy e hosting         |
| **Node.js**            | Ambiente de execução                   |

</details>

<details>
<summary><strong>Desenvolvimento & Qualidade</strong></summary>

| Ferramenta         | Propósito                      |
| ------------------ | ------------------------------ |
| **ESLint**         | Linting e padrões de código    |
| **Prettier**       | Formatação de código           |
| **Sass**           | Pré-processamento CSS avançado |
| **Git**            | Controle de versão             |
| **GitHub Actions** | Pipeline CI/CD                 |

</details>

---

## 🏗️ Arquitetura

```mermaid
graph TB
    subgraph "Camada Cliente"
        A[Navegador] --> B[Frontend Next.js]
    end

    subgraph "Camada Aplicação"
        B --> C[Componentes React]
        C --> D[Material-UI]
        C --> E[Provedor de Tema]
        C --> F[Mecanismo de Busca]
    end

    subgraph "Camada API"
        B --> G[NextAuth.js]
        B --> H[Rotas API]
        G --> I[Provedores OAuth]
        H --> J[Camada de Banco de Dados]
    end

    subgraph "Infraestrutura"
        K[CDN Vercel] --> B
        L[PostgreSQL] --> H
        M[Armazenamento de Assets] --> B
    end

    style B fill:#e1f5fe
    style G fill:#f3e5f5
    style H fill:#e8f5e8
    style L fill:#fff3e0
```

### Princípios da Arquitetura

1. **🏛️ Design Modular**: Arquitetura baseada em componentes para facilidade de manutenção
2. **🔄 Serverless First**: Aproveitando a rede de borda da Vercel para escalabilidade
3. **🛡️ Segurança por Design**: Autenticação e autorização em todas as camadas
4. **📱 Mobile First**: Princípios responsivos aplicados em toda interface
5. **⚡ Performance Otimizada**: SSR, SSG e estratégias inteligentes de cache

---

## 🚀 Começando

### Pré-requisitos

```bash
# Softwares necessários
Node.js >= 18.x
npm >= 8.x
PostgreSQL >= 12.x (para funcionalidade completa)
```

### Início Rápido

1. **Clone o repositório**

   ```bash
   git clone https://github.com/ESousa97/ESdatabase.git
   cd ESdatabase
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**

   ```bash
   cp .env.example .env.local
   # Edite .env.local com suas configurações
   ```

4. **Inicie o servidor de desenvolvimento**

   ```bash
   npm run dev
   ```

5. **Acesse a aplicação**

   ```
   http://localhost:3001
   ```

### Configuração do Ambiente

<details>
<summary><strong>Variáveis de Ambiente Obrigatórias</strong></summary>

```env
# Banco de dados
DATABASE_URL="postgresql://usuario:senha@localhost:5432/database"

# Autenticação
NEXTAUTH_URL="http://localhost:3001"
NEXTAUTH_SECRET="sua-chave-secreta"

# Provedores OAuth
AZURE_AD_CLIENT_ID="seu-client-id-azure"
AZURE_AD_CLIENT_SECRET="seu-client-secret-azure"
AZURE_AD_TENANT_ID="seu-tenant-id-azure"

GOOGLE_CLIENT_ID="seu-client-id-google"
GOOGLE_CLIENT_SECRET="seu-client-secret-google"
```

</details>

---

## 📁 Estrutura do Projeto

```
ESdatabase/
├── 📂 componentes/           # Componentes React
│   ├── 📂 AppBar/           # Barra de navegação
│   ├── 📂 CardList/         # Componentes para visualização em cartões
│   ├── 📂 SearchBox/        # Funcionalidade de busca
│   ├── 📂 ThemeProvider/    # Gerenciamento de tema
│   └── 📂 Procedures/       # Exibição de procedimentos
├── 📂 pages/                # Páginas Next.js & rotas API
│   ├── 📂 api/             # Endpoints backend
│   ├── 📂 procedimentos/   # Páginas dinâmicas de procedimentos
│   └── 📄 *.js             # Páginas estáticas
├── 📂 public/              # Assets estáticos
├── 📂 styles/              # Estilos globais e temas
├── 📂 data/                # Dados mock para demo
└── 📄 package.json         # Dependências e scripts
```

---

## 🎯 Exemplos de Uso

### Fluxo de Autenticação

```javascript
// Login seguro com Microsoft/Google
import { signIn } from 'next-auth/react';

await signIn('azure-ad', {
  callbackUrl: '/dashboard',
});
```

### Implementação da Busca

```javascript
// Busca em tempo real com debounce
const [results, setResults] = useState([]);

useEffect(() => {
  const search = debounce(async (query) => {
    const response = await fetch(`/api/search?q=${query}`);
    setResults(await response.json());
  }, 300);

  search(searchTerm);
}, [searchTerm]);
```

### Parser de Conteúdo Customizado

```javascript
// Conteúdo rico com vídeos incorporados e blocos de código
const parseContent = (content) => {
  return content
    .replace(/@@(.+?)@@/g, '<code-block>$1</code-block>')
    .replace(/youtube\.com\/watch\?v=([^&]+)/g, '<video-embed id="$1" />');
};
```

---

## 🔒 Recursos de Segurança

### Arquitetura de Segurança em Múltiplas Camadas

1. **Camada de Autenticação**
   - OAuth 2.0 com Azure AD & Google
   - Autorização por whitelist de e-mails
   - Gerenciamento de tokens JWT

2. **Camada de Aplicação**
   - Sanitização de entradas com DOMPurify
   - Cabeçalhos para proteção contra XSS
   - Validação de token CSRF

3. **Camada de Infraestrutura**
   - Aplicação obrigatória de HTTPS
   - Configuração de cabeçalhos de segurança
   - Implementação de rate limiting

### Boas Práticas de Segurança Implementadas

- ✅ **Arquitetura zero trust** com autorização baseada em e-mail
- ✅ **Cabeçalhos Content Security Policy (CSP)**
- ✅ **Gerenciamento seguro de sessão** com NextAuth.js
- ✅ **Proteção das variáveis de ambiente**
- ✅ **Prevenção contra SQL Injection** via queries parametrizadas

---

## 📊 Métricas de Performance

### Performance em Produção (Histórico)

- **🎯 10.000+ usuários ativos mensais**
- **⚡ Tempo médio de carregamento < 2 segundos**
- **📱 Compatibilidade móvel: 98%**
- **🔍 Tempo médio de resposta de busca < 500ms**
- **⏱️ Uptime de 99,9% no período ativo**

### Métricas Técnicas

- **Nota no Lighthouse**: 95+ em todos os critérios
- **Core Web Vitals**: Excelente avaliação
- **Tamanho do bundle**: Otimizado para carregamento rápido
- **SEO**: 100/100

---

## 🧪 Fluxo de Desenvolvimento

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Inicia servidor de desenvolvimento
npm run build            # Build para produção
npm run start            # Inicia servidor de produção

# Qualidade
npm run lint             # Executa ESLint
npm run test             # Executa testes (planejado)
npm run type-check       # Validação TypeScript

# Manutenção
npm run install:clean    # Instala dependências limpando cache
```

### Padrões de Qualidade de Código

- **ESLint**: Padrões rigorosos de código
- **Prettier**: Formatação consistente
- **TypeScript**: Segurança de tipos e melhor experiência dev
- **Commits Convencionais**: Mensagens padronizadas

---

### Diretrizes para Contribuição

- Siga o estilo e padrões de código existentes
- Documente novas funcionalidades
- Inclua testes unitários para novas funcionalidades
- Atualize o README se necessário
- Respeite a licença MIT do projeto

---

## 📜 Licença

Este projeto está licenciado sob a **Licença MIT** - veja o arquivo [LICENSE.md](LICENSE.md) para detalhes.

### O que isso significa:

- ✅ **Uso comercial** permitido
- ✅ **Modificação** permitida
- ✅ **Distribuição** permitida
- ✅ **Uso privado** permitido
- ⚠️ **Obrigatoriedade de manter o aviso de licença e direitos autorais**

---

## 🌟 Status do Projeto

> **📌 Status Atual**: **Projeto Demonstração/Portfólio**
>
> Este projeto foi originalmente implantado em produção atendendo mais de 10.000 usuários mensais, antes de ser convertido em demonstração em setembro de 2024. O código representa práticas corporativas de desenvolvimento e serve como exemplo abrangente de arquitetura moderna para aplicações web.

### Por que open source?

1. **🎓 Valor Educacional**: Demonstra práticas reais de desenvolvimento
2. **💡 Inovação**: Estimula contribuições e melhorias da comunidade
3. **🏆 Portfólio**: Demonstra habilidades técnicas e resolução de problemas
4. **🤝 Comunidade**: Retorno para a comunidade de desenvolvedores

---

## 📞 Contato & Suporte

### Entre em Contato

- **📧 Email**: [sousa3086@outlook.com](mailto:sousa3086@outlook.com)
- **💼 LinkedIn**: [Enoque Sousa](https://www.linkedin.com/in/enoque-sousa-bb89aa168/)
- **🐙 GitHub**: [@ESousa97](https://github.com/ESousa97)

### Opções de Suporte

- **🐛 Reportar Bugs**: [Issues no GitHub](https://github.com/ESousa97/ESdatabase/issues)
- **💡 Solicitar Funcionalidades**: [Discussões no GitHub](https://github.com/ESousa97/ESdatabase/discussions)
- **❓ Perguntas**: Crie uma issue com label `question`
- **🤝 Colaborações**: Contate por email para parcerias

---

## 🙏 Agradecimentos

### Agradecimentos Especiais

- **🎓 Alura**: Pelo conhecimento fundamental para este projeto
- **⚛️ Comunidade React/Next.js**: Pela excelente documentação e suporte
- **🎨 Time Material-UI**: Pelo sistema de design completo
- **☁️ Vercel**: Pela plataforma de deploy excepcional
- **👥 Comunidade Open Source**: Pela inspiração e troca de conhecimento

### Tecnologias que tornaram isso possível

Este projeto não existiria sem o incrível ecossistema open source e os recursos educacionais que possibilitaram o aprendizado autodidata e crescimento profissional.

---

<div align="center">

### 🚀 Pronto para explorar?

**[🌐 Ver Demo Online](https://e-sdatabase.vercel.app/login)** | **[📖 Ler Documentação](#-documentação)** | **[🛠️ Começar](#-começando)**

---

**Feito com ❤️ por [Enoque Sousa](https://github.com/ESousa97)**

_De uma ideia para resolver um problema simples, a um sistema em produção atendendo milhares de usuários, até uma contribuição open source para a comunidade._

</div>
```

> ✨ **Criado em:** 13 de mar. de 2024 às 21:11
