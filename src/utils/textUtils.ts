/**
 * Normalize a string for consistent text processing.
 * Removes accents, diacritics, special characters, and converts to lowercase.
 * Additionally, handles special character mappings for multiple languages.
 * @param text - The input string to normalize.
 * @returns The normalized string.
 */
export const normalizeText = (text: string): string => {
    // Map for language-specific character replacements
    const specialCharMap: { [key: string]: string } = {
      // German
      'ß': 'ss',
      // Swedish, Danish, Norwegian
      'ä': 'a', 'å': 'a', 'ö': 'o', 'ø': 'o', 'æ': 'ae',
      // Turkish
      'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ş': 's', 'ü': 'u',
      // French
      'œ': 'oe',
      // Spanish
      'ñ': 'n',
      // Other
      'ý': 'y', 'đ': 'd', 'ł': 'l', 'ħ': 'h'
    };
  
    // Replace special characters using the map
    const replaceSpecialChars = (str: string): string =>
      str.replace(/[^\u0000-\u007E]/g, char => specialCharMap[char] || char);
  
    return replaceSpecialChars(
      text
        .normalize('NFD') // Decompose Unicode characters
        .replace(/[\u0300-\u036f]/g, '') // Remove diacritical marks
        .toLowerCase() // Convert to lowercase
    );
  };