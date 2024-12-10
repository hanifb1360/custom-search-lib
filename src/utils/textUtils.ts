export const normalizeText = (text: string): string => {
  // Language-specific character maps
  const languageSpecificMaps = {
    german: {
      'ß': 'ss',
      'ä': 'ae', 'ö': 'oe', 'ü': 'ue',
    },
    swedishDanishNorwegian: {
      'ä': 'ae', 'å': 'aa', 'ö': 'oe', 'ø': 'o', 'æ': 'ae',
    },
    turkish: {
      'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ş': 's', 'ü': 'u',
    },
    french: {
      'œ': 'oe', 'é': 'e', 'è': 'e', 'ê': 'e', 'ë': 'e',
      'à': 'a', 'â': 'a', 'ù': 'u', 'û': 'u', 'î': 'i', 'ï': 'i', 'ç': 'c',
    },
    spanish: {
      'ñ': 'n', 'á': 'a', 'í': 'i', 'ó': 'o', 'ú': 'u',
    },
    polish: {
      'ą': 'a', 'ć': 'c', 'ę': 'e', 'ł': 'l', 'ń': 'n', 'ó': 'o', 'ś': 's', 'ź': 'z', 'ż': 'z',
    },
    czechSlovak: {
      'č': 'c', 'ď': 'd', 'ě': 'e', 'ň': 'n', 'ř': 'r', 'š': 's', 'ť': 't', 'ů': 'u', 'ž': 'z',
    },
    hungarian: {
      'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ö': 'o', 'ő': 'o', 'ú': 'u', 'ü': 'u', 'ű': 'u',
    },
    greek: {
      'α': 'a', 'β': 'b', 'γ': 'g', 'δ': 'd', 'ε': 'e', 'ζ': 'z', 'η': 'i', 'θ': 'th', 'ι': 'i',
      'κ': 'k', 'λ': 'l', 'μ': 'm', 'ν': 'n', 'ξ': 'x', 'ο': 'o', 'π': 'p', 'ρ': 'r', 'σ': 's',
      'τ': 't', 'υ': 'y', 'φ': 'f', 'χ': 'ch', 'ψ': 'ps', 'ω': 'o',
    },
    arabic: {
      'ا': 'a', 'ب': 'b', 'ت': 't', 'ث': 'th', 'ج': 'j', 'ح': 'h', 'خ': 'kh',
      'د': 'd', 'ذ': 'dh', 'ر': 'r', 'ز': 'z', 'س': 's', 'ش': 'sh', 'ص': 'sad',
      'ض': 'dad', 'ط': 'tah', 'ظ': 'zah', 'ع': 'ayn', 'غ': 'gh', 'ف': 'f',
      'ق': 'q', 'ك': 'k', 'ل': 'l', 'م': 'm', 'ن': 'n', 'ه': 'h', 'و': 'w',
      'ي': 'y', 'ى': 'a', 'ة': 'h',
    },
    farsi: {
      'ا': 'a', 'ب': 'b', 'پ': 'p', 'ت': 't', 'ث': 'th', 'ج': 'j', 'چ': 'ch',
      'ح': 'h', 'خ': 'kh', 'د': 'd', 'ذ': 'dh', 'ر': 'r', 'ز': 'z', 'ژ': 'zh',
      'س': 's', 'ش': 'sh', 'ص': 'sad', 'ض': 'dad', 'ط': 'tah', 'ظ': 'zah',
      'ع': 'ayn', 'غ': 'gh', 'ف': 'f', 'ق': 'q', 'ک': 'k', 'گ': 'g', 'ل': 'l',
      'م': 'm', 'ن': 'n', 'ه': 'h', 'و': 'w', 'ی': 'ee', 'ى': 'a', 'ء': 'a',
      '‌': '', // ZWNJ (zero-width non-joiner)
    },
    others: {
      'ý': 'y', 'đ': 'd', 'ħ': 'h',
    },
  };

  // Combine all language-specific maps into a single unified map
  const specialCharMap: { [key: string]: string } = Object.assign(
    {},
    ...Object.values(languageSpecificMaps)
  );

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