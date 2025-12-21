# Contribuindo para o ES.Database

Obrigado por considerar contribuir.

## Requisitos

- Node.js 18+ (recomendado 20 LTS)
- npm 9+

## Setup local

```bash
npm ci
npm run dev
```

A aplicação sobe por padrão em `http://localhost:3001`.

## Scripts úteis

- `npm run lint` — ESLint
- `npm run format` — Prettier (write)
- `npm run format:check` — Prettier (check)
- `npm test` — Jest (watch-friendly)
- `npm run test:ci` — Jest (CI)
- `npm run build` — build Next.js

## Padrão de commits (Conventional Commits)

Este repo usa **Conventional Commits**.

Formato:

```
<tipo>(escopo opcional): <mensagem>
```

Exemplos:

- `feat(auth): permitir allowlist via env`
- `fix(ui): corrigir layout do login no mobile`
- `docs: atualizar README`
- `chore(ci): ajustar workflow`

Tipos comuns: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`, `ci`.

## Pull Requests

- Mantenha PRs pequenos e objetivos.
- Inclua testes quando aplicável.
- Garanta `npm run lint`, `npm run test:ci` e `npm run build` passando.

## Segurança

Vulnerabilidades devem ser reportadas conforme [SECURITY.md](SECURITY.md).
