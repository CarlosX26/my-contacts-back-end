# MY CONTACTS

Este é um sistema CRUD de clientes e contatos, que permite que um cliente realize tarefas CRUD em seus contatos. Além disso, o cliente também pode atualizar seu próprio perfil e outras informações relacionadas.

## Rodando localmente

Clone o projeto

```bash
  git clone git@github.com:CarlosX26/crud-clients-contacts.git
```

Entre no diretório do projeto

```bash
  cd crud-clients-contacts
```

Instale as dependências

```bash
  yarn
```

Inicie o servidor

```bash
  yarn dev
```

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`POSTGRESQL_DB_URL`

`SECRET_KEY`

`SALT_HASH`

## Documentação da API

#### Autenticação

```http
  POST /auth
```

#### body

```json
{
  "email": "carl@mail.com",
  "password": "1234"
}
```

#### resposta

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Nzk4NTk1ODEsImV4cCI6MTY3OTg2MzE4MSwic3ViIjoiMjJjMjQ2MTAtNjJjYS00YmRmLWIyMWEtYTE3MDljYmY4ZTBmIn0.D-cMFk3m113AX80GqbZNz5KeHBh3pqT-skMvQnTYAQ0"
}
```

#### Cria um cliente

```http
  POST /clients
```

#### body

```json
{
  "fullName": "Carlos",
  "email": "carl@mail.com",
  "phoneNumber": "12345678903",
  "password": "1234"
}
```

#### resposta

```json
{
  "fullName": "Carlos",
  "email": "carl@mail.com",
  "phoneNumber": "12345678903",
  "createdAt": "2023-03-23T13:01:03.740Z",
  "id": "22c24610-62ca-4bdf-b21a-a1709cbf8e0f"
}
```

#### Retorna perfil do cliente

```http
  GET /clients/profile
```

#### resposta

```json
{
  "fullName": "Carlos Jr.",
  "email": "carl@mail.com",
  "phoneNumber": "12345678903",
  "createdAt": "2023-03-21T22:32:13.737Z",
  "id": "49d88d5e-3ff2-40c4-8d32-1ecbfe0874bd"
}
```

| Parâmetro      | Tipo     | Descrição                                      |
| :------------- | :------- | :--------------------------------------------- |
| `Bearer token` | `string` | **Obrigatório**. token do cliente autenticado. |

#### Atualizar perfil do cliente

```http
  PATCH /clients/profile
```

#### body

```json
{
  "fullName": "Carlos Jr.",
  "email": "carl@mail.com",
  "phoneNumber": "12345678903",
  "password": "1234"
}
```

#### resposta

```json
{
  "fullName": "Carlos Jr.",
  "email": "carl@mail.com",
  "phoneNumber": "12345678903",
  "createdAt": "2023-03-21T22:32:13.737Z",
  "id": "49d88d5e-3ff2-40c4-8d32-1ecbfe0874bd"
}
```

| Parâmetro      | Tipo     | Descrição                                      |
| :------------- | :------- | :--------------------------------------------- |
| `Bearer token` | `string` | **Obrigatório**. token do cliente autenticado. |

#### Deletar perfil do cliente

```http
  DELETE /clients/profile
```

#### resposta status code 204

| Parâmetro      | Tipo     | Descrição                                      |
| :------------- | :------- | :--------------------------------------------- |
| `Bearer token` | `string` | **Obrigatório**. token do cliente autenticado. |

#### Cria um cliente

```http
  POST /contacts
```

#### body

```json
{
  "fullName": "Contato",
  "email": "contact@mail.com",
  "phoneNumber": "12345678906"
}
```

#### resposta

```json
{
  "fullName": "Contato",
  "email": "contact@mail.com",
  "phoneNumber": "12345678906"
}
```

| Parâmetro      | Tipo     | Descrição                                      |
| :------------- | :------- | :--------------------------------------------- |
| `Bearer token` | `string` | **Obrigatório**. token do cliente autenticado. |

#### Listar todos os contactos.

```http
  GET /contacts
```

#### resposta

```json
[
  {
    "id": "b058127a-893e-452c-af07-19ea4a5c7d99",
    "fullName": "Contato",
    "email": "contact@mail.com",
    "phoneNumber": "12345678906",
    "createdAt": "2023-03-23T13:01:27.874Z"
  }
]
```

| Parâmetro      | Tipo     | Descrição                                      |
| :------------- | :------- | :--------------------------------------------- |
| `Bearer token` | `string` | **Obrigatório**. token do cliente autenticado. |

#### Atualizar Contato.

```http
  PATCH /contacts/:id
```

#### body

```json
{
  "fullName": "Contato",
  "email": "contact@mail.com",
  "phoneNumber": "12345678906"
}
```

#### resposta

```json
{
  "id": "f7abbe62-3de0-45ee-9491-c3bebac83086",
  "fullName": "Contato11",
  "email": "contact@mail.com",
  "phoneNumber": "12345678906",
  "createdAt": "2023-03-22T13:49:17.880Z"
}
```

| Parâmetro      | Tipo     | Descrição                                      |
| :------------- | :------- | :--------------------------------------------- |
| `Bearer token` | `string` | **Obrigatório**. token do cliente autenticado. |

#### Atualizar Contato.

```http
  DELETE /contacts/:id
```

#### resposta status code 204

| Parâmetro      | Tipo     | Descrição                                      |
| :------------- | :------- | :--------------------------------------------- |
| `Bearer token` | `string` | **Obrigatório**. token do cliente autenticado. |

## Stack utilizada

**Front-end:** React, Chakra UI e TypeScript

**Back-end:** Node, Express e PostgreSQL
