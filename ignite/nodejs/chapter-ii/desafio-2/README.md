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

#### Categories

| Método | Endpoint       | Descrição                |
|--------|----------------|--------------------------|
| POST   | /users    | Criar um novo usuário.     |
| GET    | /users    | Listar todos os usuários. É necessário ser administrador. |
| POST   | /users/{user_id}/admin | Atualizar usuário para administrador |
| GET   | /users/{user_id} | Encontrar usuário pelo ID |


## Links
