/**
 * Normalize a string for consistent text processing.
 * Removes accents, diacritics, and converts to lowercase.
 * @param text - The input string to normalize.
 * @returns The normalized string.
 */
export const normalizeText = (text: string): string => {
    return text
      .normalize('NFD') // Decompose Unicode characters
      .replace(/[\u0300-\u036f]/g, '') // Remove diacritical marks
      .toLowerCase(); // Convert to lowercase
  };