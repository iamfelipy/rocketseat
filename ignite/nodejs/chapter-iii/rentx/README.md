# BACK-END - CAR RENT - TYPESCRIPT, EXPRESS, TYPEORM, SWAGGER, DECORATOR, TSYRINGE, SINGLETON, DOCKER

![diagrama do projeto](https://github.com/iamfelipy/rocketseat-2021-reactjs-nodejs/blob/main/ignite/nodejs/chapter-iii/rentx/diagrama-projeto.png?raw=true)

O Car Rent é uma API robusta para gerenciamento de aluguéis de carros, construída com Clean Architecture, seguindo os princípios SOLID e utilizando o padrão Repository para separação de responsabilidades. A documentação da API é fornecida pelo Swagger, facilitando sua utilização e entendimento. Além disso, a aplicação faz uso do padrão Singleton para garantir a instanciação única de certos objetos. As tecnologias empregadas incluem Node.js, Express.js, JSON Web Token (JWT) para autenticação, Multer para upload de arquivos, PostgreSQL (PG) para o banco de dados, TypeORM para mapeamento objeto-relacional, e ferramentas de qualidade de código como Eslint e Prettier. O projeto é empacotado e distribuído com Docker, garantindo portabilidade e fácil deploy.

Clean Architecture (Arquitetura Limpa), SOLID, Repository Pattern (padrão de design de arquitetura,  controla o acesso e a manipulação de dados, interface de alto nível), swagger (api com documentação), Singleton (padrão de design criacional, instância única de uma classe) 


## Tecnologias Utilizadas

- NODE 
- EXPRESS
- EXPRESS-ASYNC-ERRORS
- JSONWEBTOKEN
- MULTER
- PG
- SWAGGER-UI-EXPRESS
- TSYRINGE
- TYPEORM
- ESLINT
- PRETTIER
- DOCKER

## Funcionalidades

#### Funcionalidades do Módulo de Contas:

- Autenticar Usuário: O sistema permite que os usuários façam login, autenticando-se com suas credenciais de email e senha.
- Criação de Usuário: Os usuários podem se cadastrar na plataforma, fornecendo informações como nome, email e senha.
- Listar Usuários: O sistema disponibiliza uma funcionalidade para listar todos os usuários cadastrados, apresentando seus detalhes como nome, email e outras informações relevantes.
- Procurar Usuário por Email: Os usuários podem ser pesquisados por meio do seu endereço de email.
- Procurar Usuário por ID: O sistema oferece a capacidade de buscar um usuário específico com base no seu ID único.
- Atualizar Avatar do Usuário: Os usuários têm a opção de atualizar sua imagem de perfil (avatar), fazendo o upload de uma nova imagem para representá-los na plataforma.

#### Funcionalidades do Módulo de Carros:

- Criar uma Categoria: Os administradores podem criar novas categorias de carros, definindo seus nomes e características específicas.
- Criar uma Especificação: É possível adicionar novas especificações para as categorias de carros, como modelo, ano, cor, entre outros detalhes.
- Importar uma Categoria: Os administradores têm a capacidade de importar categorias de carros em massa, utilizando arquivos de dados previamente preparados.
- Listar Todas as Categorias: O sistema disponibiliza uma lista completa de todas as categorias de carros cadastradas, apresentando seus detalhes e características.
- Listar Todas as Especificações: É possível visualizar todas as especificações disponíveis para os carros cadastrados, apresentando detalhes como modelo, ano, cor, etc.

## Documentação da API - Endpoints

### Categories

| Método | Endpoint       | Descrição                |
|--------|----------------|--------------------------|
| POST   | /categories    | Criar uma categoria      |
| GET    | /categories    | Listar todas as categorias|
| POST   | /categories/import | Fazer upload de uma nova categoria |

#### Cria uma nova categoria.
```
POST /categories
```


**Corpo da Requisição:**

```
{
  "name": "Nome da categoria",
  "description": "Descrição da categoria"
}
```

**Respostas:**

- 201 Created: Categoria criada com sucesso.
- 500 Error: A categoria já existe.

#### Lista todas as categorias disponíveis.

```
GET /categories
```


**Respostas:**

200 Success: Lista de categorias retornada com sucesso.

### Specifications

| Método | Endpoint       | Descrição                |
|--------|----------------|--------------------------|
| POST   | /specifications    | Criar uma especificação      |

#### Cria uma nova especificação.
```
POST /specifications
```

**Corpo da Requisição:**

```
{
  "name": "Nome da especificação",
  "description": "Descrição da especificação"
}
```

**Respostas:**

- 201 Created: Especificação criada com sucesso.
- 500 Error: A especificação já existe.

## Links
