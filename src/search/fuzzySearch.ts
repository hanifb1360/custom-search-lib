import { levenshteinDistanceWithin } from '../algorithms/levenshtein';
import { normalizeString } from '../normalization/normalize';
import type { SearchOptions } from '../types';

const validateThreshold = (threshold: number): void => {
  if (!Number.isInteger(threshold) || threshold < 0) {
    throw new RangeError(
      'threshold must be a non-negative integer'
    );
  }
};

export const fuzzySearch = (
  query: string,
  data: readonly string[],
  options: SearchOptions = {}
): string[] => {
  const {
    threshold = 2,
    caseSensitive = false,
    trim = true,
    unicode = true,
    removeDiacritics = false,
  } = options;

  validateThreshold(threshold);

  const normalizedQuery = normalizeString(query, {
    caseSensitive,
    trim,
    unicode,
    removeDiacritics,
  });

  if (!normalizedQuery) {
    return [];
  }

  return data.filter(item => {
    const normalizedItem = normalizeString(item, {
      caseSensitive,
      trim,
      unicode,
      removeDiacritics,
    });

    const distance = levenshteinDistanceWithin(
      normalizedQuery,
      normalizedItem,
      threshold
    );

    return distance !== null;
  });
};