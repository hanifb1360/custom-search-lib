import { normalizeTextArabicPersian } from '../src/utils/normalizeTextArabicPersian';

describe('normalizeTextArabicPersian', () => {
  it('should normalize Arabic text', () => {
    const input = 'أإآؤئهةى';
    const expectedOutput = 'اااويههي';
    expect(normalizeTextArabicPersian(input, { arabic: true })).toBe(expectedOutput);
  });

  it('should normalize Persian text', () => {
    const input = 'يكۀپچژگ';
    const expectedOutput = 'یکهپچژگ';
    expect(normalizeTextArabicPersian(input, { persian: true })).toBe(expectedOutput);
  });

  it('should normalize both Arabic and Persian text', () => {
    const input = 'أإآؤئهةىيکۀپچژگ';
    const expectedOutput = 'اااويههيیکهپچژگ';
    expect(normalizeTextArabicPersian(input, { arabic: true, persian: true })).toBe(expectedOutput);
  });

  it('should return the same text if no options are provided', () => {
    const input = 'أإآؤئهةىيكۀپچژگ';
    expect(normalizeTextArabicPersian(input)).toBe(input);
  });

  it('should return the same text if empty string is provided', () => {
    const input = '';
    expect(normalizeTextArabicPersian(input)).toBe(input);
  });

  it('should handle text with no special characters', () => {
    const input = 'سلام';
    expect(normalizeTextArabicPersian(input, { arabic: true, persian: true })).toBe(input);
  });
});

