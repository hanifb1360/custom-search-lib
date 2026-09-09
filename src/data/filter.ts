import type {
  Filters,
  RangeFilter,
} from '../types';

const isRangeFilter = (
  value: unknown
): value is RangeFilter => {
  if (
    typeof value !== 'object' ||
    value === null ||
    Array.isArray(value)
  ) {
    return false;
  }

  const candidate = value as {
    min?: unknown;
    max?: unknown;
  };

  const hasMin = 'min' in candidate;
  const hasMax = 'max' in candidate;

  if (!hasMin && !hasMax) {
    return false;
  }

  if (
    candidate.min !== undefined &&
    typeof candidate.min !== 'number'
  ) {
    return false;
  }

  if (
    candidate.max !== undefined &&
    typeof candidate.max !== 'number'
  ) {
    return false;
  }

  return true;
};

const validateRange = (
  range: RangeFilter
): void => {
  const {
    min,
    max,
  } = range;

  if (
    min !== undefined &&
    Number.isNaN(min)
  ) {
    throw new RangeError(
      'filter range min cannot be NaN'
    );
  }

  if (
    max !== undefined &&
    Number.isNaN(max)
  ) {
    throw new RangeError(
      'filter range max cannot be NaN'
    );
  }

  if (
    min !== undefined &&
    max !== undefined &&
    min > max
  ) {
    throw new RangeError(
      'filter range min cannot be greater than max'
    );
  }
};

export const filterData = <T extends object>(
  data: readonly T[],
  filters: Filters<T>
): T[] => {
  const entries = Object.entries(filters) as Array<
    [
      keyof T,
      FilterConditionForEntry<T>
    ]
  >;

  for (const [, condition] of entries) {
    if (isRangeFilter(condition)) {
      validateRange(condition);
    }
  }

  return data.filter(item =>
    entries.every(([key, condition]) => {
      if (condition === undefined) {
        return true;
      }

      if (isRangeFilter(condition)) {
        const value = item[key];

        if (
          typeof value !== 'number' ||
          Number.isNaN(value)
        ) {
          return false;
        }

        if (
          condition.min !== undefined &&
          value < condition.min
        ) {
          return false;
        }

        if (
          condition.max !== undefined &&
          value > condition.max
        ) {
          return false;
        }

        return true;
      }

      return item[key] === condition;
    })
  );
};

type FilterConditionForEntry<
  T extends object
> = Filters<T>[keyof T];
