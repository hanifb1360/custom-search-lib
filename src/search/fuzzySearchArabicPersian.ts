import { normalizeTextArabicPersian, optimizedLevenshtein } from '../utils/index';

export const fuzzySearchArabicPersian = (
  query: string,
  data: string[],
  options: { caseSensitive?: boolean; threshold?: number; arabic?: boolean; persian?: boolean } = {
    caseSensitive: false,
    threshold: 2,
    arabic: true,
  }
): string[] => {
  if (!query.trim()) return [];

  const { caseSensitive, threshold = 2, arabic, persian } = options;
  const processedQuery = caseSensitive
    ? query
    : normalizeTextArabicPersian(query, { arabic, persian });

  const matches = data
    .map(item => {
      const processedItem = caseSensitive
        ? item
        : normalizeTextArabicPersian(item, { arabic, persian });
      return {
        item,
        distance: optimizedLevenshtein(processedQuery, processedItem),
      };
    })
    .filter(({ distance }) => distance <= threshold);

  if (matches.length === 0) return [];

  const minDistance = Math.min(...matches.map(({ distance }) => distance));

  const deduplicated = matches
    .filter(({ distance }) => distance === minDistance)
    .reduce((unique, current) => {
      if (
        !unique.some(
          item =>
            normalizeTextArabicPersian(item.item, { arabic, persian }) ===
            normalizeTextArabicPersian(current.item, { arabic, persian })
        )
      ) {
        unique.push(current);
      }
      return unique;
    }, [] as typeof matches);

  return deduplicated.map(({ item }) => item);
};

