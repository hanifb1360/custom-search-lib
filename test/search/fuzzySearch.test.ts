import { fuzzySearch } from '../../src';

describe('fuzzySearch', () => {
  it('returns all matches within the threshold', () => {
    const data = [
      'book',
      'books',
      'brook',
      'booth',
      'banana',
    ];

    const results = fuzzySearch(
      'book',
      data,
      { threshold: 1 }
    );

    expect(results).toEqual([
      'book',
      'books',
      'brook',
    ]);
  });

  it('excludes matches outside the threshold', () => {
    const data = [
      'book',
      'brook',
      'banana',
    ];

    const results = fuzzySearch(
      'book',
      data,
      { threshold: 1 }
    );

    expect(results).not.toContain('banana');
  });

  it('supports exact matching with threshold 0', () => {
    const data = [
      'hello@world',
      'hello_world',
      'hello-world',
    ];

    expect(
      fuzzySearch(
        'hello@world',
        data,
        { threshold: 0 }
      )
    ).toEqual(['hello@world']);
  });

  it('is case-insensitive by default', () => {
    const data = [
      'Hello',
      'hello',
      'HELLO',
      'world',
    ];

    expect(
      fuzzySearch(
        'hello',
        data,
        { threshold: 0 }
      )
    ).toEqual([
      'Hello',
      'hello',
      'HELLO',
    ]);
  });

  it('supports case-sensitive matching', () => {
    const data = [
      'Hello',
      'hello',
      'HELLO',
    ];

    expect(
      fuzzySearch(
        'hello',
        data,
        {
          threshold: 0,
          caseSensitive: true,
        }
      )
    ).toEqual(['hello']);
  });

  it('returns an empty array for an empty query', () => {
    expect(
      fuzzySearch(
        '',
        ['hello', 'world']
      )
    ).toEqual([]);
  });

  it('returns an empty array for whitespace-only queries', () => {
    expect(
      fuzzySearch(
        '   ',
        ['hello', 'world']
      )
    ).toEqual([]);
  });

  it('returns an empty array for an empty dataset', () => {
    expect(
      fuzzySearch(
        'hello',
        []
      )
    ).toEqual([]);
  });

  it('preserves original values', () => {
    const data = [
      'HELLO',
      'Hello',
    ];

    expect(
      fuzzySearch(
        'hello',
        data,
        { threshold: 0 }
      )
    ).toEqual([
      'HELLO',
      'Hello',
    ]);
  });

  it('handles large datasets without relying on a single result', () => {
    const data = Array.from(
      { length: 100000 },
      (_, index) => `item-${index}`
    );

    const results = fuzzySearch(
      'item-9999',
      data,
      { threshold: 0 }
    );

    expect(results).toEqual([
      'item-9999',
    ]);
  });

  it('throws for negative thresholds', () => {
    expect(() =>
      fuzzySearch(
        'hello',
        ['hello'],
        { threshold: -1 }
      )
    ).toThrow(RangeError);
  });

  it('throws for non-integer thresholds', () => {
    expect(() =>
      fuzzySearch(
        'hello',
        ['hello'],
        { threshold: 1.5 }
      )
    ).toThrow(RangeError);
  });
});