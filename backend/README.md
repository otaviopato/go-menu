# Backend Go Menu

Sistema de cardápio - Backend

## Instalação

```bash
npm install
```

## Configuração

Crie um arquivo `.env` baseado no `.env.example`:

```bash
DATABASE_URL="postgresql://usuario:senha@localhost:5432/gomenu?schema=public"
JWT_SECRET="sua_chave_secreta_aqui_muito_segura_12345"
PORT=3001
```

## Executar migrations

```bash
npm run prisma:generate
npm run prisma:migrate
```

## Rodar o projeto

```bash
npm run dev
```

## Endpoints

### Autenticação
- POST `/api/autenticacao/cadastrar` - Cadastrar usuário
- POST `/api/autenticacao/entrar` - Login

### Restaurantes
- GET `/api/restaurantes` - Listar restaurantes do usuário (autenticado)
- GET `/api/restaurantes/:id` - Buscar restaurante por ID (autenticado)
- GET `/api/restaurantes/slug/:slug` - Buscar restaurante por slug (público)
- POST `/api/restaurantes` - Criar restaurante (autenticado)
- PUT `/api/restaurantes/:id` - Atualizar restaurante (autenticado)
- DELETE `/api/restaurantes/:id` - Excluir restaurante (autenticado)

### Categorias
- GET `/api/categorias/:restauranteId` - Listar categorias do restaurante
- POST `/api/categorias/:restauranteId` - Criar categoria (autenticado)
- PUT `/api/categorias/:restauranteId/:id` - Atualizar categoria (autenticado)
- DELETE `/api/categorias/:restauranteId/:id` - Excluir categoria (autenticado)

### Itens
- GET `/api/itens/publico/:restauranteId` - Listar itens públicos
- GET `/api/itens/:restauranteId` - Listar itens (autenticado)
- GET `/api/itens/:restauranteId/:id` - Buscar item por ID
- POST `/api/itens/:restauranteId` - Criar item (autenticado)
- PUT `/api/itens/:restauranteId/:id` - Atualizar item (autenticado)
- DELETE `/api/itens/:restauranteId/:id` - Excluir item (autenticado)

