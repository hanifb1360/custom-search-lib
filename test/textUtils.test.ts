import { normalizeText } from '../src/utils/textUtils';

describe('normalizeText', () => {
  it('should remove diacritics and normalize special characters across languages', () => {
    expect(normalizeText('Straße')).toBe('strasse'); // German
    expect(normalizeText('Göteborg')).toBe('goteborg'); // Swedish
    expect(normalizeText('Århus')).toBe('arhus'); // Danish
    expect(normalizeText('Østfold')).toBe('ostfold'); // Norwegian
    expect(normalizeText('Çanakkale')).toBe('canakkale'); // Turkish
    expect(normalizeText('Çağdaş')).toBe('cagdas'); // Turkish
    expect(normalizeText('Ñandú')).toBe('nandu'); // Spanish
    expect(normalizeText('Crème brûlée')).toBe('creme brulee'); // French
    expect(normalizeText('Lærøy')).toBe('laeroy'); // Norwegian
    expect(normalizeText('Ærø')).toBe('aero'); // Danish
    expect(normalizeText('Göçmen')).toBe('gocmen'); // Turkish
  });

  it('should handle already normalized text', () => {
    expect(normalizeText('canon')).toBe('canon');
  });

  it('should handle empty strings gracefully', () => {
    expect(normalizeText('')).toBe('');
  });

  it('should handle text without special characters', () => {
    expect(normalizeText('hello world')).toBe('hello world');
  });

  it('should handle a mix of special and normal characters', () => {
    expect(normalizeText('Hello@Göteborg123!')).toBe('hello@goteborg123!');
  });
});