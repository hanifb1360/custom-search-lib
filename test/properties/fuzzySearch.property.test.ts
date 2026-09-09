import * as fc from 'fast-check';
import {
  fuzzySearch,
  rankedFuzzySearch,
  prefixSearch,
  suffixSearch,
  wildcardSearch,
} from '../../src/search/fuzzySearch';

describe('Property-based tests for Fuzzy Search', () => {
  describe('Fuzzy Search', () => {
    it('should return results within the threshold', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1 }),
          fc.array(fc.string({ minLength: 1 }), { minLength: 1 }),
          fc.nat({ max: 5 }), // Threshold range: 0-5
          (query, data, threshold) => {
            const results = fuzzySearch(query, data, { threshold });
            results.forEach(result => {
              const distance = query.length - result.length; // Approximation
              expect(distance).toBeLessThanOrEqual(threshold);
            });
          }
        )
      );
    });

    it('should be case-insensitive by default', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1 }),
          fc.array(fc.string({ minLength: 1 }).map(s => s.toUpperCase())),
          (query, data) => {
            const results = fuzzySearch(query.toLowerCase(), data);
            const lowerCaseData = data.map(item => item.toLowerCase());
            results.forEach(result => {
              expect(lowerCaseData).toContain(result.toLowerCase());
            });
          }
        )
      );
    });
  });

  describe('Ranked Fuzzy Search', () => {
    it('should rank results by relevance', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1 }),
          fc.array(fc.string({ minLength: 1 }), { minLength: 1 }),
          fc.nat({ max: 5 }), // Threshold range: 0-5
          (query, data, threshold) => {
            const results = rankedFuzzySearch(query, data, { threshold });
            for (let i = 1; i < results.length; i++) {
              const prevScore = results[i - 1].length;
              const currentScore = results[i].length;
              expect(prevScore).toBeLessThanOrEqual(currentScore);
            }
          }
        )
      );
    });
  });

  describe('Prefix Search', () => {
    it('should match items starting with the query', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1 }),
          fc.array(fc.string({ minLength: 1 }), { minLength: 1 }),
          (query, data) => {
            const results = prefixSearch(query, data);
            results.forEach(result => {
              expect(result.toLowerCase().startsWith(query.toLowerCase())).toBe(true);
            });
          }
        )
      );
    });
  });

  describe('Suffix Search', () => {
    it('should match items ending with the query', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1 }),
          fc.array(fc.string({ minLength: 1 }), { minLength: 1 }),
          (query, data) => {
            const results = suffixSearch(query, data);
            results.forEach(result => {
              expect(result.toLowerCase().endsWith(query.toLowerCase())).toBe(true);
            });
          }
        )
      );
    });
  });

  describe('Wildcard Search', () => {
    it('should match items using wildcard patterns', () => {
      fc.assert(
        fc.property(fc.string(), fc.array(fc.string()), (query, data) => {
          const sanitizedQuery = query
            .replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // Escape regex special characters
            .replace(/\\\*/g, '.*'); // Replace escaped '*' with regex '.*'
  
          const results = wildcardSearch(query, data);
          const regex = new RegExp(`^${sanitizedQuery}$`, 'i');
          results.forEach(result => {
            expect(regex.test(result)).toBe(true);
          });
        })
      );
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty datasets gracefully', () => {
      fc.assert(
        fc.property(fc.string({ minLength: 1 }), query => {
          const results = fuzzySearch(query, []);
          expect(results).toEqual([]);
        })
      );
    });

    it('should handle empty queries gracefully', () => {
      fc.assert(
        fc.property(
          fc.array(fc.string({ minLength: 1 }), { minLength: 1 }),
          data => {
            const results = fuzzySearch('', data);
            expect(results).toEqual([]);
          }
        )
      );
    });

    it('should handle special characters in queries', () => {
      fc.assert(
        fc.property(
          fc.stringOf(fc.constantFrom('!', '@', '#', '$', '%', '^', '&', '*', '(', ')')),
          fc.array(fc.string({ minLength: 1 }), { minLength: 1 }),
          (query, data) => {
            const results = fuzzySearch(query, data);
            expect(Array.isArray(results)).toBe(true); // Ensure results are an array
          }
        )
      );
    });
  });
});