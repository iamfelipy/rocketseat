import React, { useContext } from 'react';
import { Container } from "./styles";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import totalImg from "../../assets/total.svg";
import { TransactionsContext } from "../../TransactionsContext";

export function Summary() {
  //componente é recarregado quando o contexto muda
  const transactions = useContext(TransactionsContext);

  console.log('------------------------------');
  console.log('Transações: summary');
  console.log(transactions)
  console.log('------------------------------');
  
  return (
    <Container>
      {
      /*
        versão antiga do usoContext
       <TransactionsContext.Consumer>
            {(data) => {
              console.log(data);
              return <p>ok</p>
            }}
          </TransactionsContext.Consumer> */}
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Entradas" />
        </header>
        <strong>
          {Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(1000.00)}
        </strong>
      </div>
      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt="Saídas" />
        </header>
        <strong>
          {Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(-500)}
        </strong>
      </div>
      <div className="highlight-background">
        <header>
          <p>Saídas</p>
          <img src={totalImg} alt="Total" />
        </header>
        <strong>
          {
            Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(500)
          }
        </strong>
      </div>
    </Container>
  );
}