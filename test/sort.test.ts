import { sortData } from '../src/sort';

describe('sortData', () => {
  it('should sort by a single field in ascending order', () => {
    const data = [
      { category: 'Books', price: 30 },
      { category: 'Books', price: 10 },
      { category: 'Books', price: 20 },
    ];

    const sortedData = sortData(data, [{ field: 'price', order: 'asc' }]);
    expect(sortedData).toEqual([
      { category: 'Books', price: 10 },
      { category: 'Books', price: 20 },
      { category: 'Books', price: 30 },
    ]);
  });

  it('should sort by a single field in descending order', () => {
    const data = [
      { category: 'Books', price: 30 },
      { category: 'Books', price: 10 },
      { category: 'Books', price: 20 },
    ];

    const sortedData = sortData(data, [{ field: 'price', order: 'desc' }]);
    expect(sortedData).toEqual([
      { category: 'Books', price: 30 },
      { category: 'Books', price: 20 },
      { category: 'Books', price: 10 },
    ]);
  });

  it('should sort by multiple fields', () => {
    const data = [
      { category: 'Books', price: 30 },
      { category: 'Electronics', price: 10 },
      { category: 'Books', price: 20 },
    ];

    const sortedData = sortData(data, [
      { field: 'category', order: 'asc' },
      { field: 'price', order: 'asc' },
    ]);
    expect(sortedData).toEqual([
      { category: 'Books', price: 20 },
      { category: 'Books', price: 30 },
      { category: 'Electronics', price: 10 },
    ]);
  });

  it('should handle an empty dataset', () => {
    const data: Array<{ [key: string]: any }> = [];
    const sortedData = sortData(data, [{ field: 'price', order: 'asc' }]);
    expect(sortedData).toEqual([]);
  });
});