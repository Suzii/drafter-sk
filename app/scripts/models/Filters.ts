// map of taxonomy group - taxonomy term codenames
export interface ITaxonomies {
  [groupCodename: string]: string[]
}

export interface IFilter {
  query: string;
  taxonomies: ITaxonomies;
}
