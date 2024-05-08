# BACK-END - FINAPI - NODEJS, EXPRESS, JAVASCRIPT

O FINAPI é uma API para controle financeiro que permite aos usuários criar e gerenciar contas bancárias, realizar transações como depósitos e saques, além de consultar extratos e saldos. Desenvolvido em Node.js com Express e JavaScript.

## Sumário

- [Tecnologias](#tecnologias)
- [Requisitos](#requisitos)
- [Regras de negócio](#regras-de-negócio)
- [Instalação e execução do projeto](#instalacao-e-execução-do-projeto)
- [Links](#links)

## Tecnologias

- NODE v21.6.2
- EXPRESS
- JAVASCRIPT

## Requisitos
- Deve ser possível criar uma conta
- Deve ser possível buscar o extrato bancário do cliente
- Deve ser possível realizar um deposito
- Deve ser possível realizar um saque
- Deve ser possível buscar o extrato bancário do cliente por data
- Deve ser possível atualizar dados da conta do cliente
- Deve ser possível obter dados da conta do cliente
- Deve ser possível deletar uma conta

## Regras de negócio
- Não deve ser possível cadastrar uma conta com CPF já existente
- Não deve ser possível buscar extrato em uma conta não existente
- Não deve ser possível fazer depósito em uma conta não existente
- Não deve ser possível fazer saque em uma conta não existente
- Não deve ser possível fazer saque quando o saldo for suficiente
- Não deve ser possível excluir uma conta não existente


## Instalação e execução do projeto

Clone o projeto

```bash
  git clone https://github.com/iamfelipy/rocketseat-2021-reactjs-nodejs
```

Entre no diretório do projeto

```bash
  cd  rocketseat-2021-reactjs-nodejs/ignite/nodejs/chapter-i/primeiro-projeto-com-nodejs/FINAPI
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



