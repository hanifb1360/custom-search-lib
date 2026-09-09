/**
 * Perform full-text search on a dataset.
 */
export const fullTextSearch = (query: string, data: Array<{ [key: string]: any }>, fields: string[]): any[] => {
    if (!query) return []; // Return an empty array for empty queries
  
    const tokens = query.toLowerCase().split(' ');
    return data.filter(item =>
      fields.some(field =>
        tokens.some(token => (item[field] || '').toLowerCase().includes(token))
      )
    );
  };