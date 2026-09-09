import { fullTextSearch } from '../../src';

describe('fullTextSearch edge cases', () => {
  it('returns an empty array when whitespace is preserved but produces no tokens', () => {
    const data = [
      {
        title: 'Bicycle',
      },
    ];

    const results = fullTextSearch(
      '   ',
      data,
      {
        fields: ['title'],
        trim: false,
      }
    );

    expect(results).toEqual([]);
  });

  it('handles missing optional fields safely', () => {
    const data: Array<{
      title: string;
      description?: string;
    }> = [
      {
        title: 'Bicycle',
      },
      {
        title: 'Helmet',
        description: 'Cycling protection',
      },
    ];

    const results = fullTextSearch(
      'cycling',
      data,
      {
        fields: ['description'],
      }
    );

    expect(results).toEqual([
      data[1],
    ]);
  });

  it('handles null field values safely', () => {
    const data: Array<{
      title: string;
      description: string | null;
    }> = [
      {
        title: 'Bike',
        description: null,
      },
      {
        title: 'Helmet',
        description: 'Safety equipment',
      },
    ];

    const results = fullTextSearch(
      'safety',
      data,
      {
        fields: ['description'],
      }
    );

    expect(results).toEqual([
      data[1],
    ]);
  });

  it('preserves numeric zero as a searchable value', () => {
    const data = [
      {
        name: 'Out of stock',
        stock: 0,
      },
      {
        name: 'Available',
        stock: 10,
      },
    ];

    const results = fullTextSearch(
      '0',
      data,
      {
        fields: ['stock'],
      }
    );

    expect(results).toEqual([
      data[0],
      data[1],
    ]);
  });

  it('can search boolean field values', () => {
    const data = [
      {
        name: 'Visible',
        active: true,
      },
      {
        name: 'Hidden',
        active: false,
      },
    ];

    const results = fullTextSearch(
      'false',
      data,
      {
        fields: ['active'],
      }
    );

    expect(results).toEqual([
      data[1],
    ]);
  });

  it('does not accidentally match missing fields using an empty query token', () => {
    const data: Array<{
      title?: string;
    }> = [
      {},
      {
        title: 'Bicycle',
      },
    ];

    const results = fullTextSearch(
      'bike',
      data,
      {
        fields: ['title'],
      }
    );

    expect(results).toEqual([]);
  });
});
