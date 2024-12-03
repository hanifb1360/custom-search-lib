/**
 * Sort a dataset by a given field.
 */
export const sortData = (data: Array<{ [key: string]: any }>, field: string, order: 'asc' | 'desc' = 'asc'): any[] => {
    return data.sort((a, b) => (order === 'asc' ? a[field] - b[field] : b[field] - a[field]));
  };