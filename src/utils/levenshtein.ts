/**
 * Calculate Levenshtein distance using an optimized approach.
 * @param a - First string
 * @param b - Second string
 * @returns The Levenshtein distance between the two strings
 */
export const optimizedLevenshtein = (a: string, b: string): number => {
    let prev = Array(b.length + 1).fill(0);
    let curr = Array(b.length + 1).fill(0);
  
    for (let j = 0; j <= b.length; j++) prev[j] = j;
  
    for (let i = 1; i <= a.length; i++) {
      curr[0] = i;
      for (let j = 1; j <= b.length; j++) {
        curr[j] = a[i - 1] === b[j - 1]
          ? prev[j - 1]
          : Math.min(prev[j], curr[j - 1], prev[j - 1]) + 1;
      }
      [prev, curr] = [curr, prev];
    }
  
    return prev[b.length];
  };