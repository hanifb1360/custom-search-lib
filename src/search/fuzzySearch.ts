import { optimizedLevenshtein } from '../utils/levenshtein';


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
    // Return an empty array if the query is empty or contains only whitespace
    if (!query.trim()) return [];
  
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
  
    // Find the match with the minimum distance
    const minDistance = Math.min(...matches.map(({ distance }) => distance));
  
    // Deduplicate matches, keeping the first case-insensitive match
    const deduplicated = matches
      .filter(({ distance }) => distance === minDistance)
      .sort((a, b) => a.item.localeCompare(b.item, undefined, { sensitivity: 'base' }))
      .reduce((unique, current) => {
        if (!unique.some(item => item.item.toLowerCase() === current.item.toLowerCase())) {
          unique.push(current);
        }
        return unique;
      }, [] as typeof matches);
  
    return deduplicated.map(({ item }) => item);
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