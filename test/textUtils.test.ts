import { normalizeText } from '../src/utils/textUtils';

describe('normalizeText', () => {
  it('should remove diacritics and normalize special characters across languages', () => {
    // German
    expect(normalizeText('Straße')).toBe('strasse');
    expect(normalizeText('München')).toBe('munchen');
    
    // Swedish, Danish, Norwegian
    expect(normalizeText('Göteborg')).toBe('goteborg'); // Swedish
    expect(normalizeText('Århus')).toBe('arhus'); // Danish
    expect(normalizeText('Østfold')).toBe('ostfold'); // Norwegian
    expect(normalizeText('Ærø')).toBe('aero'); // Danish
    
    // Turkish
    expect(normalizeText('Çanakkale')).toBe('canakkale');
    expect(normalizeText('Çağdaş')).toBe('cagdas');
    expect(normalizeText('Göçmen')).toBe('gocmen');
    
    // Spanish
    expect(normalizeText('Ñandú')).toBe('nandu');
    expect(normalizeText('España')).toBe('espana');
    
    // French
    expect(normalizeText('Crème brûlée')).toBe('creme brulee');
    expect(normalizeText('Œuvre')).toBe('oeuvre');
    
    // Polish
    expect(normalizeText('Łódź')).toBe('lodz');
    expect(normalizeText('Świętokrzyskie')).toBe('swietokrzyskie');
    
    // Czech and Slovak
    expect(normalizeText('České Budějovice')).toBe('ceske budejovice');
    expect(normalizeText('Škoda')).toBe('skoda');
    
    // Hungarian
    expect(normalizeText('Őrült')).toBe('orult');
    expect(normalizeText('Tökéletes')).toBe('tokeletes');
    
    // Greek
    expect(normalizeText('Ελληνικά')).toBe('ellinika');
    expect(normalizeText('Θεσσαλονίκη')).toBe('thessaloniki');
    expect(normalizeText('Ψυχολογία')).toBe('psychologia');
    
    // Others
    expect(normalizeText('ý')).toBe('y');
    expect(normalizeText('đ')).toBe('d');
    expect(normalizeText('ħ')).toBe('h');
  });

  it('should handle already normalized text', () => {
    expect(normalizeText('canon')).toBe('canon');
    expect(normalizeText('hello world')).toBe('hello world');
  });

  it('should handle empty strings gracefully', () => {
    expect(normalizeText('')).toBe('');
  });

  it('should handle text without special characters', () => {
    expect(normalizeText('hello world')).toBe('hello world');
    expect(normalizeText('1234567890')).toBe('1234567890');
  });

  it('should handle a mix of special and normal characters', () => {
    expect(normalizeText('Hello@Göteborg123!')).toBe('hello@goteborg123!');
    expect(normalizeText('Crème brûlée & Ærø')).toBe('creme brulee & aero');
  });

  it('should normalize mixed-language strings correctly', () => {
    expect(normalizeText('Straße, Göteborg, Ñandú, Ελληνικά')).toBe('strasse, goteborg, nandu, ellinika');
  });
});