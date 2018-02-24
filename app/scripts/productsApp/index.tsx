import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ProductsApp } from './ProductsApp';

console.info('Bootstrapping Products app');
ReactDOM.render(
  <ProductsApp/>,
  document.getElementById('products-app')
);
