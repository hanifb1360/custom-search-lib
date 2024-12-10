import { fuzzySearchArabicPersian } from '../src/search/fuzzySearchArabicPersian';

describe('fuzzySearchArabicPersian', () => {
    it('should return an empty array if query is empty', () => {
        const result = fuzzySearchArabicPersian('', ['test']);
        expect(result).toEqual([]);
    });

    it('should return an empty array if no matches are found', () => {
        const result = fuzzySearchArabicPersian('query', ['test']);
        expect(result).toEqual([]);
    });

    it('should return exact matches', () => {
        const result = fuzzySearchArabicPersian('test', ['test', 'testing']);
        expect(result).toEqual(['test']);
    });

    it('should return fuzzy matches within the threshold', () => {
        const result = fuzzySearchArabicPersian('tst', ['test', 'testing'], { threshold: 1 });
        expect(result).toEqual(['test']);
    });

    it('should handle case insensitive search', () => {
        const result = fuzzySearchArabicPersian('Test', ['test', 'testing'], { caseSensitive: false });
        expect(result).toEqual(['test']);
    });

    it('should handle case sensitive search', () => {
        const result = fuzzySearchArabicPersian('Test', ['test', 'Test'], { caseSensitive: true });
        expect(result).toEqual(['Test']);
    });

    it('should handle Arabic text normalization', () => {
        const result = fuzzySearchArabicPersian('سلام', ['سلام', 'سلم'], { arabic: true });
        expect(result).toEqual(['سلام']);
    });

    it('should handle Persian text normalization', () => {
        const result = fuzzySearchArabicPersian('سلام', ['سلام', 'سلم'], { persian: true });
        expect(result).toEqual(['سلام']);
    });

    it('should return deduplicated results', () => {
        const result = fuzzySearchArabicPersian('test', ['test', 'Test'], { caseSensitive: false });
        expect(result).toEqual(['test']);
    });
});

