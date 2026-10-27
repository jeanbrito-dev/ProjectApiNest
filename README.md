# API de Produtos e Categorias

API REST desenvolvida com NestJS, Prisma ORM 7 e SQLite para cadastrar e consultar produtos e categorias.

## Requisitos

- Node.js e npm

## Após clonar o projeto

Na pasta do projeto, instale as dependências:

```bash
npm ci
```

Crie o arquivo de configuração local a partir do exemplo:

```bash
cp .env.example .env
```

O exemplo configura o SQLite local em `dev.db`. Esse banco é criado na primeira execução das migrations e não deve ser compartilhado pelo Git.

Aplique as migrations e gere o Prisma Client:

```bash
npx prisma migrate deploy --config prisma7.config.ts
npx prisma generate --config prisma7.config.ts
```

## Executar o servidor

Inicie a API em modo de desenvolvimento:

```bash
npm run start:dev
```


Mantenha esse terminal aberto enquanto usar a API. Por padrão, ela fica disponível em <http://localhost:3000>. Para usar outra porta, defina `PORT` no `.env`.

## Testar com Bruno no VS Code

Também é possível executar as requisições da pasta `ConsultasBruno` pelo VS Code:

1. Instale a extensão **Bruno** pela aba Extensions do VS Code.
2. Abra a pasta `ConsultasBruno` como uma collection no Bruno.
3. Com o servidor iniciado (`npm run start:dev`), selecione uma requisição e envie-a. As requisições da collection usam `http://localhost:3000`.

A collection inclui exemplos de criação e listagem de produtos e categorias. Os arquivos `.yml` podem ser editados para ajustar as requisições.

## Rotas

### Produtos

| Método | Rota | Ação |
|---|---|---|
| `GET` | `/produto` | Lista produtos com suas categorias |
| `GET` | `/produto/:id` | Busca um produto |
| `POST` | `/produto` | Cadastra um produto |
| `PATCH` | `/produto/:id` | Atualiza parcialmente um produto |
| `DELETE` | `/produto/:id` | Rota existente; a exclusão ainda não está implementada |

Exemplo de cadastro:

```bash
curl -X POST http://localhost:3000/produto \
  -H "Content-Type: application/json" \
  -d '{"nome":"Caderno","descricao":"Capa dura","preco":19.9,"estoque":10}'
```

### Categorias

| Método | Rota | Ação |
|---|---|---|
| `GET` | `/categoria` | Lista categorias |
| `GET` | `/categoria/:id` | Busca uma categoria |
| `POST` | `/categoria` | Cadastra uma categoria |
| `PATCH` | `/categoria/:id` | Atualiza parcialmente uma categoria |
| `DELETE` | `/categoria/:id` | Exclui uma categoria |

Exemplo de cadastro:

```bash
curl -X POST http://localhost:3000/categoria \
  -H "Content-Type: application/json" \
  -d '{"nome":"Papelaria"}'
```

## Banco de dados e migrations

O schema Prisma está em `prisma/schema.prisma`, e as migrations versionadas estão em `prisma/migrations/`. O banco SQLite local (`dev.db`) e o Prisma Client gerado não são versionados.

Ao alterar o schema durante o desenvolvimento, crie e aplique uma migration:

```bash
npx prisma migrate dev --name descricao_da_alteracao --config prisma7.config.ts
npx prisma generate --config prisma7.config.ts
```

Em ambientes de deploy, aplique as migrations já existentes com `prisma migrate deploy`; não crie migrations novas no ambiente de produção.

## Testes e build

```bash
npm test
npm run test:e2e
npm run lint
npm run build
```
