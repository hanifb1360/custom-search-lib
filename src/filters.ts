/**
 * Apply filters to a dataset with support for AND/OR logic and range filters.
 */
export const applyFilters = (
  data: Array<{ [key: string]: any }>,
  filters: { [key: string]: any },
  logic: 'AND' | 'OR' = 'AND' // Default logic is AND
): any[] => {
  return data.filter(item => {
    const conditions = Object.keys(filters).map(key => {
      const filter = filters[key];
      if (typeof filter === 'object' && filter.min !== undefined && filter.max !== undefined) {
        // Range filter
        return item[key] >= filter.min && item[key] <= filter.max;
      } else if (Array.isArray(filter)) {
        // Multi-value filter
        return filter.includes(item[key]);
      } else {
        // Exact match filter
        return item[key] === filter;
      }
    });

    return logic === 'AND' ? conditions.every(Boolean) : conditions.some(Boolean);
  });
};

