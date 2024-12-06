

/**
 * Generate facets for a dataset based on specified fields.
 */
export const generateFacets = (
    data: Array<{ [key: string]: any }>,
    fields: string[]
  ): { [field: string]: { [value: string]: number } } => {
    const facets: { [field: string]: { [value: string]: number } } = {};
  
    fields.forEach(field => {
      facets[field] = data.reduce((acc, item) => {
        const value = item[field];
        acc[value] = (acc[value] || 0) + 1;
        return acc;
      }, {} as { [value: string]: number });
    });
  
    return facets;
  };