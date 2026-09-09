import { normalizeString } from '../../src';

describe('normalizeString', () => {
  it('converts text to lowercase by default', () => {
    expect(
      normalizeString('Hello WORLD')
    ).toBe('hello world');
  });

  it('preserves case when caseSensitive is enabled', () => {
    expect(
      normalizeString(
        'Hello WORLD',
        {
          caseSensitive: true,
        }
      )
    ).toBe('Hello WORLD');
  });

  it('trims leading and trailing whitespace by default', () => {
    expect(
      normalizeString('   Hello World   ')
    ).toBe('hello world');
  });

  it('trims tabs and newlines by default', () => {
    expect(
      normalizeString(
        '\n\t Hello World \t\n'
      )
    ).toBe('hello world');
  });

  it('preserves whitespace when trim is disabled', () => {
    expect(
      normalizeString(
        '  Hello  ',
        {
          trim: false,
        }
      )
    ).toBe('  hello  ');
  });

  it('returns an empty string for an empty input', () => {
    expect(
      normalizeString('')
    ).toBe('');
  });

  it('returns an empty string for whitespace when trimming is enabled', () => {
    expect(
      normalizeString('     ')
    ).toBe('');
  });

  it('normalizes decomposed Unicode to NFC by default', () => {
    const composed = 'é';
    const decomposed = 'e\u0301';

    expect(
      normalizeString(
        decomposed,
        {
          caseSensitive: true,
        }
      )
    ).toBe(composed);
  });

  it('makes composed and decomposed Unicode equivalent by default', () => {
    const composed = 'Café';
    const decomposed = 'Cafe\u0301';

    expect(
      normalizeString(composed)
    ).toBe(
      normalizeString(decomposed)
    );
  });

  it('preserves decomposed Unicode when Unicode normalization is disabled', () => {
    const decomposed = 'e\u0301';

    const result = normalizeString(
      decomposed,
      {
        unicode: false,
        caseSensitive: true,
      }
    );

    expect(result).toBe(
      decomposed
    );

    expect(result).not.toBe(
      'é'
    );
  });

  it('removes diacritics when requested', () => {
    expect(
      normalizeString(
        'Crème Brûlée',
        {
          removeDiacritics: true,
        }
      )
    ).toBe('creme brulee');
  });

  it('removes multiple kinds of diacritics', () => {
    expect(
      normalizeString(
        'àáâäãå ç èéêë ìíîï ñ òóôöõ ùúûü ýÿ',
        {
          removeDiacritics: true,
        }
      )
    ).toBe(
      'aaaaaa c eeee iiii n ooooo uuuu yy'
    );
  });

  it('can remove diacritics while preserving case', () => {
    expect(
      normalizeString(
        'École CAFÉ',
        {
          removeDiacritics: true,
          caseSensitive: true,
        }
      )
    ).toBe('Ecole CAFE');
  });

  it('normalizes Unicode after removing diacritics when Unicode normalization is enabled', () => {
    const result = normalizeString(
      'Café',
      {
        removeDiacritics: true,
        unicode: true,
        caseSensitive: true,
      }
    );

    expect(result).toBe(
      'Cafe'
    );

    expect(
      result.normalize('NFC')
    ).toBe(result);
  });

  it('removes diacritics even when Unicode normalization is disabled', () => {
    expect(
      normalizeString(
        'Café',
        {
          removeDiacritics: true,
          unicode: false,
          caseSensitive: true,
        }
      )
    ).toBe('Cafe');
  });

  it('combines trimming, Unicode normalization, diacritic removal, and lowercase conversion', () => {
    const decomposed =
      '  CAFÉ\u0301  ';

    const result = normalizeString(
      decomposed,
      {
        trim: true,
        unicode: true,
        removeDiacritics: true,
        caseSensitive: false,
      }
    );

    expect(result).toBe(
      'cafe'
    );
  });

  it('is idempotent with default options', () => {
    const value =
      '  Crème Brûlée  ';

    const once =
      normalizeString(value);

    const twice =
      normalizeString(once);

    expect(twice).toBe(
      once
    );
  });

  it('is idempotent when removing diacritics', () => {
    const value =
      '  Crème Brûlée  ';

    const options = {
      removeDiacritics: true,
    };

    const once =
      normalizeString(
        value,
        options
      );

    const twice =
      normalizeString(
        once,
        options
      );

    expect(twice).toBe(
      once
    );
  });
});
