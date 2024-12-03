import { fuzzySearch } from '../src/fuzzySearch';

describe('Fuzzy Search', () => {
  
  it('should return matches within the threshold', () => {
    const data = ['bicycle', 'bike', 'bicycles', 'tricycle'];
    const query = 'bicyle'; // Misspelled query
  
    const results = fuzzySearch(query, data, 2);
    expect(results).toEqual(['bicycle']); // Only the closest match
  });

  it('should return an empty array if no matches are found', () => {
    const data = ['car', 'bus', 'train'];
    const query = 'bicyle';

    const results = fuzzySearch(query, data);
    expect(results).toEqual([]); // No matches found
  });
});

describe('Fuzzy Search - Edge Cases', () => {
  it('should handle an empty dataset gracefully', () => {
    const data: string[] = [];
    const query = 'bicycle';

    const results = fuzzySearch(query, data);
    expect(results).toEqual([]); // No data, so no matches
  });

  it('should handle an empty query gracefully', () => {
    const data = ['bicycle', 'bike', 'bicycles', 'tricycle'];
    const query = '';

    const results = fuzzySearch(query, data);
    expect(results).toEqual([]); // Empty query should return no matches
  });

  it('should handle case-insensitive matching', () => {
    const data = ['Bicycle', 'BIKE', 'bicycles', 'TriCycle'];
    const query = 'bicycle';
  
    const results = fuzzySearch(query, data, 2);
    expect(results).toEqual(['Bicycle']); // Only the closest match with the minimum distance
  });

  it('should return an empty array if no matches are within the threshold', () => {
    const data = ['car', 'bus', 'train'];
    const query = 'bicycle';

    const results = fuzzySearch(query, data, 1); // Threshold is too strict
    expect(results).toEqual([]); // No matches within a distance of 1
  });

  it('should handle very large datasets efficiently', () => {
    const data = Array.from({ length: 10000 }, (_, i) => `item-${i}`);
    const query = 'item-9999';
  
    const results = fuzzySearch(query, data, 2);
    expect(results).toEqual(['item-9999']); // Exact match
  });
});