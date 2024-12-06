/**
 * Sort a dataset by one or more fields.
 */
export const sortData = (
  data: Array<{ [key: string]: any }>,
  fields: Array<{ field: string; order: 'asc' | 'desc' }>,
  locale?: string // Optional locale for string sorting
): any[] => {
  return data.sort((a, b) => {
    for (const { field, order } of fields) {
      const comparison =
        typeof a[field] === 'string' && typeof b[field] === 'string'
          ? a[field].localeCompare(b[field], locale)
          : a[field] - b[field];

      if (comparison !== 0) {
        return order === 'asc' ? comparison : -comparison;
      }
    }
    return 0; // If all fields are equal
  });
};