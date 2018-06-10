import { Fields } from 'kentico-cloud-delivery-typescript-sdk';
import * as memoize from 'memoizee';
import { IFilter } from '../../models/Filters';
import { Product } from '../../models/Product';

export const getFilteredProducts = memoize((allProducts: Product[], { query, taxonomies }: IFilter): Product[] =>
  allProducts.filter((product: Product) => {

    if (useQuerySearch(query) && !satisfiesQuery(product, query)) {
      return false;
    }

    return Object.keys(taxonomies).every(taxonomyGroup =>
      satisfiesGroupCondition(product, taxonomyGroup, taxonomies[taxonomyGroup])    )
  }));

const satisfiesGroupCondition = memoize((product: Product, taxonomyGroup: string, selectedTerms: string[]) => {
  const field = getTaxonomyField(product, taxonomyGroup);

  if (!selectedTerms || !selectedTerms.length || !field) {
    return true;
  }

  return satisfiesAnyTerm(field, selectedTerms);
});

const useQuerySearch = (query: string) => query && query.trim().length;

const containsPhrase = (filterPhrase: string, text: string | null = '') =>
  filterPhrase
    .toLocaleLowerCase()
    .split(/\s+/)
    .every(word => text.toLocaleLowerCase().includes(word));

const satisfiesQuery = (product: Product, query: string) =>
  containsPhrase(query, product.nazov.text) ||
  containsPhrase(query, product.popis.text);

const getTaxonomyField = (product: Product, taxonomyGroupCodename: string): Fields.TaxonomyField => {
  const fieldName = product.options.propertyResolver(taxonomyGroupCodename);

  return product[fieldName];
};

const satisfiesAnyTerm = (field: Fields.TaxonomyField, selectedTerms: string[]) => {
  const fieldTerms = field.taxonomyTerms.map(terms => terms.codename);

  return selectedTerms.some(selectedTerm => fieldTerms.indexOf(selectedTerm) > -1);
};
