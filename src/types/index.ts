export interface NormalizeOptions {
  caseSensitive?: boolean;
  trim?: boolean;
  unicode?: boolean;
  removeDiacritics?: boolean;
}

export interface SearchOptions {
  caseSensitive?: boolean;
  threshold?: number;
  trim?: boolean;
  unicode?: boolean;
  removeDiacritics?: boolean;
}

export interface RankedSearchResult<T> {
  item: T;
  score: number;
  distance: number;
}

export interface FullTextSearchOptions<T extends object> {
  fields: readonly (keyof T)[];
  operator?: 'and' | 'or';
  caseSensitive?: boolean;
  trim?: boolean;
  unicode?: boolean;
  removeDiacritics?: boolean;
}

export type SortOrder = 'asc' | 'desc';

export interface RangeFilter {
  min?: number;
  max?: number;
}
