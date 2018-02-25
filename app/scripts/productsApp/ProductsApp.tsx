import { ItemResponses, TaxonomyGroup } from 'kentico-cloud-delivery-typescript-sdk';
import * as React from 'react';
import { deliveryClient } from '../data/client';
import { ContentTypes } from '../models/ContentTypes';
import { IFilter } from '../models/Filters';
import { Product } from '../models/Product';
import { Filters } from './components/filter/Filters';
import { ProductsListing } from './components/ProductsListing';
import { getFilteredProducts } from './utlis/productsUtils';

interface IState {
  allProducts: Product[],
  filter: IFilter,
  taxonomyGroups: TaxonomyGroup[],
}

export class ProductsApp extends React.PureComponent<{}, IState> {
  constructor(props) {
    super(props);

    this.state = {
      allProducts: [],
      filter: { query: '', taxonomies: {} },
      taxonomyGroups: [],
    };
  }

  onClearFilter = () => {
    this.setState({ filter: { query: '', taxonomies: {} } });
  };

  onFilterQueryChange = (query: string) => {
    this.setState(prevState => ({
      filter: { ...prevState.filter, query }
    }));
  };

  onTermSelected = (groupCodename: string, termCodename: string) => {
    const oldSelectedTermsInGroup = this.state.filter.taxonomies[groupCodename] || [];
    const newTerms = [...oldSelectedTermsInGroup, termCodename];

    this.setSelectedTerms(groupCodename, newTerms);
  };

  onTermUnselected = (groupCodename: string, termCodename: string) => {
    const oldSelectedTermsInGroup = this.state.filter.taxonomies[groupCodename] || [];
    const newTerms = oldSelectedTermsInGroup.filter(existingTerm => existingTerm !== termCodename);

    this.setSelectedTerms(groupCodename, newTerms);
  };

  setSelectedTerms = (groupCodename: string, terms: string[]) => {
    this.setState(prevState => ({
      filter: {
        ...prevState.filter,
        taxonomies: {
          ...prevState.filter.taxonomies,
          [groupCodename]: terms,
        }
      }
    }));
  };

  componentDidMount() {
    deliveryClient.items<Product>()
      .type(ContentTypes.Product)
      .get()
      .subscribe((response: ItemResponses.DeliveryItemListingResponse<Product>) => {
        console.log('Products', response.items);
        this.setState({ allProducts: response.items })
      }, error => {
        console.error('Something went wrong while retrieving products...', error);
      });

    deliveryClient.taxonomies().get().subscribe((response) => {
      console.log('Taxonomies', response.taxonomies);
      this.setState({ taxonomyGroups: response.taxonomies })

    }, error => {
      console.error('Something went wrong while retrieving taxonomies...');
    })
  }

  render() {
    return (
      <div className="container">
        <div className="row section__title">
          <div className="col-sm-12">
            <h1 className="">Produkty</h1>
          </div>
        </div>

        <div className="row section__content">
          <div className="col-md-3">
            <Filters
              filter={this.state.filter}
              taxonomyGroups={this.state.taxonomyGroups}
              onFilterQueryChange={this.onFilterQueryChange}
              onTaxonomyTermSelected={this.onTermSelected}
              onTaxonomyTermUnselected={this.onTermUnselected}
              onClearFilter={this.onClearFilter}
            />
          </div>

          <div className="col-md-9">
            <ProductsListing products={getFilteredProducts(this.state.allProducts, this.state.filter)} />
          </div>
        </div>
      </div>
    );
  }
}
