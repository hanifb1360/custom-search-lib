import { sortData } from '../../src';

describe('sortData edge cases', () => {
  it('keeps multiple null values at the end while preserving their order', () => {
    const data: Array<{
      name: string;
      score: number | null;
    }> = [
      {
        name: 'Missing First',
        score: null,
      },
      {
        name: 'High',
        score: 10,
      },
      {
        name: 'Missing Second',
        score: null,
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
      'Missing First',
      'Missing Second',
    ]);
  });

  it('keeps multiple undefined values at the end', () => {
    const data: Array<{
      name: string;
      score?: number;
    }> = [
      {
        name: 'Missing First',
      },
      {
        name: 'High',
        score: 10,
      },
      {
        name: 'Missing Second',
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
      'Missing First',
      'Missing Second',
    ]);
  });

  it('keeps multiple NaN values at the end', () => {
    const data = [
      {
        name: 'Invalid First',
        score: Number.NaN,
      },
      {
        name: 'High',
        score: 10,
      },
      {
        name: 'Invalid Second',
        score: Number.NaN,
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
      'Invalid First',
      'Invalid Second',
    ]);
  });

  it('handles negative numbers correctly', () => {
    const data = [
      {
        value: -5,
      },
      {
        value: 10,
      },
      {
        value: -20,
      },
      {
        value: 0,
      },
    ];

    const results = sortData(
      data,
      'value'
    );

    expect(
      results.map(
        item => item.value
      )
    ).toEqual([
      -20,
      -5,
      0,
      10,
    ]);
  });

  it('handles decimal values correctly', () => {
    const data = [
      {
        value: 1.5,
      },
      {
        value: 1.05,
      },
      {
        value: 1.25,
      },
    ];

    const results = sortData(
      data,
      'value'
    );

    expect(
      results.map(
        item => item.value
      )
    ).toEqual([
      1.05,
      1.25,
      1.5,
    ]);
  });

  it('preserves duplicate string values in stable order', () => {
    const data = [
      {
        id: 1,
        category: 'bike',
      },
      {
        id: 2,
        category: 'bike',
      },
      {
        id: 3,
        category: 'accessory',
      },
    ];

    const results = sortData(
      data,
      'category'
    );

    expect(
      results.map(
        item => item.id
      )
    ).toEqual([
      3,
      1,
      2,
    ]);
  });

it('throws for unsupported runtime field values', () => {
  type Item = {
    name: string;
    active: boolean;
  };

  const data: Item[] = [
    {
      name: 'First',
      active: true,
    },
    {
      name: 'Second',
      active: false,
    },
  ];

  const unsafeSort = sortData as unknown as (
    items: readonly Item[],
    field: keyof Item
  ) => Item[];

  expect(() =>
    unsafeSort(
      data,
      'active'
    )
  ).toThrow(TypeError);
});

  it('throws when runtime values have incompatible types', () => {
    type Item = {
      value: number;
    };

    const data = [
      {
        value: 10,
      },
      {
        value: '20',
      },
    ] as unknown as Item[];

    expect(() =>
      sortData(
        data,
        'value'
      )
    ).toThrow(TypeError);
  });
});
