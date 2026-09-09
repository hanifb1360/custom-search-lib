import { prefixSearch } from '../../src';

describe('prefixSearch', () => {
  it('returns strings beginning with the query', () => {
    expect(
      prefixSearch(
        'bi',
        [
          'bicycle',
          'bike',
          'tricycle',
        ]
      )
    ).toEqual([
      'bicycle',
      'bike',
    ]);
  });

  it('is case-insensitive by default', () => {
    expect(
      prefixSearch(
        'bi',
        [
          'Bicycle',
          'BIKE',
        ]
      )
    ).toEqual([
      'Bicycle',
      'BIKE',
    ]);
  });

  it('returns an empty array for an empty query', () => {
    expect(
      prefixSearch(
        '',
        ['bicycle']
      )
    ).toEqual([]);
  });
});