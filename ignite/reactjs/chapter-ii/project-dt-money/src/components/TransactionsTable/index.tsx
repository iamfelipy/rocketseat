import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Container } from './styles';

interface ITransaction {
  title: string;
  value: number;
  category: string;
  type: string;
};

export function Transactions() {

  const [transactions, setTransactions] = useState<ITransaction[] | []>([]);

  useEffect(() => {
    api.get('/transactions')
      .then(response => setTransactions(response.data));

    console.log(transactions);
  }, []);

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {/* <tr>
            <td className="title">Desenvolvimento de website</td>
            <td className="deposit">R$12.000</td>
            <td>Desenvolvimento</td>
            <td>20/02/2021</td>
          </tr>
          <tr>
            <td className="title">Aluguel</td>
            <td className="withdraw">R$1.100</td>
            <td>Casa</td>
            <td>17/02/2021</td>
          </tr> */}
          {/* {transactions.map(
            transaction => (
                <tr>
                  <td className="title">{transaction.title}</td>
                  <td className="deposit">R${transaction.value}</td>
                  <td>{transaction.category}</td>
                  <td>20/02/2021</td>
                </tr>
            )
          )} */}
        </tbody>
      </table>
    </Container>
  );
}