import * as React from 'react';
import { Product } from '../../models/Product';
import { ProductPreview } from './ProductPreview';

const ProductsEmpty = () => (
  <div className="products__empty-message col-xs-12 center-xs">
    <h3>Neboli nájdené žiadne produkty vyhovújuce filtru...</h3>
  </div>
);

interface IProps {
  products: Product[],
}

export const ProductsListing: React.SFC<IProps> = ({ products }) => {
  return (
    <div className="row products__items">
      {products && products.length
        ? products.map((product: Product) => <ProductPreview key={product.system.codename} product={product} />)
        : <ProductsEmpty />
      }
    </div>
  );
};
