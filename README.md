# Go Menu - Sistema de Cardápio

Sistema completo de gerenciamento de cardápio para restaurantes, com interface pública para visualização e painel administrativo para gestão.

## Funcionalidades

### Requisitos Funcionais Implementados

- RF01: Cadastro do usuário (dono de restaurantes)
- RF02: Autenticação do dono
- RF03: Gerenciamento de múltiplos restaurantes
- RF04: Link único por restaurante (via slug/UUID)
- RF05: Gerenciamento do cardápio (CRUD completo)
- RF06: Visualização pública do cardápio por link único
- RF07: Organização por categorias
- RF08: Validação de campos obrigatórios
- RF09: Logout do dono
- RF10: Busca de itens por nome ou categoria

### Requisitos Não Funcionais

- RNF01: Interface simples e intuitiva
- RNF02: Senhas protegidas com hash (bcrypt)
- RNF03: Página pública acessível sem login
- RNF04: Performance otimizada
- RNF05: Compatível com navegadores modernos
- RNF06: PostgreSQL como banco de dados
- RNF07: Sistema portável
- RNF08: Arquitetura simples e eficiente

## Tecnologias Utilizadas

### Backend
- Node.js com Express
- Prisma ORM
- PostgreSQL
- JWT para autenticação
- Bcrypt para hash de senhas

### Frontend
- React
- React Router para rotas
- Axios para requisições HTTP
- Vite como build tool

## Estrutura do Projeto

```
go-menu/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma (Modelos: Usuario, Restaurante, Categoria, Item)
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   ├── autenticacaoController.js
│   │   │   ├── restauranteController.js
│   │   │   ├── categoriaController.js
│   │   │   └── itemController.js
│   │   ├── helpers/
│   │   │   ├── token.js
│   │   │   ├── validacao.js
│   │   │   └── slug.js
│   │   ├── middlewares/
│   │   │   └── autenticacao.js
│   │   ├── routes/
│   │   │   ├── autenticacaoRoutes.js
│   │   │   ├── restauranteRoutes.js
│   │   │   ├── categoriaRoutes.js
│   │   │   ├── itemRoutes.js
│   │   │   └── index.js
│   │   ├── services/
│   │   │   ├── autenticacaoService.js
│   │   │   ├── restauranteService.js
│   │   │   ├── categoriaService.js
│   │   │   └── itemService.js
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── componentes/
    │   │   ├── Cabecalho.jsx
    │   │   ├── CartaoItem.jsx
    │   │   ├── ModalItem.jsx
    │   │   ├── ModalCategoria.jsx
    │   │   ├── ModalRestaurante.jsx
    │   │   └── RotaProtegida.jsx
    │   ├── contextos/
    │   │   └── AuthContext.jsx
    │   ├── paginas/
    │   │   ├── Login.jsx
    │   │   ├── Cadastro.jsx
    │   │   ├── SelecionarRestaurante.jsx
    │   │   ├── Dashboard.jsx
    │   │   └── CardapioPublico.jsx
    │   ├── servicos/
    │   │   ├── api.js
    │   │   ├── autenticacaoService.js
    │   │   ├── restauranteService.js
    │   │   ├── categoriaService.js
    │   │   └── itemService.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    └── package.json
```

## Instalação e Configuração

### Pré-requisitos

- Node.js (versão 16 ou superior)
- PostgreSQL instalado e rodando
- npm ou yarn

### Backend

1. Entre na pasta do backend:
```bash
cd backend
```

2. Instale as dependências:
```bash
npm install
```

3. Crie o arquivo `.env` baseado no `.env.example`:
```bash
cp .env.example .env
```

4. Configure as variáveis de ambiente no arquivo `.env`:
```
DATABASE_URL="postgresql://usuario:senha@localhost:5432/gomenu?schema=public"
JWT_SECRET="chave_secreta"
PORT=3001
```

5. Execute as migrations do Prisma:
```bash
npm run prisma:generate
npm run prisma:migrate
```

6. Inicie o servidor:
```bash
npm run dev
```

O backend estará rodando em: http://localhost:3001

### Frontend

1. Entre na pasta do frontend:
```bash
cd frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

O frontend estará rodando em: http://localhost:4000

## Uso do Sistema

### Fluxo do Usuário

1. **Cadastro/Login**
   - Acesse http://localhost:4000/cadastro para criar uma conta
   - Ou http://localhost:4000/login para entrar
   
2. **Gerenciar Restaurantes**
   - Após login, você verá a página de seleção de restaurantes
   - Crie um ou mais restaurantes
   - Cada restaurante terá um link único gerado automaticamente
   - Copie o link do cardápio para compartilhar com seus clientes

3. **Gerenciar Cardápio**
   - Acesse um restaurante para entrar no dashboard
   - Crie categorias (ex: Lanches, Bebidas, Sobremesas)
   - Adicione itens com nome, preço, descrição e categoria
   - Edite ou exclua itens conforme necessário

4. **Compartilhar Cardápio**
   - Copie o link único do seu restaurante
   - Exemplo: http://localhost:4000/cardapio/meu-restaurante-abc123
   - Envie para seus clientes via WhatsApp, redes sociais, etc.

### Acesso Público ao Cardápio

Qualquer pessoa com o link pode visualizar o cardápio:
- Ver todos os itens organizados por categoria
- Buscar itens por nome
- Filtrar por categoria
- Não precisa fazer login

## API Endpoints

### Autenticação
- POST `/api/autenticacao/cadastrar` - Cadastrar usuário
- POST `/api/autenticacao/entrar` - Login

### Restaurantes
- GET `/api/restaurantes` - Listar restaurantes do usuário (requer autenticação)
- GET `/api/restaurantes/:id` - Buscar restaurante por ID (requer autenticação)
- GET `/api/restaurantes/slug/:slug` - Buscar restaurante por slug (público)
- POST `/api/restaurantes` - Criar restaurante (requer autenticação)
- PUT `/api/restaurantes/:id` - Atualizar restaurante (requer autenticação)
- DELETE `/api/restaurantes/:id` - Excluir restaurante (requer autenticação)

### Categorias
- GET `/api/categorias/:restauranteId` - Listar categorias do restaurante
- POST `/api/categorias/:restauranteId` - Criar categoria (requer autenticação)
- PUT `/api/categorias/:restauranteId/:id` - Atualizar categoria (requer autenticação)
- DELETE `/api/categorias/:restauranteId/:id` - Excluir categoria (requer autenticação)

### Itens
- GET `/api/itens/publico/:restauranteId` - Listar itens públicos do restaurante
- GET `/api/itens/:restauranteId` - Listar itens (requer autenticação)
- GET `/api/itens/:restauranteId/:id` - Buscar item por ID
- POST `/api/itens/:restauranteId` - Criar item (requer autenticação)
- PUT `/api/itens/:restauranteId/:id` - Atualizar item (requer autenticação)
- DELETE `/api/itens/:restauranteId/:id` - Excluir item (requer autenticação)

## Arquitetura

### Backend (Arquitetura em Camadas)

- **Routes**: Define os endpoints da API
- **Controllers**: Processa as requisições e respostas HTTP
- **Services**: Contém a lógica de negócio
- **Helpers**: Funções utilitárias (validação, tokens, slug)
- **Middlewares**: Autenticação JWT e validações
- **Config**: Configuração do Prisma Client

### Banco de Dados (Relacional)

- **Usuario**: Dono de restaurantes
  - Um usuário pode ter vários restaurantes
- **Restaurante**: Estabelecimento
  - Cada restaurante tem um slug único para link público
  - Um restaurante pertence a um usuário
  - Um restaurante tem várias categorias e itens
- **Categoria**: Organização do cardápio
  - Cada categoria pertence a um restaurante
  - Uma categoria pode ter vários itens
- **Item**: Produto do cardápio
  - Cada item pertence a um restaurante e a uma categoria

## Segurança

- Senhas armazenadas com hash bcrypt
- Autenticação via JWT
- Rotas protegidas com middleware de autenticação
- Validação de dados em todas as requisições

## Licença

MIT
