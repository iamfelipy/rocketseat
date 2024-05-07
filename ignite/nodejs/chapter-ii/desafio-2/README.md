# BACK-END - GESTÃO DE USUÁRIOS - NODE, TYPESCRIPT, EXPRESS, SWAGGER, ESLINT, PRETTIER, JEST

Este projeto de back-end foi desenvolvido utilizando Node.js e TypeScript, juntamente com o framework Express para criar uma API robusta de gestão de usuários. Com integração do Swagger, ESLint e Prettier para uma melhor organização e documentação do código, e testes automatizados usando Jest para garantir a confiabilidade da aplicação. As funcionalidades incluem a criação de usuários, listagem de todos os usuários, busca por usuário específico e atribuição de privilégios administrativos.

Clean Architecture (Arquitetura Limpa), Repository Pattern (padrão de design de arquitetura, controla o acesso e a manipulação de dados, interface de alto nível), swagger (api com documentação), Singleton (padrão de design criacional, instância única de uma classe) 

## Tecnologias Utilizadas

- NODE
- TYPESCRIPT
- EXPRESS
- SWAGGER
- ESLINT
- PRETTIER
- JEST

## Funcionalidades


- Criar Usuário: Permite a criação de um novo usuário na plataforma, fornecendo informações como nome, email e senha.
- Listar Todos os Usuários: Retorna uma lista contendo todos os usuários cadastrados na aplicação, incluindo detalhes como nome, email e informações adicionais.
- Buscar Usuário Específico: Permite a busca por um usuário específico com base em seu ID ou outras informações identificadoras, como nome ou email.
- Tornar o Usuário Administrador: Habilita a atribuição de privilégios administrativos a um usuário existente, concedendo acesso a funcionalidades avançadas e recursos exclusivos.

## Documentação da API - Endpoints

#### /users

| Método | Endpoint       | Descrição                |
|--------|----------------|--------------------------|
| POST   | /users    | Criar um novo usuário.     |
| GET    | /users    | Listar todos os usuários. É necessário ser administrador. |
| POST   | /users/{user_id}/admin | Atualizar usuário para administrador |
| GET   | /users/{user_id} | Encontrar usuário pelo ID |

## Testes

#### **Rotas**

[POST] /usuários
- Deve ser capaz de criar novos usuários
- Não deve ser capaz de criar novos usuários quando o e-mail já está em uso
[PATCH] /usuários/:user_id/admin
- Deve ser capaz de tornar um usuário um administrador
- Não deve ser capaz de tornar um usuário inexistente um administrador
[GET] /usuários/:user_id
- Deve ser capaz de obter o perfil do usuário pelo ID
- Não deve ser capaz de mostrar o perfil de um usuário inexistente
[GET] /usuários
- Deve ser capaz de listar todos os usuários
- Um usuário não administrador não deve ser capaz de obter a lista de todos os usuários
- Um usuário não existente não deve ser capaz de obter a lista de todos os usuários
- Um usuário não existente não deve ser capaz de obter a lista de todos os usuários

#### **Modelo de Usuário**

- Deve ser capaz de criar um usuário com todas as propriedades

#### **Repositório de Usuários**

- Deve ser capaz de criar novos usuários
- Deve ser capaz de listar todos os usuários
- Deve ser capaz de encontrar um usuário por ID
- Deve ser capaz de encontrar um usuário pelo endereço de e-mail
- Deve ser capaz de tornar um usuário um administrador

#### **UseCase de Criar Usuário**

- Deve ser capaz de criar novos usuários
- Não deve ser capaz de criar novos usuários quando o e-mail já está em uso

#### **UseCase de Listar Todos os Usuários**

- Deve ser capaz de listar todos os usuários
- Um usuário não administrador não deve ser capaz de obter a lista de todos os usuários
- Um usuário não existente não deve ser capaz de obter a lista de todos os usuários

#### **UseCase de Exibir Perfil do Usuário**

- Deve ser capaz de obter o perfil do usuário pelo ID
- Não deve ser capaz de mostrar o perfil de um usuário inexistente

#### **UseCase de Tornar Usuário Administrador**

- Deve ser capaz de tornar um usuário um administrador
- Não deve ser capaz de tornar um usuário inexistente um administrador

## Links
