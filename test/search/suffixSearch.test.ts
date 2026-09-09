import { suffixSearch } from '../../src';

describe('suffixSearch', () => {
  it('returns strings ending with the query', () => {
    expect(
      suffixSearch(
        'cycle',
        [
          'bicycle',
          'tricycle',
          'motorcycle',
          'bike',
        ]
      )
    ).toEqual([
      'bicycle',
      'tricycle',
      'motorcycle',
    ]);
  });

  it('is case-insensitive by default', () => {
    expect(
      suffixSearch(
        '.txt',
        [
          'file.TXT',
          'other.txt',
          'image.png',
        ]
      )
    ).toEqual([
      'file.TXT',
      'other.txt',
    ]);
  });

  it('returns an empty array for an empty query', () => {
    expect(
      suffixSearch(
        '',
        ['bicycle']
      )
    ).toEqual([]);
  });
});