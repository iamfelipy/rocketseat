# BACK-END - TODO PREMIUM - JAVASCRIPT, EXPRESS, JEST

A API Todo Premium cobre funcionalidades  desde a criação de usuários e tarefas até a verificação de disponibilidade de criar novas tarefas para usuários em diferentes planos. Os testes são abrangentes, cobrindo cenários como criação de usuários, manipulação de tarefas e verificação de existência de conta de usuário e tarefa. Utiliza NODEJS, EXPRESS, JEST, JAVASCRIPT.

## Sumário

- [Tecnologias](#tecnologias)
- [Testes](#testes)
- [Instalação e execução do projeto](#instalacao-e-execução-do-projeto)
- [Links](#links)

## Tecnologias

- NODE v21.6.2
- EXPRESS
- JAVASCRIPT
- JEST

## Testes

#### Usuários:
- Deve ser capaz de criar um novo usuário.
- Não deve ser capaz de criar um novo usuário quando o nome de usuário já existe.
- Deve ser capaz de mostrar os dados do usuário.
#### Tarefas (TODOs):
- Deve ser capaz de listar todas as tarefas do usuário.
- Deve ser capaz de criar uma nova tarefa.
- Deve ser capaz de atualizar uma tarefa existente.
- Não deve ser capaz de atualizar uma tarefa que não existe.
- Deve ser capaz de marcar uma tarefa como concluída.
- Não deve ser capaz de marcar uma tarefa que não existe como concluída.
- Deve ser capaz de excluir uma tarefa.
- Não deve ser capaz de excluir uma tarefa que não existe.
#### Verificação de Disponibilidade de Criar Tarefas para o Usuário:
- Deve permitir que o usuário crie uma nova tarefa quando estiver no plano gratuito e tiver menos de dez tarefas.
- Não deve permitir que o usuário crie uma nova tarefa quando não for Pro e já tiver dez tarefas.
- Deve permitir que o usuário crie um número infinito de novas tarefas quando estiver no plano Pro.
#### Verificação de Existência de Conta de Usuário:
- Deve ser capaz de encontrar o usuário pelo nome de usuário no cabeçalho e passá-lo para request.user.
- Não deve ser capaz de encontrar um usuário que não existe pelo nome de usuário no cabeçalho.
#### Verificação de Existência de Tarefa:
- Deve ser capaz de colocar o usuário e a tarefa na requisição quando ambos existirem.
- Não deve ser capaz de colocar o usuário e a tarefa na requisição quando o usuário não existe.
- Não deve ser capaz de colocar o usuário e a tarefa na requisição quando o ID da tarefa não for um UUID válido.
- Não deve ser capaz de colocar o usuário e a tarefa na requisição quando a tarefa não existir.


## Instalação e execução do projeto

Clone o projeto

```bash
  git clone https://github.com/iamfelipy/rocketseat-2021-reactjs-nodejs
```

Entre no diretório do projeto

```bash
  cd  rocketseat-2021-reactjs-nodejs/ignite/nodejs/chapter-i/desafio-2
```

Instale as dependências

```bash
  npm install
```

Execute o projeto

```bash
  npm run dev
```

## Links


