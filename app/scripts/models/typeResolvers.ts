import { TypeResolver } from 'kentico-cloud-delivery-typescript-sdk';
import { ContentTypes } from './ContentTypes';
import { Product } from './Product';

export const typeResolvers: TypeResolver[] = [
  new TypeResolver(ContentTypes.Product, () => new Product()),
];
