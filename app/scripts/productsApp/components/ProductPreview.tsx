import { Fields } from 'kentico-cloud-delivery-typescript-sdk';
import * as React from 'react';
import { Product } from '../../models/Product';
import TaxonomyField = Fields.TaxonomyField;

interface IProps {
  product: Product;
}

const RenderTaxonomy: React.SFC<{field: TaxonomyField}> = ({field}) => (
  <p className="products__item--property">
    <b className="products__item--property-name">
      {field.name}&nbsp;
    </b>
    <span className="products__item--property-values">
      {field.value.map(({name}) => name).join(', ')}
    </span>
  </p>
);

export const ProductPreview: React.SFC<IProps> = ({ product }) => (
  <div className="products__item">
    <h3 className="products__item--title">{product.nazov.text}</h3>
    {product.foto.assets && product.foto.assets.length &&
      <img className="products__item--image" src={product.foto.assets[0].url}/>
    }

    <p className="products__item--description">{product.popis.text}</p>
    <RenderTaxonomy field={product.krajinaPovodu}/>
    <RenderTaxonomy field={product.vyrobca}/>
    <RenderTaxonomy field={product.kategoria}/>
  </div>
);

