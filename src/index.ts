export { fuzzySearch } from './search/fuzzySearch';
export { rankedFuzzySearch } from './search/rankedFuzzySearch';
export { prefixSearch } from './search/prefixSearch';
export { suffixSearch } from './search/suffixSearch';
export { wildcardSearch } from './search/wildcardSearch';
export { fullTextSearch } from './search/fullTextSearch';

export { filterData } from './data/filter';
export { sortData } from './data/sort';

export { levenshteinDistance } from './algorithms/levenshtein';

export { normalizeString } from './normalization/normalize';

export type {
  SearchOptions,
  RankedSearchResult,
  FullTextSearchOptions,
  SortOrder,
  RangeFilter,
} from './types';
