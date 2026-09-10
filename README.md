# custom-search-lib

A lightweight, dependency free TypeScript search toolkit for in memory datasets.

`custom-search-lib` provides fuzzy search, ranked fuzzy search, prefix and suffix matching, wildcard search, multi field full text search, typed filtering, immutable sorting, string normalization, and Levenshtein distance utilities.

It works with TypeScript and JavaScript and ships both ESM and CommonJS builds.

> **v2 development notice**
>
> The `main` branch currently documents the upcoming v2 release. Until `2.0.0` is published to npm, `npm install custom-search-lib` may still install the previous v1 release.

## Features

* Fuzzy search using Levenshtein distance
* Ranked fuzzy search with detailed score and distance results
* Prefix and suffix search
* `*` wildcard matching
* Multi field full text search with `and` and `or` operators
* Type safe exact and numeric range filtering
* Immutable sorting for strings and numbers
* Unicode NFC normalization
* Optional diacritic removal
* Case sensitive or case insensitive matching
* Optimized bounded Levenshtein distance
* TypeScript declarations included
* ESM and CommonJS support
* No runtime dependencies
* Tested on Node.js 20, 22, and 24

## Installation

```bash
npm install custom-search-lib
```

Node.js 20 or newer is required.

## Quick start

```ts
import {
  fuzzySearch,
  rankedFuzzySearch,
  prefixSearch,
  suffixSearch,
  wildcardSearch,
} from 'custom-search-lib';

const items = [
  'bicycle',
  'bike',
  'bicycles',
  'tricycle',
];

fuzzySearch('bicycl', items, {
  threshold: 2,
});
// ['bicycle', 'bicycles']

rankedFuzzySearch('bicycl', items, {
  threshold: 2,
});
// Results ordered by relevance

prefixSearch('bi', items);
// ['bicycle', 'bike', 'bicycles']

suffixSearch('cycle', items);
// ['bicycle', 'tricycle']

wildcardSearch('*cycle', items);
// ['bicycle', 'tricycle']
```

## Module support

### ESM

```js
import {
  fuzzySearch,
} from 'custom-search-lib';
```

### CommonJS

```js
const {
  fuzzySearch,
} = require('custom-search-lib');
```

## Fuzzy search

`fuzzySearch` returns every item whose Levenshtein distance from the query is less than or equal to the configured threshold.

```ts
import {
  fuzzySearch,
} from 'custom-search-lib';

const items = [
  'apple',
  'apply',
  'maple',
  'banana',
];

const results = fuzzySearch(
  'appl',
  items,
  {
    threshold: 1,
  }
);

console.log(results);
```

The default threshold is `2`.

Unlike the previous v1 behavior, v2 returns all matches inside the threshold rather than only the items tied for the smallest distance.

An empty query after normalization returns an empty array.

## Ranked fuzzy search

`rankedFuzzySearch` returns fuzzy matches ordered from best to worst relevance.

```ts
import {
  rankedFuzzySearch,
} from 'custom-search-lib';

const items = [
  'javascript',
  'java',
  'typescript',
  'javascript tutorial',
];

const results = rankedFuzzySearch(
  'javascript',
  items,
  {
    threshold: 10,
  }
);
```

Ranking considers:

* normalized Levenshtein distance
* difference in string length
* whether the item begins with the query
* whether the item contains the query

Lower scores represent better matches.

Use `rankedFuzzySearchDetailed` when you need the score and edit distance:

```ts
import {
  rankedFuzzySearchDetailed,
} from 'custom-search-lib';

const results = rankedFuzzySearchDetailed(
  'cat',
  [
    'cat',
    'cats',
    'bat',
  ],
  {
    threshold: 2,
  }
);

console.log(results);
```

Each result has this shape:

```ts
{
  item: string;
  score: number;
  distance: number;
}
```

Scores are relevance values used for ordering. They are not normalized to a fixed range.

## Prefix search

`prefixSearch` returns items that start with the normalized query.

```ts
import {
  prefixSearch,
} from 'custom-search-lib';

const results = prefixSearch(
  'rea',
  [
    'React',
    'Reason',
    'Vue',
  ]
);

// ['React', 'Reason']
```

Matching is case insensitive by default.

## Suffix search

`suffixSearch` returns items that end with the normalized query.

```ts
import {
  suffixSearch,
} from 'custom-search-lib';

const results = suffixSearch(
  '.ts',
  [
    'index.ts',
    'app.js',
    'search.ts',
  ]
);

// ['index.ts', 'search.ts']
```

## Wildcard search

`wildcardSearch` uses `*` to represent any sequence of characters.

```ts
import {
  wildcardSearch,
} from 'custom-search-lib';

const results = wildcardSearch(
  'user*@example.com',
  [
    'user1@example.com',
    'user.admin@example.com',
    'admin@example.com',
  ]
);

// [
//   'user1@example.com',
//   'user.admin@example.com'
// ]
```

The wildcard pattern is matched against the entire normalized string.

Characters other than `*` are treated literally, including regular expression special characters.

## Full text search

`fullTextSearch` searches selected fields of objects.

```ts
import {
  fullTextSearch,
} from 'custom-search-lib';

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Trail Runner',
    category: 'red shoe',
    description: 'Lightweight running shoe',
  },
  {
    id: 2,
    name: 'Mountain Trek',
    category: 'blue shoe',
    description: 'Waterproof hiking footwear',
  },
  {
    id: 3,
    name: 'City Jacket',
    category: 'blue jacket',
    description: 'Lightweight running jacket',
  },
];

const results = fullTextSearch(
  'blue shoe',
  products,
  {
    fields: [
      'name',
      'category',
      'description',
    ],
    operator: 'and',
  }
);
```

The query is split into whitespace separated tokens.

With `operator: 'and'`, every query token must appear in at least one selected field.

With `operator: 'or'`, at least one query token must appear in at least one selected field.

`and` is the default operator.

Selected values are converted to strings, so numeric and boolean fields can also be searched.

Only fields explicitly passed in `fields` are searched.

## Filtering

`filterData` provides type safe exact filtering and numeric range filtering.

```ts
import {
  filterData,
} from 'custom-search-lib';

interface Product {
  name: string;
  price: number;
  inStock: boolean;
}

const products: Product[] = [
  {
    name: 'Keyboard',
    price: 80,
    inStock: true,
  },
  {
    name: 'Mouse',
    price: 40,
    inStock: true,
  },
  {
    name: 'Monitor',
    price: 250,
    inStock: false,
  },
];

const results = filterData(
  products,
  {
    price: {
      min: 50,
      max: 100,
    },
    inStock: true,
  }
);

// Keyboard
```

Range boundaries are inclusive.

You can use only `min`:

```ts
filterData(products, {
  price: {
    min: 100,
  },
});
```

or only `max`:

```ts
filterData(products, {
  price: {
    max: 100,
  },
});
```

A range whose `min` is greater than `max` throws a `RangeError`. `NaN` is not accepted as a range boundary.

Exact filters use strict equality.

## Sorting

`sortData` sorts string and number fields without mutating the original array.

```ts
import {
  sortData,
} from 'custom-search-lib';

interface Product {
  name: string;
  price: number;
}

const products: Product[] = [
  {
    name: 'Monitor',
    price: 250,
  },
  {
    name: 'Mouse',
    price: 40,
  },
  {
    name: 'Keyboard',
    price: 80,
  },
];

const sorted = sortData(
  products,
  'price',
  'asc'
);
```

Supported orders are:

```ts
'asc'
'desc'
```

Ascending order is the default.

String fields are compared with `localeCompare`.

`null`, `undefined`, and `NaN` values are placed at the end of the result.

The original array is not modified.

## Normalization

Search functions share the same normalization behavior.

```ts
import {
  normalizeString,
} from 'custom-search-lib';

normalizeString(
  '  Crème Brûlée  ',
  {
    removeDiacritics: true,
  }
);

// 'creme brulee'
```

### Normalization options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `caseSensitive` | `boolean` | `false` | Preserve case when `true` |
| `trim` | `boolean` | `true` | Remove leading and trailing whitespace |
| `unicode` | `boolean` | `true` | Normalize Unicode strings using NFC |
| `removeDiacritics` | `boolean` | `false` | Remove Unicode diacritic marks |

For example:

```ts
fuzzySearch(
  'cafe',
  [
    'café',
    'coffee',
  ],
  {
    threshold: 0,
    removeDiacritics: true,
  }
);

// ['café']
```

## Search options

Fuzzy search accepts:

```ts
interface SearchOptions {
  caseSensitive?: boolean;
  threshold?: number;
  trim?: boolean;
  unicode?: boolean;
  removeDiacritics?: boolean;
}
```

`threshold` must be a non negative integer.

Prefix, suffix, and wildcard search use the same normalization options but do not use `threshold`.

## Levenshtein utilities

The underlying distance functions are also public.

```ts
import {
  levenshteinDistance,
  levenshteinDistanceWithin,
} from 'custom-search-lib';

levenshteinDistance(
  'kitten',
  'sitting'
);
// 3
```

`levenshteinDistanceWithin` is useful when you only care whether the distance fits inside a limit:

```ts
levenshteinDistanceWithin(
  'kitten',
  'sitting',
  2
);
// null

levenshteinDistanceWithin(
  'kitten',
  'sitting',
  3
);
// 3
```

It returns `null` when the distance exceeds the supplied maximum.

The implementation uses two dynamic programming rows rather than allocating a full matrix, and the bounded version can stop early when a match can no longer satisfy the maximum distance.

## TypeScript

The package ships TypeScript declarations and exports its public option and utility types.

```ts
import type {
  NormalizeOptions,
  SearchOptions,
  RankedSearchResult,
  FullTextSearchOptions,
  SortOrder,
  SortableValue,
  SortableKey,
  RangeFilter,
  FilterCondition,
  Filters,
} from 'custom-search-lib';
```

Object based APIs infer their keys from your data types.

For example, `fullTextSearch` restricts `fields` to keys from your object type, and `sortData` restricts sortable keys to compatible string and number fields.

## Performance

The library includes a reproducible benchmark:

```bash
npm run benchmark
```

The benchmark builds the package first and measures the generated ESM bundle.

The following baseline was recorded on:

```text
Node.js: v24.20.0
Platform: macOS arm64
CPU: Apple M3 Pro
```

Median execution time:

| Operation | 1,000 items | 10,000 items | 100,000 items |
| --- | ---: | ---: | ---: |
| `fuzzySearch` | 2.362 ms | 21.786 ms | 201.085 ms |
| `rankedFuzzySearch` | 2.824 ms | 23.405 ms | 230.804 ms |
| `prefixSearch` | 0.126 ms | 1.333 ms | 13.497 ms |
| `suffixSearch` | 0.123 ms | 1.199 ms | 11.633 ms |
| `wildcardSearch` | 0.164 ms | 1.589 ms | 16.152 ms |
| `fullTextSearch` | 0.581 ms | 4.750 ms | 47.856 ms |

These numbers are a reproducible baseline, not performance guarantees. Results depend on hardware, Node.js version, query length, string length, dataset shape, normalization options, and the number of matches.

The benchmark source is available in `benchmark/benchmark.mjs`.

## Development

Install dependencies:

```bash
npm ci
```

Run the test suite:

```bash
npm test
```

Run linting:

```bash
npm run lint
```

Run type checking:

```bash
npm run typecheck
```

Build ESM, CommonJS, and TypeScript declarations:

```bash
npm run build
```

Test the actual npm tarball in isolated ESM and CommonJS consumer projects:

```bash
npm run test:package
```

Run benchmarks:

```bash
npm run benchmark
```

CI runs the quality checks on Node.js 20, 22, and 24.

## Migrating from v1 to v2

v2 intentionally changes several behaviors and should be treated as a major version upgrade.

### Fuzzy search

v1 returned only the matches at the smallest Levenshtein distance among items inside the threshold.

v2 returns every item whose distance is less than or equal to the threshold.

If you need relevance ordering, use `rankedFuzzySearch`.

### Ranked fuzzy search

Ranked search no longer requires a literal substring match. Typographical fuzzy matches can participate in ranking as long as they satisfy the configured distance threshold.

The scoring model now uses normalized edit distance, length difference, prefix preference, and substring preference.

Use `rankedFuzzySearchDetailed` if you need access to the calculated score and distance.

### Full text search

Full text search now uses typed field selection and supports explicit `and` and `or` token behavior.

Whitespace is normalized safely, empty queries return no results, and selected non string values can be searched through string conversion.

### Filtering

Filtering is now generic and type safe.

Numeric fields support:

```ts
{
  min?: number;
  max?: number;
}
```

Invalid numeric ranges throw instead of silently producing unreliable results.

### Sorting

Sorting no longer mutates the input array.

It supports both numeric and string fields with typed field selection.

### Normalization

Search behavior is now centralized through a shared normalization layer.

Unicode NFC normalization and trimming are enabled by default. Diacritic removal is optional.

### Packaging

v2 ships:

```text
ESM
CommonJS
TypeScript declarations
```

The package has no runtime dependencies.

## Contributing

Contributions and bug reports are welcome.

Before opening a pull request, run:

```bash
npm run lint
npm run build
npm test
npm run test:package
```

## License

MIT © Hanif Bahari
