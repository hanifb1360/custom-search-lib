
/**
 * Perform wildcard search on a dataset with enhanced handling for partial matches.
 */
export const wildcardSearch = (query: string, data: string[]): string[] => {
    if (!query || !data.length) return [];
  
    // Sanitize query and convert `*` into regex `.*`
    const sanitizedQuery = query
      .replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // Escape special regex characters
      .replace(/\\\*/g, '.*'); // Replace escaped '*' with regex '.*'
  
    try {
      const regex = new RegExp(`^${sanitizedQuery}$`, 'i'); // Match full string, case-insensitive
      return data.filter(item => regex.test(item));
    } catch (e) {
      console.error(`Invalid wildcard query: "${query}"`, e);
      return [];
    }
  };