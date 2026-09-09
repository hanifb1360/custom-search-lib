import { sortData } from '../../src';

describe('sortData', () => {
  const products = [
    {
      name: 'City Bike',
      price: 500,
      stock: 10,
    },
    {
      name: 'Road Bike',
      price: 1200,
      stock: 3,
    },
    {
      name: 'Helmet',
      price: 100,
      stock: 25,
    },
    {
      name: 'Mountain Bike',
      price: 900,
      stock: 0,
    },
  ];

  it('sorts numeric values in ascending order by default', () => {
    const results = sortData(
      products,
      'price'
    );

    expect(
      results.map(
        product => product.price
      )
    ).toEqual([
      100,
      500,
      900,
      1200,
    ]);
  });

  it('sorts numeric values in descending order', () => {
    const results = sortData(
      products,
      'price',
      'desc'
    );

    expect(
      results.map(
        product => product.price
      )
    ).toEqual([
      1200,
      900,
      500,
      100,
    ]);
  });

  it('sorts string values in ascending order', () => {
    const results = sortData(
      products,
      'name'
    );

    expect(
      results.map(
        product => product.name
      )
    ).toEqual([
      'City Bike',
      'Helmet',
      'Mountain Bike',
      'Road Bike',
    ]);
  });

  it('sorts string values in descending order', () => {
    const results = sortData(
      products,
      'name',
      'desc'
    );

    expect(
      results.map(
        product => product.name
      )
    ).toEqual([
      'Road Bike',
      'Mountain Bike',
      'Helmet',
      'City Bike',
    ]);
  });

  it('does not mutate the input dataset', () => {
    const original = [
      ...products,
    ];

    sortData(
      products,
      'price'
    );

    expect(products).toEqual(
      original
    );
  });

  it('returns a new array', () => {
    const results = sortData(
      products,
      'price'
    );

    expect(results).not.toBe(
      products
    );
  });

  it('preserves the original object references', () => {
    const results = sortData(
      products,
      'price'
    );

    expect(results[0]).toBe(
      products[2]
    );
  });

  it('returns an empty array when the dataset is empty', () => {
    const data: Array<{
      name: string;
      price: number;
    }> = [];

    const results = sortData(
      data,
      'price'
    );

    expect(results).toEqual([]);
  });

  it('handles a single item', () => {
    const data = [
      {
        name: 'Bike',
        price: 500,
      },
    ];

    const results = sortData(
      data,
      'price'
    );

    expect(results).toEqual(
      data
    );

    expect(results).not.toBe(
      data
    );
  });

  it('keeps undefined values at the end in ascending order', () => {
    const data: Array<{
      name: string;
      price?: number;
    }> = [
      {
        name: 'Unknown',
        price: undefined,
      },
      {
        name: 'Expensive',
        price: 1000,
      },
      {
        name: 'Cheap',
        price: 100,
      },
    ];

    const results = sortData(
      data,
      'price'
    );

    expect(
      results.map(
        item => item.name
      )
    ).toEqual([
      'Cheap',
      'Expensive',
      'Unknown',
    ]);
  });

  it('keeps undefined values at the end in descending order', () => {
    const data: Array<{
      name: string;
      price?: number;
    }> = [
      {
        name: 'Unknown',
        price: undefined,
      },
      {
        name: 'Expensive',
        price: 1000,
      },
      {
        name: 'Cheap',
        price: 100,
      },
    ];

    const results = sortData(
      data,
      'price',
      'desc'
    );

    expect(
      results.map(
        item => item.name
      )
    ).toEqual([
      'Expensive',
      'Cheap',
      'Unknown',
    ]);
  });

  it('keeps null values at the end', () => {
    const data: Array<{
      name: string;
      price: number | null;
    }> = [
      {
        name: 'Unknown',
        price: null,
      },
      {
        name: 'Bike',
        price: 500,
      },
      {
        name: 'Helmet',
        price: 100,
      },
    ];

    const results = sortData(
      data,
      'price'
    );

    expect(
      results.map(
        item => item.name
      )
    ).toEqual([
      'Helmet',
      'Bike',
      'Unknown',
    ]);
  });

  it('keeps NaN values at the end in ascending order', () => {
    const data = [
      {
        name: 'Invalid',
        score: Number.NaN,
      },
      {
        name: 'High',
        score: 10,
      },
      {
        name: 'Low',
        score: 1,
      },
    ];

    const results = sortData(
      data,
      'score'
    );

    expect(
      results.map(
        item => item.name
      )
    ).toEqual([
      'Low',
      'High',
      'Invalid',
    ]);
  });

  it('keeps NaN values at the end in descending order', () => {
    const data = [
      {
        name: 'Invalid',
        score: Number.NaN,
      },
      {
        name: 'High',
        score: 10,
      },
      {
        name: 'Low',
        score: 1,
      },
    ];

    const results = sortData(
      data,
      'score',
      'desc'
    );

    expect(
      results.map(
        item => item.name
      )
    ).toEqual([
      'High',
      'Low',
      'Invalid',
    ]);
  });

  it('keeps equal values in their original order', () => {
    const data = [
      {
        name: 'First',
        price: 500,
      },
      {
        name: 'Second',
        price: 500,
      },
      {
        name: 'Third',
        price: 100,
      },
    ];

    const results = sortData(
      data,
      'price'
    );

    expect(
      results.map(
        item => item.name
      )
    ).toEqual([
      'Third',
      'First',
      'Second',
    ]);
  });
});
