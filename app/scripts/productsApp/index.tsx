import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ProductsApp } from './ProductsApp';

const container = document.getElementById('produkty');
if (!!container) {
  ReactDOM.render(
    <ProductsApp />,
    container
  );
}
