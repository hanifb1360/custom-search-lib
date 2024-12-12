/**
 * Normalize Persian text to ensure consistent comparisons.
 * @param text - Input Persian text
 * @returns Normalized Persian text
 */
const normalizePersian = (text: string): string =>
    text
      .replace(/ي/g, 'ی') // Replace Arabic Yeh with Persian Yeh
      .replace(/ك/g, 'ک') // Replace Arabic Kaf with Persian Kaf
      .replace(/ۀ/g, 'ه') // Replace Heh with Heh Goal
      .replace(/ؤ/g, 'و') // Replace Waw Hamzah with Waw
      .replace(/ئ/g, 'ی'); // Replace Yeh Hamzah with Yeh
  
  /**
   * Calculate Levenshtein distance for Persian text using an optimized approach.
   * @param a - First string
   * @param b - Second string
   * @returns The Levenshtein distance between the two Persian strings
   */
  export const optimizedLevenshteinPersian = (a: string, b: string): number => {
    const normalizedA = normalizePersian(a);
    const normalizedB = normalizePersian(b);
  
    let prev = Array(normalizedB.length + 1).fill(0);
    let curr = Array(normalizedB.length + 1).fill(0);
  
    for (let j = 0; j <= normalizedB.length; j++) prev[j] = j;
  
    for (let i = 1; i <= normalizedA.length; i++) {
      curr[0] = i;
      for (let j = 1; j <= normalizedB.length; j++) {
        curr[j] =
          normalizedA[i - 1] === normalizedB[j - 1]
            ? prev[j - 1]
            : Math.min(prev[j], curr[j - 1], prev[j - 1]) + 1;
      }
      [prev, curr] = [curr, prev];
    }
  
    return prev[normalizedB.length];
  };