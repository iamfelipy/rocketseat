import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';
import { App } from './App';

createServer({
  //banco de dados
  models: {
    transaction: Model,
  },
  //inicializar bancos com valores pre-definidos
  seeds(server){
    server.db.loadData({
      //sempre o nome do model no plural
      transactions: [
        {
          id: 1,
          title: 'Freelance de website',
          type: 'deposit',
          category: 'Dev',
          amount: 100000,
          createdAt: new Date('2021-12-06 07:00:00')
        },
        {
          id:2,
          title: 'z-1000',
          type: 'withdraw',
          category: 'Dream',
          amount: 60000,
          createdAt: new Date('2021-12-06 07:00:00')
        }
      ]
    })
  },
  routes() {
    //tudo que for feito api/ sera lido pelo miragejs
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction');
    });

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create('transaction', data);
    });
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);