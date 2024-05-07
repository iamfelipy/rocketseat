# BACK-END - TYPEORM - ORM, QUERY BUILDER E RAW QUERY

Nesse projeto o objetivo é testar os recursos do TYPEORM como ORM, QUERY BUILDER e RAW QUERY.

A aplicação possui dois módulos: `users` e `games`. Um **usuário** pode ter vários jogos e um mesmo **jogo** pode estar associado a vários usuários.

# Conteúdo

- [Tecnologias](#tecnologias)
- [Funcionalidades](#funcionalidades)
- [Testes](#testes)
- [Instalação e execução do projeto](#instalação-e-execução-do-projeto)
- [Links](#links)

## Tecnologias

- NODE
- TYPESCRIPT
- TYPEORM
- PG (PostgreSQL)
- JEST

## Funcionalidades

- Encontrar usuário com lista de jogos por ID: Permite encontrar um usuário junto com a lista de jogos associada ao seu ID.
- Listar usuários ordenados por Nome: Permite listar os usuários ordenados por seus primeiros nomes.
- Encontrar usuário pelo nome completo: Permite encontrar um usuário pelo seu nome completo.
- Encontrar jogo por título: Permite encontrar um jogo pelo título completo ou parcial fornecido.
- Obter contagem total de jogos: Permite obter o número total de jogos disponíveis.
- Listar usuários por ID de jogo: Permite listar os usuários que possuem um determinado ID de jogo.

## Testes

#### Repositories:

- [UsersRepository] Deve ser capaz de encontrar o usuário com lista de jogos pelo ID do usuário.
- [UsersRepository] Deve ser capaz de listar usuários ordenados por primeiro nome.
- [UsersRepository] Deve ser capaz de encontrar o usuário pelo nome completo.
- [GamesRepository] Deve ser capaz de encontrar um jogo pelo título completo ou parcial fornecido.
- [GamesRepository] Deve ser capaz de obter o total de jogos.
- [GamesRepository] Deve ser capaz de listar usuários que possuem o ID do jogo fornecido.

## Instalação e execução do projeto

Clone o projeto

```bash
  git clone https://github.com/iamfelipy/rockseat-nodejs-chapter-iii-desafio1
```

Entre no diretório do projeto

```bash
  cd  rockseat-nodejs-chapter-iii-desafio1
```

Instale as dependências

```bash
  npm install
```

## Links

[Notion rocketseat descrição do desafio](https://www.notion.so/Desafio-01-Database-Queries-8d97dae581d5446e97555c43d301ee45#72df8690911b44aaa4fd40ac9da3408f)
