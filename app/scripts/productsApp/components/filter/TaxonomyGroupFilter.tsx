import { TaxonomyGroup, TaxonomyTerms } from 'kentico-cloud-delivery-typescript-sdk';
import * as React from 'react';

interface IProps {
  taxonomyGroup: TaxonomyGroup;
  selected: string[];
  onTermSelected: (termCodename: string) => void;
  onTermUnselected: (termCodename: string) => void;
}

interface IState {
  isCollapsed: boolean
}

export class TaxonomyGroupFilter extends React.PureComponent<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = { isCollapsed: window.innerWidth < 768 }
  }

  toggleCollapsed = () => {
    this.setState((prevState) => ({ isCollapsed: !prevState.isCollapsed }));
  };

  render() {
    const iconClass = this.state.isCollapsed
      ? 'fa fa-angle-down'
      : 'fa fa-angle-up';

    return (
      <div className="filter__group">
        <div className="filter__group--title" onClick={this.toggleCollapsed}>
          <i className={iconClass} />&nbsp;
          {this.props.taxonomyGroup.system.name}
        </div>
        {!this.state.isCollapsed &&
        <ul className="filter__group--terms">
          {this.props.taxonomyGroup.terms.map(term =>
            <TaxonomyTerm
              key={term.codename}
              term={term}
              selected={this.props.selected}
              onTermSelected={this.props.onTermSelected}
              onTermUnselected={this.props.onTermUnselected}
            />
          )}
        </ul>
        }
      </div>
    );
  }
}

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
        <input
          type="checkbox"
          className="fancy-checkbox"
          id={codename}
          name={codename}
          checked={isSelected}
          onChange={onChange}
        />
        <label key={codename} htmlFor={codename}>
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
