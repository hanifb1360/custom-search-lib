import {
  levenshteinDistance,
  levenshteinDistanceWithin,
} from '../../src/algorithms/levenshtein';

describe('levenshteinDistance', () => {
  it('returns 0 for identical strings', () => {
    expect(levenshteinDistance('hello', 'hello')).toBe(0);
  });

  it('calculates known Levenshtein distances correctly', () => {
    expect(levenshteinDistance('kitten', 'sitting')).toBe(3);
    expect(levenshteinDistance('book', 'back')).toBe(2);
    expect(levenshteinDistance('flaw', 'lawn')).toBe(2);
  });

  it('handles empty strings', () => {
    expect(levenshteinDistance('', 'hello')).toBe(5);
    expect(levenshteinDistance('hello', '')).toBe(5);
    expect(levenshteinDistance('', '')).toBe(0);
  });

  it('is symmetrical', () => {
    expect(
      levenshteinDistance('kitten', 'sitting')
    ).toBe(
      levenshteinDistance('sitting', 'kitten')
    );
  });
});

describe('levenshteinDistanceWithin', () => {
  it('returns the distance when it is within the threshold', () => {
    expect(
      levenshteinDistanceWithin('book', 'back', 2)
    ).toBe(2);
  });

  it('returns null when the distance exceeds the threshold', () => {
    expect(
      levenshteinDistanceWithin('kitten', 'sitting', 2)
    ).toBeNull();
  });

  it('returns zero for identical strings', () => {
    expect(
      levenshteinDistanceWithin('hello', 'hello', 0)
    ).toBe(0);
  });

  it('rejects negative thresholds', () => {
    expect(() =>
      levenshteinDistanceWithin('hello', 'hello', -1)
    ).toThrow(RangeError);
  });

  it('rejects non-integer thresholds', () => {
    expect(() =>
      levenshteinDistanceWithin('hello', 'hello', 1.5)
    ).toThrow(RangeError);
  });
});