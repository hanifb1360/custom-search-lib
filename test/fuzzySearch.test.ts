import {
  fuzzySearch,
  rankedFuzzySearch,
  prefixSearch,
  suffixSearch,
  wildcardSearch,
} from '../src/fuzzySearch';

describe('Fuzzy Search - Core Features', () => {
  it('should return matches within the threshold', () => {
    const data = ['bicycle', 'bike', 'bicycles', 'tricycle'];
    const query = 'bicyc';

    const results = fuzzySearch(query, data, { threshold: 2 });
    expect(results).toEqual(['bicycle']);
  });

  it('should handle case-insensitive matching', () => {
    const data = ['Bicycle', 'BIKE', 'bicycles', 'TriCycle'];
    const query = 'bicycle';

    const results = fuzzySearch(query, data, { caseSensitive: false });
    expect(results).toEqual(['Bicycle']);
  });

  it('should rank matches correctly', () => {
    const data = ['bicycle', 'bike', 'bicycles', 'tricycle'];
    const query = 'bicycle';
  
    const results = rankedFuzzySearch(query, data, { threshold: 2 });
    console.log('Ranked Fuzzy Results:', results);
    // The expected results should include items within the threshold ranked by relevance
    expect(results).toEqual(['bicycle', 'bicycles']); // Correct ranking
  });
});

describe('Fuzzy Search - Additional Features', () => {
  it('should handle prefix search', () => {
    const data = ['bicycle', 'bike', 'bicycles', 'tricycle', 'batman'];
    const query = 'bi';

    const results = prefixSearch(query, data);
    expect(results).toEqual(['bicycle', 'bike', 'bicycles']);
  });

  it('should handle suffix search', () => {
    const data = ['bicycle', 'bike', 'tricycle', 'motorcycle'];
    const query = 'cycle';

    const results = suffixSearch(query, data);
    expect(results).toEqual(['bicycle', 'tricycle', 'motorcycle']);
  });

  it('should handle wildcard search with partial matches', () => {
    const data = ['bicycle', 'bicycles', 'tricycle', 'motorcycle'];
    const query = '*cycle';

    const results = wildcardSearch(query, data);
    console.log('Wildcard Results:', results);
    expect(results).toEqual(['bicycle', 'bicycles', 'tricycle', 'motorcycle']); // Allow partial matches
  });
});