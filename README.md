# EsDataBase

<h1 align="center">🚀 Projeto de Back-End e Front-End Escalável</h1>

<p align="center">
Este projeto foi desenvolvido para criar uma aplicação web escalável e eficiente, utilizando tecnologias modernas como <strong>Node.js</strong>, <strong>PostgreSQL</strong>, <strong>Next.js</strong> e <strong>Material-UI</strong>.
O sistema foi implementado a partir de fevereiro, concluído em abril, e teve ampla utilização até sua descontinuação em outubro.
</p>

---

## 📝 Descrição do Projeto

Este projeto combina um **back-end robusto** com um **front-end moderno** para atender às demandas de aplicações escaláveis e dinâmicas. Foi amplamente utilizado para estruturar processos internos, garantindo uma arquitetura eficiente e preparada para crescimento.

---

## 🏗️ Arquitetura

- **Back-End**: Estruturado com **Node.js** e **Express**, conectado ao banco de dados relacional **PostgreSQL**, com deploy contínuo usando **Vercel**.
- **Front-End**: Desenvolvido com **Next.js** e **Material-UI**, garantindo uma interface moderna e de alta performance.

---

## 🛠️ Tecnologias Utilizadas

**Back-End:**
- **Node.js**
- **Express**
- **PostgreSQL**
- **pg** (Biblioteca para PostgreSQL)
- **@vercel/postgres** (Integração com Vercel)
- **Vercel** (Plataforma de deploy)

**Front-End:**
- **Next.js**
- **React**
- **Material-UI**
- **NextAuth** (Autenticação)
- **Axios** (Cliente HTTP)
- **Framer Motion** (Animações)

---

## ⚙️ Funcionalidades Principais

**Back-End:**
- Consultas SQL otimizadas para performance.
- Deploy contínuo automatizado com Vercel.
- Integração sólida entre back-end e banco de dados.

**Front-End:**
- Autenticação com NextAuth.
- Suporte a Markdown para gestão de conteúdo dinâmico.
- Animações suaves com Framer Motion.
- Feedback visual com React-Toastify.

---


## Estrutura

```md
.
├── .github/
├── .next/
├── componentes/
│   ├── AppBar/
│   │   └── AppBar.js
│   ├── CardList/
│   │   ├── CardList.js
│   │   └── CardStyles.js
│   ├── CompactList/
│   │   ├── CompactList.js
│   │   └── CompactListStyles.js
│   ├── DetailedList/
│   │   ├── DetailedList.js
│   │   └── DetailedListStyles.js
│   ├── Dialog/
│   │   └── Dialog.js
│   ├── Drawer/
│   │   └── Drawer.js
│   ├── ListViewWrapper/
│   │   └── ListViewWrapper.js
│   ├── Login/
│   │   ├── GoogleIcon.js
│   │   ├── googleicon.svg
│   │   ├── LoginForm.js
│   │   ├── microsoft.svg
│   │   └── MicrosoftIcon.js
│   ├── Procedures/
│   │   ├── ProcedureDetails.js
│   │   ├── ProcedureDetailsStyles.js
│   │   ├── ProcedurePages.js
│   │   └── styles.module.css
│   ├── SearchBox/
│   │   ├── SearchBox.js
│   │   └── SearchBoxStyles.js
│   ├── SideMenu/
│   │   ├── SideMenu.js
│   │   └── SideMenuStyles.js
│   ├── ThemeProvider/
│   │   └── ThemeProvider.js
├── node_modules/
├── pages/
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth].js
│   ├── procedimentos/
│   │   ├── [id].js
│   │   ├── _app.js
│   │   ├── components.js
│   │   ├── index.js
│   │   ├── login.js
│   │   ├── MainLayout.js
│   │   ├── privacy.js
│   │   └── terms.js
├── public/
│   ├── .well-known/
│   │   └── microsoft-identity-association.json
│   ├── Assets/
│   │   └── .htaccess
│   ├── images/
│   │   ├── background.gif
│   │   └── googleeb9045c64dbe223.html
├── styles/
│   └── .env.local
├── .gitignore
├── .npmrc
├── .prettierignore
├── CHANGELOG.md
├── ISSUE_TEMPLATE.md
├── LICENSE.md
├── next.config.js
├── package-lock.json
├── package.json
└── README.md
```
# 📁 Descrição dos Diretórios:

- **.github/:** Arquivos de configuração e templates para o GitHub.

- **.next/:** Diretório gerado pelo Next.js contendo arquivos de build e execução.

- **componentes/:** Contém todos os componentes React do projeto, organizados em 
subdiretórios.

- **pages/:** Diretório que organiza as rotas do projeto, incluindo as páginas de API e as principais rotas.

- **public/:** Arquivos públicos e estáticos, incluindo imagens e outros arquivos acessíveis diretamente.

- **styles/:** Arquivos relacionados ao estilo e variáveis de ambiente.

- **node_modules/:** Diretório onde as dependências do projeto são instaladas.

- **README.md:** Documento principal com a documentação do projeto.

# 📝 Licença

Este projeto está licenciado sob os termos da MIT License. Para mais detalhes, consulte o arquivo [LICENSE](./LICENSE.md).

## 🚨 Projeto Descontinuado

Este projeto foi oficialmente descontinuado em **08 de outubro de 2024**. Ele está sendo mantido publicamente no GitHub apenas para fins de consulta e visualização do código fonte. Não haverá atualizações futuras, suporte técnico ou correções de segurança.

**Importante:**

- Não recomendamos o uso deste código em produção, pois ele pode conter vulnerabilidades ou funcionalidades desatualizadas.

- A coleta de dados e qualquer integração com serviços externos foram desativadas.

- O uso deste código é de sua inteira responsabilidade. Para detalhes adicionais, consulte os [Termos de Uso](./pages/terms.js) e a [Política de Privacidade](./pages/privacy.js).

---

## Backend do Projeto

O código-fonte completo do backend deste projeto pode ser acessado no repositório abaixo:

<p align="center">
  <a href="https://github.com/ESousa97/server.json" target="_blank">
    <img alt="Backend" src="https://img.shields.io/badge/GitHub-Backend-blue?style=for-the-badge&logo=github">
  </a>
</p>

---

