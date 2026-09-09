import * as fc from 'fast-check';

import {
  fuzzySearch,
  prefixSearch,
  suffixSearch,
} from '../../src';

import {
  levenshteinDistance,
} from '../../src/algorithms/levenshtein';

describe('Levenshtein properties', () => {
  it('distance from a string to itself is always zero', () => {
    fc.assert(
      fc.property(
        fc.string(),
        value => {
          expect(
            levenshteinDistance(
              value,
              value
            )
          ).toBe(0);
        }
      )
    );
  });

  it('distance is symmetrical', () => {
    fc.assert(
      fc.property(
        fc.string(),
        fc.string(),
        (a, b) => {
          expect(
            levenshteinDistance(a, b)
          ).toBe(
            levenshteinDistance(b, a)
          );
        }
      )
    );
  });

  it('distance is at least the difference in string lengths', () => {
    fc.assert(
      fc.property(
        fc.string(),
        fc.string(),
        (a, b) => {
          expect(
            levenshteinDistance(a, b)
          ).toBeGreaterThanOrEqual(
            Math.abs(
              a.length - b.length
            )
          );
        }
      )
    );
  });
});

describe('fuzzySearch properties', () => {
  it('every returned result is within the threshold', () => {
    fc.assert(
      fc.property(
        fc.string({
          minLength: 1,
          maxLength: 20,
        }),
        fc.array(
          fc.string({
            minLength: 1,
            maxLength: 20,
          }),
          {
            maxLength: 50,
          }
        ),
        fc.integer({
          min: 0,
          max: 5,
        }),
        (query, data, threshold) => {
          const results = fuzzySearch(
            query,
            data,
            {
              threshold,
            }
          );

          const normalizedQuery =
            query.trim().toLocaleLowerCase();

          for (const result of results) {
            const normalizedResult =
              result
                .trim()
                .toLocaleLowerCase();

            expect(
              levenshteinDistance(
                normalizedQuery,
                normalizedResult
              )
            ).toBeLessThanOrEqual(
              threshold
            );
          }
        }
      )
    );
  });
});

describe('prefixSearch properties', () => {
  it('every returned result starts with the query', () => {
    fc.assert(
      fc.property(
        fc.string({
          minLength: 1,
        }),
        fc.array(fc.string()),
        (query, data) => {
          const results = prefixSearch(
            query,
            data
          );

          const normalizedQuery =
            query
              .trim()
              .toLocaleLowerCase();

          for (const result of results) {
            expect(
              result
                .trim()
                .toLocaleLowerCase()
                .startsWith(
                  normalizedQuery
                )
            ).toBe(true);
          }
        }
      )
    );
  });
});

describe('suffixSearch properties', () => {
  it('every returned result ends with the query', () => {
    fc.assert(
      fc.property(
        fc.string({
          minLength: 1,
        }),
        fc.array(fc.string()),
        (query, data) => {
          const results = suffixSearch(
            query,
            data
          );

          const normalizedQuery =
            query
              .trim()
              .toLocaleLowerCase();

          for (const result of results) {
            expect(
              result
                .trim()
                .toLocaleLowerCase()
                .endsWith(
                  normalizedQuery
                )
            ).toBe(true);
          }
        }
      )
    );
  });
});