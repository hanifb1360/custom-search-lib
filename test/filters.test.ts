import { applyFilters } from '../src/filters';

describe('applyFilters', () => {
  it('should apply single-field exact match filters', () => {
    const data = [
      { category: 'Books', price: 10 },
      { category: 'Electronics', price: 200 },
      { category: 'Books', price: 15 },
    ];

    const filters = { category: 'Books' };
    const filteredData = applyFilters(data, filters);
    expect(filteredData).toEqual([
      { category: 'Books', price: 10 },
      { category: 'Books', price: 15 },
    ]);
  });

  it('should apply range filters', () => {
    const data = [
      { category: 'Books', price: 10 },
      { category: 'Books', price: 20 },
      { category: 'Books', price: 30 },
    ];

    const filters = { price: { min: 15, max: 25 } };
    const filteredData = applyFilters(data, filters);
    expect(filteredData).toEqual([{ category: 'Books', price: 20 }]);
  });

  it('should apply multi-value filters', () => {
    const data = [
      { category: 'Books', price: 10 },
      { category: 'Electronics', price: 200 },
      { category: 'Clothing', price: 50 },
    ];

    const filters = { category: ['Books', 'Clothing'] };
    const filteredData = applyFilters(data, filters);
    expect(filteredData).toEqual([
      { category: 'Books', price: 10 },
      { category: 'Clothing', price: 50 },
    ]);
  });

  it('should combine filters with AND logic', () => {
    const data = [
      { category: 'Books', price: 10 },
      { category: 'Books', price: 20 },
      { category: 'Electronics', price: 200 },
    ];

    const filters = { category: 'Books', price: { min: 15, max: 25 } };
    const filteredData = applyFilters(data, filters, 'AND');
    expect(filteredData).toEqual([{ category: 'Books', price: 20 }]);
  });

  it('should combine filters with OR logic', () => {
    const data = [
      { category: 'Books', price: 10 },
      { category: 'Books', price: 20 },
      { category: 'Electronics', price: 200 },
    ];

    const filters = { category: 'Books', price: { min: 15, max: 25 } };
    const filteredData = applyFilters(data, filters, 'OR');
    expect(filteredData).toEqual([
      { category: 'Books', price: 10 },
      { category: 'Books', price: 20 },
    ]);
  });

  it('should handle an empty dataset', () => {
    const data: Array<{ [key: string]: any }> = [];
    const filters = { category: 'Books' };
    const filteredData = applyFilters(data, filters);
    expect(filteredData).toEqual([]);
  });
});