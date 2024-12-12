import { optimizedLevenshteinPersian } from '../../utils/index';

export const fuzzySearchPersian = (
  query: string,
  data: string[],
  options: { caseSensitive?: boolean; threshold?: number } = {
    caseSensitive: false,
    threshold: 2,
  }
): string[] => {
  if (!query.trim()) return [];

  const { caseSensitive, threshold = 2 } = options;
  const normalizePersian = (text: string) =>
    text
      .replace(/ي/g, 'ی')
      .replace(/ك/g, 'ک')
      .replace(/ۀ/g, 'ه')
      .replace(/ؤ/g, 'و')
      .replace(/ئ/g, 'ی');

  const processedQuery = caseSensitive ? query : normalizePersian(query).toLowerCase();

  const matches = data
    .map(item => {
      const processedItem = caseSensitive
        ? item
        : normalizePersian(item).toLowerCase();
      return {
        item,
        distance: optimizedLevenshteinPersian(processedQuery, processedItem),
      };
    })
    .filter(({ distance }) => distance <= threshold);

  if (matches.length === 0) return [];

  const minDistance = Math.min(...matches.map(({ distance }) => distance));

  const deduplicated = matches
  .filter(({ distance }) => distance === minDistance)
  .reduce((unique, current) => {
    const normalizedCurrent = caseSensitive ? current.item : current.item.toLowerCase();
    if (!unique.some(item => (caseSensitive ? item.item : item.item.toLowerCase()) === normalizedCurrent)) {
      unique.push(current);
    }
    return unique;
  }, [] as typeof matches);

  return deduplicated.map(({ item }) => item);
};

export const rankedFuzzySearchPersian = (
  query: string,
  data: string[],
  options: { caseSensitive?: boolean; threshold?: number } = {
    caseSensitive: false,
    threshold: 2,
  }
): string[] => {
  if (!query.trim()) return [];

  const { caseSensitive, threshold = 2 } = options;

  const normalizePersian = (text: string) =>
    text
      .replace(/ي/g, 'ی')
      .replace(/ك/g, 'ک')
      .replace(/ۀ/g, 'ه')
      .replace(/ؤ/g, 'و')
      .replace(/ئ/g, 'ی');

  const processedQuery = caseSensitive ? query : normalizePersian(query).toLowerCase();

  const matches = data
    .map(item => {
      const processedItem = caseSensitive ? item : normalizePersian(item).toLowerCase();
      const distance = optimizedLevenshteinPersian(processedQuery, processedItem);
      return { item, distance };
    })
    .filter(({ distance }) => distance <= threshold);

  if (matches.length === 0) return [];

  const score = (distance: number, query: string, item: string) => {
    if (distance === 0) return -Infinity; // Exact match gets the highest priority
    const queryLength = query.length;
    const itemLength = item.length;

    // Penalize length differences
    const lengthDiffPenalty = Math.pow(Math.abs(queryLength - itemLength) / Math.max(queryLength, itemLength), 2);

    // Reward overlap
    const overlap = query.split('').reduce((count, char) => (item.includes(char) ? count + 1 : count), 0);
    const overlapPenalty = 1 - overlap / Math.max(queryLength, itemLength);

    return distance + lengthDiffPenalty + overlapPenalty;
  };

  const scoredMatches = matches.map(({ item, distance }) => ({
    item,
    score: score(distance, processedQuery, item),
  }));

  const sortedMatches = scoredMatches
    .sort((a, b) => a.score - b.score || a.item.localeCompare(b.item))
    .map(({ item }) => item);

  return sortedMatches;
};