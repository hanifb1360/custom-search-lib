import { cpus } from 'node:os';
import { performance } from 'node:perf_hooks';

import {
  fuzzySearch,
  rankedFuzzySearch,
  prefixSearch,
  suffixSearch,
  wildcardSearch,
  fullTextSearch,
} from '../dist/index.mjs';

const datasetSizes = [
  1_000,
  10_000,
  100_000,
];

const makeString = (index) =>
  `item-${String(index).padStart(6, '0')}-blue-widget`;

const makeRecord = (index) => ({
  id: index,
  name: makeString(index),
  category: index % 2 === 0 ? 'blue widget' : 'red gadget',
  description:
    index % 3 === 0
      ? 'A lightweight blue widget for the product catalog'
      : 'A general catalog item for search testing',
});

const getRunConfig = (size) => {
  if (size >= 100_000) {
    return {
      warmups: 1,
      iterations: 3,
    };
  }

  if (size >= 10_000) {
    return {
      warmups: 2,
      iterations: 5,
    };
  }

  return {
    warmups: 3,
    iterations: 10,
  };
};

const median = (values) => {
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }

  return sorted[middle];
};

const measure = ({
  name,
  size,
  warmups,
  iterations,
  fn,
}) => {
  let result;

  for (let i = 0; i < warmups; i += 1) {
    result = fn();
  }

  const timings = [];

  for (let i = 0; i < iterations; i += 1) {
    const start = performance.now();

    result = fn();

    const end = performance.now();

    timings.push(end - start);
  }

  const medianMs = median(timings);
  const operationsPerSecond =
    medianMs === 0 ? Infinity : 1000 / medianMs;

  return {
    size,
    operation: name,
    medianMs: medianMs.toFixed(3),
    opsPerSecond: Number.isFinite(operationsPerSecond)
      ? operationsPerSecond.toFixed(2)
      : '∞',
    matches: Array.isArray(result)
      ? result.length
      : 0,
  };
};

console.log('custom-search-lib benchmark');
console.log(`Node: ${process.version}`);
console.log(`Platform: ${process.platform} ${process.arch}`);
console.log(`CPU: ${cpus()[0]?.model ?? 'unknown'}`);
console.log('');

const results = [];

for (const size of datasetSizes) {
  const strings = Array.from(
    { length: size },
    (_, index) => makeString(index)
  );

  const records = Array.from(
    { length: size },
    (_, index) => makeRecord(index)
  );

  const targetIndex = Math.floor(size / 2);
  const target = makeString(targetIndex);
  const targetNumber = String(targetIndex).padStart(6, '0');

  const fuzzyQuery = target.slice(0, -1);

  const {
    warmups,
    iterations,
  } = getRunConfig(size);

  results.push(
    measure({
      name: 'fuzzySearch',
      size,
      warmups,
      iterations,
      fn: () =>
        fuzzySearch(
          fuzzyQuery,
          strings,
          {
            threshold: 1,
          }
        ),
    })
  );

  results.push(
    measure({
      name: 'rankedFuzzySearch',
      size,
      warmups,
      iterations,
      fn: () =>
        rankedFuzzySearch(
          fuzzyQuery,
          strings,
          {
            threshold: 2,
          }
        ),
    })
  );

  results.push(
    measure({
      name: 'prefixSearch',
      size,
      warmups,
      iterations,
      fn: () =>
        prefixSearch(
          `item-${targetNumber}`,
          strings
        ),
    })
  );

  results.push(
    measure({
      name: 'suffixSearch',
      size,
      warmups,
      iterations,
      fn: () =>
        suffixSearch(
          `${targetNumber}-blue-widget`,
          strings
        ),
    })
  );

  results.push(
    measure({
      name: 'wildcardSearch',
      size,
      warmups,
      iterations,
      fn: () =>
        wildcardSearch(
          `*${targetNumber}*`,
          strings
        ),
    })
  );

  results.push(
    measure({
      name: 'fullTextSearch',
      size,
      warmups,
      iterations,
      fn: () =>
        fullTextSearch(
          `${targetNumber} blue`,
          records,
          {
            fields: [
              'name',
              'category',
              'description',
            ],
            operator: 'and',
          }
        ),
    })
  );
}

console.table(
  results.map((result) => ({
    Size: result.size.toLocaleString(),
    Operation: result.operation,
    'Median ms': result.medianMs,
    'Ops/sec': result.opsPerSecond,
    Matches: result.matches,
  }))
);
