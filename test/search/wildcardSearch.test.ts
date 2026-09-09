import { wildcardSearch } from '../../src';

describe('wildcardSearch', () => {
  it('supports suffix wildcard patterns', () => {
    expect(
      wildcardSearch(
        '*cycle',
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

  it('supports prefix wildcard patterns', () => {
    expect(
      wildcardSearch(
        'bike*',
        [
          'bike',
          'bikes',
          'biker',
          'bicycle',
        ]
      )
    ).toEqual([
      'bike',
      'bikes',
      'biker',
    ]);
  });

  it('supports wildcards in the middle', () => {
    expect(
      wildcardSearch(
        'b*e',
        [
          'bike',
          'bicycle',
          'blue',
          'banana',
        ]
      )
    ).toEqual([
      'bike',
      'bicycle',
      'blue',
    ]);
  });

  it('treats regex characters as literals', () => {
    expect(
      wildcardSearch(
        'file.*',
        [
          'file.txt',
          'file.json',
          'filename',
        ]
      )
    ).toEqual([
      'file.txt',
      'file.json',
    ]);
  });

  it('matches everything with a single wildcard', () => {
    const data = [
      'hello',
      'world',
      '',
    ];

    expect(
      wildcardSearch('*', data)
    ).toEqual(data);
  });
});