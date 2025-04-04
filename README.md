# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

```
drip
├─ cypress
│  ├─ e2e
│  │  ├─ login.cy.js
│  │  └─ register.cy.js
│  ├─ fixtures
│  │  └─ example.json
│  └─ support
│     ├─ commands.js
│     └─ e2e.js
├─ cypress.config.js
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ README.md
├─ src
│  ├─ api
│  │  └─ index.js
│  ├─ App.css
│  ├─ App.jsx
│  ├─ components
│  │  ├─ layout
│  │  │  ├─ Header.jsx
│  │  │  └─ Layout.jsx
│  │  └─ ui
│  │     ├─ AlertModal.jsx
│  │     ├─ CadastroForm.jsx
│  │     ├─ CardCategoria.jsx
│  │     ├─ ConfirmDeleteModal.jsx
│  │     ├─ FloatingButton.jsx
│  │     ├─ InputSearch.jsx
│  │     ├─ LoadingBackDrop.jsx
│  │     ├─ LoginForm.jsx
│  │     ├─ ModalCategoria.jsx
│  │     ├─ ModalReutilizavel.jsx
│  │     └─ TableComponent.jsx
│  ├─ context
│  │  └─ AuthContext.jsx
│  ├─ index.css
│  ├─ main.jsx
│  ├─ pages
│  │  ├─ CadastroPage
│  │  │  └─ index.jsx
│  │  ├─ Categorias
│  │  │  └─ index.jsx
│  │  ├─ Home
│  │  │  └─ index.jsx
│  │  ├─ LoginPage
│  │  │  └─ index.jsx
│  │  ├─ Marcas
│  │  │  └─ index.jsx
│  │  └─ Produtos
│  │     └─ index.jsx
│  ├─ routes
│  │  ├─ app.routes.jsx
│  │  ├─ private.routes.jsx
│  │  └─ public.routes.jsx
│  ├─ services
│  │  ├─ categoriaServices.js
│  │  ├─ loginService.js
│  │  ├─ marcasServices.js
│  │  ├─ produtosServices.js
│  │  └─ usuarioServices.js
│  └─ utils
│     ├─ formatarDataEHora.js
│     ├─ formatarParaBRL.js
│     └─ MediaQuery.jsx
└─ vite.config.js

```