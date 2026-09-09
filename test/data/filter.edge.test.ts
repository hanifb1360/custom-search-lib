import {
  filterData,
  type Filters,
} from '../../src';

describe('filterData edge cases', () => {
  it('excludes NaN item values from numeric ranges', () => {
    const data = [
      {
        name: 'Valid',
        score: 10,
      },
      {
        name: 'Invalid',
        score: Number.NaN,
      },
    ];

    const results = filterData(
      data,
      {
        score: {
          min: 0,
          max: 20,
        },
      }
    );

    expect(results).toEqual([
      data[0],
    ]);
  });

  it('supports Infinity as an upper range boundary', () => {
    const data = [
      {
        value: 10,
      },
      {
        value: 100,
      },
    ];

    const results = filterData(
      data,
      {
        value: {
          max: Infinity,
        },
      }
    );

    expect(results).toEqual(
      data
    );
  });

  it('supports negative numeric ranges', () => {
    const data = [
      {
        temperature: -20,
      },
      {
        temperature: -5,
      },
      {
        temperature: 10,
      },
    ];

    const results = filterData(
      data,
      {
        temperature: {
          min: -10,
          max: 0,
        },
      }
    );

    expect(results).toEqual([
      data[1],
    ]);
  });

  it('handles an undefined optional property with an exact filter', () => {
    const data: Array<{
      name: string;
      category?: string;
    }> = [
      {
        name: 'Unknown',
      },
      {
        name: 'Bike',
        category: 'transport',
      },
    ];

    const results = filterData(
      data,
      {
        category: 'transport',
      }
    );

    expect(results).toEqual([
      data[1],
    ]);
  });

  it('does not treat null as a range object', () => {
    const data: Array<{
      name: string;
      tag: string | null;
    }> = [
      {
        name: 'First',
        tag: null,
      },
      {
        name: 'Second',
        tag: 'featured',
      },
    ];

    const results = filterData(
      data,
      {
        tag: null,
      }
    );

    expect(results).toEqual([
      data[0],
    ]);
  });

  it('does not treat arrays as numeric ranges', () => {
    type Item = {
      value: number;
    };

    const data: Item[] = [
      {
        value: 10,
      },
    ];

    const unsafeFilters = {
      value: [1, 20],
    } as unknown as Filters<Item>;

    const results = filterData(
      data,
      unsafeFilters
    );

    expect(results).toEqual([]);
  });

  it('does not crash when a range is applied to malformed runtime data', () => {
    type Item = {
      price: number;
    };

    const data = [
      {
        price: 'invalid',
      },
      {
        price: 100,
      },
    ] as unknown as Item[];

    const results = filterData(
      data,
      {
        price: {
          min: 50,
          max: 150,
        },
      }
    );

    expect(results).toEqual([
      data[1],
    ]);
  });
});
