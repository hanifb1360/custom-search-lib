import {
  fuzzySearch,
  prefixSearch,
  suffixSearch,
  fullTextSearch,
} from '../../src';

describe('search normalization integration', () => {
  it('allows fuzzy search to ignore diacritics', () => {
    const results = fuzzySearch(
      'cafe',
      [
        'café',
        'coffee',
      ],
      {
        threshold: 0,
        removeDiacritics: true,
      }
    );

    expect(results).toEqual([
      'café',
    ]);
  });

  it('allows prefix search to ignore diacritics', () => {
    const results = prefixSearch(
      'cafe',
      [
        'Café Racer',
        'Coffee Shop',
      ],
      {
        removeDiacritics: true,
      }
    );

    expect(results).toEqual([
      'Café Racer',
    ]);
  });

  it('allows suffix search to ignore diacritics', () => {
    const results = suffixSearch(
      'resume',
      [
        'My Résumé',
        'Document',
      ],
      {
        removeDiacritics: true,
      }
    );

    expect(results).toEqual([
      'My Résumé',
    ]);
  });

  it('normalizes composed and decomposed Unicode during fuzzy search', () => {
    const composed =
      'café';

    const decomposed =
      'cafe\u0301';

    const results = fuzzySearch(
      composed,
      [
        decomposed,
      ],
      {
        threshold: 0,
      }
    );

    expect(results).toEqual([
      decomposed,
    ]);
  });

  it('allows full text search to ignore diacritics', () => {
    const data = [
      {
        title: 'Crème Brûlée',
      },
      {
        title: 'Chocolate Cake',
      },
    ];

    const results = fullTextSearch(
      'creme brulee',
      data,
      {
        fields: ['title'],
        removeDiacritics: true,
      }
    );

    expect(results).toEqual([
      data[0],
    ]);
  });

  it('respects case sensitivity after normalization', () => {
    const results = prefixSearch(
      'Café',
      [
        'Café Racer',
        'CAFÉ Racer',
        'café Racer',
      ],
      {
        caseSensitive: true,
      }
    );

    expect(results).toEqual([
      'Café Racer',
    ]);
  });
});
