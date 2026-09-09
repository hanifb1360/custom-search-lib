export const levenshteinDistance = (
  a: string,
  b: string
): number => {
  if (a === b) {
    return 0;
  }

  if (a.length === 0) {
    return b.length;
  }

  if (b.length === 0) {
    return a.length;
  }

  let source = a;
  let target = b;

  if (source.length < target.length) {
    [source, target] = [target, source];
  }

  let previous = Array.from(
    { length: target.length + 1 },
    (_, index) => index
  );

  let current = new Array<number>(target.length + 1);

  for (let i = 1; i <= source.length; i += 1) {
    current[0] = i;

    for (let j = 1; j <= target.length; j += 1) {
      const substitutionCost =
        source[i - 1] === target[j - 1] ? 0 : 1;

      current[j] = Math.min(
        previous[j] + 1,
        current[j - 1] + 1,
        previous[j - 1] + substitutionCost
      );
    }

    [previous, current] = [current, previous];
  }

  return previous[target.length];
};

export const levenshteinDistanceWithin = (
  a: string,
  b: string,
  maxDistance: number
): number | null => {
  if (!Number.isInteger(maxDistance) || maxDistance < 0) {
    throw new RangeError(
      'maxDistance must be a non-negative integer'
    );
  }

  if (a === b) {
    return 0;
  }

  if (Math.abs(a.length - b.length) > maxDistance) {
    return null;
  }

  if (a.length === 0) {
    return b.length <= maxDistance ? b.length : null;
  }

  if (b.length === 0) {
    return a.length <= maxDistance ? a.length : null;
  }

  let source = a;
  let target = b;

  if (source.length < target.length) {
    [source, target] = [target, source];
  }

  let previous = Array.from(
    { length: target.length + 1 },
    (_, index) => index
  );

  let current = new Array<number>(target.length + 1);

  for (let i = 1; i <= source.length; i += 1) {
    current[0] = i;

    let rowMinimum = current[0];

    for (let j = 1; j <= target.length; j += 1) {
      const substitutionCost =
        source[i - 1] === target[j - 1] ? 0 : 1;

      const value = Math.min(
        previous[j] + 1,
        current[j - 1] + 1,
        previous[j - 1] + substitutionCost
      );

      current[j] = value;

      if (value < rowMinimum) {
        rowMinimum = value;
      }
    }

    if (rowMinimum > maxDistance) {
      return null;
    }

    [previous, current] = [current, previous];
  }

  const distance = previous[target.length];

  return distance <= maxDistance ? distance : null;
};