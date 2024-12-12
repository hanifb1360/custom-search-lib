import { fuzzySearchPersian, rankedFuzzySearchPersian } from '../../src/search/persian/fuzzySearchPersian';
import { optimizedLevenshteinPersian } from '../../src/utils/index';

// Mock the utility and cast it as a Jest mock
jest.mock('../../src/utils/index', () => ({
  optimizedLevenshteinPersian: jest.fn(),
}));

// Cast the imported function as a Jest mock for TypeScript
const mockedOptimizedLevenshteinPersian = optimizedLevenshteinPersian as jest.MockedFunction<typeof optimizedLevenshteinPersian>;

describe('fuzzySearchPersian', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('returns an empty array for empty query', () => {
    const result = fuzzySearchPersian('', ['example', 'نمونه']);
    expect(result).toEqual([]);
  });

  test('returns exact match for a simple query', () => {
    mockedOptimizedLevenshteinPersian.mockImplementation((a, b) => (a === b ? 0 : 3));
    const result = fuzzySearchPersian('نمونه', ['نمونه', 'مثال']);
    expect(result).toEqual(['نمونه']);
    expect(mockedOptimizedLevenshteinPersian).toHaveBeenCalledWith('نمونه', 'نمونه');
  });

  test('handles normalization correctly', () => {
    mockedOptimizedLevenshteinPersian.mockImplementation((a, b) => (a === b ? 0 : 3));
    const result = fuzzySearchPersian('ي', ['ی']);
    expect(result).toEqual(['ی']);
    expect(mockedOptimizedLevenshteinPersian).toHaveBeenCalledWith('ی', 'ی');
  });
});

describe('rankedFuzzySearchPersian', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('returns an empty array for empty query', () => {
    const result = rankedFuzzySearchPersian('', ['example', 'نمونه']);
    expect(result).toEqual([]);
  });

  test('returns ranked results for valid matches', () => {
    mockedOptimizedLevenshteinPersian.mockImplementation((a, b) => (a === b ? 0 : 1));
    const result = rankedFuzzySearchPersian('نمونه', ['نمونه', 'نمونه‌ای']);
    expect(result).toEqual(['نمونه', 'نمونه‌ای']);
  });
});


describe('rankedFuzzySearchPersian', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('returns an empty array for empty query', () => {
    const result = rankedFuzzySearchPersian('', ['example', 'نمونه']);
    expect(result).toEqual([]);
  });

  test('returns ranked results for valid matches', () => {
    mockedOptimizedLevenshteinPersian.mockImplementation((a, b) => (a === b ? 0 : 1)); // Arbitrary mock distances
    const result = rankedFuzzySearchPersian('نمونه', ['نمونه', 'نمونه‌ای']);
    expect(result).toEqual(['نمونه', 'نمونه‌ای']); // Sorted by distance
  });
});
