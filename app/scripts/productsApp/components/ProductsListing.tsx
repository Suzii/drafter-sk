import * as React from 'react';
import { Product } from '../../models/Product';
import { ProductPreview } from './ProductPreview';

interface IProps {
  products: Product[],
}

export const ProductsListing: React.SFC<IProps> = ({ products }) => {
  return (
    <div className="row products__items">
      {products && products.length
        ? products.map((product: Product) =>
          <ProductPreview key={product.system.codename} product={product} />)
        : 'Neboli najdene ziadne produkty vyhovujuce filtru...'
      }
    </div>
  );
};
