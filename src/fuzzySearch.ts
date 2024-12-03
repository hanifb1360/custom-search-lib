/**
 * Calculate Levenshtein distance between two strings.
 */
export const calculateLevenshteinDistance = (a: string, b: string): number => {
  const m = a.length;
  const n = b.length;

  if (m === 0) return n;
  if (n === 0) return m;

  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  // Initialize base cases
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  // Fill DP table
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1]; // Characters match
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j],    // Deletion
          dp[i][j - 1],    // Insertion
          dp[i - 1][j - 1] // Substitution
        ) + 1;
      }
    }
  }

  return dp[m][n];
};


/**
 * Perform fuzzy search on a dataset.
 */
export const fuzzySearch = (query: string, data: string[], threshold: number = 2): string[] => {
  if (!query || !data.length) return []; // Handle empty query or dataset

  const lowerQuery = query.toLowerCase();

  const results = data
    .map(item => ({
      item,
      distance: calculateLevenshteinDistance(lowerQuery, item.toLowerCase()),
    }))
    .filter(({ distance }) => distance <= threshold); // Filter within threshold

  if (!results.length) return []; // No matches found

  // Find minimum distance
  const minDistance = Math.min(...results.map(({ distance }) => distance));

  // Filter results to include only items with the minimum distance
  const closestMatches = results.filter(({ distance }) => distance === minDistance);

  // Sort alphabetically if there are ties
  closestMatches.sort((a, b) => a.item.localeCompare(b.item));

  return closestMatches.map(({ item }) => item); // Return sorted matches
};