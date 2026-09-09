import { normalizeString } from '../normalization/normalize';
import type { SearchOptions } from '../types';

export const prefixSearch = (
  query: string,
  data: readonly string[],
  options: Pick<
    SearchOptions,
    | 'caseSensitive'
    | 'trim'
    | 'unicode'
    | 'removeDiacritics'
  > = {}
): string[] => {
  const normalizedQuery = normalizeString(query, options);

  if (!normalizedQuery) {
    return [];
  }

  return data.filter(item =>
    normalizeString(item, options).startsWith(
      normalizedQuery
    )
  );
};