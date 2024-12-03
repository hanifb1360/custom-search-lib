/**
 * Apply filters to a dataset.
 */
export const applyFilters = (
    data: Array<{ [key: string]: any }>,
    filters: { [key: string]: any }
  ): any[] => {
    return data.filter(item =>
      Object.keys(filters).every(key =>
        typeof filters[key] === 'object' && filters[key].min !== undefined
          ? item[key] >= filters[key].min && item[key] <= filters[key].max
          : item[key] === filters[key]
      )
    );
  };