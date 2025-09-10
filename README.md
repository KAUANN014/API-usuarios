# API de Usuários - CRUD com Express, Sequelize e JWT

## Descrição
API RESTful para gerenciar usuários, com operações CRUD (Create, Read, Update, Delete), autenticação JWT, validações de entrada, testes unitários e documentação via Swagger.

---

## Tecnologias Utilizadas
- Node.js
- Express
- Sequelize (MySQL/PostgreSQL/SQLite)
- JWT (JSON Web Token)
- express-validator
- Jest e Supertest (testes unitários)
- Swagger (OpenAPI)

---

## Estrutura do Projeto
src/
├── app.js
├── controllers/
│ └── userController.js
├── models/
│ └── user.models.js
├── routes/
│ ├── userRouter.js
│ └── authRouter.js
├── middlewares/
│ └── authMiddlewares.js
└── tests/
├── userController.test.js
└── userRoutes.test.js
config/
├── database.js
swagger.json
package.json

yaml
Copiar código

---

## Instalação
1. Clone o repositório:
```bash
git clone <URL_DO_REPOSITORIO>
cd api-usuarios
Instale as dependências:

bash
Copiar código
npm install
Configure o banco de dados em config/database.js.

Executando a API
bash
Copiar código
npm run dev
O servidor será iniciado em: http://localhost:3000

Endpoints
Usuários
Método	Endpoint	Descrição	Autorização
POST	/users	Cria um novo usuário	Opcional
POST	/auth/login	Usuário faz login e recebe token	Opcional
GET	/users	Lista todos os usuários	JWT
GET	/users/:id	Retorna usuário pelo ID	JWT
PUT	/users/:id	Atualiza completamente um usuário	JWT
PATCH	/users/:id	Atualiza parcialmente um usuário	JWT
DELETE	/users/:id	Deleta um usuário	JWT

Exemplo POST /users
json
Copiar código
{
  "nome": "João",
  "email": "joao@email.com",
  "senha": "12345678"
}
Responses:

201 Created: Usuário criado


422 Unprocessable Entity: Dados inválidos

GET /users
Response: 200 OK - Lista de usuários

GET /users/:id
200 OK: Usuário encontrado

404 Not Found: Usuário não encontrado

PUT /users/:id
Request Body: Igual ao POST

Responses:

200 OK: Atualizado

404 Not Found: Usuário não encontrado

PATCH /users/:id
Request Body: Campos a serem alterados

Responses:

200 OK: Atualizado

404 Not Found: Usuário não encontrado

DELETE /users/:id
Responses:

200 OK: Usuário deletado

404 Not Found: Usuário não encontrado

Autenticação - POST /auth/login
Request Body:

json
Copiar código
{
  "email": "joao@email.com",
  "senha": "12345678"
}
Responses:

200 OK: Token JWT

401 Unauthorized: Credenciais inválidas

Testes Unitários
Para rodar os testes:

bash
Copiar código
npm test
Cobrem:

Atualização via PUT e PATCH

Exclusão de usuários

Login e autenticação JWT

Atenção: Os testes criam e deletam usuários temporários. Não use o banco de produção.

Documentação
Swagger disponível em:

bash
Copiar código
http://localhost:3000/api-docs
Observações
Boas práticas REST: verbos, status HTTP e mensagens de erro claros.

Validações robustas com express-validator.

Rotas de escrita protegidas com JWT.

Testes unitários garantem funcionalidade correta.

Equipe
Kauan Oliveira (Desenvolvedor)
