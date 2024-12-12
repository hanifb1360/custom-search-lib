import { fuzzySearchPersian, rankedFuzzySearchPersian } from '../../src/search/persian/fuzzySearchPersian';
import { optimizedLevenshteinPersian } from '../../src/utils/index';

// Mock the utility and cast it as a Jest mock
jest.mock('../../src/utils/index', () => ({
  optimizedLevenshteinPersian: jest.fn(),
}));

const mockedOptimizedLevenshteinPersian = optimizedLevenshteinPersian as jest.MockedFunction<typeof optimizedLevenshteinPersian>;

describe('fuzzySearchPersian', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('returns an empty array for an empty query', () => {
    const result = fuzzySearchPersian('', ['نمونه', 'مثال']);
    expect(result).toEqual([]);
  });

  test('returns exact match when available', () => {
    mockedOptimizedLevenshteinPersian.mockImplementation((a, b) => (a === b ? 0 : 3));
    const result = fuzzySearchPersian('نمونه', ['نمونه', 'مثال']);
    expect(result).toEqual(['نمونه']);
    expect(mockedOptimizedLevenshteinPersian).toHaveBeenCalledWith('نمونه', 'نمونه');
  });

  test('handles Persian normalization (Arabic Yeh to Persian Yeh)', () => {
    mockedOptimizedLevenshteinPersian.mockImplementation((a, b) => (a === b ? 0 : 3));
    const result = fuzzySearchPersian('ي', ['ی']);
    expect(result).toEqual(['ی']);
    expect(mockedOptimizedLevenshteinPersian).toHaveBeenCalledWith('ی', 'ی');
  });

  test('handles case insensitivity', () => {
    mockedOptimizedLevenshteinPersian.mockImplementation((a, b) => (a.toLowerCase() === b.toLowerCase() ? 0 : 3));
    const result = fuzzySearchPersian('نمونه', ['نمونه', 'نمونه‌ای']);
    expect(result).toEqual(['نمونه']);
  });

  test('applies threshold filtering', () => {
    mockedOptimizedLevenshteinPersian.mockImplementation((a, b) => (a === b ? 0 : 5));
    const result = fuzzySearchPersian('نمونه', ['نمونه', 'نمونه‌ای'], { threshold: 2 });
    expect(result).toEqual(['نمونه']);
  });

  test('handles empty data array', () => {
    const result = fuzzySearchPersian('نمونه', []);
    expect(result).toEqual([]);
  });

  test('deduplicates results based on minimum distance', () => {
    mockedOptimizedLevenshteinPersian.mockImplementation((a, b) => (a === b ? 0 : 1));
    const result = fuzzySearchPersian('نمونه', ['نمونه', 'نمونه', 'مثال']);
    expect(result).toEqual(['نمونه']);
  });
});

describe('rankedFuzzySearchPersian', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('returns an empty array for an empty query', () => {
    const result = rankedFuzzySearchPersian('', ['نمونه', 'مثال']);
    expect(result).toEqual([]);
  });

  test('ranks results correctly for valid matches', () => {
    mockedOptimizedLevenshteinPersian
      .mockReturnValueOnce(0) // Exact match
      .mockReturnValueOnce(2); // Partial match
    const result = rankedFuzzySearchPersian('نمونه', ['نمونه', 'نمونه‌ای']);
    expect(result).toEqual(['نمونه', 'نمونه‌ای']);
  });


  test('sorts by score and then alphabetically for ties', () => {
    mockedOptimizedLevenshteinPersian
      .mockReturnValueOnce(1) // Distance for 'مثال'
      .mockReturnValueOnce(1); // Distance for 'مثال دیگر'
    const result = rankedFuzzySearchPersian('مثال', ['مثال', 'مثال دیگر']);
    expect(result).toEqual(['مثال', 'مثال دیگر']); // Sorted alphabetically as scores are the same
  });

  test('applies length penalties during ranking', () => {
    mockedOptimizedLevenshteinPersian
      .mockReturnValueOnce(1) // Score for 'نمونه'
      .mockReturnValueOnce(2); // Score for 'نمونه‌ای'
    const result = rankedFuzzySearchPersian('نمونه', ['نمونه', 'نمونه‌ای']);
    expect(result).toEqual(['نمونه', 'نمونه‌ای']); // Shorter match first
  });

  test('handles mixed exact and approximate matches', () => {
    mockedOptimizedLevenshteinPersian
      .mockReturnValueOnce(0) // Exact match for 'نمونه'
      .mockReturnValueOnce(2); // Approximate match for 'نمونه‌ای'
    const result = rankedFuzzySearchPersian('نمونه', ['نمونه', 'نمونه‌ای']);
    expect(result).toEqual(['نمونه', 'نمونه‌ای']);
  });
  

  test('returns an empty array for empty data', () => {
    const result = rankedFuzzySearchPersian('نمونه', []);
    expect(result).toEqual([]);
  });

  test('handles ties in scores consistently', () => {
    mockedOptimizedLevenshteinPersian
      .mockReturnValueOnce(1) // Score for 'کتاب'
      .mockReturnValueOnce(1); // Score for 'کتاب‌های'
    const result = rankedFuzzySearchPersian('کتاب', ['کتاب', 'کتاب‌های']);
    expect(result).toEqual(['کتاب', 'کتاب‌های']); // Alphabetical order for ties
  });
});