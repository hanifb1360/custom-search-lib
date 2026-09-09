import { normalizeString } from '../normalization/normalize';
import type { SearchOptions } from '../types';

const escapeRegExp = (value: string): string => {
  return value.replace(/[.+?^${}()|[\]\\]/g, '\\$&');
};

export const wildcardSearch = (
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

  const pattern = normalizedQuery
    .split('*')
    .map(escapeRegExp)
    .join('.*');

  const regex = new RegExp(`^${pattern}$`);

  return data.filter(item => {
    const normalizedItem = normalizeString(item, options);

    return regex.test(normalizedItem);
  });
};