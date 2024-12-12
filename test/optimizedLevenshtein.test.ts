import { optimizedLevenshtein } from '../src/utils/index';

describe('optimizedLevenshtein', () => {
  test('returns 0 for identical strings', () => {
    const result = optimizedLevenshtein('test', 'test');
    expect(result).toBe(0);
  });

  test('calculates distance for single character changes', () => {
    expect(optimizedLevenshtein('test', 'testa')).toBe(1); // Insertion
    expect(optimizedLevenshtein('testa', 'test')).toBe(1); // Deletion
    expect(optimizedLevenshtein('test', 'tent')).toBe(1); // Substitution
  });

  test('calculates distance for multiple edits', () => {
    expect(optimizedLevenshtein('kitten', 'sitting')).toBe(3); // Replace, Replace, Insert
    expect(optimizedLevenshtein('flaw', 'lawn')).toBe(2); // Replace, Replace
  });

  test('handles empty strings correctly', () => {
    expect(optimizedLevenshtein('', '')).toBe(0); // Both strings are empty
    expect(optimizedLevenshtein('a', '')).toBe(1); // One deletion
    expect(optimizedLevenshtein('', 'a')).toBe(1); // One insertion
  });

  test('handles case sensitivity correctly', () => {
    expect(optimizedLevenshtein('Test', 'test')).toBe(1); // Substitution
    expect(optimizedLevenshtein('Case', 'case')).toBe(1); // Substitution
  });

  test('handles long strings efficiently', () => {
    const longStringA = 'a'.repeat(1000);
    const longStringB = 'b'.repeat(1000);
    expect(optimizedLevenshtein(longStringA, longStringB)).toBe(1000); // All replacements
  });

  test('handles completely different strings', () => {
    expect(optimizedLevenshtein('abc', 'xyz')).toBe(3); // Replace each character
  });

  test('handles strings with varying lengths', () => {
    expect(optimizedLevenshtein('abcdef', 'abc')).toBe(3); // Three deletions
    expect(optimizedLevenshtein('abc', 'abcdef')).toBe(3); // Three insertions
  });
});