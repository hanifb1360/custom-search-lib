/**
 * Perform prefix search on a dataset.
 */
export const prefixSearch = (query: string, data: string[]): string[] => {
    return data.filter(item => item.toLowerCase().startsWith(query.toLowerCase()));
  };
  
  /**
   * Perform suffix search on a dataset.
   */
  export const suffixSearch = (query: string, data: string[]): string[] => {
    return data.filter(item => item.toLowerCase().endsWith(query.toLowerCase()));
  };