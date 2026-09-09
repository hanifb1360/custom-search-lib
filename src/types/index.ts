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

export type SortableValue =
  | string
  | number;

export type SortableKey<T extends object> = {
  [K in keyof T]-?:
    Exclude<T[K], null | undefined> extends SortableValue
      ? K
      : never;
}[keyof T];

export interface RangeFilter {
  min?: number;
  max?: number;
}

export type FilterCondition<T> =
  NonNullable<T> extends number
    ? T | RangeFilter
    : T;

export type Filters<T extends object> = {
  [K in keyof T]?: FilterCondition<T[K]>;
};
