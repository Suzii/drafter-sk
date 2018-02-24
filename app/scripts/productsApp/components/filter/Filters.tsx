import { TaxonomyGroup } from 'kentico-cloud-delivery-typescript-sdk';
import * as React from 'react';
import { IFilter } from '../../../models/Filters';
import { TaxonomyGroupFilter } from './TaxonomyGroupFilter';

interface IProps {
  filter: IFilter;
  taxonomyGroups: TaxonomyGroup[];
  onClearFilter: () => void;
  onFilterQueryChange: (query: string) => void;
  onTaxonomyTermUnselected: (groupCodename: string, term: string) => void;
  onTaxonomyTermSelected: (groupCodename: string, term: string) => void;
}

export const Filters: React.SFC<IProps> = (props) => (
  <div className="products__filters">
    <button
      type="reset"
      className="btn btn-default"
      onClick={props.onClearFilter}
    >
      Resetovať filter
    </button>

    <input
      value={props.filter.query}
      placeholder="Hľadať..."
      onChange={(e) => props.onFilterQueryChange(e.target.value)}
    />

    {props.taxonomyGroups.map(group =>
      <TaxonomyGroupFilter
        key={group.system.codename}
        taxonomyGroup={group}
        selected={props.filter.taxonomies[group.system.codename] || []}
        onTermSelected={(term) => props.onTaxonomyTermSelected(group.system.codename, term)}
        onTermUnselected={(term) => props.onTaxonomyTermUnselected(group.system.codename, term)}
      />
    )}
  </div>
);

