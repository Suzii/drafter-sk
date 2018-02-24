import { TaxonomyGroup, TaxonomyTerms } from 'kentico-cloud-delivery-typescript-sdk';
import * as React from 'react';

interface IProps {
  taxonomyGroup: TaxonomyGroup;
  selected: string[];
  onTermSelected: (termCodename: string) => void;
  onTermUnselected: (termCodename: string) => void;
}

export const TaxonomyGroupFilter: React.SFC<IProps> = (props) => (
  <div className="filter__group">
    <div className="filter__group--tile">
      <b>{props.taxonomyGroup.system.name}</b>
    </div>
    <ul className="filter__group--terms">
      {props.taxonomyGroup.terms.map(term =>
        <TaxonomyTerm
          key={term.codename}
          term={term}
          selected={props.selected}
          onTermSelected={props.onTermSelected}
          onTermUnselected={props.onTermUnselected}
        />
      )}
    </ul>
  </div>
);

interface ITermProps {
  term: TaxonomyTerms;
  selected: string[];
  onTermSelected: (termCodename: string) => void;
  onTermUnselected: (termCodename: string) => void;
}

const TaxonomyTerm: React.SFC<ITermProps> = (props) => {
  const { term: { codename, name, terms } } = props;
  const isSelected = props.selected.indexOf(codename) > -1;
  const onChange = () => isSelected ? props.onTermUnselected(codename) : props.onTermSelected(codename);

  return (
    <React.Fragment>
      <li className="filter__term--node">
        <label key={codename}>
          <input
            type="checkbox"
            id={codename}
            name={codename}
            checked={isSelected}
            onChange={onChange}
          />
          {name}
        </label>
      </li>
      {terms && !!terms.length &&
      <ul className="filter__term--children">
        {terms.map(childTerm => <TaxonomyTerm {...props} key={childTerm.codename} term={childTerm} />)}
      </ul>
      }
    </React.Fragment>
  );
};
