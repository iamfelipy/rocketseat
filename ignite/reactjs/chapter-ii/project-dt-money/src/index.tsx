import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';
import { App } from './App';

createServer({
  models: {
    transaction: Model,
  },
  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transactions');
    });

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);

      // {
      //   id:1,
      //   title: 'Transaction 1',
      //   amount: 400,
      //   type: 'deposit',
      //   category: 'Food',
      //   createdAt: new Date()
      // }

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