import { filterData } from '../../src';

describe('filterData', () => {
  const products = [
    {
      name: 'City Bike',
      category: 'bike',
      price: 500,
      stock: 10,
      active: true,
      tag: null as string | null,
    },
    {
      name: 'Road Bike',
      category: 'bike',
      price: 1200,
      stock: 3,
      active: true,
      tag: 'premium' as string | null,
    },
    {
      name: 'Helmet',
      category: 'accessory',
      price: 100,
      stock: 25,
      active: false,
      tag: null as string | null,
    },
    {
      name: 'Mountain Bike',
      category: 'bike',
      price: 900,
      stock: 0,
      active: false,
      tag: 'outdoor' as string | null,
    },
  ];

  it('filters by an exact string value', () => {
    const results = filterData(
      products,
      {
        category: 'bike',
      }
    );

    expect(results).toEqual([
      products[0],
      products[1],
      products[3],
    ]);
  });

  it('filters by an exact boolean value', () => {
    const results = filterData(
      products,
      {
        active: false,
      }
    );

    expect(results).toEqual([
      products[2],
      products[3],
    ]);
  });

  it('filters by an exact numeric value', () => {
    const results = filterData(
      products,
      {
        stock: 0,
      }
    );

    expect(results).toEqual([
      products[3],
    ]);
  });

  it('supports a minimum numeric range', () => {
    const results = filterData(
      products,
      {
        price: {
          min: 900,
        },
      }
    );

    expect(results).toEqual([
      products[1],
      products[3],
    ]);
  });

  it('supports a maximum numeric range', () => {
    const results = filterData(
      products,
      {
        price: {
          max: 500,
        },
      }
    );

    expect(results).toEqual([
      products[0],
      products[2],
    ]);
  });

  it('supports both minimum and maximum', () => {
    const results = filterData(
      products,
      {
        price: {
          min: 400,
          max: 1000,
        },
      }
    );

    expect(results).toEqual([
      products[0],
      products[3],
    ]);
  });

  it('includes values equal to the range boundaries', () => {
    const results = filterData(
      products,
      {
        price: {
          min: 500,
          max: 900,
        },
      }
    );

    expect(results).toEqual([
      products[0],
      products[3],
    ]);
  });

  it('supports multiple filters together', () => {
    const results = filterData(
      products,
      {
        category: 'bike',
        price: {
          max: 1000,
        },
        active: false,
      }
    );

    expect(results).toEqual([
      products[3],
    ]);
  });

  it('supports filtering for null values', () => {
    const results = filterData(
      products,
      {
        tag: null,
      }
    );

    expect(results).toEqual([
      products[0],
      products[2],
    ]);
  });

  it('ignores undefined filter values', () => {
    const results = filterData(
      products,
      {
        category: undefined,
      }
    );

    expect(results).toEqual(
      products
    );
  });

  it('returns all items when no filters are provided', () => {
    const results = filterData(
      products,
      {}
    );

    expect(results).toEqual(
      products
    );
  });

  it('returns an empty array when nothing matches', () => {
    const results = filterData(
      products,
      {
        category: 'nonexistent',
      }
    );

    expect(results).toEqual([]);
  });

  it('does not mutate the input dataset', () => {
    const original = [
      ...products,
    ];

    filterData(
      products,
      {
        category: 'bike',
      }
    );

    expect(products).toEqual(
      original
    );
  });

  it('preserves the original object references', () => {
    const results = filterData(
      products,
      {
        category: 'bike',
      }
    );

    expect(results[0]).toBe(
      products[0]
    );
  });

  it('throws when min is greater than max', () => {
    expect(() =>
      filterData(
        products,
        {
          price: {
            min: 1000,
            max: 500,
          },
        }
      )
    ).toThrow(RangeError);
  });

  it('throws when min is NaN', () => {
    expect(() =>
      filterData(
        products,
        {
          price: {
            min: Number.NaN,
          },
        }
      )
    ).toThrow(RangeError);
  });

  it('throws when max is NaN', () => {
    expect(() =>
      filterData(
        products,
        {
          price: {
            max: Number.NaN,
          },
        }
      )
    ).toThrow(RangeError);
  });
});
