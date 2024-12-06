import { generateFacets } from '../src/analysis';

describe('generateFacets', () => {
  it('should generate correct facet counts for a single field', () => {
    const data = [
      { category: 'Books', price: 10 },
      { category: 'Books', price: 20 },
      { category: 'Electronics', price: 200 },
      { category: 'Books', price: 15 },
    ];

    const facets = generateFacets(data, ['category']);
    expect(facets).toEqual({
      category: {
        Books: 3,
        Electronics: 1,
      },
    });
  });

  it('should generate facets for multiple fields', () => {
    const data = [
      { category: 'Books', price: 10 },
      { category: 'Books', price: 20 },
      { category: 'Electronics', price: 200 },
      { category: 'Books', price: 15 },
      { category: 'Electronics', price: 100 },
    ];

    const facets = generateFacets(data, ['category', 'price']);
    expect(facets).toEqual({
      category: {
        Books: 3,
        Electronics: 2,
      },
      price: {
        10: 1,
        20: 1,
        200: 1,
        15: 1,
        100: 1,
      },
    });
  });

  it('should handle an empty dataset', () => {
    const data: Array<{ [key: string]: any }> = [];
    const facets = generateFacets(data, ['category']);
    expect(facets).toEqual({
      category: {},
    });
  });

  it('should handle fields with missing values', () => {
    const data = [
      { category: 'Books', price: 10 },
      { price: 20 },
      { category: 'Electronics', price: 200 },
    ];

    const facets = generateFacets(data, ['category']);
    expect(facets).toEqual({
      category: {
        Books: 1,
        Electronics: 1,
        undefined: 1, // Missing values are treated as undefined
      },
    });
  });
});