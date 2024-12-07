import { normalizeText } from '../src/utils/textUtils';

describe('normalizeText', () => {
  it('should remove diacritics and convert text to lowercase', () => {
    expect(normalizeText('ÀÉÎÕÜ')).toBe('aeiou');
    expect(normalizeText('çañón')).toBe('canon');
    expect(normalizeText('Straße')).toBe('strasse');
  });

  it('should handle already normalized text', () => {
    expect(normalizeText('hello')).toBe('hello');
    expect(normalizeText('WORLD')).toBe('world');
  });

  it('should handle empty strings gracefully', () => {
    expect(normalizeText('')).toBe('');
  });
});