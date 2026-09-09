import { levenshteinDistanceWithin } from '../algorithms/levenshtein';
import { normalizeString } from '../normalization/normalize';
import type {
  RankedSearchResult,
  SearchOptions,
} from '../types';

const validateThreshold = (threshold: number): void => {
  if (!Number.isInteger(threshold) || threshold < 0) {
    throw new RangeError(
      'threshold must be a non-negative integer'
    );
  }
};

const calculateScore = (
  query: string,
  item: string,
  distance: number
): number => {
  const maxLength = Math.max(query.length, item.length, 1);

  const normalizedDistance =
    distance / maxLength;

  const lengthPenalty =
    Math.abs(query.length - item.length) / maxLength;

  const prefixBonus =
    item.startsWith(query) ? 0.15 : 0;

  const substringBonus =
    item.includes(query) ? 0.1 : 0;

  return (
    normalizedDistance +
    lengthPenalty -
    prefixBonus -
    substringBonus
  );
};

export const rankedFuzzySearchDetailed = (
  query: string,
  data: readonly string[],
  options: SearchOptions = {}
): RankedSearchResult<string>[] => {
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

  const results: RankedSearchResult<string>[] = [];

  for (const item of data) {
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

    if (distance === null) {
      continue;
    }

    results.push({
      item,
      distance,
      score: calculateScore(
        normalizedQuery,
        normalizedItem,
        distance
      ),
    });
  }

  return results.sort(
    (a, b) =>
      a.score - b.score ||
      a.distance - b.distance ||
      a.item.localeCompare(b.item)
  );
};

export const rankedFuzzySearch = (
  query: string,
  data: readonly string[],
  options: SearchOptions = {}
): string[] => {
  return rankedFuzzySearchDetailed(
    query,
    data,
    options
  ).map(result => result.item);
};