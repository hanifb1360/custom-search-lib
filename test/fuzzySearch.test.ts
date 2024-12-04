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
    expect(results).toEqual(['bicycle', 'bicycles']);
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
    expect(results).toEqual(['bicycle', 'tricycle', 'motorcycle']);
  });
});

describe('Fuzzy Search - Edge Cases', () => {
  it('should handle an empty dataset gracefully', () => {
    const data: string[] = [];
    const query = 'bicycle';

    const results = fuzzySearch(query, data);
    expect(results).toEqual([]);
  });

  it('should handle an empty query gracefully', () => {
    const data = ['bicycle', 'bike', 'tricycle'];
    const query = '';

    const results = fuzzySearch(query, data);
    expect(results).toEqual([]);
  });

  it('should handle large datasets efficiently', () => {
    const data = Array.from({ length: 100000 }, (_, i) => `item-${i}`);
    const query = 'item-9999';

    const results = fuzzySearch(query, data, { threshold: 2 });
    expect(results).toEqual(['item-9999']);
  });

  it('should handle special characters in the query', () => {
    const data = ['hello@world', 'hello_world', 'hello-world'];
    const query = 'hello@world';

    const results = fuzzySearch(query, data);
    expect(results).toEqual(['hello@world']);
  });

  it('should handle case-sensitive matches when enabled', () => {
    const data = ['Hello', 'hello', 'HELLO', 'hi'];
    const query = 'hello';

    const results = fuzzySearch(query, data, { caseSensitive: true });
    expect(results).toEqual(['hello']);
  });

  it('should return case-insensitive matches by default', () => {
    const data = ['Hello', 'hello', 'HELLO', 'hi'];
    const query = 'hello';

    const results = fuzzySearch(query, data);
    console.log('Case-Insensitive Results:', results);
    expect(results).toEqual(['Hello']);
  });

  it('should handle wildcard queries with special characters', () => {
    const data = ['hello@world', 'hello_world', 'hello-world', 'hello!world'];
    const query = 'hello*world';

    const results = wildcardSearch(query, data);
    expect(results).toEqual(['hello@world', 'hello_world', 'hello-world', 'hello!world']);
  });

  it('should handle prefix search on special characters', () => {
    const data = ['#hashtag', '#hello', '#world'];
    const query = '#';

    const results = prefixSearch(query, data);
    expect(results).toEqual(['#hashtag', '#hello', '#world']);
  });

  it('should handle suffix search on special characters', () => {
    const data = ['file.txt', 'image.jpg', 'document.pdf'];
    const query = '.txt';

    const results = suffixSearch(query, data);
    expect(results).toEqual(['file.txt']);
  });
});