import { normalizeString } from '../normalization/normalize';
import type { FullTextSearchOptions } from '../types';

export const fullTextSearch = <T extends object>(
  query: string,
  data: readonly T[],
  options: FullTextSearchOptions<T>
): T[] => {
  const {
    fields,
    operator = 'and',
    caseSensitive = false,
    trim = true,
    unicode = true,
    removeDiacritics = false,
  } = options;

  if (fields.length === 0) {
    return [];
  }

  const normalizationOptions = {
    caseSensitive,
    trim,
    unicode,
    removeDiacritics,
  };

  const normalizedQuery = normalizeString(
    query,
    normalizationOptions
  );

  if (!normalizedQuery) {
    return [];
  }

  const tokens = normalizedQuery
    .split(/\s+/)
    .filter(Boolean);

  if (tokens.length === 0) {
    return [];
  }

  return data.filter(item => {
    const searchableValues = fields.map(field =>
      normalizeString(
        String(item[field] ?? ''),
        normalizationOptions
      )
    );

    if (operator === 'and') {
      return tokens.every(token =>
        searchableValues.some(value =>
          value.includes(token)
        )
      );
    }

    return tokens.some(token =>
      searchableValues.some(value =>
        value.includes(token)
      )
    );
  });
};
