import type { NormalizeOptions } from '../types';

export const normalizeString = (
  value: string,
  options: NormalizeOptions = {}
): string => {
  const {
    caseSensitive = false,
    trim = true,
    unicode = true,
    removeDiacritics = false,
  } = options;

  let result = value;

  if (trim) {
    result = result.trim();
  }

  if (unicode) {
    result = result.normalize('NFC');
  }

  if (removeDiacritics) {
    result = result
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '');

    if (unicode) {
      result = result.normalize('NFC');
    }
  }

  if (!caseSensitive) {
    result = result.toLocaleLowerCase();
  }

  return result;
};