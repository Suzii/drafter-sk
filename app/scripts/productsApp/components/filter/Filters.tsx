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
    <div className="filter__search">
      <input
        value={props.filter.query}
        type="text"
        placeholder="Hľadať..."
        onChange={(e) => props.onFilterQueryChange(e.target.value)}
      />
    </div>

    <div className="filter__reset">
      <div
        className="reset-button"
        onClick={props.onClearFilter}
      >
        Zrušiť filter
      </div>
    </div>

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

