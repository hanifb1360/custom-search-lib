/**
 * Calculate Levenshtein distance using an optimized approach.
 */
export const optimizedLevenshtein = (a: string, b: string): number => {
  let prev = Array(b.length + 1).fill(0);
  let curr = Array(b.length + 1).fill(0);

  for (let j = 0; j <= b.length; j++) prev[j] = j;

  for (let i = 1; i <= a.length; i++) {
    curr[0] = i;
    for (let j = 1; j <= b.length; j++) {
      curr[j] = a[i - 1] === b[j - 1]
        ? prev[j - 1]
        : Math.min(prev[j], curr[j - 1], prev[j - 1]) + 1;
    }
    [prev, curr] = [curr, prev];
  }

  return prev[b.length];
};

/**
 * Perform fuzzy search with additional options.
 */
export type SearchOptions = {
  caseSensitive?: boolean;
  threshold?: number;
};

export const fuzzySearch = (
  query: string,
  data: string[],
  options: SearchOptions = { caseSensitive: false, threshold: 2 }
): string[] => {
  const { caseSensitive, threshold = 2 } = options;
  const processedQuery = caseSensitive ? query : query.toLowerCase();

  const matches = data
    .map(item => ({
      item,
      distance: optimizedLevenshtein(
        processedQuery,
        caseSensitive ? item : item.toLowerCase()
      ),
    }))
    .filter(({ distance }) => distance <= threshold);

  if (matches.length === 0) return [];

  const minDistance = Math.min(...matches.map(({ distance }) => distance));
  return matches.filter(({ distance }) => distance === minDistance).map(({ item }) => item);
};

export const rankedFuzzySearch = (
  query: string,
  data: string[],
  options: SearchOptions = { threshold: 2 }
): string[] => {
  const { caseSensitive = false, threshold = 2 } = options;
  const processedQuery = caseSensitive ? query : query.toLowerCase();

  const matches = data
    .map(item => {
      const processedItem = caseSensitive ? item : item.toLowerCase();
      const distance = optimizedLevenshtein(processedQuery, processedItem);
      return { item, distance };
    })
    .filter(({ distance }) => distance <= threshold)
    .filter(({ item }) => item.toLowerCase().includes(processedQuery)); // Ensure query is part of the match

  if (matches.length === 0) return [];

  const score = (distance: number, query: string, item: string) => {
    const queryLength = query.length;
    const itemLength = item.length;

    // Penalize items with greater length differences
    const lengthDiffPenalty = Math.abs(queryLength - itemLength) / Math.max(queryLength, itemLength);

    // Calculate the character overlap
    const overlap = query
      .split('')
      .reduce((count, char) => (item.includes(char) ? count + 1 : count), 0);
    const overlapPenalty = 1 - overlap / Math.max(queryLength, itemLength); // Reward more overlap

    return distance + lengthDiffPenalty + overlapPenalty; // Combine all factors
  };

  const scoredMatches = matches.map(({ item, distance }) => ({
    item,
    score: score(distance, query, item),
  }));

  // Sort by score and alphabetically for consistency
  return scoredMatches
    .sort((a, b) => a.score - b.score || a.item.localeCompare(b.item))
    .map(({ item }) => item);
};

/**
 * Perform wildcard search on a dataset.
 */
export const wildcardSearch = (query: string, data: string[]): string[] => {
  const regex = new RegExp(`${query.replace(/\*/g, '.*')}`, 'i'); // Case-insensitive wildcard matching
  return data.filter(item => regex.test(item));
};

/**
 * Perform prefix search on a dataset.
 */
export const prefixSearch = (query: string, data: string[]): string[] => {
  return data.filter(item => item.toLowerCase().startsWith(query.toLowerCase()));
};

/**
 * Perform suffix search on a dataset.
 */
export const suffixSearch = (query: string, data: string[]): string[] => {
  return data.filter(item => item.toLowerCase().endsWith(query.toLowerCase()));
};