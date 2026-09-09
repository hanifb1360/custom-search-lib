export { fuzzySearch } from './search/fuzzySearch';

export {
  rankedFuzzySearch,
  rankedFuzzySearchDetailed,
} from './search/rankedFuzzySearch';

export { prefixSearch } from './search/prefixSearch';
export { suffixSearch } from './search/suffixSearch';
export { wildcardSearch } from './search/wildcardSearch';

export { fullTextSearch } from './search/fullTextSearch';

export { filterData } from './data/filter';
export { sortData } from './data/sort';

export {
  levenshteinDistance,
  levenshteinDistanceWithin,
} from './algorithms/levenshtein';

export { normalizeString } from './normalization/normalize';

export type {
  NormalizeOptions,
  SearchOptions,
  RankedSearchResult,
  FullTextSearchOptions,
  SortOrder,
  SortableValue,
  SortableKey,
  RangeFilter,
  FilterCondition,
  Filters,
} from './types';