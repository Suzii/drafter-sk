import { Fields } from 'kentico-cloud-delivery-typescript-sdk';
import * as React from 'react';
import { Product } from '../../models/Product';
import TaxonomyField = Fields.TaxonomyField;

interface IProps {
  product: Product;
}

const RenderTaxonomy: React.SFC<{ field: TaxonomyField }> = ({ field }) => (
  <React.Fragment>
    <dt>
      {field.name}
    </dt>
    <dd>
      {field.value.map(({ name }) => name).join(', ')}
    </dd>
  </React.Fragment>
);

export const ProductPreview: React.SFC<IProps> = ({ product }) => (
  <div className="item__wrapper col-md-3 col-sm-4 col-xs-6">
    <div className="item">
      <div className="item__image">
        <img src={product.foto.assets[0].url} />
      </div>

      <div className="item__info">
        <h3 className="item__title">{product.nazov.text}</h3>
        {/*<div className="item__description">{product.popis.text}</div>*/}
        <dl className="item__properties inline-flex">
          <RenderTaxonomy field={product.vyrobca} />
          <RenderTaxonomy field={product.krajina} />
        </dl>
      </div>
    </div>
  </div>
);

