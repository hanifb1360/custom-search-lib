export const normalizeTextArabicPersian = (
    text: string,
    options: { arabic?: boolean; persian?: boolean } = {}
  ): string => {
    const { arabic, persian } = options;
  
    const arabicMap: Record<string, string> = {
      'أ': 'ا',
      'إ': 'ا',
      'آ': 'ا',
      'ؤ': 'و',
      'ئ': 'ي',
      'ة': 'ه',
      'ى': 'ي',
    };
  
    const persianMap: Record<string, string> = {
      'ي': 'ی',
      'ك': 'ک',
      'ۀ': 'ه',
      'پ': 'پ',
      'چ': 'چ',
      'ژ': 'ژ',
      'گ': 'گ',
    };
  
    const languageMap: Record<string, string> = {
      ...(arabic ? arabicMap : {}),
      ...(persian ? persianMap : {}),
    };
  
    return text
      .split('')
      .map(char => languageMap[char] || char)
      .join('');
  };