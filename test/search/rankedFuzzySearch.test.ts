import {
  rankedFuzzySearch,
  rankedFuzzySearchDetailed,
} from '../../src';

describe('rankedFuzzySearch', () => {
  it('places exact matches before fuzzy matches', () => {
    const results = rankedFuzzySearch(
      'book',
      [
        'brook',
        'books',
        'book',
      ],
      {
        threshold: 1,
      }
    );

    expect(results[0]).toBe('book');
  });

  it('supports actual typos', () => {
    const results = rankedFuzzySearch(
      'bicycel',
      [
        'bicycle',
        'motorcycle',
        'car',
      ],
      {
        threshold: 2,
      }
    );

    expect(results).toContain('bicycle');
  });

  it('does not require exact substring containment', () => {
    const results = rankedFuzzySearch(
      'bok',
      [
        'book',
        'banana',
      ],
      {
        threshold: 1,
      }
    );

    expect(results).toContain('book');
  });

  it('returns an empty array for an empty query', () => {
    expect(
      rankedFuzzySearch(
        '',
        ['book']
      )
    ).toEqual([]);
  });
});

describe('rankedFuzzySearchDetailed', () => {
  it('returns score and distance metadata', () => {
    const results = rankedFuzzySearchDetailed(
      'book',
      [
        'book',
        'books',
      ],
      {
        threshold: 1,
      }
    );

    expect(results[0]).toMatchObject({
      item: 'book',
      distance: 0,
    });

    expect(
      typeof results[0].score
    ).toBe('number');
  });

  it('sorts results from best score to worst score', () => {
    const results = rankedFuzzySearchDetailed(
      'book',
      [
        'books',
        'book',
        'brook',
      ],
      {
        threshold: 1,
      }
    );

    for (
      let index = 1;
      index < results.length;
      index += 1
    ) {
      expect(
        results[index - 1].score
      ).toBeLessThanOrEqual(
        results[index].score
      );
    }
  });
});