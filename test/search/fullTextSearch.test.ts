import { fullTextSearch } from '../../src';

describe('fullTextSearch', () => {
  const products = [
    {
      title: 'Red Bicycle',
      description: 'Lightweight city bike',
      category: 'Transport',
      year: 2024,
    },
    {
      title: 'Blue Bicycle',
      description: 'Fast road bike',
      category: 'Transport',
      year: 2025,
    },
    {
      title: 'Red Helmet',
      description: 'Protective cycling equipment',
      category: 'Accessories',
      year: 2026,
    },
    {
      title: 'Coffee Machine',
      description: 'Automatic kitchen appliance',
      category: 'Kitchen',
      year: 2024,
    },
  ];

  it('matches all query tokens by default', () => {
    const results = fullTextSearch(
      'red bicycle',
      products,
      {
        fields: [
          'title',
          'description',
        ],
      }
    );

    expect(results).toEqual([
      products[0],
    ]);
  });

  it('allows tokens to match across different fields', () => {
    const data = [
      {
        title: 'Red Product',
        description: 'Lightweight bicycle',
      },
      {
        title: 'Blue Product',
        description: 'Lightweight bicycle',
      },
    ];

    const results = fullTextSearch(
      'red bicycle',
      data,
      {
        fields: [
          'title',
          'description',
        ],
      }
    );

    expect(results).toEqual([
      data[0],
    ]);
  });

  it('supports the or operator', () => {
    const results = fullTextSearch(
      'red bicycle',
      products,
      {
        fields: ['title'],
        operator: 'or',
      }
    );

    expect(results).toEqual([
      products[0],
      products[1],
      products[2],
    ]);
  });

  it('is case-insensitive by default', () => {
    const results = fullTextSearch(
      'RED BICYCLE',
      products,
      {
        fields: ['title'],
      }
    );

    expect(results).toEqual([
      products[0],
    ]);
  });

  it('supports case-sensitive search', () => {
    const data = [
      {
        title: 'Bicycle',
      },
      {
        title: 'bicycle',
      },
    ];

    const results = fullTextSearch(
      'bicycle',
      data,
      {
        fields: ['title'],
        caseSensitive: true,
      }
    );

    expect(results).toEqual([
      data[1],
    ]);
  });

  it('handles repeated whitespace in the query', () => {
    const results = fullTextSearch(
      '  red    bicycle  ',
      products,
      {
        fields: ['title'],
      }
    );

    expect(results).toEqual([
      products[0],
    ]);
  });

  it('can search numeric field values safely', () => {
    const results = fullTextSearch(
      '2025',
      products,
      {
        fields: ['year'],
      }
    );

    expect(results).toEqual([
      products[1],
    ]);
  });

  it('can search across string and numeric fields together', () => {
    const results = fullTextSearch(
      'blue 2025',
      products,
      {
        fields: [
          'title',
          'year',
        ],
      }
    );

    expect(results).toEqual([
      products[1],
    ]);
  });

  it('returns an empty array for an empty query', () => {
    const results = fullTextSearch(
      '',
      products,
      {
        fields: ['title'],
      }
    );

    expect(results).toEqual([]);
  });

  it('returns an empty array for a whitespace-only query', () => {
    const results = fullTextSearch(
      '     ',
      products,
      {
        fields: ['title'],
      }
    );

    expect(results).toEqual([]);
  });

  it('returns an empty array for an empty dataset', () => {
    const results = fullTextSearch(
      'bicycle',
      [],
      {
        fields: ['title'] as const,
      }
    );

    expect(results).toEqual([]);
  });

  it('returns an empty array when no fields are provided', () => {
    const results = fullTextSearch(
      'bicycle',
      products,
      {
        fields: [],
      }
    );

    expect(results).toEqual([]);
  });

  it('only searches the specified fields', () => {
    const results = fullTextSearch(
      'transport',
      products,
      {
        fields: ['title'],
      }
    );

    expect(results).toEqual([]);
  });

  it('preserves the original object references', () => {
    const results = fullTextSearch(
      'red bicycle',
      products,
      {
        fields: ['title'],
      }
    );

    expect(results[0]).toBe(
      products[0]
    );
  });

  it('does not mutate the input dataset', () => {
    const original = [
      ...products,
    ];

    fullTextSearch(
      'bicycle',
      products,
      {
        fields: ['title'],
      }
    );

    expect(products).toEqual(
      original
    );
  });
});
