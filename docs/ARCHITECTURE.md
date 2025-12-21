# Arquitetura

## Visão geral

ES.Database é um app Next.js (Pages Router) que entrega uma UI para consulta/navegação de procedimentos.

## Componentes principais

- `pages/` — rotas Next.js e API routes
- `componentes/` — componentes de UI e camadas de apresentação
- `pages/api/auth/[...nextauth].js` — autenticação via NextAuth
- `lib/config.js` — configuração centralizada + validação leve de env

## Fluxo (alto nível)

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

## Autenticação

- Providers são habilitados **somente** quando as variáveis de ambiente estão configuradas.
- Restrição por allowlist via `ALLOWED_EMAILS` (CSV). Se não configurado, acesso liberado para usuários autenticados.

## Observações

- O projeto hoje usa mocks em `data/` para cards e procedimentos.
- Se/quando houver backend, a sugestão é isolar a camada de acesso em `lib/`.
