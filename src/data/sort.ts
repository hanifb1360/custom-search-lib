import type {
  SortableKey,
  SortOrder,
} from '../types';

const isNullish = (
  value: unknown
): value is null | undefined => {
  return value === null || value === undefined;
};

export const sortData = <
  T extends object,
  K extends SortableKey<T>
>(
  data: readonly T[],
  field: K,
  order: SortOrder = 'asc'
): T[] => {
  const direction =
    order === 'asc' ? 1 : -1;

  return [...data].sort((a, b) => {
    const left = a[field];
    const right = b[field];

    if (Object.is(left, right)) {
      return 0;
    }

    if (isNullish(left)) {
      return 1;
    }

    if (isNullish(right)) {
      return -1;
    }

    if (
      typeof left === 'number' &&
      typeof right === 'number'
    ) {
      const leftIsNaN =
        Number.isNaN(left);

      const rightIsNaN =
        Number.isNaN(right);

      if (
        leftIsNaN &&
        rightIsNaN
      ) {
        return 0;
      }

      if (leftIsNaN) {
        return 1;
      }

      if (rightIsNaN) {
        return -1;
      }

      return (
        (left - right) *
        direction
      );
    }

    if (
      typeof left === 'string' &&
      typeof right === 'string'
    ) {
      return (
        left.localeCompare(right) *
        direction
      );
    }

    throw new TypeError(
      `Cannot sort field "${String(field)}": values must be strings or numbers`
    );
  });
};
